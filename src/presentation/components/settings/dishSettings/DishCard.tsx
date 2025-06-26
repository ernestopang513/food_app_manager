import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Dish } from '../../../../domain/entities/foodStand'
import CustomText from '../../ui/CustomText';
import { useTheme } from '@ui-kitten/components';

interface Props {
    dish: Dish;
    onPress?: (dishId: string) => void;
}

const Header = ({nombre}: {nombre: string}) =>( 
    <View style = {style.header}>
        <CustomText category='h4' style = { style.headerText} >{nombre}</CustomText>
    </View>)


const DishCard = ({dish, onPress}: Props) => {
    const theme = useTheme();
  return (
    <Pressable
        onPress={() => {}}
        style = {({pressed}) => [
            {opacity: pressed? 0.5: 1},
            style.card
        ]}
    >
          <Header nombre={dish.name} />
          {/* <View style = {{padding: 10}}> */}
              <View style={style.infoText}>
                  <Text>Nombre:</Text>
                  <Text>{dish.name}</Text>
              </View>
              <View style={[style.infoText, { backgroundColor: theme['color-info-transparent-100'] }]}>
                  <Text>Precio:</Text>
                  <Text>${dish.price}</Text>
              </View>
              <View style={{ marginTop: 10, padding: 10 }}>
                  <Text>Descripción:</Text>
                  <Text numberOfLines={5} style={{ marginLeft: 10, marginTop: 5 }}>{dish.description}</Text>
              </View>
          {/* </View> */}
    </Pressable>
  )
}
export default DishCard


const style = StyleSheet.create({
    card: {
        marginTop: 20,
    // padding: 15,
    borderRadius: 5,
    elevation: 0,
    // borderLeftWidth: 1,
    // borderBottomWidth: 1,
    // borderRightWidth: 1,
    // borderLeftColor: 'rgba(0,0,0,0.1)',
    // borderBottomColor: 'rgba(0,0,0,0.1)',
    // borderRightColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    
    backgroundColor: '#fff',
    },
    headerText: {
        marginLeft: 10
    },
    infoText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10

    },
    header: {
        borderBottomWidth: 1, 
        borderBottomColor: 'rgba(0,0,0,0.07)',
        padding: 10
    }
})