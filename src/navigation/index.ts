import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IItem } from '../components/Item/Item';

export type NListOfTrackedItemsStackParamList = {
  ListOfTrackedItems: undefined;
  TrackerItemInfo: {
    item: IItem;
  };
};

export type NListOfTrackedItemsNavigatorRouteProp<ScreenName extends keyof NListOfTrackedItemsStackParamList> = RouteProp<
  NListOfTrackedItemsStackParamList,
  ScreenName
>;

export type NListOfTrackedItemsNavigatorNavigationProp<ScreenName extends keyof NListOfTrackedItemsStackParamList> = StackNavigationProp<
  NListOfTrackedItemsStackParamList,
  ScreenName
>;

export interface NListOfTrackedItemsNavigatorScreenProps<ScreenName extends keyof NListOfTrackedItemsStackParamList> {
  route: NListOfTrackedItemsNavigatorRouteProp<ScreenName>;
  navigation: NListOfTrackedItemsNavigatorNavigationProp<ScreenName>;
}
