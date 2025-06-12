
import { Button, Icon } from "@ui-kitten/components"
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  onPress: () => void;

}


const FAB = ({style, iconName, onPress}: Props) => {
  return (
    <Button
      style = {[style, {
        // backgroundColor: 'transparent',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
        borderRadius:  13,
      }]}
      accessoryLeft={() => <Icon  style={{height: 35}} name = {iconName} white  />}
      onPress={onPress}
    />
  )
}

export default FAB