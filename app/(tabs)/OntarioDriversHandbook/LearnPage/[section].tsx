import { Link, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { learning_items } from "../data";
import { useState } from "react";
import { Card, Button, Text, Avatar } from "react-native-paper";
import React from "react";
import { router } from 'expo-router';
import useBoolean from "../../../../services/hooks/useBoolean";

export default function LearnPage() {

  const [hiddenDesc, { toggle: toggleDesc }] = useBoolean();

  const { section } = useLocalSearchParams();

  const [itemIndex, setItemIndex] = useState<number>(0);

  const items = learning_items.filter(i => i.section === section);
  const item = items[itemIndex];

  const addIndex = (): void => setItemIndex(prev => Math.min(prev + 1, items.length));
  const subIndex = (): void => setItemIndex(prev => Math.max(prev - 1, 0));

  const LearningItem = (): JSX.Element => {

    if (!item) return <Text>invalid index</Text>;

    return (
      <View style={styles.card}>
        <Image style={styles.image} source={item.image} />
        <ScrollView style={styles.description}>
          <Text style={{ ...styles.description_desc, display: hiddenDesc ? 'flex' : 'none' }}>{item.description}</Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.main_phone}>
        <View style={styles.pages}>
          <Link href="(tabs)/GalleryItems">
            <Button icon="arrow-left" mode="text" onPress={router.back}>Back</Button>
          </Link>
          <Button icon={hiddenDesc ? "eye-outline" : "eye-off-outline"} mode="text" onPress={toggleDesc}>{hiddenDesc ? "Hide" : "Show"} descriptions</Button>
        </View>
        <View style={styles.header}>
          <Text style={styles.count}>{itemIndex + 1} / {items.length}</Text>
          <Text style={styles.count}>{item?.category}</Text>
        </View>
        <LearningItem />
        <View style={styles.pages}>
          <Button mode="elevated" style={{ flex: 1 }} disabled={itemIndex === 0} onPress={subIndex}>Prev</Button>
          <Button mode="elevated" style={{ flex: 1 }} disabled={itemIndex + 1 >= items.length} onPress={addIndex}>Next</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  main_phone: {
    padding: 20,
    maxWidth: 800,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  header: {
    alignItems: 'center'
  },
  count: {
    fontSize: 21,
    color: '#555555'
  },
  image: {
    objectFit: 'contain',
    height: 200,
    width: '100%',
  },
  card: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    minHeight: 100,
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 30,
  },
  description: {
    height: '40%',
    padding: 4,
  },
  description_desc: {
    fontSize: 18,
  },
  pages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%'
  }
});