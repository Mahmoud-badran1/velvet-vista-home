import hero from "../assets/hero-building.jpg";
import salonAsset from "../assets/salon.jpg.asset.json";
const salon = salonAsset.url;
import terraceAsset from "../assets/terrace.jpg.asset.json";
const terrace = terraceAsset.url;
import josefstadt from "../assets/josefstadt.jpg";
import light from "../assets/light-architecture.jpg";
import heroResidenceAsset from "../assets/roof.jpeg.asset.json";
const heroResidence = heroResidenceAsset.url;
import rathaus from "../assets/rathaus.jpg";
import parliament from "../assets/parliament.jpg";
import university from "../assets/university.jpg";
import opera from "../assets/opera.jpg";
import stephansdom from "../assets/stephansdom.jpg";
import cityRooftopsAsset from "../assets/city-rooftops.jpg.asset.json";
const cityRooftops = cityRooftopsAsset.url;
import horizonHillsAsset from "../assets/horizon-hills.jpg.asset.json";
const horizonHills = horizonHillsAsset.url;
import bedroomAsset from "../assets/bedroom.jpg.asset.json";
const bedroom = bedroomAsset.url;
import diningAsset from "../assets/dining.jpg.asset.json";
const dining = diningAsset.url;
import bathroom from "../assets/bathroom.jpg";
import detailStoneAsset from "../assets/detail-stone.jpg.asset.json";
const detailStone = detailStoneAsset.url;
import detailJoineryAsset from "../assets/detail-joinery.png.asset.json";
const detailJoinery = detailJoineryAsset.url;
import detailLightAsset from "../assets/detail-light.jpg.asset.json";
const detailLight = detailLightAsset.url;
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
