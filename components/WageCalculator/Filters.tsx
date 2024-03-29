import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from './Input';
import { TDateType } from '../../app/(tabs)/WageCalculator/interfaces';
import { TWDaysWeek } from '../../app/(tabs)/WageCalculator/params';


interface Props {
  wage: number;
  dateType: TDateType;
  shiftDays: number;
  monthDays: number;
  changeWage: (new_value?: string | number | null) => void;
  changeMonthDays: (new_value?: string | number | null) => void;
  changeShiftDays: (new_value: TWDaysWeek) => void;
}

export default function Filters(p: Props): JSX.Element {


  const { wage, dateType, monthDays, shiftDays, changeMonthDays, changeShiftDays, changeWage } = p;

  return (
    <View style={styles.main}>
      <Input
        value={wage}
        addonBefore="C$"
        addonAfter={<Text>/{dateType}</Text>}
        onChange={changeWage}
        keyboardType='numeric'
      />
      <Input
        value={monthDays}
        addonAfter={<Text>dias úteis/mês</Text>}
        onChange={changeMonthDays}
        keyboardType='numeric'
      />
      <Input
        value={shiftDays}
        addonBefore="Escala:"
        addonAfter={<Text>x {7 - shiftDays}</Text>}
        onChange={v => changeShiftDays(numberShift(v))}
        keyboardType='numeric'
      />
    </View>
  );
}

const numberShift = (n: number | string, min = 1, max = 7): TWDaysWeek => {

  if (!n && n !== 0) return min as TWDaysWeek;

  const number = parseInt(`${n}`);

  if (number < min) return min as TWDaysWeek;
  else if (number > max) return max as TWDaysWeek;
  else return number as TWDaysWeek;
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
  },
});