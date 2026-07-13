import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { ThreeSceneService } from '../../core/services/three-scene.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'mp-hero',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection') sectionRef!: ElementRef<HTMLElement>;

  private three = inject(ThreeSceneService);

  ngAfterViewInit(): void {
    this.three.init(this.canvasRef.nativeElement, this.sectionRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.three.destroy();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.sectionRef) this.three.resize(this.sectionRef.nativeElement);
  }
}
