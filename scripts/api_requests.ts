import { PermissionResponse, getAlbumsAsync, Album, getAssetsAsync, PagedInfo, Asset } from 'expo-media-library';

interface IGetAlbums {
  permissionResponse: PermissionResponse | null;
  requestPermission: () => Promise<PermissionResponse>;
}

export async function getAlbums({ permissionResponse, requestPermission }: IGetAlbums): Promise<Album[]> {
  if (permissionResponse?.status !== 'granted') await requestPermission();
  return await getAlbumsAsync({ includeSmartAlbums: true, });
}

export async function getAssets(): Promise<Asset[]> {
  return (await getAssetsAsync({
    first: 10000,
    mediaType: ['video'],
    sortBy: ['duration']
  })).assets;
}