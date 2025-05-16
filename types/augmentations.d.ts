import type { Post } from './database';

declare module '@@/types/database' {
  interface Post {
    user?: {
      id: string;
      name: string;
      avatarUrl: string | null;
    } | null;
  }
} 