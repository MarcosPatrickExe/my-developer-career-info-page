import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { animate } from 'motion';

/**
 * Revela o elemento com fade + slide-up quando ele entra na viewport.
 * Usa a lib "motion" (motion.dev) — sucessora agnóstica de framework do
 * Framer Motion, criada pela mesma equipe — para a animação em si, e
 * IntersectionObserver nativo para o gatilho de scroll.
 *
 * Uso no template:
 *   <div mpReveal [mpRevealDelay]="0.1">...</div>
 */
@Directive({
  selector: '[mpReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() mpRevealDelay = 0;

  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    node.style.opacity = '0';
    if (!reduceMotion) node.style.transform = 'translateY(28px)';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              node,
              { opacity: [0, 1], transform: reduceMotion ? undefined : ['translateY(28px)', 'translateY(0px)'] },
              { duration: 0.8, delay: this.mpRevealDelay, ease: [0.16, 0.8, 0.24, 1] }
            );
            this.observer?.unobserve(node);
          }
        });
      },
      { threshold: 0.15 }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
