import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { FlatList, Text, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Item, { IItem } from "../../components/Item/Item";
import { UsersData } from "../../jotai";
import Spinner from "../../components/Spinner/Spinner";

export const Tracker = () => {
  const [userData, setUserData] = useAtom(UsersData);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: [IItem]) => {
        setUserData(data);
      })
      .catch((e) => console.log(e, 'error while fetching users'))
  }, []);

  if (userData.length < 1) {
    return <Spinner />;
  }

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
