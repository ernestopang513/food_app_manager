import { Button, ButtonGroup, Card, Input, Layout, Text } from "@ui-kitten/components"
import React, { useState } from "react"
import { View } from "react-native"
import { FoodStand } from "../../../domain/entities/foodStand"

interface Props {
  foodStand: FoodStand;
}
const DishCardForm = ({foodStand}:Props) => {

    
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
    <Layout>
    
            <Layout style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
    
              <Card
                style={{ 
                  flex: 1, 
                  paddingVertical: 10,
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
                  paddingVertical: 10,
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
            <Button onPress={() => setSelectedMethod(null)}>Agregar</Button>
          </Layout>
    
  )
}
export default DishCardForm



const Header = ({  foodStand }:Props) => (
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
