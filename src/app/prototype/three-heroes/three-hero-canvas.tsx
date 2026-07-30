"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

export type HeroVariant = "A" | "B" | "C";

const ditherShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2(1, 1) },
    pixelSize: { value: 2.2 },
    mixAmount: { value: 0.82 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float pixelSize;
    uniform float mixAmount;
    varying vec2 vUv;

    float bayer4(vec2 p) {
      int x = int(mod(p.x, 4.0));
      int y = int(mod(p.y, 4.0));
      int i = x + y * 4;
      float m[16];
      m[0]=0.0;  m[1]=8.0;  m[2]=2.0;  m[3]=10.0;
      m[4]=12.0; m[5]=4.0;  m[6]=14.0; m[7]=6.0;
      m[8]=3.0;  m[9]=11.0; m[10]=1.0; m[11]=9.0;
      m[12]=15.0;m[13]=7.0; m[14]=13.0;m[15]=5.0;
      return (m[i] + 0.5) / 16.0;
    }

    void main() {
      vec2 grid = floor(vUv * resolution / pixelSize) * pixelSize;
      vec2 uv = grid / resolution;
      vec3 source = texture2D(tDiffuse, uv).rgb;
      float threshold = bayer4(gl_FragCoord.xy / pixelSize) - 0.5;
      vec3 dithered = floor(source * 5.0 + threshold) / 4.0;
      gl_FragColor = vec4(mix(source, dithered, mixAmount), 1.0);
    }
  `,
};

type SceneState = {
  root: THREE.Group;
  animate: (time: number, pointer: THREE.Vector2) => void;
  background: THREE.ColorRepresentation;
};

function tensionScene(): SceneState {
  const root = new THREE.Group();
  const ink = new THREE.MeshStandardMaterial({
    color: 0x171816,
    roughness: 0.34,
    metalness: 0.58,
  });
  const orange = new THREE.MeshStandardMaterial({
    color: 0xf05a32,
    roughness: 0.45,
  });
  const bone = new THREE.MeshStandardMaterial({
    color: 0xece9de,
    roughness: 0.7,
  });

  const blocks = [
    [-1.5, 0.7, 0, 0.95],
    [-0.55, -0.2, 0.35, 0.72],
    [0.35, 0.55, -0.2, 1.08],
    [1.25, -0.5, 0.2, 0.82],
    [0.2, -1.35, -0.5, 0.56],
  ] as const;

  blocks.forEach(([x, y, z, scale], index) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 1.1, 1.1),
      index === 2 ? orange : index === 4 ? bone : ink,
    );
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(scale);
    mesh.rotation.set(index * 0.24, index * -0.2, index * 0.13);
    root.add(mesh);
  });

  const paths = [
    [
      new THREE.Vector3(-2.2, 1.65, -0.5),
      new THREE.Vector3(-0.8, 1.25, 0.8),
      new THREE.Vector3(0.4, -0.3, 0.65),
      new THREE.Vector3(2.0, -1.25, -0.2),
    ],
    [
      new THREE.Vector3(-2.1, -1.2, 0.2),
      new THREE.Vector3(-0.6, -0.8, -0.8),
      new THREE.Vector3(0.7, 0.8, -0.65),
      new THREE.Vector3(2.1, 1.3, 0.35),
    ],
    [
      new THREE.Vector3(-1.7, 0, -1),
      new THREE.Vector3(-0.2, 1.5, -0.3),
      new THREE.Vector3(1.4, 0.15, 0.7),
    ],
  ];

  paths.forEach((points, index) => {
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 80, index === 1 ? 0.055 : 0.035, 8, false),
      index === 2 ? orange : bone,
    );
    root.add(tube);
  });

  root.scale.setScalar(1.08);

  return {
    root,
    background: 0xc9c7bc,
    animate: (time, pointer) => {
      root.rotation.y = time * 0.12 + pointer.x * 0.18;
      root.rotation.x = -0.08 + pointer.y * 0.12;
      root.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && index < blocks.length) {
          child.position.y += Math.sin(time * 0.75 + index) * 0.0018;
        }
      });
    },
  };
}

function syntaxScene(): SceneState {
  const root = new THREE.Group();
  const nodes: THREE.Mesh[] = [];
  const positions = [
    [0, 1.7, 0],
    [-1.25, 0.65, 0.2],
    [1.25, 0.65, -0.15],
    [-1.85, -0.55, 0],
    [-0.65, -0.55, 0.45],
    [0.65, -0.55, -0.35],
    [1.85, -0.55, 0.2],
    [-1.2, -1.7, -0.2],
    [0, -1.7, 0.35],
    [1.2, -1.7, -0.15],
  ] as const;
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 8], [6, 9],
  ];

  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6ff55,
    roughness: 0.5,
  });
  const hotMaterial = new THREE.MeshStandardMaterial({
    color: 0xf05b3f,
    roughness: 0.4,
  });
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xd9dfcf,
    transparent: true,
    opacity: 0.7,
  });

  positions.forEach(([x, y, z], index) => {
    const geometry =
      index % 3 === 0
        ? new THREE.OctahedronGeometry(index === 0 ? 0.32 : 0.22)
        : new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const node = new THREE.Mesh(
      geometry,
      index === 0 || index === 8 ? hotMaterial : nodeMaterial,
    );
    node.position.set(x, y, z);
    root.add(node);
    nodes.push(node);
  });

  edges.forEach(([from, to]) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      nodes[from].position,
      nodes[to].position,
    ]);
    root.add(new THREE.Line(geometry, lineMaterial));
  });

  const particlesGeometry = new THREE.BufferGeometry();
  const particles = new Float32Array(180 * 3);
  for (let i = 0; i < 180; i += 1) {
    particles[i * 3] = (Math.random() - 0.5) * 7;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 5;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particles, 3),
  );
  root.add(
    new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0xd6ff55, size: 0.025 }),
    ),
  );

  return {
    root,
    background: 0x151816,
    animate: (time, pointer) => {
      root.rotation.y = pointer.x * 0.24 + Math.sin(time * 0.2) * 0.08;
      root.rotation.x = pointer.y * 0.12;
      nodes.forEach((node, index) => {
        node.rotation.x = time * (0.18 + index * 0.006);
        node.rotation.y = time * (0.12 + index * 0.01);
        node.scale.setScalar(1 + Math.sin(time * 1.2 + index) * 0.07);
      });
    },
  };
}

function surferScene(): SceneState {
  const root = new THREE.Group();
  const track = new THREE.Group();
  root.add(track);

  const laneMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0eee3,
    roughness: 0.7,
  });
  const blockMaterial = new THREE.MeshStandardMaterial({
    color: 0x22283b,
    roughness: 0.38,
    metalness: 0.35,
  });
  const hotMaterial = new THREE.MeshStandardMaterial({
    color: 0xf05a32,
    roughness: 0.45,
  });

  for (let i = 0; i < 32; i += 1) {
    const lane = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.08, 1.25),
      laneMaterial,
    );
    lane.position.set(0, -1.05, -i * 1.32 + 4);
    track.add(lane);

    if (i > 2 && i % 2 === 0) {
      const obstacle = new THREE.Mesh(
        new THREE.BoxGeometry(0.58, 0.58 + (i % 3) * 0.25, 0.58),
        i % 6 === 0 ? hotMaterial : blockMaterial,
      );
      obstacle.position.set((i % 3 - 1) * 0.78, -0.7, lane.position.z);
      track.add(obstacle);
    }
  }

  const player = new THREE.Group();
  for (let i = 0; i < 4; i += 1) {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.48, 0.62),
      hotMaterial,
    );
    cube.position.y = -0.72 + i * 0.49;
    player.add(cube);
  }
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 12),
    blockMaterial,
  );
  head.position.y = 1.35;
  player.add(head);
  player.position.set(0, -0.05, 2.2);
  root.add(player);
  root.rotation.x = -0.14;

  return {
    root,
    background: 0xe5a936,
    animate: (time, pointer) => {
      track.position.z = (time * 2.4) % 2.64;
      root.rotation.y = pointer.x * 0.1;
      root.rotation.x = -0.14 + pointer.y * 0.055;
      player.position.y = Math.sin(time * 2.2) * 0.08;
      player.rotation.z = -pointer.x * 0.08;
    },
  };
}

function buildScene(variant: HeroVariant) {
  if (variant === "B") return syntaxScene();
  if (variant === "C") return surferScene();
  return tensionScene();
}

export function ThreeHeroCanvas({ variant }: { variant: HeroVariant }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvasHost: HTMLDivElement = host;

    const sceneState = buildScene(variant);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneState.background);
    scene.fog =
      variant === "C"
        ? new THREE.Fog(sceneState.background, 7, 32)
        : new THREE.Fog(sceneState.background, 8, 17);
    scene.add(sceneState.root);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(
      variant === "C" ? 0 : 0.15,
      variant === "C" ? 2.8 : 0.1,
      variant === "C" ? 7.8 : 9.3,
    );
    camera.lookAt(0, variant === "C" ? -0.35 : 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = variant === "B" ? 1.2 : 1;
    canvasHost.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const ditherPass = new ShaderPass(ditherShader);
    ditherPass.uniforms.pixelSize.value = variant === "B" ? 2.5 : 2.15;
    ditherPass.uniforms.mixAmount.value = variant === "A" ? 0.7 : 0.84;
    composer.addPass(ditherPass);
    composer.addPass(new OutputPass());

    scene.add(new THREE.HemisphereLight(0xffffff, 0x34342f, 2.2));
    const key = new THREE.DirectionalLight(
      variant === "B" ? 0xa9ffcf : 0xfff5dc,
      4.5,
    );
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff633f, 3);
    rim.position.set(4, -1, -2);
    scene.add(rim);

    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;

    function resize() {
      const width = canvasHost.clientWidth;
      const height = canvasHost.clientHeight;
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      ditherPass.uniforms.resolution.value.set(
        width * renderer.getPixelRatio(),
        height * renderer.getPixelRatio(),
      );
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvasHost.getBoundingClientRect();
      targetPointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
      ditherPass.uniforms.pixelSize.value =
        (variant === "B" ? 2.5 : 2.15) + Math.abs(targetPointer.x) * 0.7;
    }

    function animate() {
      frame = requestAnimationFrame(animate);
      if (!visible) return;
      pointer.lerp(targetPointer, 0.055);
      const time = prefersReducedMotion ? 0 : clock.getElapsedTime();
      sceneState.animate(time, prefersReducedMotion ? new THREE.Vector2() : pointer);
      composer.render();
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvasHost);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvasHost);
    canvasHost.addEventListener("pointermove", onPointerMove);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      canvasHost.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
