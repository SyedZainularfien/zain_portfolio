export interface Service {
  code: string;
  name: string;
  description: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  overview: string;
  highlights: readonly [string, string, string];
  technologies?: string;
  gradients: readonly [string, string, string];
}
