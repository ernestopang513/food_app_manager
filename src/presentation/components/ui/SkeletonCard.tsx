import React, { useRef, useEffect, ReactNode } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


interface Props {
    children?: ReactNode;
    style: ViewStyle;
}


const SkeletonCard = ({ style, children }: Props) => {
  const shimmerTranslate = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerTranslate.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],  // ajusta según el tamaño del componente
  });

  return (
    <View style={[styles.card, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View style={styles.contentPlaceholder}>
        <View style={styles.titlePlaceholder} />
        <View style={styles.rowPlaceholder} />
        <View style={styles.rowPlaceholder} />
        <View style={styles.rowPlaceholder} />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    height: 150,
    marginVertical: 10,
  },
  contentPlaceholder: {
    padding: 15,
  },
  titlePlaceholder: {
    width: '50%',
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  rowPlaceholder: {
    width: '80%',
    height: 15,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 8,
  },
});

export default SkeletonCard;
