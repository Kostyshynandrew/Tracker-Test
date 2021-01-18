import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

interface ISpinnerProps extends ActivityIndicatorProps {
  visible?: boolean;
  color?: string;
}

const Spinner: React.FC<ISpinnerProps> = ({ visible = true, color, style, ...props }) => {
  if (visible) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator color={color} style={style} {...props} />
      </View>
    );
  }
  return null;
};


export default Spinner;
