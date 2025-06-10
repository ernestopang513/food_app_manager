// components/CustomRadio.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  label?: string;
  selected: boolean;
  onPress: () => void;
}

const CustomRadio: React.FC<Props> = ({ label, selected, onPress }) => {

    // if (selected === true) return;

  return (
    <Pressable style={styles.container} onPress={onPress} disabled = {selected}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      {
          label && <Text style={styles.label}>{label}</Text>
      }
    </Pressable>
  );
};

export default CustomRadio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  label: {
    fontSize: 16,
  },
});
