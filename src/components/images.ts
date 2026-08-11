import hero from "../assets/hero-building.jpg";
import salon from "../assets/salon.jpg";
import terrace from "../assets/terrace.jpg";
import josefstadt from "../assets/josefstadt.jpg";
import light from "../assets/light-architecture.jpg";
import heroResidenceAsset from "../assets/hero-residence.png.asset.json";
const heroResidence = heroResidenceAsset.url;
import rathaus from "../assets/rathaus.jpg";
import parliament from "../assets/parliament.jpg";
import university from "../assets/university.jpg";
import opera from "../assets/opera.jpg";
import stephansdom from "../assets/stephansdom.jpg";
import cityRooftopsAsset from "../assets/city-rooftops.jpg.asset.json";
const cityRooftops = cityRooftopsAsset.url;
import horizonHills from "../assets/horizon-hills.jpg";
import bedroom from "../assets/bedroom.jpg";
import dining from "../assets/dining.jpg";
import bathroom from "../assets/bathroom.jpg";
import detailStone from "../assets/detail-stone.jpg";
import detailJoinery from "../assets/detail-joinery.jpg";
import detailLight from "../assets/detail-light.jpg";
import cafe from "../assets/cafe.jpg";
import filmStill from "../assets/film-still.jpg";

export const images = {
  hero,
  salon,
  terrace,
  josefstadt,
  light,
  heroResidence,
  rathaus,
  parliament,
  university,
  opera,
  stephansdom,
  cityRooftops,
  horizonHills,
  bedroom,
  dining,
  bathroom,
  detailStone,
  detailJoinery,
  detailLight,
  cafe,
  filmStill,
} as const;

export type ImageKey = keyof typeof images;
