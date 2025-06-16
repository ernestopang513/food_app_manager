
import { Button, Icon } from "@ui-kitten/components"
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  onPress: () => void;
  iconHeight?: number;
  label?: string;

}


const FAB = ({style, iconName, onPress,iconHeight = 35,label}: Props) => {
  return (
    <Button
      style = {[{
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
      },style]}
      accessoryLeft={() => <Icon  style={{height: iconHeight}} name = {iconName} white  />}
      onPress={onPress}
    >
      {label}
    </Button>
  )
}

export default FAB