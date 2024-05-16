import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootBottomNavBarStackParamList = {
  HomeScreen: undefined;
  StatsScreen: undefined;
};

export type RootStackParamList = {
  HomeOverview: undefined;
  ModifyTask: {isEditing: boolean, taskValue:null|Task};
  CalendarDetailScreen: {date:number, month:number, year:number}
};

export type RootDrawerStackParamList = {};

export type ModifyTaskProps = NativeStackScreenProps<
  RootStackParamList,
  "ModifyTask"
>;
export type CalendarDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CalendarDetailScreen"
>;


export type Task = {
  id: string;
  date: Date;
  taskTitle: string;
  taskDescription: string;
  time: Date;
  important: boolean;
  urgent: boolean;
  isDone: boolean;
  theme: string;
};
