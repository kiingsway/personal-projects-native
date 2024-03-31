import React from 'react';
import { Banner } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useBoolean from '../../../../services/hooks/useBoolean';

interface Props {
  isWeb: boolean;
}

export const WebNoGalleryBanner = ({ isWeb }: Props): JSX.Element => {

  const [visible] = useBoolean(isWeb);

  const WarningIcon = ({ size }: { size: number }): JSX.Element => <IonIcon name="warning" size={size} />;

  const text = "Web does not support Media Gallery.";

  return (
    <Banner
      visible={visible}
      icon={({ size }) => <WarningIcon size={size} />}>
      {text}
    </Banner>
  )
}