import Icon from "@react-native-vector-icons/ionicons";
import { useTheme } from "@ui-kitten/components";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";


interface IonIconProps {
  name: any;
  style?: StyleProp<ViewStyle>;
  color?: string;
  white?: boolean;
}

const createIconsMap = () => {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name);
        }
    })
}

export const IonIconsPack = {
    name: 'ionicons', 
    icons: createIconsMap(),
}
const IconProvider = (name: any ) => ({
    toReactElement: (props: any) => IonIcon({name, ...props})
})


const IonIcon = ({ name, style, color, white = false }: IonIconProps) => {
   const flattened = StyleSheet.flatten(style || {});
    const heightValue = flattened?.height;

    const size = typeof heightValue === 'number' ? heightValue : 32;

    if ( white ) {
        color = '#F2F6FF';
      } else if ( !color ) {
        color = '#3366FF';
      } 

    return (
      <Icon name={name} size={size} color={color} style={flattened} />
    );
  }



