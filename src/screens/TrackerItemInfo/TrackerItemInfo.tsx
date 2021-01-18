import { useAtom } from "jotai";
import React, { useMemo, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IItem } from "../../components/Item/Item";
import { getAsyncStorageData } from "../../helpers/helpers";
import { TrackedUserData } from "../../jotai";
import { NNotesNavigatorScreenProps } from "../../navigation";

export const TrackerItemInfo: React.FC<NNotesNavigatorScreenProps<"TrackerItemInfo">> = ({ route }) => {
  const [personalData, setPersonalData] = useState<{ key: string; value: string }>();

  const { item } = route.params;

  useEffect(() => {
    getAsyncStorageData(item.id.toString()).then((data) => setPersonalData(data));
  }, []);

  const [trackedUserData, setTrackedUserData] = useAtom(TrackedUserData);

  const getElements = (data: IItem, firstCycle?: boolean) => {
    const elements: (string | any)[] = [];
    Object.entries(data).forEach((pair) => {
      console.log({pair})
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
