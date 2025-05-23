import Icon from "@react-native-vector-icons/ionicons";
import { StyleSheet } from "react-native";


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


const IonIcon = ({ name, style, color, white = false }: any) => {
    const { height = 32, ...iconStyle } = StyleSheet.flatten(style || {});

    // const theme = useTheme();

    if ( white ) {
        color = '#F2F6FF';
      } else if ( !color ) {
        color = '#3366FF';
      } 

    return (
      <Icon name={name} size={height} color={color} style={iconStyle} />
    );
  }



