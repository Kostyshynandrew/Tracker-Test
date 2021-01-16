import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { FlatList, View, Text, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Item, { IItem } from "../../components/Item/Item";
import { UsersData } from "../../jotai";

export const Tracker = () => {
  const [userData, setUserData] = useAtom(UsersData);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: [IItem]) => {
        setUserData(data);
      });
    // getAllAsyncStorageData().then(data2 => console.log('all async data here', {data2}))
  }, []);
  console.log({ userData });
  if (!userData) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, marginHorizontal: 15 }}
          data={userData}
          renderItem={({ item }) => <Item item={item} />}
        />
        <Text>Tracker</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
