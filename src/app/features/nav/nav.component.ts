import { Component } from '@angular/core';

@Component({
  selector: 'mp-nav',
  standalone: true,
  template: `
    <header class="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-ink/60 border-b border-line/60">
      <div class="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" class="font-display text-sm tracking-widest text-paper">MP<span class="text-teal">.</span>DEV</a>
        <nav class="hidden md:flex items-center gap-8 text-sm text-mist font-mono">
          <a href="#sobre" class="hover:text-paper transition-colors">sobre</a>
          <a href="#projetos" class="hover:text-paper transition-colors">projetos</a>
          <a href="#stack" class="hover:text-paper transition-colors">stack</a>
          <a href="#contato" class="hover:text-paper transition-colors">contato</a>
        </nav>
        <a
          href="#contato"
          class="text-xs font-mono px-4 py-2 rounded-full border border-teal/40 text-teal hover:bg-teal/10 transition-colors"
        >
          vamos conversar
        </a>
      </div>
    </header>
  `,
})
export class NavComponent {}
