import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'mp-about',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <section id="sobre" class="relative py-24 border-b border-line/60">
      <div class="max-w-4xl mx-auto px-6 md:px-10">
        <p mpReveal class="font-mono text-xs text-violet tracking-widest mb-4">// sobre</p>
        <h2 mpReveal [mpRevealDelay]="0.05" class="font-display text-2xl md:text-3xl text-paper leading-snug">
          Cada projeto abaixo é um commit na minha carreira — uma decisão de arquitetura, um
          problema real e uma stack escolhida com intenção.
        </h2>
        <p mpReveal [mpRevealDelay]="0.1" class="mt-6 text-mist leading-relaxed">
          Trabalho na interseção entre produto e engenharia: do design de banco de dados à
          experiência final no dispositivo do usuário. Esta página é, ela mesma, um estudo de
          caso — construída com Angular, TypeScript, Tailwind CSS, animações com Motion e
          elementos 3D em Three.js, publicada a partir de um CMS simples em JSON.
        </p>
      </div>
    </section>
  `,
})
export class AboutComponent {}
