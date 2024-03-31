import { Asset, deleteAssetsAsync } from "expo-media-library";
import { Alert } from "react-native";
import Toast from 'react-native-root-toast';

export const confirmDelete = (assets: Asset[]): Promise<'cancel' | 'deleted'> => {

  const asset = assets.length === 1 ? assets?.[0] : undefined;

  return new Promise((res, rej) => {

    const delete_asset = async () => {
      const isDeleted = await deleteAssetsAsync(assets);
      if (isDeleted) {
        const msg = asset ? `Arquivo "${asset.filename}" excluído!` : `Arquivo selecionados excluídos!`;
        Toast.show(`✅ ${msg}`, { duration: Toast.durations.SHORT, });
        res('deleted');
      } else {
        const msg = asset ? ` arquivo "${asset.filename}".` : `s arquivos selecionados.`;
        const error = `❌ ERRO: Não foi possível excluir o${msg}`;
        Toast.show(error, { duration: Toast.durations.LONG, });
        rej(error);
      }
    }

    const msg = `Tem certeza que deseja excluir o${asset ? ` arquivo "${asset.filename}"` : `s arquivos selecionados`}?`;

    Alert.alert(
      `Excluir arquivo`,
      msg,
      [
        {
          text: "Não",
          style: "cancel",
          onPress: () => res('cancel'),
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: delete_asset
        },
      ]
    );
  });
}