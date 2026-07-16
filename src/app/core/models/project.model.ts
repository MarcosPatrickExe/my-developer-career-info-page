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
}

export interface StackIcon {
  slug: string;
  label: string;
}
