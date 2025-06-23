import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Card, Text } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory';
import { FoodStand, Dish } from '../../../domain/entities/foodStand';
import { DishInfoItem } from "./DishInfoItem";



interface Props {
  foodStand: FoodStand;
  onPress?: (foodStandId: string) => void;
  // handleDisable?: () => void;
}


const Header = ({nombre}: {nombre: string}) => {
  return (
    <View>
        <Text category="h6" style = {{marginLeft: 10, padding: 10}}>{nombre}</Text>
    </View>
  )
}

export const FoodStandCard = ({foodStand, onPress}: Props) => {

  return (
    <Card
        onPress={() => onPress?.(foodStand.id)}
        style = {{marginTop: 20}}
        header={() => <Header nombre={foodStand.name} />}
        // disabled= {foodStand.isOpen? false: true}
        disabled ={ false}
        status={foodStand.isOpen? "success" : "danger"}
    >
       {
       foodStand?.foodStandDishes?.length !== 0 &&  foodStand?.foodStandDishes?.map((fsDish, index) => (
        <DishInfoItem
          key={fsDish.id}
          dishName={fsDish.dish.name}
          quantity={fsDish.quantity}
          level={index % 2 === 0 ? '2' : '1'}
        />
       ))
       }

       {
        foodStand?.foodStandDishes?.length === 0 &&
        <View>
          <Text>Sin platillos registrados agregalos en el menu de platillos</Text>
        </View>
       }
        
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