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
import pmSalonAsset from "../assets/pm-salon.jpg.asset.json";
import pmDiningAsset from "../assets/pm-dining.jpg.asset.json";
import pmStairAsset from "../assets/pm-stair.jpg.asset.json";
import pmViewAsset from "../assets/pm-view.jpg.asset.json";
import pmLoungeAsset from "../assets/pm-lounge.jpg.asset.json";
import pmFireplaceAsset from "../assets/pm-fireplace.jpg.asset.json";
import pmPavilionAsset from "../assets/pm-pavilion.jpg.asset.json";
import pmTerraceAsset from "../assets/pm-terrace.jpg.asset.json";
import pmArtAsset from "../assets/pm-art.jpg.asset.json";
import pmArt2Asset from "../assets/pm-art2.jpg.asset.json";
import pmDining2Asset from "../assets/pm-dining2.jpg.asset.json";
import pmSkylineAsset from "../assets/pm-skyline.jpg.asset.json";
import pmSkyline2Asset from "../assets/pm-skyline2.jpg.asset.json";
import pmDeckAsset from "../assets/pm-deck.jpg.asset.json";
import pmDeck2Asset from "../assets/pm-deck2.jpg.asset.json";
import pmPavilion2Asset from "../assets/pm-pavilion2.jpg.asset.json";
import pmSunAsset from "../assets/pm-sun.jpg.asset.json";
import pmStair2Asset from "../assets/pm-stair2.jpg.asset.json";
import pmPergolaAsset from "../assets/pm-pergola.jpg.asset.json";

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
  pmSalon: pmSalonAsset.url,
  pmDining: pmDiningAsset.url,
  pmStair: pmStairAsset.url,
  pmView: pmViewAsset.url,
  pmLounge: pmLoungeAsset.url,
  pmFireplace: pmFireplaceAsset.url,
  pmPavilion: pmPavilionAsset.url,
  pmTerrace: pmTerraceAsset.url,
  pmArt: pmArtAsset.url,
  pmArt2: pmArt2Asset.url,
  pmDining2: pmDining2Asset.url,
  pmSkyline: pmSkylineAsset.url,
  pmSkyline2: pmSkyline2Asset.url,
  pmDeck: pmDeckAsset.url,
  pmDeck2: pmDeck2Asset.url,
  pmPavilion2: pmPavilion2Asset.url,
  pmSun: pmSunAsset.url,
  pmStair2: pmStair2Asset.url,
  pmPergola: pmPergolaAsset.url,
} as const;

export type ImageKey = keyof typeof images;
