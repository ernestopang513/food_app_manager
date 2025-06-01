import { Button, ButtonGroup, Card, Divider, Input, Layout, Text, useTheme } from "@ui-kitten/components"
import { Formik } from "formik";
import { useRef, useState } from "react"
import { View } from "react-native"
import CustomToggle from "../ui/CustomToggle";
import { FoodStandDish } from "../../../domain/entities/foodStand";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { getFoodStandDishById } from "../../../actions/foodStands/get-foodStand-dish-by-id";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";

interface Props {
  foodStandDishId: string;
}

interface PropsMainHeader {
  name: string;
}

const DishCardForm = ({foodStandDishId}:Props) => {

      const ftdDishIdRef = useRef(foodStandDishId)
      const queryClient = useQueryClient();

      const {data: foodStandDish, isLoading} = useQuery({
        queryKey: [`foodStandDish-${foodStandDishId}`],
        staleTime: 0,
        queryFn: async() => (await getFoodStandDishById(ftdDishIdRef.current))
      })

    //    const foodStandDish = {
    // dish: { name: 'Taco al pastor' },
    // quantity: 3,
    // is_active: true,
  // };
      // const {name} = foodStandDish.dish;
      // const {quantity: ftdQuantity, is_active} = foodStandDish;
    
      // const [status, setStatus] = useState<true | false>(is_active);
      // const [quantity, setQuantity] = useState(0)

      const theme = useTheme();
      
      // const handleStatusChange = (isChecked: boolean): void => {
      //   setStatus(isChecked);
      // }

      // const handleInputChange = (value: string) => {
      //   const numericValue = parseInt(value) || 0;
      //   setQuantity(numericValue);
      //   // setSelectedMethod('input');
      // }
    
      // const increaseQuantity = () => {
      //   setQuantity(prev => prev + 1);
      //   // setSelectedMethod('buttons');
      // };
    
      // const decreaseQuantity = () => {
      //   setQuantity(prev => (prev > 0 ? prev - 1 : 0));
      //   // setSelectedMethod('buttons');
      // };
    if(!foodStandDish) {
      return (
        <LoadingScreen/>
      )
    }
      

  return (
    <Formik
    
      initialValues={foodStandDish}
      
      onSubmit={() =>{}}

    >

    {
      ({handleChange, handleSubmit, values, errors, setFieldValue}) => (
      <Layout style={{marginTop: 30}}>

        <Card
          style = {{
          }}
          header={(props) => <Header {...props} name={values.dish.name} />}
        >
          <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Cantidad:</Text>
          <Text>{values.quantity}</Text>
          </View>
          <View style={{height: 10}} />
          <Divider/>
          <View style={{height: 10}} />
          <View style ={{flexDirection: 'row', justifyContent: 'space-between'}} >

          <Text>Estado: </Text>
            <Text>

              {
                values.is_active
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
              value={values.quantity.toString()}
              onChangeText={(value) => setFieldValue('quantity', parseInt(value)|| 0)}
            />

            <ButtonGroup >
              <Button onPress={() => setFieldValue('quantity', values.quantity - 1)}>-</Button>
              <Button onPress={() => setFieldValue('quantity', values.quantity + 1)}>+</Button>
            </ButtonGroup>
              </View>
          </Card>
          <Card
            style={{
              flex: 1,
              margin: 2,

            }}
            header={(props) => <HeaderStateControl {...props} quantity={values.quantity} />}
          >

            <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>

              <CustomToggle
                containerStyle = {{marginTop: 20}}
                isOn={values.is_active}
                onToggle={(newValue) => setFieldValue('is_active', newValue)}
                activeColor={theme['color-primary-500']}
              />

              <Text style = {{marginTop: 20}}>
                
              {
                values.is_active
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
      )
    }
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
