import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Project, StackIcon } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private http = inject(HttpClient);

  private projects$?: Observable<Project[]>;
  private stack$?: Observable<StackIcon[]>;

  getProjects(): Observable<Project[]> {
    if (!this.projects$) {
      this.projects$ = this.http
        .get<Project[]>('assets/data/projects.json')
        .pipe(shareReplay(1));
    }
    return this.projects$;
  }

  getStack(): Observable<StackIcon[]> {
    if (!this.stack$) {
      this.stack$ = this.http
        .get<StackIcon[]>('assets/data/stack.json')
        .pipe(shareReplay(1));
    }
    return this.stack$;
  }
}
