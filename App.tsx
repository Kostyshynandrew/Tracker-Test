import "react-native-gesture-handler";
import { Provider } from "jotai";
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tracker } from "./src/screens/Tracker/Tracker";
import { ListOfTrackedItems } from "./src/screens/ListOfTrackedItems/ListOfTrackedItems";
import { TrackerItemInfo } from "./src/screens/TrackerItemInfo/TrackerItemInfo";

const AppTab = createBottomTabNavigator();

const NotesStack = createStackNavigator();

const NotesStackNavigator = () => {
  return (
    <NotesStack.Navigator initialRouteName="ListOfTrackedItems">
      <NotesStack.Screen name="ListOfTrackedItems" component={ListOfTrackedItems} />
      <NotesStack.Screen name="TrackerItemInfo" component={TrackerItemInfo} />
    </NotesStack.Navigator>
  );
};

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <AppTab.Navigator>
          <AppTab.Screen name={"Tracker"} component={Tracker} />
          <AppTab.Screen name={"ListOfTrackedItems"} component={NotesStackNavigator} />
        </AppTab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
