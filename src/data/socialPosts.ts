import type { ImageMetadata } from 'astro';

export interface SocialPost {
  id: string;
  title: string;
  type: 'reel' | 'carousel' | 'post' | 'story';
  url: string;
  image: ImageMetadata;
}

export const socialPosts: SocialPost[] = [];

export function getSocialPosts(max: number = 6): SocialPost[] {
  return socialPosts.slice(0, max);
}
