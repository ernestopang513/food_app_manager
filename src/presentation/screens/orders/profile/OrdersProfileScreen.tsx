import { useQuery } from '@tanstack/react-query'
import { ScrollView } from 'react-native'
import { getAllFoodStandsWithDishes } from '../../../../actions/foodStands/get-all-foodStand'
import { Layout } from '@ui-kitten/components'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import FoodStandController from '../../../components/orders/DeliveryController'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { StackNavigationProp } from '@react-navigation/stack'
import { OrderTabsParamList } from '../../../routes/orders/OrderStackNavigation'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'

type NavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<OrderTabsParamList, 'En espera'>,
  StackNavigationProp<StackParamsWaiting>
>;


const OrdersProfileScreen = () => {

    const {data: foodStands, isLoading, error, refetch} = useQuery({
    queryKey: ['foodStands'],
    queryFn: getAllFoodStandsWithDishes,
    staleTime: 0,
    
    // refetchInterval: 1000
  })

  const {foodStandId, setFoodStandId} = useOrderStore();
  console.log(foodStandId)
   const navigation = useNavigation<NavigationProp>();

  return (

    <Layout style = {{flex: 1, paddingHorizontal: 20}}>


    <ScrollView
      style = {{marginTop: 20}}
    >

      {
        !foodStands && isLoading && <SkeletonCard/>
      }

      {
        !isLoading && !error && foodStands &&
        foodStands.map((item, index) => (
          <FoodStandController
            key = {item.id}
            name={item.name}
            isFirst={index === 0}
            isLast={index === foodStands.length - 1}
            isSelected={foodStandId === item.id }
            onChange={() => {
              setFoodStandId(item.id)
              navigation.navigate('En espera', {
                screen: 'OnWaitingScreen', // <- tu ruta raíz del stack
              });
            }}
          />
        ))
        }
      </ScrollView>
    </Layout>
  )
}
export default OrdersProfileScreen