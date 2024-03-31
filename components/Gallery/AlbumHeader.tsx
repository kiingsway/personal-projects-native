import { View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import AlbumFilters from "./AlbumFilters";
import { IAppFilters, TView } from "../../app/(tabs)/GalleryItems/interfaces";
import { IUseGalleryConfig } from "../../services/hooks/useGalleryConfig";

interface Props {
  title?: string;
  lengthItems: number;
  selectedAssets: string[] | undefined;
  selectAssets: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  // filters: IAppFilters;
  // setFilters: React.Dispatch<React.SetStateAction<IAppFilters>>;
  configState: IUseGalleryConfig;
}

const AlbumHeader = ({ lengthItems, title, selectAssets, selectedAssets, configState }: Props) => {

  const [view, setView] = React.useState<TView>('list');

  const Toolbar = () => {

    const selectProps = (() => {
      if (selectedAssets === undefined) return { title: 'Select', icon: 'select' };
      return { title: 'Unselect', icon: 'select-remove' };
    })();

    const buttons = [
      {
        key: 'slct',
        icon: selectProps.icon,
        title: selectProps.title,
        onPress: () => selectAssets(prev => prev ? undefined : [])
      },
      // {
      //   key: 'view',
      //   icon: viewProps.icon,
      //   title: capitalize(view),
      //   onPress: changeView
      // },
    ];

    return buttons.map(btn => {
      const icon = <MCIcon name={btn.icon} style={styles.icon} size={18} />;

      return (
        <Button
          key={btn.key}
          title={btn.title}
          fontSize={18}
          icon={icon}
          onPress={btn.onPress} />
      );
    })
  }

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.header}>
      <View style={styles.header_page}>
        <Text style={styles.header_title}>{title}</Text>
        <Text style={styles.header_subtitle}>{lengthItems} itens</Text>
      </View>
      <View style={styles.header_page}>
        <Toolbar />

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
          >
            <Text>Filters!!</Text>
            {/* <AlbumFilters filters={configState.config.filters} setFilters={configState.changeView} /> */}
          </Modal>
        </Portal>
        {/* <Button onPress={showModal} title="Show" /> */}
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  header_page: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: 8
  },
  header_title: {
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center'
  },
  header_subtitle: {
    fontSize: 14,
    paddingBottom: 3,
  },
  icon: {
    color: "#007AFF"
  }
});

export default AlbumHeader;