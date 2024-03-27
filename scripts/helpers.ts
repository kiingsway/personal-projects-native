import { Album } from "expo-media-library";
import { TAsset } from "../pages/Gallery/components/AlbumImages";

export function rawText(text?: string | number): string {
  // Textos em minúsculo e sem acento.
  if (!text) return "";
  return String(text).normalize('NFKD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function sortAlbums(a: Album, b: Album) {
  const isSmartAlbum = (str?: string) => str === 'smartAlbum';
  const isASmartAlbum = isSmartAlbum(a.type);
  const isBSmartAlbum = isSmartAlbum(b.type);

  if (isASmartAlbum && !isBSmartAlbum) return -1;
  if (!isASmartAlbum && isBSmartAlbum) return 1;
  return b.assetCount - a.assetCount;
}

export function sortAssetsBySize(a: TAsset, b: TAsset) {
  if (!a.size && !b.size) return 0;
  else if (!a.size) return 1;
  else if (!b.size) return -1;
  return b.size - a.size;
}

export function sortAssetsByDuration(a: TAsset, b: TAsset) {

  const nonA = !a.duration && a.duration !== 0;
  const nonB = !b.duration && b.duration !== 0;

  if (nonA && nonB) return 0;
  else if (nonA) return 1;
  else if (nonB) return -1;
  return b.duration - a.duration;
}

export const friendlySizeText = (size?: number): string => {
  if (!size) return "";

  const sizes = {
    kb: (size / 1000).toFixed(0),
    mb: (size / 1000000).toFixed(1),
    gb: (size / 100000000).toFixed(2),
  };

  if (size < 1000000) return `${sizes.kb} KB`;
  if (size < 1000000000) return `${sizes.mb} MB`;
  return `${sizes.gb} GB`;
};

export const friendlySeconds = (seconds?: number): string => {
  if (!seconds && seconds !== 0) return "";
  const time = [seconds / 60, seconds % 60].map(Math.floor);
  const [min, sec] = time.map(t => t.toString().padStart(2, '0'));
  return `${min}:${sec}`;
}

export const formatDateTimeByTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  
  const d = String(date.getDate()).padStart(2, '0');
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear());
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${d}/${M}/${y} ${h}:${m}`;
};