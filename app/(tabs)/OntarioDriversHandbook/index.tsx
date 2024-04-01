import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MenuButton } from './components/MenuButton';
import { learning_items, learning_items_sections } from './data';
import { getItemsLength } from './handlers/getItemsLength';

export default function OntarioDriversHandbook(): JSX.Element {

  const lenghts = getItemsLength(learning_items);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      {learning_items_sections.map(item => (
        <MenuButton
          key={item.key}
          title={item.title}
          icon="warning"
          length={lenghts[item.key as keyof typeof lenghts]}
          href={`/OntarioDriversHandbook/LearnPage/${item.key}`} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});