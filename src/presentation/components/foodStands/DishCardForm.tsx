import { Button, ButtonGroup, Card, Divider, Input, Layout, Spinner, Text, useTheme } from "@ui-kitten/components"
import { Formik } from "formik";
import { useRef } from "react"
import { Keyboard, View } from "react-native"
import CustomToggle from "../ui/CustomToggle";
import { FoodStandDish } from "../../../domain/entities/foodStand";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFoodStandDishById } from "../../../actions/foodStands/get-foodStand-dish-by-id";
import SkeletonCard from "../ui/SkeletonCard";
import { patchFoodStandDish } from "../../../actions/foodStands/patch-foodStand-dish";

interface Props {
  foodStandDishId: string;
}

interface PropsMainHeader {
  name: string;
}

// interface 

const DishCardForm = ({foodStandDishId}:Props) => {

      const ftdDishIdRef = useRef(foodStandDishId)
      const queryClient = useQueryClient();

      const {data: foodStandDish, isLoading} = useQuery({
        queryKey: [`foodStandDish-${ftdDishIdRef.current}`],
        staleTime: 0,
        queryFn: async() => (await getFoodStandDishById(ftdDishIdRef.current))
      })

      const mutation = useMutation({
        mutationFn: (data: Partial<FoodStandDish> ) => patchFoodStandDish({...data, id: ftdDishIdRef.current}),
        // mutationFn: (data ) => console.log(data),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: [`foodStandDish-${ftdDishIdRef.current}`]})
          console.log('success')
        }
      })




      const theme = useTheme();
      
    
    if(!foodStandDish || isLoading) {
    // if(foodStandDish ) {
      return (
        <SkeletonCard style ={{ height: 200}}>
          <Text style={{textAlign: 'center', marginTop: 20}}  category="h6">Cargando datos...</Text>
          </SkeletonCard>
      )
    }
      
    const initialFomrValues = {
      quantity: 0,
      is_active: foodStandDish.is_active ?? false 
    }

  return (
    <Formik
    
      initialValues={initialFomrValues}
      
      onSubmit={(values, {setFieldValue}) => {
        mutation.mutate(values, {
          onSuccess: () => {
            setFieldValue('quantity', 0);
            Keyboard.dismiss
          }
        })
      }}

      

    >

    {
      ({handleChange, handleSubmit, values, errors, setFieldValue}) => (
      <Layout style={{marginTop: 30}}>

        <Card
          style = {{
          }}
          header={(props) => <Header {...props} name={foodStandDish.dish.name} />}
        >
          <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Cantidad:</Text>
          <Text>{foodStandDish.quantity}</Text>
          </View>
          <View style={{height: 10}} />
          <Divider/>
          <View style={{height: 10}} />
          <View style ={{flexDirection: 'row', justifyContent: 'space-between'}} >

          <Text>Estado: </Text>
            <Text>

              {
                foodStandDish.is_active
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
            header={(props) => <HeaderStateControl {...props} />}
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
        <Button 
          onPress={() =>{
            handleSubmit()
            Keyboard.dismiss()
          }}
          disabled = {mutation.isPending}
          
        >
          Actualizar
        </Button>
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
const HeaderStateControl = () => (
  <View style={{paddingVertical: 10, backgroundColor: '#E0E7FF'}}>
    <Text style={{textAlign: 'center'}}>Estado</Text>
  </View>
)
