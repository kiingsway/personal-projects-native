import { Asset, MediaSubtype, MediaTypeValue } from "expo-media-library";

export interface IGalleryType {
  type: MediaSubtype | MediaTypeValue;
  title: string;
  icon: string;
  length: number;
};

const getGalleryTypes = (assets: Asset[]): IGalleryType[] => {

  const assetsLength = getLength(assets);

  const buttons: IGalleryType[] = [
    { type: "photo", title: "Imagens", icon: "ion@image", length: assetsLength.photo },
    { type: "livePhoto", title: "Live Photo", icon: "ion@camera-reverse", length: assetsLength.livePhoto },
    { type: "screenshot", title: "Screenshot", icon: "ion@scan-circle", length: assetsLength.screenshot },
    { type: "hdr", title: "HDR", icon: "mat@hdr-on", length: assetsLength.hdr },
    { type: "depthEffect", title: "Depth Effect", icon: "ion@aperture", length: assetsLength.depthEffect },
    { type: "panorama", title: "Panorama", icon: "mat@panorama-horizontal", length: assetsLength.panorama },
    { type: "video", title: "Vídeos", icon: "ion@videocam", length: assetsLength.video },
    { type: "highFrameRate", title: "High Framerate", icon: "mat@slow-motion-video", length: assetsLength.highFrameRate },
    { type: "timelapse", title: "Timelapse", icon: "ion@timer", length: assetsLength.timelapse },
    { type: "stream", title: "Stream", icon: "mat@ondemand-video", length: assetsLength.stream },
    { type: "audio", title: "Audios", icon: "ion@musical-note", length: assetsLength.audio },
    { type: "unknown", title: "Outros", icon: "ion@ellipsis-horizontal-outline", length: assetsLength.unknown },
  ];

  return buttons;
}

const getLength = (assets: Asset[]) => {

  const lengths = {
    photo: 0,
    video: 0,
    audio: 0,
    unknown: 0,
    livePhoto: 0,
    screenshot: 0,
    timelapse: 0,
    depthEffect: 0,
    panorama: 0,
    hdr: 0,
    highFrameRate: 0,
    stream: 0,
  };

  return assets.reduce((lengths, { mediaType, mediaSubtypes }) => {

    if (mediaType === 'photo') lengths.photo++;
    else if (mediaType === 'video') lengths.video++;
    else if (mediaType === 'audio') lengths.audio++;
    else if (mediaType === 'unknown') lengths.unknown++;

    if (mediaSubtypes) {
      if (mediaSubtypes.includes('livePhoto')) lengths.livePhoto++;
      if (mediaSubtypes.includes('screenshot')) lengths.screenshot++;
      if (mediaSubtypes.includes('timelapse')) lengths.timelapse++;
      if (mediaSubtypes.includes('depthEffect')) lengths.depthEffect++;
      if (mediaSubtypes.includes('panorama')) lengths.panorama++;
      if (mediaSubtypes.includes('hdr')) lengths.hdr++;
      if (mediaSubtypes.includes('highFrameRate')) lengths.highFrameRate++;
      if (mediaSubtypes.includes('stream')) lengths.stream++;
    }

    return lengths;

  }, lengths);
};

export default getGalleryTypes;