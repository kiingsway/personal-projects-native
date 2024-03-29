import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import WageCard from '../../../components/WageCalculator/WageCard';
import { padding } from '../../../services/helpers';
import Filters from '../../../components/WageCalculator/Filters';
import { TWDaysWeek, defaultCustomHour, defaultIdealWage, defaultMonthDays, defaultShiftDays, workHoursList } from './params';
import { TChangeCustomHour, TDateType } from './interfaces';

export default function WageCalculator(): JSX.Element {

  const [wage, setWage] = React.useState(defaultIdealWage);
  const [monthDays, setMonthDays] = React.useState(defaultMonthDays);
  const [customHour, setCustomHour] = React.useState(defaultCustomHour);
  const [dateType, setDateType] = React.useState<TDateType>("month");
  const [shiftDays, setShiftDays] = React.useState<number>(defaultShiftDays);

  const changeDateType = (newDateType: TDateType): void => setDateType(newDateType);
  const changeCustomHour: TChangeCustomHour = newHour => !newHour ? undefined : setCustomHour(parseInt(String(newHour)));

  function setNumberState(
    newValue: string | number | null | undefined = undefined,
    setState: React.Dispatch<React.SetStateAction<number>>
  ): void {
    if (!newValue) return;
    const val = parseFloat(String(newValue));
    if (val) setState(val);
  }

  return (
    <View style={styles.main}>

      <Filters
        wage={wage}
        dateType={dateType}
        monthDays={monthDays}
        shiftDays={shiftDays}
        changeWage={value => setNumberState(value, setWage)}
        changeMonthDays={value => setNumberState(value, setMonthDays)}
        changeShiftDays={value => setNumberState(value, setShiftDays)}
      />

      <ScrollView contentContainerStyle={styles.main_container}>
        {workHoursList.map(hour => (
          <WageCard
            changeCustomHour={changeCustomHour}
            key={hour}
            wage={wage}
            hour={hour || customHour}
            selectedDateType={dateType}
            shiftDays={shiftDays}
            monthDays={monthDays}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    gap: 20,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    ...padding("20px 0"),
  },
  main_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  }
});