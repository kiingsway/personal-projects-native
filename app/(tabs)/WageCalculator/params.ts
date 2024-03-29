import { TDateType } from "./interfaces";

export const workHoursList = [6, 8, 0];
export const defaultIdealWage = 2400;
export const defaultMonthDays = 22;
export const defaultCustomHour = 10;

export type TWDaysWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7
export const defaultShiftDays: TWDaysWeek = 5;

export const allDateTypes: TDateType[] = ['hour', 'day', 'week', 'month', 'year'];