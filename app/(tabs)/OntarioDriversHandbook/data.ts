import { ImageSourcePropType } from "react-native";
import { makeKey } from "../../../services/helpers";

const learning_items_sections_items = [
  "signs",
  "traffic lights",
  "pedestrian signals",
  "pavement markings",
];

export const learning_items_sections = learning_items_sections_items.map(title => {
  return { key: makeKey(title), title };
});

export interface ILearningItem {
  section: string;
  category: string;
  description: string;
  image: ImageSourcePropType | undefined;
}

const images = {
  stop: require("../../../assets/ontarioSigns/stop.jpg"),
  school: require("../../../assets/ontarioSigns/school.jpg"),
  yield: require("../../../assets/ontarioSigns/yield.jpg"),
  railway: require("../../../assets/ontarioSigns/railway.jpg"),
  bicycleroute: require("../../../assets/ontarioSigns/bicycleroute.jpg"),
  mayparktimes: require("../../../assets/ontarioSigns/mayparktimes.jpg"),
  snowmobiles: require("../../../assets/ontarioSigns/snowmobiles.jpg"),
  donotenter: require("../../../assets/ontarioSigns/donotenter.jpg"),
  notstop: require("../../../assets/ontarioSigns/notstop.jpg"),
  nostanding: require("../../../assets/ontarioSigns/nostanding.jpg"),
  noparking: require("../../../assets/ontarioSigns/noparking.jpg"),
}

export const learning_items: ILearningItem[] = [
  {
    section: "signs",
    category: "Commom",
    description: "A stop sign is eight-sided and has a red background with white letters. It means you must come to a complete stop. Stop at the stop line if it is marked on the pavement. If there is no stop line, stop at the crosswalk. If there is no crosswalk, stop at the edge of the sidewalk. If there is no sidewalk, stop at the edge of the intersection. Wait until the way is clear before entering the intersection.",
    image: images.stop
  },
  {
    section: "signs",
    category: "Commom",
    description: "A school zone sign is five-sided and has a fluorescent yellow/green background with black symbols. It warns that you are coming to a school zone. Slow down, drive with extra caution and watch for children.",
    image: images.school
  },
  {
    section: "signs",
    category: "Commom",
    description: "A yield sign is a triangle with a white background and a red border. It means you must let traffic in the intersection or close to it go first. Stop if necessary and go only when the way is clear.",
    image: images.yield
  },
  {
    section: "signs",
    category: "Commom",
    description: "A railway crossing sign is X-shaped with a white background and red outline. It warns that railway tracks cross the road. Watch for this sign. Slow down and look both ways for trains. Be prepared to stop.",
    image: images.railway
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "This road is an official bicycle route. Watch for cyclists and be prepared to share the road with them.",
    image: images.bicycleroute
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "You may park in the area between the signs during the times posted. (Used in pairs or groups.)",
    image: images.mayparktimes
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Snowmobiles may use this road.",
    image: images.snowmobiles
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not enter this road.",
    image: images.donotenter
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not stop in the area between the signs. This means you may not stop your vehicle in this area, even for a moment. (Used in pairs or groups.)",
    image: images.notstop
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not stand in the area between the signs. This means you may not stop your vehicle in this area except while loading or unloading passengers. (Used in pairs or groups.)",
    image: images.nostanding
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not park in the area between the signs. This means you may not stop your vehicle except to load or unload passengers or merchandise. (Used in pairs or groups.)",
    image: images.noparking
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not turn left at the intersection.",
    image: images.bicycleroute
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not drive through the intersection.",
    image: images.bicycleroute
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not turn to go in the opposite direction. (U-turn)",
    image: images.bicycleroute
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not turn right when facing a red light at the intersection.",
    image: images.bicycleroute
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "Do not turn left during the times shown.",
    image: images.bicycleroute
  },
  {
    section: "signs",
    category: "Regulatory signs",
    description: "This parking space is only for vehicles displaying a valid Accessible Parking Permit.",
    image: images.bicycleroute
  },

];