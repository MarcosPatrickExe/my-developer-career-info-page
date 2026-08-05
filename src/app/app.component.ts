import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { NavComponent } from './features/nav/nav.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { TimelineComponent } from './features/timeline/timeline.component';
import { StackComponent } from './features/stack/stack.component';
import { ContactComponent } from './features/contact/contact.component';
import { ThreeSceneService } from './core/services/three-scene.service';

@Component({
  selector: 'mp-root',
  standalone: true,
  imports: [NavComponent, HeroComponent, AboutComponent, TimelineComponent, StackComponent, ContactComponent],
  template: `
    <canvas #bgCanvas class="fixed inset-0 -z-10 pointer-events-none"></canvas>
    <div class="grain"></div>
    <mp-nav></mp-nav>
    <mp-hero></mp-hero>
    <mp-about></mp-about>
    <mp-timeline></mp-timeline>
    <mp-stack></mp-stack>
    <mp-contact></mp-contact>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private three = inject(ThreeSceneService);

  ngAfterViewInit(): void {
    this.three.init(this.canvasRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.three.destroy();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.three.resize();
  }
}
