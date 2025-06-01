import { Button, ButtonGroup, Card, Divider, Input, Layout, Text, useTheme } from "@ui-kitten/components"
import { Formik } from "formik";
import { useState } from "react"
import { View } from "react-native"
import CustomToggle from "../ui/CustomToggle";
import { FoodStandDish } from "../../../domain/entities/foodStand";

interface Props {
  foodStandDish: FoodStandDish;
}

interface PropsMainHeader {
  name: string;
}

const DishCardForm = ({foodStandDish}:Props) => {

      const {name} = foodStandDish.dish;
      const {quantity: ftdQuantity, is_active} = foodStandDish;
    
      const [status, setStatus] = useState<true | false>(is_active);
      const [quantity, setQuantity] = useState(0)

      const theme = useTheme();
      
      const handleStatusChange = (isChecked: boolean): void => {
        setStatus(isChecked);
      }

      const handleInputChange = (value: string) => {
        const numericValue = parseInt(value) || 0;
        setQuantity(numericValue);
        // setSelectedMethod('input');
      }
    
      const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
        // setSelectedMethod('buttons');
      };
    
      const decreaseQuantity = () => {
        setQuantity(prev => (prev > 0 ? prev - 1 : 0));
        // setSelectedMethod('buttons');
      };
    
      // const isInputSelected = selectedMethod === 'input';
      // const isButtonsSelected = selectedMethod === 'buttons';

  return (
    <Formik
    
      initialValues={{ quantity: 0 }}
      
      onSubmit={() =>{}}

    >

      <Layout style={{marginTop: 30}}>

        <Card
          style = {{
          }}
          header={(props) => <Header {...props} name={name} />}
        >
          <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Cantidad:</Text>
          <Text>{ftdQuantity}</Text>
          </View>
          <View style={{height: 10}} />
          <Divider/>
          <View style={{height: 10}} />
          <View style ={{flexDirection: 'row', justifyContent: 'space-between'}} >

          <Text>Estado: </Text>
            <Text>

              {
                is_active
                  ? ' Activo'
                  : ' Inactivo'
              }

            </Text>


              </View>
        </Card>


        <Layout style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 3}}>

          <Card
            style={{
              flex: 1,
              margin: 2, 
            }}
            header={(props) => <HeaderAddControl {...props}  />}
          >
            <View style = {{alignItems: 'center'}}>

            <Input
              style={{ width: 80, marginBottom: 10 }}
              keyboardType='numeric'
              value={quantity.toString()}
              onChangeText={handleInputChange}
            />

            <ButtonGroup >
              <Button onPress={decreaseQuantity}>-</Button>
              <Button onPress={increaseQuantity}>+</Button>
            </ButtonGroup>
              </View>
          </Card>
          <Card
            style={{
              flex: 1,
              margin: 2,

            }}
            header={(props) => <HeaderStateControl {...props} quantity={quantity} />}
          >

            <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>

              <CustomToggle
                containerStyle = {{marginTop: 20}}
                isOn={status}
                onToggle={handleStatusChange}
                activeColor={theme['color-primary-500']}
              />

              <Text style = {{marginTop: 20}}>
                
              {
                status
                  ? 'Activo'
                  : 'Inactivo' 
              }
              
              </Text>

            </Layout>
           
          </Card>


        </Layout>
        <View style={{ height: 15 }} />
        <Button onPress={() => console.log('Actualizar')}>Actualizar</Button>
      </Layout>
    </Formik>
    
  )
}
export default DishCardForm



const Header = ({ name }:PropsMainHeader) => (
    <View style = {{padding: 10, backgroundColor: '#E0E7FF'}} >
      <Text category='h6'>{name}</Text>
    </View>
)
const HeaderAddControl = () => (
    <View style={{paddingVertical: 10, backgroundColor: '#E0E7FF'}}>
      <Text category="s1" style={{textAlign: "center"}}>Ingresa cantidad.</Text>
    </View>
)
const HeaderStateControl = ({quantity} : {quantity: number} ) => (
  <View style={{paddingVertical: 10, backgroundColor: '#E0E7FF'}}>
    <Text style={{textAlign: 'center'}}>Estado</Text>
  </View>
)
