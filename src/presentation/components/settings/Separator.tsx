import { useTheme } from '@ui-kitten/components';
import { View, Text, StyleProp, ViewStyle } from 'react-native';


interface Props {
    style?: StyleProp<ViewStyle>
    styleWrapper?: StyleProp<ViewStyle>
}


const Separator = ({style, styleWrapper}: Props ) => {

    const theme = useTheme();

  return (
    <View  style = {[{ backgroundColor: theme['color-primary-100'] }, styleWrapper]} >
      <View
        style = {[
            {
                alignSelf: 'center',
                width: '80%',
                height: 1,
                backgroundColor: theme['color-primary-600'],
                opacity: 0.2,
                marginVertical: 8, 
            },
            style
        ]}
      >
      </View>
    </View>
  )
}
export default Separator