import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TDateType } from '../../app/(tabs)/WageCalculator/interfaces';
import { formatNumber, padding } from '../../services/helpers';

interface Props {
  selectedDateType: TDateType;
  dateType: TDateType;
  value: number
}

export default function MoneyValue({ selectedDateType, dateType, value }: Props): JSX.Element {



  return (
    <View style={styles.value}>
      <View style={styles.money_value}>
        <Text>C$</Text>
        <Text>{formatNumber(value)}</Text>
      </View>
      <Text>/{dateType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  value: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-between',
    width: '100%',
    ...padding("0 10px"),
  },
  money_value: {
    flexDirection: 'row',
    gap: 10,
  },
});