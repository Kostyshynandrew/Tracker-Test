import { useAtom } from "jotai";
import React, { useMemo, useCallback, memo, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAsyncStorageData } from "../../helpers/helpers";
import { TrackedUserData, UsersData } from "../../jotai";

export const TrackerItemInfo = ({ route }) => {
  const [personalData, setPersonalData] = useState();

  const { item } = route.params;

  useEffect(() => {
    getAsyncStorageData(item.id.toString()).then((data) => setPersonalData(data));
  }, []);

  console.log({ item, personalData });
  const [trackedUserData, setTrackedUserData] = useAtom(TrackedUserData);
  const [userData] = useAtom(UsersData);

  const getElements = (data: any, firstCycle) => {
    const elements = [] as any;
    Object.entries(data).forEach((pair) => {
      if (typeof pair[1] === "object") {
        elements.push(...getElements(pair[1]));
      } else {
        elements.push(pair);
      }
    });
    if (firstCycle && personalData) {
      Object.entries(personalData).forEach((pair) => {
        elements.push(pair);
      });
    }
    return elements;
  };

  const renderData = useMemo(() => getElements(item, true), [item, personalData]);

  if (!trackedUserData) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>renderInfo</Text>
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Text>
            {item[0]} : {item[1]}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};
