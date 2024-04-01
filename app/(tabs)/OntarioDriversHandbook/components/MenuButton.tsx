import { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';

interface Props {
  title: string;
  icon: string;
  length: React.ReactNode;
  loading?: boolean;
  href: string;
}

export const MenuButton = ({ title, icon, length, loading, href }: Props) => {

  const [maxWidth, setMaxWidth] = useState(Dimensions.get('window').width / 2);

  useEffect(() => {
    const handleResize = () => setMaxWidth(Dimensions.get('window').width / 2);
    Dimensions.addEventListener('change', handleResize);
  }, []);

  const BtnIcon = () => {
    const [iconType, iconName] = icon.split('@');
    const iconProps = { name: iconName, size: 20, color: 'white' };
    return (
      <View style={styles.btnIcon}>
        {iconType === 'ion' ? <IonIcon {...iconProps} /> : <MaterialIcon {...iconProps} />}
      </View>
    );
  }

  const Button = ({ children }: React.PropsWithChildren) => {

    if (!length) return <View style={styles.main_disabled}>{children}</View>;

    return (
      <Link href={href} asChild>
        <TouchableOpacity style={styles.main}>
          {children}
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={{ ...styles.container, width: maxWidth < 170 ? '100%' : maxWidth }}>
      <Button>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <BtnIcon />
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          {loading ? <ActivityIndicator /> : <Text style={styles.titleqtd}>{length}</Text>}
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 170,
    maxWidth: '100%',
  },
  main: {
    flexDirection: 'column',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    margin: 6,
    padding: 12,
    minHeight: 100,
    gap: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  main_disabled: {
    flexDirection: 'column',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    margin: 6,
    padding: 12,
    minHeight: 100,
    gap: 10,
    opacity: 0.6,
  },
  btnIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32 / 2,
    backgroundColor: '#007AFF',
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    maxWidth: 120,
  },
  titleqtd: {
    fontWeight: '500',
    fontSize: 28,
  },
});