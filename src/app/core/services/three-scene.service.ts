import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';

/**
 * Cena 3D ambiente usada no hero. Isolada num service para manter o
 * componente do hero enxuto e para permitir reuso/testes independentes
 * da renderização Three.js.
 */
@Injectable({ providedIn: 'root' })
export class ThreeSceneService {
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private points?: THREE.Points;
  private mesh?: THREE.Mesh;
  private frameId?: number;
  private mouse = { x: 0, y: 0 };
  private reduceMotion = false;

  constructor(private zone: NgZone) {}

  init(canvas: HTMLCanvasElement, container: HTMLElement): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    this.camera.position.z = 18;

    const count = 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.7,
    });
    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);

    const geo2 = new THREE.IcosahedronGeometry(4, 1);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0x8b7cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    this.mesh = new THREE.Mesh(geo2, mat2);
    this.mesh.position.set(6, 1, -4);
    this.scene.add(this.mesh);

    window.addEventListener('mousemove', this.onMouseMove);
    this.resize(container);

    // roda fora do Angular zone para não disparar change detection a cada frame
    this.zone.runOutsideAngular(() => this.animate());
  }

  resize(container: HTMLElement): void {
    if (!this.renderer || !this.camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
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

  private animate = (): void => {
    this.frameId = requestAnimationFrame(this.animate);
    if (!this.renderer || !this.scene || !this.camera || !this.points || !this.mesh) return;

    if (!this.reduceMotion) {
      this.points.rotation.y += 0.0006;
      this.mesh.rotation.x += 0.0015;
      this.mesh.rotation.y += 0.002;
      this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.02;
      this.camera.position.y += (-this.mouse.y * 2 - this.camera.position.y) * 0.02;
      this.camera.lookAt(0, 0, 0);
    }
    this.renderer.render(this.scene, this.camera);
  };
}
