import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Compass,
  Sparkles,
  X,
  Camera,
  Layers,
  Info,
  Sun,
  Moon,
  Play,
  Pause,
  Maximize2,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { HOTSPOTS } from '../data/riadData';

interface Architecture3DProps {
  currentLang: Language;
}

type ModelSceneMode = 'courtyard' | 'fountain' | 'lantern' | 'zellige';
type LightingMode = 'night' | 'day';

// High-resolution procedural Moroccan Zellige canvas texture
function createZelligeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep terracotta grout base
  ctx.fillStyle = '#1c1815';
  ctx.fillRect(0, 0, 512, 512);

  const tileSize = 64;
  const colors = [
    '#084d38', // Emerald Fassi
    '#1c3d73', // Cobalt blue
    '#c5a059', // Ochre gold
    '#f4ede2', // Ivory white
    '#a8482e', // Terracotta
    '#0b6b4f', // Jade
  ];

  for (let x = 0; x < 512; x += tileSize) {
    for (let y = 0; y < 512; y += tileSize) {
      const cx = x + tileSize / 2;
      const cy = y + tileSize / 2;
      const r = tileSize * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      const colorIdx = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % colors.length;
      ctx.fillStyle = colors[colorIdx];
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.5;

      // Authentic 8-pointed Moroccan star
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const outerR = r;
        const innerR = r * 0.54;
        const ox = Math.cos(angle) * outerR;
        const oy = Math.sin(angle) * outerR;
        const nextAngle = angle + Math.PI / 8;
        const ix = Math.cos(nextAngle) * innerR;
        const iy = Math.sin(nextAngle) * innerR;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Rosette center
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = (x + y) % (tileSize * 2) === 0 ? '#d4af37' : '#084d38';
      ctx.fill();
      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

// Procedural Atlas Cedar wood texture with painted Zouak arabesques
function createCedarWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#4a2c17';
  ctx.fillRect(0, 0, 256, 256);

  // Wood grain
  for (let i = 0; i < 256; i += 4) {
    ctx.fillStyle = i % 8 === 0 ? '#381e0e' : '#57341c';
    ctx.fillRect(0, i, 256, 2);
  }

  // Zouak painted geometric trim
  ctx.fillStyle = '#c5a059';
  for (let x = 0; x < 256; x += 32) {
    ctx.beginPath();
    ctx.arc(x + 16, 128, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  return texture;
}

export const Architecture3D: React.FC<Architecture3DProps> = ({ currentLang }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<ModelSceneMode>('courtyard');
  const [lightingMode, setLightingMode] = useState<LightingMode>('night');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<typeof HOTSPOTS[0] | null>(HOTSPOTS[0]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Group references
  const courtyardGroupRef = useRef<THREE.Group | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const waterParticlesRef = useRef<THREE.Points | null>(null);
  const lanternLightRef = useRef<THREE.PointLight | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const lanternGroupRef = useRef<THREE.Group | null>(null);
  const rosePetalsRef = useRef<THREE.Mesh[]>([]);

  // Camera targets for smooth animation
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.5, 5.6));
  const targetCamLookRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.3, 0));

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(lightingMode === 'night' ? 0x090c10 : 0x141a22);
    scene.fog = new THREE.FogExp2(lightingMode === 'night' ? 0x090c10 : 0x141a22, 0.035);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.5, 5.6);
    cameraRef.current = camera;

    // 3. Renderer with antialias and soft shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff7ed, lightingMode === 'night' ? 1.0 : 1.6);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x1c1917, 0.5);
    scene.add(hemiLight);

    // Directional sunlight coming through open courtyard roof
    const sunLight = new THREE.DirectionalLight(0xffe8ba, lightingMode === 'night' ? 0.8 : 2.6);
    sunLight.position.set(3.5, 9, 4.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Central pierced brass lantern light
    const lanternLight = new THREE.PointLight(0xff9922, 3.6, 14, 1.4);
    lanternLight.position.set(0, 1.7, 0);
    lanternLight.castShadow = true;
    scene.add(lanternLight);
    lanternLightRef.current = lanternLight;

    // Accent fill lights (Emerald & Amber)
    const fillEmerald = new THREE.PointLight(0x059669, 1.2, 9);
    fillEmerald.position.set(-2.8, 0.9, -2.8);
    scene.add(fillEmerald);

    const fillAmber = new THREE.PointLight(0xd97706, 1.1, 9);
    fillAmber.position.set(2.8, 0.9, 2.8);
    scene.add(fillAmber);

    // Master Courtyard Group
    const courtyardGroup = new THREE.Group();
    scene.add(courtyardGroup);
    courtyardGroupRef.current = courtyardGroup;

    // Textures
    const zelligeTexture = createZelligeTexture();
    const cedarTexture = createCedarWoodTexture();

    // 5. COURTYARD FLOOR (8-pointed star octagonal zellige floor)
    const floorGeo = new THREE.CylinderGeometry(4.3, 4.3, 0.15, 8);
    const floorMat = new THREE.MeshStandardMaterial({
      map: zelligeTexture,
      roughness: 0.32,
      metalness: 0.18,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1;
    floor.receiveShadow = true;
    courtyardGroup.add(floor);

    // White marble gallery walkway
    const marbleRingGeo = new THREE.RingGeometry(3.6, 5.4, 8);
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xf6f1e8,
      roughness: 0.22,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    const marbleWalkway = new THREE.Mesh(marbleRingGeo, marbleMat);
    marbleWalkway.rotation.x = -Math.PI / 2;
    marbleWalkway.position.y = -0.92;
    marbleWalkway.receiveShadow = true;
    courtyardGroup.add(marbleWalkway);

    // 6. CENTRAL FOUNTAIN (Octagonal Carrara marble basin)
    const plinthGeo = new THREE.CylinderGeometry(1.45, 1.55, 0.18, 8);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xede6db, roughness: 0.28 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = -0.83;
    plinth.receiveShadow = true;
    courtyardGroup.add(plinth);

    const basinGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.45, 8);
    const basinMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.16,
      metalness: 0.06,
    });
    const basin = new THREE.Mesh(basinGeo, basinMat);
    basin.position.y = -0.54;
    basin.castShadow = true;
    basin.receiveShadow = true;
    courtyardGroup.add(basin);

    // Carved brass rim
    const rimGeo = new THREE.TorusGeometry(1.21, 0.05, 8, 32);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.35, metalness: 0.85 });
    const basinRim = new THREE.Mesh(rimGeo, rimMat);
    basinRim.rotation.x = Math.PI / 2;
    basinRim.position.y = -0.32;
    courtyardGroup.add(basinRim);

    // Fountain Chalice (Tier 2)
    const upperStemGeo = new THREE.CylinderGeometry(0.19, 0.24, 0.42, 12);
    const upperStem = new THREE.Mesh(upperStemGeo, basinMat);
    upperStem.position.y = -0.22;
    courtyardGroup.add(upperStem);

    const chaliceGeo = new THREE.CylinderGeometry(0.55, 0.25, 0.22, 8);
    const chalice = new THREE.Mesh(chaliceGeo, basinMat);
    chalice.position.y = 0.05;
    chalice.castShadow = true;
    courtyardGroup.add(chalice);

    // Water Surface in Basin
    const waterGeo = new THREE.CircleGeometry(1.12, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x10849e,
      roughness: 0.05,
      metalness: 0.25,
      transparent: true,
      opacity: 0.88,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.36;
    courtyardGroup.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // Drifting Rose Petals in Fountain
    const rosePetals: THREE.Mesh[] = [];
    const petalGeo = new THREE.CircleGeometry(0.045, 6);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xbe123c,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 18; i++) {
      const petal = new THREE.Mesh(petalGeo, petalMat);
      const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 0.35 + Math.random() * 0.65;
      petal.position.set(Math.cos(angle) * radius, -0.35, Math.sin(angle) * radius);
      petal.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.2;
      petal.rotation.z = Math.random() * Math.PI;
      courtyardGroup.add(petal);
      rosePetals.push(petal);
    }
    rosePetalsRef.current = rosePetals;

    // Animated Fountain Water Particles Jet
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 0.06;
      particlePos[i * 3 + 1] = 0.16 + Math.random() * 0.2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
      particleVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          0.025 + Math.random() * 0.035,
          (Math.random() - 0.5) * 0.012
        )
      );
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa5f3fc,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    });
    const waterParticles = new THREE.Points(particleGeo, particleMat);
    courtyardGroup.add(waterParticles);
    waterParticlesRef.current = waterParticles;

    // 7. MOORISH ARCHES & CARVED CEDAR BEAMS (Colonnade around courtyard)
    const columnPositions = [
      [-2.4, -2.4],
      [2.4, -2.4],
      [-2.4, 2.4],
      [2.4, 2.4],
      [0, -2.7],
      [0, 2.7],
      [-2.7, 0],
      [2.7, 0],
    ];

    const colGeo = new THREE.CylinderGeometry(0.12, 0.14, 2.5, 12);
    const colMat = new THREE.MeshStandardMaterial({ color: 0xf5efe6, roughness: 0.28 });
    const colCapitalGeo = new THREE.BoxGeometry(0.36, 0.18, 0.36);
    const goldCapitalMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.35,
      metalness: 0.75,
    });

    columnPositions.forEach(([cx, cz]) => {
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(cx, 0.35, cz);
      col.castShadow = true;
      col.receiveShadow = true;
      courtyardGroup.add(col);

      const cap = new THREE.Mesh(colCapitalGeo, goldCapitalMat);
      cap.position.set(cx, 1.62, cz);
      cap.castShadow = true;
      courtyardGroup.add(cap);
    });

    // Horseshoe Arches over Columns
    const archCurveGeo = new THREE.TorusGeometry(1.22, 0.08, 8, 24, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({ color: 0xf0e7db, roughness: 0.35 });

    // North & South Arches
    const archN = new THREE.Mesh(archCurveGeo, archMat);
    archN.position.set(0, 1.62, -2.4);
    courtyardGroup.add(archN);

    const archS = new THREE.Mesh(archCurveGeo, archMat);
    archS.position.set(0, 1.62, 2.4);
    courtyardGroup.add(archS);

    // Carved Cedar Wooden Architraves & Lintels
    const lintelMat = new THREE.MeshStandardMaterial({
      map: cedarTexture,
      roughness: 0.65,
      metalness: 0.1,
    });
    const lintelNGeo = new THREE.BoxGeometry(5.2, 0.22, 0.28);
    const lintelN = new THREE.Mesh(lintelNGeo, lintelMat);
    lintelN.position.set(0, 1.76, -2.4);
    lintelN.castShadow = true;
    courtyardGroup.add(lintelN);

    const lintelS = new THREE.Mesh(lintelNGeo, lintelMat);
    lintelS.position.set(0, 1.76, 2.4);
    lintelS.castShadow = true;
    courtyardGroup.add(lintelS);

    // 8. PIERCED BRASS MOROCCAN LANTERN (Lanterne Fassi)
    const lanternGroup = new THREE.Group();
    lanternGroup.position.set(0, 1.8, 0);
    courtyardGroup.add(lanternGroup);
    lanternGroupRef.current = lanternGroup;

    // Hanging brass chain
    const chainGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.4, 6);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.32,
      metalness: 0.88,
    });
    const chain = new THREE.Mesh(chainGeo, brassMat);
    chain.position.y = 0.7;
    lanternGroup.add(chain);

    // Lantern octagonal body with pierced look
    const lanternBodyGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.5, 8);
    const lanternBody = new THREE.Mesh(lanternBodyGeo, brassMat);
    lanternBody.castShadow = true;
    lanternGroup.add(lanternBody);

    // Top pointed dome
    const lanternDomeGeo = new THREE.ConeGeometry(0.25, 0.28, 8);
    const lanternDome = new THREE.Mesh(lanternDomeGeo, brassMat);
    lanternDome.position.y = 0.38;
    lanternGroup.add(lanternDome);

    // Lower finial
    const finialGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const finial = new THREE.Mesh(finialGeo, brassMat);
    finial.position.y = -0.32;
    lanternGroup.add(finial);

    // 9. CORNER TERRACOTTA CITRUS PLANTERS
    const potGeo = new THREE.CylinderGeometry(0.35, 0.24, 0.6, 12);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.8 });
    const foliageGeo = new THREE.DodecahedronGeometry(0.48, 1);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.6 });

    const planterCoords = [
      [-3.4, -3.4],
      [3.4, -3.4],
      [-3.4, 3.4],
      [3.4, 3.4],
    ];

    planterCoords.forEach(([px, pz]) => {
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.position.set(px, -0.62, pz);
      pot.castShadow = true;
      courtyardGroup.add(pot);

      const tree = new THREE.Mesh(foliageGeo, foliageMat);
      tree.position.set(px, -0.15, pz);
      tree.castShadow = true;
      courtyardGroup.add(tree);
    });

    // 10. Mouse & Touch Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotY = 0;
    let rotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      rotY += dx * 0.007;
      rotX = Math.max(-0.4, Math.min(0.55, rotX + dy * 0.005));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseX;
      const dy = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      rotY += dx * 0.007;
      rotX = Math.max(-0.4, Math.min(0.55, rotX + dy * 0.005));
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const dist = cameraRef.current.position.distanceTo(targetCamLookRef.current);
      const factor = e.deltaY > 0 ? 1.08 : 0.92;
      const newDist = Math.max(2.4, Math.min(8.0, dist * factor));

      const dir = cameraRef.current.position.clone().sub(targetCamLookRef.current).normalize();
      targetCamPosRef.current.copy(targetCamLookRef.current.clone().add(dir.multiplyScalar(newDist)));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Window resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Auto rotation when idle
      if (!isDragging && isAutoRotating) {
        rotY += 0.0022;
      }

      courtyardGroup.rotation.y += (rotY - courtyardGroup.rotation.y) * 0.08;
      courtyardGroup.rotation.x += (rotX - courtyardGroup.rotation.x) * 0.08;

      // Smooth camera interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.05);
        cameraRef.current.lookAt(targetCamLookRef.current);
      }

      // Water ripples
      if (waterMeshRef.current) {
        waterMeshRef.current.scale.set(
          1 + Math.sin(elapsed * 2.8) * 0.012,
          1 + Math.cos(elapsed * 2.8) * 0.012,
          1
        );
      }

      // Rose petals floating drift
      rosePetals.forEach((petal, i) => {
        petal.position.x += Math.sin(elapsed * 1.2 + i) * 0.0006;
        petal.position.z += Math.cos(elapsed * 1.2 + i) * 0.0006;
        petal.rotation.z += 0.0018;
      });

      // Animated water fountain spray
      if (waterParticlesRef.current) {
        const positions = (waterParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3] += particleVelocities[i].x;
          positions[i * 3 + 2] += particleVelocities[i].z;
          particleVelocities[i].y -= 0.0014;

          if (positions[i * 3 + 1] < -0.34) {
            positions[i * 3] = (Math.random() - 0.5) * 0.05;
            positions[i * 3 + 1] = 0.16;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
            particleVelocities[i].y = 0.024 + Math.random() * 0.035;
          }
        }
        waterParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Lantern flicker
      if (lanternLightRef.current) {
        lanternLightRef.current.intensity = 3.6 + Math.sin(elapsed * 12) * 0.35 + Math.cos(elapsed * 7) * 0.2;
      }
      if (lanternGroupRef.current) {
        lanternGroupRef.current.rotation.y = Math.sin(elapsed * 0.9) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [lightingMode, isAutoRotating]);

  // Mode camera presets
  const handleSelectMode = (mode: ModelSceneMode) => {
    setActiveMode(mode);
    if (mode === 'courtyard') {
      targetCamPosRef.current.set(0, 2.5, 5.6);
      targetCamLookRef.current.set(0, 0.3, 0);
      setSelectedHotspot(HOTSPOTS.find((h) => h.id === 'courtyard') || HOTSPOTS[0]);
    } else if (mode === 'fountain') {
      targetCamPosRef.current.set(0, 0.65, 2.5);
      targetCamLookRef.current.set(0, -0.28, 0);
      setSelectedHotspot(HOTSPOTS.find((h) => h.id === 'fountain') || HOTSPOTS[1]);
    } else if (mode === 'lantern') {
      targetCamPosRef.current.set(0, 1.9, 2.3);
      targetCamLookRef.current.set(0, 1.75, 0);
      setSelectedHotspot(HOTSPOTS.find((h) => h.id === 'lantern') || HOTSPOTS[2]);
    } else if (mode === 'zellige') {
      targetCamPosRef.current.set(0, 4.8, 3.6);
      targetCamLookRef.current.set(0, -0.9, 0);
      setSelectedHotspot(HOTSPOTS.find((h) => h.id === 'zellige') || HOTSPOTS[3]);
    }
  };

  const handleZoom = (dir: 'in' | 'out') => {
    const factor = dir === 'in' ? 0.8 : 1.25;
    const dirVec = targetCamPosRef.current.clone().sub(targetCamLookRef.current).multiplyScalar(factor);
    targetCamPosRef.current.copy(targetCamLookRef.current.clone().add(dirVec));
  };

  const handleResetCamera = () => {
    handleSelectMode('courtyard');
  };

  return (
    <section
      id="architecture3d"
      className="relative py-24 sm:py-32 bg-[#080b0e] border-t border-stone-800 text-[#f5f0ea] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#c5a059]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            {t.threeD.tagline}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight mb-4">
            {t.threeD.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Exploration 3D interactive et réaliste du cœur architectural du Riad SDC. Modélisation géométrique haute fidélité du zellige fassi, de la fontaine en marbre avec pétales de rose et de la lanterne royale en laiton ciselé.
          </p>
        </div>

        {/* 3D Viewport Box */}
        <div className="relative w-full h-[460px] sm:h-[540px] md:h-[660px] rounded-2xl border border-stone-800 bg-[#07090c] shadow-2xl overflow-hidden flex flex-col">
          {/* Top Control Bar */}
          <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pointer-events-none">
            {/* Mode Exploration Switcher (Scrollable on small mobile screens) */}
            <div className="flex items-center gap-1 p-1 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 pointer-events-auto shadow-lg overflow-x-auto no-scrollbar">
              <span className="hidden md:inline-flex items-center gap-1 px-2 text-[10px] uppercase tracking-wider text-stone-400 font-semibold shrink-0">
                <Camera className="w-3 h-3 text-[#c5a059]" />
                <span>Vue :</span>
              </span>

              <button
                type="button"
                onClick={() => handleSelectMode('courtyard')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMode === 'courtyard'
                    ? 'bg-[#c5a059] text-black shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Patio Andalou
              </button>

              <button
                type="button"
                onClick={() => handleSelectMode('fountain')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMode === 'fountain'
                    ? 'bg-[#c5a059] text-black shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Fontaine
              </button>

              <button
                type="button"
                onClick={() => handleSelectMode('lantern')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMode === 'lantern'
                    ? 'bg-[#c5a059] text-black shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Lanterne
              </button>

              <button
                type="button"
                onClick={() => handleSelectMode('zellige')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMode === 'zellige'
                    ? 'bg-[#c5a059] text-black shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Zellige
              </button>
            </div>

            {/* Utility Controls (Lighting, Auto-Rotate, Zoom) */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 pointer-events-auto">
              {/* Lighting Switcher */}
              <div className="flex items-center p-0.5 sm:p-1 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
                <button
                  type="button"
                  onClick={() => setLightingMode('night')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    lightingMode === 'night'
                      ? 'bg-[#c5a059] text-black'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Ambiance Nuit aux Lanternes"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightingMode('day')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    lightingMode === 'day'
                      ? 'bg-[#c5a059] text-black'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Ambiance Lumière Dorée du Jour"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Auto-rotate toggle */}
              <button
                type="button"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`p-1.5 sm:p-2 rounded-xl border border-white/10 backdrop-blur-md transition-colors cursor-pointer ${
                  isAutoRotating ? 'bg-[#c5a059]/20 text-[#c5a059]' : 'bg-black/80 text-stone-400'
                }`}
                title={isAutoRotating ? 'Mettre en pause la rotation' : 'Activer la rotation automatique'}
              >
                {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              {/* Zoom Controls */}
              <div className="flex items-center bg-black/80 backdrop-blur-md rounded-xl border border-white/10 p-0.5 sm:p-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => handleZoom('in')}
                  className="p-1 sm:p-1.5 text-stone-300 hover:text-[#c5a059] transition-colors cursor-pointer"
                  title="Zoomer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom('out')}
                  className="p-1 sm:p-1.5 text-stone-300 hover:text-[#c5a059] transition-colors cursor-pointer"
                  title="Dézoomer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleResetCamera}
                  className="p-1 sm:p-1.5 text-stone-300 hover:text-[#c5a059] transition-colors cursor-pointer"
                  title="Réinitialiser l'angle"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Three.js Render Target */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Guide Helper Bar */}
          <div className="absolute top-16 sm:top-20 left-3 sm:left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-stone-300 pointer-events-none">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Glissez pour tourner à 360° • Pincez pour zoomer</span>
          </div>

          {/* Bottom Left Hotspot Selector Tabs (Horizontal ribbon on mobile) */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:left-4 z-20 flex items-center gap-1.5 overflow-x-auto no-scrollbar pointer-events-auto py-1">
            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => {
                  setSelectedHotspot(spot);
                  if (spot.id === 'fountain') handleSelectMode('fountain');
                  else if (spot.id === 'lantern') handleSelectMode('lantern');
                  else if (spot.id === 'zellige') handleSelectMode('zellige');
                  else handleSelectMode('courtyard');
                }}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs rounded-lg backdrop-blur-md border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedHotspot?.id === spot.id
                    ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold shadow-lg'
                    : 'bg-black/80 text-stone-300 border-white/10 hover:border-[#c5a059]/50'
                }`}
              >
                {spot.name[currentLang]}
              </button>
            ))}
          </div>

          {/* Architectural Information Card (Adaptive overlay on mobile & tablet) */}
          {selectedHotspot && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 z-30 max-w-sm sm:w-80 bg-[#0d1014]/95 backdrop-blur-xl border border-[#c5a059]/40 rounded-xl p-4 sm:p-5 shadow-2xl transition-all pointer-events-auto animate-fadeIn">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a059] font-semibold">
                    {selectedHotspot.name[currentLang]}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif-luxury text-[#f5f0ea] font-medium leading-tight mt-0.5">
                    {selectedHotspot.title[currentLang]}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(null)}
                  className="text-stone-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 cursor-pointer shrink-0"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed mb-2.5 line-clamp-3 sm:line-clamp-none">
                {selectedHotspot.details[currentLang]}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400">
                <span className="italic text-[#c5a059]/90">
                  {selectedHotspot.craftsmanship[currentLang]}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
