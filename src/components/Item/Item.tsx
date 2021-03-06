import React, { useCallback, memo, useState } from "react";
import { View, Text, TextInput } from "react-native";
import isEqual from "react-fast-compare";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setAsyncStorageData } from "../../helpers/helpers";
import { UpdateTrackedUserData } from "../../jotai";
import { useAtom } from "jotai";

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IItem {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

interface ITimeTrackerItem {
  item: IItem;
  navigateToScreen?: () => void;
}

const TimeTrackerItem: React.FC<ITimeTrackerItem> = ({ item, navigateToScreen }) => {
  const [update, setUpdate] = useAtom(UpdateTrackedUserData);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [hours, setHours] = useState<string>("");

  const saveInfoToLocalStorage = useCallback(
    async (value) => {
      await setAsyncStorageData(item.id.toString(), value);
      // Update list of tracking items
      setUpdate(!update);
    },
    [item.id]
  );

  return (
    <TouchableOpacity onPress={() => (navigateToScreen ? navigateToScreen() : setIsOpened(!isOpened))}>
      <View style={{ height: 40, width: "100%", marginVertical: 10 }}>
        <Text>{item.name}</Text>
        <Text>{item.website}</Text>
      </View>
      {isOpened && (
        <View>
          <TextInput
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            placeholder="Add Text"
            placeholderTextColor="white" 
            style={{ backgroundColor: "grey", color: "white", marginVertical: 5 }}
          />
          <TextInput
            value={hours}
            keyboardType={"numeric"}
            onChangeText={(hours) => setHours(hours)}
            placeholder="Add Hours"
            placeholderTextColor="white" 
            style={{ backgroundColor: "grey", color: "white" }}
          />
          <TouchableOpacity
            onPress={() => {
              saveInfoToLocalStorage({ text: inputValue, hours });
              setInputValue("");
              setHours("");
              setIsOpened(false);
            }}
          >
            <Text>Save Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(TimeTrackerItem, isEqual);
