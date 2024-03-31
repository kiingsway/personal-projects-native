import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon?: JSX.Element;
  disabled?: boolean;
  loading?: boolean;
  href: string;
  title: string;
  description: string | number;
}

export const AlbumButton = ({ disabled, href, icon, loading, title, description }: Props): JSX.Element => {

  const [width, setWidth] = useState(Dimensions.get('window').width / 2);

  useEffect(() => {
    const handleResize = () => setWidth(Dimensions.get('window').width / 2);
    Dimensions.addEventListener('change', handleResize);
  }, []);

  return (
    <View style={{ ...styles.container, width: width < 170 ? '100%' : width }}>
      <Link href={href} asChild>
        <TouchableOpacity style={styles.main}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {/* <BtnIcon /> */}
            {icon}
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            {loading ? <ActivityIndicator /> : <Text style={styles.title_qtd}>{description}</Text>}
          </View>
        </TouchableOpacity>
      </Link>
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
    elevation: 5,
    margin: 6,
    padding: 12,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    gap: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
  },
  title_qtd: {
    fontWeight: '500',
    fontSize: 28,
  },
});