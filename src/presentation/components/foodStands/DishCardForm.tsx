import { Button, ButtonGroup, Card, Input, Layout, Text, Toggle, useTheme } from "@ui-kitten/components"
import { Formik } from "formik";
import { useState } from "react"
import { Switch, View } from "react-native"
import CustomToggle from "../ui/CustomToggle";

interface Props {
  name: string;
}
const DishCardForm = ({name}:Props) => {
    
      // const [selectedMethod, setSelectedMethod] = useState<'input' | 'buttons' | null>(null)
      const [status, setStatus] = useState<true | false>(false);
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
          <Text>Cantidad: 20</Text>
          <View style={{height: 20}} />
          <Text>Estado: Activo</Text>
        </Card>


        <Layout style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 3}}>

          <Card
            style={{
              flex: 1,
              margin: 2,
              // justifyContent: 'center',
              // alignItems: 'center',
              // backgroundColor: isInputSelected ? '#E0E7FF' : undefined,

            }}
            header={(props) => <HeaderAddControl {...props}  />}
          >
            <View style = {{alignItems: 'center'}}>

            <Input
              style={{ width: 80, marginBottom: 10 }}
              keyboardType='numeric'
              value={quantity.toString()}
              onChangeText={handleInputChange}
              // onFocus={() => setSelectedMethod('input')}
              />
            <ButtonGroup >
              <Button onPress={decreaseQuantity}>-</Button>
              <Button onPress={increaseQuantity} >+</Button>
            </ButtonGroup>
              </View>
          </Card>
          <Card
            style={{
              flex: 1,
              margin: 2,
              // minHeight: 200
              // justifyContent: 'center',
              // alignItems: 'center',
              // backgroundColor: isButtonsSelected ? '#E0E7FF' : undefined,

            }}
            header={(props) => <HeaderStateControl {...props} quantity={quantity} />}
          >

            <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>

              {/* <View style={{ height: 30 }} /> */}

              <CustomToggle
                containerStyle = {{marginTop: 20}}
                isOn={status}
                onToggle={handleStatusChange}
                activeColor={theme['color-primary-500']}
              />

              <Text style = {{marginTop: 20}}>
                
              {/* {`${status}`} */}

              {
                status
                  ? 'Activo'
                  : 'Inactivo' 
              }
              
              </Text>
              {/* <View style={{ height: 20 }} /> */}



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



const Header = ({  name }:Props) => (
    <View style = {{padding: 10, backgroundColor: '#E0E7FF'}} >
      <Text category='h6'>{name}</Text>
      {/* <Text>.</Text> */}
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
