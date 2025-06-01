import { useTheme } from '@ui-kitten/components';
import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface CustomToggleProps {
  isOn: boolean;
  onToggle?: (newValue: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  activeColor?: string;
  inactiveColor?: string;
  duration?: number;
}

const CustomToggle = ({
  isOn,
  onToggle,
  containerStyle,
  activeColor = '#4cd137',
  inactiveColor = '#ccc',
  duration = 300,
}: CustomToggleProps) => {

    // const theme = useTheme();
    
  const [toggled, setToggled] = useState<boolean>(isOn);
  const animation = useRef(new Animated.Value(isOn ? 1 : 0)).current;

//   activeColor = theme['color-primary-500']

  useEffect(() => {
    // Sync animation with isOn prop when it changes from outside
    Animated.timing(animation, {
      toValue: toggled ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [toggled, duration]);

  const toggleSwitch = () => {
    const newValue = !toggled;
    setToggled(newValue);
    onToggle?.(newValue);
  };

  const interpolateBackground = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 20], // ajusta el tamaño según necesites
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <Animated.View style={[styles.container, containerStyle, { backgroundColor: interpolateBackground }]}>
        <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 1,
    justifyContent: 'center',
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
  },
});

export default CustomToggle;
