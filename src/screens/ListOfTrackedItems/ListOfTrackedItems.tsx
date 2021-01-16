import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useCallback, memo, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Item from "../../components/Item/Item";
import { getAllAsyncStorageData } from "../../helpers/helpers";
import { TrackedUserData, UpdateTrackedUserData, UsersData } from "../../jotai";

export const ListOfTrackedItems = () => {
  const [userData] = useAtom(UsersData);
  const [update] = useAtom(UpdateTrackedUserData);
  const [trackedUserData, setTrackedUserData] = useAtom(TrackedUserData);
  const { navigate } = useNavigation();
  useEffect(() => {
    console.log("mounted");
    getAllAsyncStorageData().then((data) => {
      console.log({ data });
      setTrackedUserData(data);
    });
  }, [update]);

  const trackedData = useMemo(() => {
    const trackingIds = Object.keys(trackedUserData);
    return userData.filter(({ id }) => trackingIds.includes(id.toString()));
  }, [trackedUserData]);

  console.log({ trackedUserData, userData, keys: Object.keys(trackedUserData), trackedData });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={trackedData}
        renderItem={({ item }) => <Item item={item} navigateToScreen={() => navigate("TrackerItemInfo", {item})} />}
      />
      <Text>ListOfTrackedItems22</Text>
    </SafeAreaView>
  );
};
