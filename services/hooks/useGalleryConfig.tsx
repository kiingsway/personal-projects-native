import React from "react";
import { IGalleryConfig, TView } from "../../app/(tabs)/GalleryItems/interfaces";

export interface IUseGalleryConfig {
  config: IGalleryConfig;
  changeView: (new_view: TView) => void;
}

const useGalleryConfig = (): IUseGalleryConfig => {

  const [galleryConfig, setGalleryConfig] = React.useState<IGalleryConfig>({
    view: 'grid',
    filters: {
      nonFullHd: false,
      above2k: false,
    }
  });

  const changeView = (new_view: TView) => setGalleryConfig(prev => ({ ...prev, view: new_view }));

  return { config: galleryConfig, changeView };
};

export default useGalleryConfig;