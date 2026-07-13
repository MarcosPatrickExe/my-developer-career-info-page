import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'mp-contact',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <section id="contato" class="relative py-28 border-t border-line/60">
      <div class="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p mpReveal class="font-mono text-xs text-teal tracking-widest mb-4">// contato</p>
        <h2 mpReveal [mpRevealDelay]="0.05" class="font-display text-3xl md:text-5xl text-paper mb-6">
          Vamos arquitetar o próximo produto.
        </h2>
        <p mpReveal [mpRevealDelay]="0.1" class="text-mist mb-10">
          Aberto a projetos freelance, consultoria de arquitetura e posições de tech lead.
        </p>
        <div mpReveal [mpRevealDelay]="0.15" class="flex flex-wrap justify-center gap-4 font-mono text-sm">
          <a
            href="mailto:contato@marcospatrick.dev"
            class="px-5 py-3 rounded-lg bg-teal text-ink font-medium hover:bg-teal/90 transition-colors"
          >
            contato&#64;marcospatrick.dev
          </a>
          <a href="#" class="px-5 py-3 rounded-lg border border-line hover:border-teal/50 transition-colors">
            GitHub
          </a>
          <a href="#" class="px-5 py-3 rounded-lg border border-line hover:border-teal/50 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>

      <footer class="mt-20 pt-8 border-t border-line/60">
        <div
          class="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-mist"
        >
          <span>© 2026 Marcos Patrick — construído com Angular · Tailwind · Three.js</span>
          <span>versão 0.1 — case study inicial</span>
        </div>
      </footer>
    </section>
  `,
})
export class ContactComponent {}
