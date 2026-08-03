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
            href="mailto:marcospatrick.dev@gmail.com"
            class="px-5 py-3 rounded-lg bg-teal text-ink font-medium hover:bg-teal/90 transition-colors"
          >
            marcospatrick.dev&#64;gmail.com
          </a>
          <a
            href="https://github.com/MarcosPatrickExe"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-line hover:border-teal/50 transition-colors"
          >
            <img
              [src]="iconUrl('github')"
              alt="GitHub"
              (error)="onIconError($event)"
              class="w-4 h-4"
              loading="lazy"
            />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/marcospatrickk"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-line hover:border-teal/50 transition-colors"
          >
            <img
              [src]="iconUrl('linkedin')"
              alt="LinkedIn"
              (error)="onIconError($event)"
              class="w-4 h-4"
              loading="lazy"
            />
            LinkedIn
          </a>
        </div>
      </div>

      <footer class="mt-20 pt-8 border-t border-line/60">
        <div
          class="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-mist"
        >
          <span>© 2026 Marcos Patrick — construído com Angular · Tailwind · Three.js</span>
          <span>versão 1.5</span>
        </div>
      </footer>
    </section>
  `,
})
export class ContactComponent {
  private readonly fallbackIcon =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C8A99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 12h8M12 8v8"/></svg>'
    );

  iconUrl(slug: string): string {
    return `https://cdn.simpleicons.org/${slug}`;
  }

  /** troca por um ícone genérico se o slug não existir mais no simpleicons */
  onIconError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = this.fallbackIcon;
  }
}
