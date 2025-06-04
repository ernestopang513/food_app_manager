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
  disabled?: boolean;
}

const CustomToggle2 = ({
  isOn,
  onToggle,
  containerStyle,
  activeColor = '#4cd137',
  inactiveColor = '#ccc',
  duration = 300,
  disabled = false,
}: CustomToggleProps) => {

  const [toggled, setToggled] = useState<boolean>(isOn);
  const animation = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggled ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [toggled, duration]);

  const toggleSwitch = () => {
    if (disabled) return; // Bloquea la acción si está deshabilitado
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
    outputRange: [2, 20],
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch} disabled={disabled}>
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          { backgroundColor: interpolateBackground },
          disabled && styles.disabled, // Aplica estilo si está deshabilitado
        ]}
      >
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
  disabled: {
    opacity: 0.5,
  },
});

export default CustomToggle2;
