import { ILearningItem } from "../data";

export const getItemsLength = (items: ILearningItem[]) => {

  const lengths = {
    signs: 0,
  };

  return items.reduce((lengths, { section }) => {

    if (section === "signs") lengths.signs++;

    return lengths;

  }, lengths);
};