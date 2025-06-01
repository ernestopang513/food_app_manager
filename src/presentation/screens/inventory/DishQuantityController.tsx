import { View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DishCardForm from '../../components/foodStands/DishCardForm'
import { FoodStand } from '../../../domain/entities/foodStand'


const DishQuantityController = ({foodStand}: {foodStand: FoodStand}) => {

  const sortedDishes = [...foodStand.foodStandDishes]
    .sort((a,b) => a.dish.name.localeCompare(b.dish.name));
 
    return (
    <KeyboardAwareScrollView
      style={{ flex: 1, paddingHorizontal: 20 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps='handled'
    >

      {
        sortedDishes.map((item) => (
          <DishCardForm foodStandDish={item} key={item.id} />
        ))
      }

      <View style = {{height: 120}} />
    </KeyboardAwareScrollView>
  )
  
}
export default DishQuantityController