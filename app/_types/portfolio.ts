export interface Service {
  code: string;
  name: string;
  description: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  technologies?: string;
  gradients: readonly [string, string, string];
}
