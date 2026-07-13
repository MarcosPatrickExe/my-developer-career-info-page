import { Component } from '@angular/core';
import { NavComponent } from './features/nav/nav.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { TimelineComponent } from './features/timeline/timeline.component';
import { StackComponent } from './features/stack/stack.component';
import { ContactComponent } from './features/contact/contact.component';

@Component({
  selector: 'mp-root',
  standalone: true,
  imports: [NavComponent, HeroComponent, AboutComponent, TimelineComponent, StackComponent, ContactComponent],
  template: `
    <div class="grain"></div>
    <mp-nav></mp-nav>
    <mp-hero></mp-hero>
    <mp-about></mp-about>
    <mp-timeline></mp-timeline>
    <mp-stack></mp-stack>
    <mp-contact></mp-contact>
  `,
})
export class AppComponent {}
