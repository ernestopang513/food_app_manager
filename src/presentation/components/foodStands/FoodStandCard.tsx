import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Card, Layout, Text } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { RootStackParamsInventory } from '../../routes/inventory/StackNavigationInventory';
import { FoodStand, Dish } from '../../../domain/entities/foodStand';
import { DishInfoItem } from "./DishInfoItem";


export interface Sucursal {
  nombre: string;
  platillo1: number;
  platillo2: number;
  platillo3: number;
}

// interface Props {
//   sucursal: Sucursal
// }

type HeaderProp = {
  sucursal: string
}

interface Props {
  foodStand: FoodStand
}


export const Header = ({nombre}: {nombre: string}) => {
  return (
    <View>
        <Text category="h6" style = {{marginLeft: 10, padding: 10}}>{nombre}</Text>
    </View>
  )
}

export const FoodStandCard = ({foodStand}: Props) => {

  const {navigate} = useNavigation<NavigationProp<RootStackParamsInventory>>();

  return (
    <Card
        onPress={() => navigate('FoodStandScreen', {FoodStand: foodStand})}
        style = {{marginTop: 20}}
        header={() => <Header nombre={foodStand.name} />}
    >
       {foodStand.foodStandDishes.map((fsDish, index) => (
        <DishInfoItem
          key={fsDish.id}
          dishName={fsDish.dish.name}
          quantity={fsDish.quantity}
          level={index % 2 === 0 ? '2' : '1'}
        />
       ))}
        
    </Card>
  )
}


const styles = StyleSheet.create({
  amount: {
    padding: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})