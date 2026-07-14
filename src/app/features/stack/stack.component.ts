import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { StackIcon } from '../../core/models/project.model';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'mp-stack',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './stack.component.html',
})
export class StackComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  stack$!: Observable<StackIcon[]>;

  private readonly fallbackIcon =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C8A99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 12h8M12 8v8"/></svg>'
    );

  ngOnInit(): void {
    this.stack$ = this.projectsService.getStack();
  }

  iconUrl(slug: string): string {
    return `https://cdn.simpleicons.org/${slug}/E7ECEF`;
  }

  /** troca por um ícone genérico se o slug não existir mais no simpleicons */
  onIconError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = this.fallbackIcon;
  }
}
