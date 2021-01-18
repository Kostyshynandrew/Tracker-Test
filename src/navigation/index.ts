import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IItem } from '../components/Item/Item';

export type NListOfTrackedItemsStackParamList = {
  ListOfTrackedItems: undefined;
  TrackerItemInfo: {
    item: IItem;
  };
};

export type NNotesNavigatorRouteProp<ScreenName extends keyof NListOfTrackedItemsStackParamList> = RouteProp<
  NListOfTrackedItemsStackParamList,
  ScreenName
>;

export type NNotesNavigatorNavigationProp<ScreenName extends keyof NListOfTrackedItemsStackParamList> = StackNavigationProp<
  NListOfTrackedItemsStackParamList,
  ScreenName
>;

export interface NNotesNavigatorScreenProps<ScreenName extends keyof NListOfTrackedItemsStackParamList> {
  route: NNotesNavigatorRouteProp<ScreenName>;
  navigation: NNotesNavigatorNavigationProp<ScreenName>;
}
