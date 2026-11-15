export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface Project {
  tag: string;
  name: string;
  role: string;
  summary: string;
  highlights: string[];
  /** slugs do simpleicons.org, ex: "react", "angular", "firebase" */
  stack: string[];
  /** mockups opcionais do produto, exibidos como thumbnails no card */
  screenshots?: ProjectScreenshot[];
  /** link do repositório no GitHub, quando o projeto é público */
  repoUrl?: string;
  /** true quando o repositório é privado — exibe um selo informativo em vez de um link */
  repoPrivate?: boolean;
  /** link da ficha do app na App Store, quando publicado */
  appStoreUrl?: string;
  /** link da ficha do app na Play Store, quando publicado */
  playStoreUrl?: string;
}

export interface StackIcon {
  slug: string;
  label: string;
}
