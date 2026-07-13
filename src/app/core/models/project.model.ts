export interface Project {
  tag: string;
  name: string;
  role: string;
  summary: string;
  highlights: string[];
  /** slugs do simpleicons.org, ex: "react", "angular", "firebase" */
  stack: string[];
}

export interface StackIcon {
  slug: string;
  label: string;
}
