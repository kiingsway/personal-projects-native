import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Divider from './Divider';
import { padding } from '../../services/helpers';
import { TChangeCustomHour, TDateType } from '../../app/(tabs)/WageCalculator/interfaces';
import { TWDaysWeek, allDateTypes } from '../../app/(tabs)/WageCalculator/params';
import MoneyValue from './MoneyValue';

interface Props {
  wage: number;
  hour: number;
  shiftDays: number;
  selectedDateType: TDateType;
  changeCustomHour: TChangeCustomHour;
  monthDays: number;
}

export default function WageCard(p: Props): JSX.Element {

  const {
    changeCustomHour,
    hour,
    selectedDateType,
    wage,
    shiftDays,
    monthDays,
  } = p;

  const [maxWidth, setMaxWidth] = useState(Dimensions.get('window').width - 20);

  useEffect(() => {
    const handleResize = () => setMaxWidth(Dimensions.get('window').width - 20);
    Dimensions.addEventListener('change', handleResize);
  }, []);

  const value = ((): Record<TDateType, number> => {

    const wageByHour = ((): number => {
      if (selectedDateType === 'year') return wage / hour / monthDays / 12;
      if (selectedDateType === 'month') return wage / hour / monthDays;
      if (selectedDateType === 'week') return wage / hour / shiftDays;
      if (selectedDateType === 'day') return wage / hour;
      return wage;
    })();

    return {
      hour: wageByHour,
      day: wageByHour * hour,
      week: wageByHour * hour * shiftDays,
      month: wageByHour * hour * monthDays,
      year: wageByHour * hour * monthDays * 12,
    };
  })();

  return (
    <View style={{ ...styles.main, maxWidth }}>
      <View style={styles.header}>
        <Text style={styles.header_title}>{hour} horas/dia</Text>
        <Text style={styles.header_side}>{hour * shiftDays}h/semana</Text>
      </View>
      <Divider />
      <View style={styles.details}>
        {allDateTypes.map(dateType => {
          return (
            <MoneyValue
              key={dateType}
              dateType={dateType}
              selectedDateType={selectedDateType}
              value={value[dateType]}
            />
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    borderRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    width: 300,
    maxWidth: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
    ...padding('10px 20px')
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    ...padding('10px 20px')
  },
  header_title: {
    fontWeight: '500',
  },
  header_side: {
    fontSize: 12
  },
});