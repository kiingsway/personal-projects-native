import * as MediaLibrary from 'expo-media-library';

interface IGetAlbums {
  permissionResponse: MediaLibrary.PermissionResponse | null;
  requestPermission: () => Promise<MediaLibrary.PermissionResponse>
}

export async function getAlbums({ permissionResponse, requestPermission }: IGetAlbums): Promise<MediaLibrary.Album[]> {
  if (permissionResponse?.status !== 'granted') await requestPermission();
  return await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true, });
}