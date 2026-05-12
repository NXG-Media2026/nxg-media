/**
 * Curated social storytelling posts — static config, no live embeds.
 *
 * These represent hand-picked Instagram/social posts that showcase
 * Verena's personality, expertise, and community. Used in the
 * SocialStorytellingGrid component on the homepage.
 *
 * To update: add/remove entries here. Images come from the assets folder
 * and are processed by Astro's image pipeline (WebP, responsive).
 */

export interface SocialPost {
  /** Unique identifier */
  id: string;
  /** Short title or caption hook (max ~60 chars) */
  title: string;
  /** Post type — drives the badge label */
  type: 'reel' | 'carousel' | 'post' | 'story';
  /** Link to the original post on Instagram */
  url: string;
  /** Image import path — must be a static import above */
  image: ImageMetadata;
}

import type { ImageMetadata } from 'astro';

// Static imports for Astro image pipeline
import imgRunning from '../assets/images/Founder/lifestyle-running.jpg';
import imgBeach from '../assets/images/Founder/portrait-beach.jpg';
import imgLaughing from '../assets/images/Founder/lifestyle-laughing.jpg';
import imgWater from '../assets/images/Founder/lifestyle-water.jpg';
import imgSporty from '../assets/images/Founder/portrait-smilingsporty.jpg';
import imgArmsUp from '../assets/images/Founder/lifestyle-arms-up.jpg';

/**
 * Curated social posts — order matters (first 6 shown on homepage).
 *
 * Replace these with real Instagram post URLs and screenshots/photos
 * once Verena's account has enough content. For now these use
 * lifestyle photos as placeholders with realistic caption hooks.
 */
export const socialPosts: SocialPost[] = [
  {
    id: 'post-histamin-zyklus',
    title: 'Histamin & Zyklus: warum es vor der Periode schlimmer wird',
    type: 'carousel',
    url: 'https://www.instagram.com/doc.veri/',
    image: imgWater,
  },
  {
    id: 'reel-morgenroutine',
    title: 'Meine Morgenroutine als Ärztin & Ironman-Athletin',
    type: 'reel',
    url: 'https://www.instagram.com/doc.veri/',
    image: imgRunning,
  },
  {
    id: 'post-perimenopause-signs',
    title: '5 Zeichen, dass deine Perimenopause begonnen hat',
    type: 'carousel',
    url: 'https://www.instagram.com/doc.veri/',
    image: imgBeach,
  },
  {
    id: 'reel-smoothie',
    title: 'Histaminarmer Smoothie in 3 Minuten',
    type: 'reel',
    url: 'https://www.instagram.com/doc.veri/',
    image: imgSporty,
  },
  {
    id: 'post-cortisol',
    title: 'Cortisol: warum du nicht einfach weniger Stress machen kannst',
    type: 'post',
    url: 'https://www.instagram.com/doc.veri/',
    image: imgLaughing,
  },
  {
    id: 'reel-training-zyklus',
    title: 'So passe ich mein Training an meinen Zyklus an',
    type: 'reel',
    url: 'https://www.instagram.com/doc.veri/',
    image: imgArmsUp,
  },
];

/**
 * Get social posts for display (max N).
 * Returns empty array if no posts configured.
 */
export function getSocialPosts(max: number = 6): SocialPost[] {
  return socialPosts.slice(0, max);
}
