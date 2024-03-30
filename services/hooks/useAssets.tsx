import { Asset, getAssetsAsync, usePermissions } from 'expo-media-library';
import React, { createContext, useContext, useState } from 'react';
import useBoolean from './useBoolean';

interface AssetsContextType {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  loading: boolean;
}

const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export const useAssets = () => {

  const context = useContext(AssetsContext);

  if (!context) throw new Error('useAssets deve ser utilizado dentro de um AssetsProvider');

  return context;
};

export const AssetsProvider = ({ children }: React.PropsWithChildren): JSX.Element => {

  const [permissionResponse, requestPermission] = usePermissions();

  const [loading, { setTrue: startLoad, setFalse: stopLoad }] = useBoolean();

  React.useEffect(() => {
    startLoad();
    (async () => {
      if (permissionResponse?.status !== 'granted') await requestPermission();
      const new_assets = await getAssetsAsync({ sortBy: ['duration'], first: 99999, mediaType: ['audio', 'photo', 'video', 'unknown'] });
      setAssets(new_assets.assets);
    })()
      .finally(stopLoad);
  }, []);

  const [assets, setAssets] = useState<Asset[]>([]);

  return (
    <AssetsContext.Provider value={{ assets, setAssets, loading }}>
      {children}
    </AssetsContext.Provider>
  );
};
