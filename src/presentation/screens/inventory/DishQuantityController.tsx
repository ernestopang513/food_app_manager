import { View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DishCardForm from '../../components/foodStands/DishCardForm'
import { FoodStand } from '../../../domain/entities/foodStand'


const DishQuantityController = ({foodStand}: {foodStand: FoodStand}) => {
 
    return (
    <KeyboardAwareScrollView
      style={{ flex: 1, paddingHorizontal: 20 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps='handled'

    >

      <Text style={{ textAlign: 'center' }}>Ingresa la cantidad para agregar </Text>

      
      <DishCardForm foodStand={foodStand} />

    </KeyboardAwareScrollView>
  )
  
}
export default DishQuantityController