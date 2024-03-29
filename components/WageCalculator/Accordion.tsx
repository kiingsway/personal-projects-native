import React from 'react';
import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';

export interface ISection {
  title?: JSX.Element;
  content: JSX.Element;
}

interface Props {
  header?: JSX.Element;
  sections: ISection[];
}

export default function AppAccordion({ header, sections }: Props): JSX.Element {

  const [activeSections, setActiveSections] = React.useState<number[]>([]);


  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <Accordion
          align="bottom"
          sections={sections}
          activeSections={activeSections}
          renderHeader={(__, _, isActive) => <Header isActive={isActive} />}
          renderContent={section => <Content content={section.content} />}
          onChange={setActiveSections}
          sectionContainerStyle={styles.accordContainer}
        />
      </ScrollView>
    </View>
  );
}

const Header = ({ isActive, title, header }: { title?: String, isActive: boolean, header?: JSX.Element }): JSX.Element => {
  if (header) return header;
  const iconName = isActive ? 'chevron-up' : 'chevron-down';
  return (
    <View style={styles.accordHeader}>
      {!title ? <></> : <Text style={styles.accordTitle}>{title}</Text>}
      <Icon name={iconName} size={20} color="" />
    </View>
  );
}


const Content = ({ content }: { content: React.JSX.Element; }): JSX.Element => (
  <View style={styles.accordBody}>
    {content}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  accordContainer: {
    paddingBottom: 4
  },
  accordHeader: {
    padding: 12,
    backgroundColor: 'transparent',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 12
  },
  textSmall: {
    fontSize: 16
  },
  seperator: {
    height: 12
  }
});