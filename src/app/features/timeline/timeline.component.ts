import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
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
export class TimelineComponent implements OnInit {
  @ViewChildren('cardEl') cardEls!: QueryList<ElementRef<HTMLElement>>;

  private projectsService = inject(ProjectsService);
  private host = inject(ElementRef<HTMLElement>);

  projects$!: Observable<Project[]>;
  activeIndex = -1;
  railFillPct = 0;

  ngOnInit(): void {
    this.projects$ = this.projectsService.getProjects();
  }

  iconUrl(slug: string): string {
    return `https://cdn.simpleicons.org/${slug}/E7ECEF`;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const section = this.host.nativeElement.querySelector('#projetos') as HTMLElement | null;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh * 0.5;
    const scrolled = Math.min(Math.max(-rect.top + vh * 0.5, 0), total);
    this.railFillPct = total > 0 ? (scrolled / total) * 100 : 0;

    let active = -1;
    this.cardEls?.forEach((c, i) => {
      const r = c.nativeElement.getBoundingClientRect();
      if (r.top < vh * 0.6) active = i;
    });
    this.activeIndex = active;
  }
}
