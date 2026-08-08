import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.model';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'mp-timeline',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('cardEl') cardEls!: QueryList<ElementRef<HTMLElement>>;

  private projectsService = inject(ProjectsService);
  private host = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private cdRef = inject(ChangeDetectorRef);

  private scrollTicking = false;

  projects$!: Observable<Project[]>;
  activeIndex = -1;
  railFillPct = 0;
  /** intensidade (0-1) do glow roxo atrás de cada card, conforme a proximidade do centro da viewport */
  glowByIndex: number[] = [];

  ngOnInit(): void {
    this.projects$ = this.projectsService.getProjects();
  }

  ngAfterViewInit(): void {
    this.cardEls.changes.subscribe(() => this.scheduleScrollUpdate());
    // fora da zone + agrupado por rAF: evita disparar change detection do app
    // inteiro a cada evento nativo de scroll, que travava o fundo 3D
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    });
    this.scheduleScrollUpdate();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  private onWindowScroll = (): void => {
    this.scheduleScrollUpdate();
  };

  private scheduleScrollUpdate(): void {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      this.scrollTicking = false;
      this.onScroll();
    });
  }

  private readonly fallbackIcon =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C8A99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 12h8M12 8v8"/></svg>'
    );

  /** rótulos amigáveis para slugs sem nome de marca 1:1 ou com grafia de slug pouco legível */
  private readonly stackLabels: Record<string, string> = {
    firestore: 'Firebase Firestore',
    fcm: 'Firebase Cloud Messaging',
    apple: 'iOS',
    nodedotjs: 'Node.js',
    typeorm: 'TypeORM',
    postgresql: 'PostgreSQL',
    typescript: 'TypeScript',
    bootstrap: 'Bootstrap',
    spring: 'Spring',
    express: 'Express',
  };

  /** produtos sem ícone de marca próprio no simpleicons — reaproveita o ícone da marca-mãe */
  private readonly iconSlugOverrides: Record<string, string> = {
    firestore: 'firebase',
    fcm: 'firebase',
  };

  /** marcas sem ícone confiável no simpleicons — asset local hospedado no próprio projeto */
  private readonly localIcons: Record<string, string> = {
    java: 'assets/img/icons/java.png',
  };

  iconUrl(slug: string): string {
    if (this.localIcons[slug]) return this.localIcons[slug];
    const resolvedSlug = this.iconSlugOverrides[slug] ?? slug;
    return `https://cdn.simpleicons.org/${resolvedSlug}`;
  }

  stackLabel(slug: string): string {
    return this.stackLabels[slug] ?? slug;
  }

  /** troca por um ícone genérico se o slug não existir mais no simpleicons */
  onIconError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = this.fallbackIcon;
  }

  glowFor(index: number): number {
    return this.glowByIndex[index] ?? 0;
  }

  private onScroll(): void {
    const section = this.host.nativeElement.querySelector('#projetos') as HTMLElement | null;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh * 0.5;
    const scrolled = Math.min(Math.max(-rect.top + vh * 0.5, 0), total);
    this.railFillPct = total > 0 ? (scrolled / total) * 100 : 0;

    let active = -1;
    const glows: number[] = [];
    const viewportCenter = vh / 2;
    this.cardEls?.forEach((c, i) => {
      const r = c.nativeElement.getBoundingClientRect();
      if (r.top < vh * 0.6) active = i;

      const cardCenter = r.top + r.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      glows.push(Math.max(0, 1 - distance / (vh * 0.7)));
    });
    this.activeIndex = active;
    this.glowByIndex = glows;

    // atualização fora da zone: aplica só neste componente, sem disparar
    // change detection do app inteiro a cada frame de scroll
    this.cdRef.detectChanges();
  }
}
