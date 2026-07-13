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

  ngOnInit(): void {
    this.stack$ = this.projectsService.getStack();
  }

  iconUrl(slug: string): string {
    return `https://cdn.simpleicons.org/${slug}/E7ECEF`;
  }
}
