import hero from "../assets/hero-building.jpg";
import salon from "../assets/salon.jpg";
import terrace from "../assets/terrace.jpg";
import josefstadt from "../assets/josefstadt.jpg";

export const images = { hero, salon, terrace, josefstadt } as const;

export type ImageKey = keyof typeof images;