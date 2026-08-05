import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';

/**
 * Cena 3D usada como fundo fixo de toda a página (não só do hero). Isolada
 * num service para manter os componentes enxutos e para permitir
 * reuso/testes independentes da renderização Three.js.
 */
@Injectable({ providedIn: 'root' })
export class ThreeSceneService {
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private starsFar?: THREE.Points;
  private starsNear?: THREE.Points;
  private meshA?: THREE.Mesh;
  private meshB?: THREE.Mesh;
  private frameId?: number;
  private mouse = { x: 0, y: 0 };
  private reduceMotion = false;
  private clock = new THREE.Clock();

  /** posições-base + fase individual de cada estrela, para o drift senoidal */
  private driftBase = new Map<THREE.Points, { base: Float32Array; phase: Float32Array; speed: Float32Array }>();

  constructor(private zone: NgZone) {}

  init(canvas: HTMLCanvasElement): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    this.camera.position.z = 18;

    this.starsFar = this.makeStarField({
      count: 520,
      spread: { x: 46, y: 30, z: [-32, -14] },
      size: 0.045,
      color: 0x2dd4bf,
      opacity: 0.4,
      driftAmp: 0.35,
    });
    this.scene.add(this.starsFar);

    this.starsNear = this.makeStarField({
      count: 240,
      spread: { x: 40, y: 26, z: [-13, -2] },
      size: 0.09,
      color: 0x9fe9df,
      opacity: 0.6,
      driftAmp: 0.55,
    });
    this.scene.add(this.starsNear);

    const geoA = new THREE.IcosahedronGeometry(4, 1);
    const matA = new THREE.MeshBasicMaterial({ color: 0x8b7cf6, wireframe: true, transparent: true, opacity: 0.22 });
    this.meshA = new THREE.Mesh(geoA, matA);
    this.meshA.position.set(7, 2, -6);
    this.scene.add(this.meshA);

    const geoB = new THREE.IcosahedronGeometry(2.4, 1);
    const matB = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, wireframe: true, transparent: true, opacity: 0.16 });
    this.meshB = new THREE.Mesh(geoB, matB);
    this.meshB.position.set(-8, -4, -9);
    this.scene.add(this.meshB);

    window.addEventListener('mousemove', this.onMouseMove);
    this.resize();

    // roda fora do Angular zone para não disparar change detection a cada frame
    this.zone.runOutsideAngular(() => this.animate());
  }

  private makeStarField(opts: {
    count: number;
    spread: { x: number; y: number; z: [number, number] };
    size: number;
    color: number;
    opacity: number;
    driftAmp: number;
  }): THREE.Points {
    const { count, spread, size, color, opacity, driftAmp } = opts;
    const positions = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const speed = new Float32Array(count);
    const [zMin, zMax] = spread.z;

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
      positions[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
      phase[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.4 + Math.random() * 0.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size, color, transparent: true, opacity });
    const points = new THREE.Points(geometry, material);

    this.driftBase.set(points, { base: positions.slice(), phase, speed });
    (points.userData as any).driftAmp = driftAmp;
    return points;
  }

  resize(): void {
    if (!this.renderer || !this.camera) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  destroy(): void {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.renderer?.dispose();
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.mouse.x = e.clientX / window.innerWidth - 0.5;
    this.mouse.y = e.clientY / window.innerHeight - 0.5;
  };

  private driftStars(points: THREE.Points, t: number): void {
    const rec = this.driftBase.get(points);
    if (!rec) return;
    const { base, phase, speed } = rec;
    const amp = (points.userData as any).driftAmp as number;
    const posAttr = points.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < phase.length; i++) {
      const p = phase[i];
      const s = speed[i];
      arr[i * 3] = base[i * 3] + Math.sin(t * s + p) * amp;
      arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * s * 0.8 + p) * amp;
    }
    posAttr.needsUpdate = true;
  }

  private animate = (): void => {
    this.frameId = requestAnimationFrame(this.animate);
    if (!this.renderer || !this.scene || !this.camera) return;
    if (!this.starsFar || !this.starsNear || !this.meshA || !this.meshB) return;

    if (!this.reduceMotion) {
      const t = this.clock.getElapsedTime();

      this.driftStars(this.starsFar, t);
      this.driftStars(this.starsNear, t);
      this.starsFar.rotation.y += 0.00035;
      this.starsNear.rotation.y += 0.0007;

      this.meshA.rotation.x += 0.0015;
      this.meshA.rotation.y += 0.002;
      this.meshB.rotation.x -= 0.001;
      this.meshB.rotation.y -= 0.0018;

      // leve parallax com o mouse + reação sutil ao scroll, para a cena
      // parecer viva conforme o usuário navega pela página, não só no hero
      const scrollFactor = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1), 1);
      const targetX = this.mouse.x * 2;
      const targetY = -this.mouse.y * 2 + scrollFactor * 1.2;
      this.camera.position.x += (targetX - this.camera.position.x) * 0.02;
      this.camera.position.y += (targetY - this.camera.position.y) * 0.02;
      this.camera.rotation.z += (scrollFactor * 0.015 - this.camera.rotation.z) * 0.02;
      this.camera.lookAt(0, 0, 0);
    }
    this.renderer.render(this.scene, this.camera);
  };
}
