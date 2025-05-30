import { Button, ButtonGroup, Card, Divider, Icon, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { useQuery } from '@tanstack/react-query'
import { getFoodStandById } from '../../../actions/foodStands/get-foodStand-by-id'
import { LoadingScreen } from '../loading/LoadingScreen'
import ErrorScreen from '../../components/ui/ErrorScreen'
import { View, ViewProps } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FoodStand } from '../../../domain/entities/foodStand'
import { useState } from 'react';


interface Props extends StackScreenProps<StackParamsInventory, 'FoodStandScreen'>{}


const FoodStandScreen = ({route}: Props) => {

  const { foodStandId } = route.params;

  const {data: foodStand, isLoading, error} = useQuery({
    queryKey: ['foodStand', foodStandId],
    queryFn: () => getFoodStandById(foodStandId)
  })
  console.log(foodStand)
  const title = isLoading
    ? 'Cargando...'
    : error
      ? 'Error'
      : foodStand?.name ?? 'No disponible'
  return (
    <TopNavigationLayout
      title={title}
    >
      {isLoading && <LoadingScreen/>}

      {error && <ErrorScreen message={error.message}  />}

      {foodStand && (
        
        <DishQuantityController foodStand={foodStand} />

      )}

    </TopNavigationLayout>
  )
}
export default FoodStandScreen

interface Props2 {

  foodStand: FoodStand
}

const DishQuantityController = ({ foodStand }: Props2) => {

  const [selectedMethod, setSelectedMethod] = useState<'input' | 'buttons' | null>(null)
  const [quantity, setQuantity] = useState(0)



  const handleInputChange = (value: string) => {
    const numericValue = parseInt(value) || 0;
    setQuantity(numericValue);
    setSelectedMethod('input');
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
    setSelectedMethod('buttons');
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0));
    setSelectedMethod('buttons');
  };

  const isInputSelected = selectedMethod === 'input';
  const isButtonsSelected = selectedMethod === 'buttons';

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, paddingHorizontal: 20 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps='handled'

    >

      <Text style={{ textAlign: 'center' }}>Ingresa la cantidad para agregar </Text>

      <Layout>

        <Layout style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>

          <Card
            style={{ 
              flex: 1, 
              margin: 2, 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: isInputSelected ? '#E0E7FF' : undefined,
              
            }}
            header={(props) => <Header {...props} foodStand={foodStand} />}
          >
            <Input
              style={{ width: 80 }}
              keyboardType='numeric'
              value={quantity.toString()}
              onChangeText={handleInputChange}
              onFocus={() => setSelectedMethod('input')}
            />
          </Card>
          <Card
            style={{ 
              flex: 1, 
              margin: 2, 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: isButtonsSelected ? '#E0E7FF' : undefined, 
            
            }}
            header={(props) => <Footer {...props} quantity = {quantity}/>}
          >

            <ButtonGroup >
              <Button onPress={increaseQuantity} >+</Button>
              <Button onPress={decreaseQuantity}>-</Button>
            </ButtonGroup>
          </Card>


        </Layout>
        <View style={{ height: 15 }} />
        <Button>Agregar</Button>
      </Layout>



    </KeyboardAwareScrollView>
  )
}

interface Props3 {
  foodStand: FoodStand;
}

const Header = ({  foodStand }:Props3) => (
    <View >
      <Text category='h6'>{foodStand.foodStandDishes[0].dish.name}</Text>
      <Text>Ingresa cantidad.</Text>
    </View>
)
const Footer = ({quantity} : {quantity: number} ) => (
  <>
    <Text>Cantidad</Text>
    <Text style={{ textAlign: 'center' }} >{quantity}</Text>
  </>


)


