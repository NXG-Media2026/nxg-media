import type { ImageMetadata } from 'astro';
import type { VideoTestimonial } from '../components/VideoTestimonialCarousel.astro';

// Placeholder thumbnails until real video thumbnails are uploaded.
// Replace with actual screenshots from /src/assets/images/testimonials/
// e.g.: import bartThumb from '../assets/images/testimonials/bart-jenezon-mcm.webp';
import placeholder1 from '../assets/images/founder/joost-sitting-laptop-lookingfront.webp';
import placeholder2 from '../assets/images/founder/joost-standing-relaxed.webp';
import placeholder3 from '../assets/images/founder/joost-standing-playfull.webp';
import placeholder4 from '../assets/images/founder/joost-standing-workinglaptop.webp';
import placeholder5 from '../assets/images/founder/joost-profielfoto-portrait.webp';

/**
 * Video testimonials — horizontal carousel on homepage.
 *
 * To add real thumbnails:
 *   1. Save screenshot/frame from video as .webp in /src/assets/images/testimonials/
 *   2. Import it above and replace the placeholder
 *
 * To add real videos:
 *   1. Upload to YouTube (unlisted) or add .mp4 to /public/videos/
 *   2. Set videoUrl to YouTube URL or /videos/filename.mp4
 */
export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'bart-jenezon',
    name: 'Bart Jenezon',
    company: 'MCM Research',
    quote: "It's really great to work with Joost, he helps us with every aspect to reach our target audience",
    rating: 5,
    thumbnail: placeholder1,
    videoUrl: '', // TODO: add YouTube/video URL
  },
  {
    id: 'jeroen-stekkies',
    name: 'Jeroen',
    company: 'Stekkies',
    quote: 'Joost helped us to go from zero ad budget euros in our account to now thousands of euros per month. He has a lot of valuable ideas for our company.',
    rating: 5,
    thumbnail: placeholder2,
    videoUrl: '', // TODO: add YouTube/video URL
  },
  {
    id: 'narayan-nederlandeet',
    name: 'Narayan',
    company: 'CEO Nederland Eetgroep',
    quote: 'Joost is altijd proactief met het opzetten van ads, en helpt ons maandelijks om onze doelstellingen te behalen',
    rating: 5,
    thumbnail: placeholder3,
    videoUrl: '', // TODO: add YouTube/video URL
  },
  {
    id: 'cat-howell',
    name: 'Cat Howell',
    company: 'Author, Agency Owner',
    quote: 'Joost is one of the only marketers that passed our yearly E-commerce challenge for digital marketers and he did so with a great result',
    rating: 5,
    thumbnail: placeholder4,
    videoUrl: '', // TODO: add YouTube/video URL
  },
  {
    id: 'julian-jagtenberg',
    name: 'Julian Jagtenberg',
    company: 'Somnox',
    quote: 'Dankzij Joost zijn we van 0 euro in ad spend naar enkele duizenden euros per maand gegaan die we winstgevend uitgeven via het Facebook/Meta ads platform',
    rating: 5,
    thumbnail: placeholder5,
    videoUrl: '', // TODO: add YouTube/video URL
  },
];
