declare module "#app" {
  interface PageMeta {
    middleware?: string | string[];
    layout?: string;
  }
}

export {};
