import { useQuery } from '@tanstack/react-query'
import { FlatList, View } from 'react-native'
import { getAllFoodStandsWithDishes } from '../../../../actions/foodStands/get-all-foodStand'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import FoodStandController from '../../../components/orders/DeliveryController'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { StackNavigationProp } from '@react-navigation/stack'
import { OrderTabsParamList } from '../../../routes/orders/OrderStackNavigation'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import { Text } from '@ui-kitten/components'

type NavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<OrderTabsParamList, 'En espera'>,
  StackNavigationProp<StackParamsWaiting>
>;


const OrdersFoodStandScreen = () => {

    const {data: foodStands, isLoading, isError, error, refetch} = useQuery({
    queryKey: ['foodStands'],
    queryFn: getAllFoodStandsWithDishes,
    staleTime: 0,
    
  })

  const foodStandId = useOrderStore(state => state.foodStandId);
  const setFoodStandId = useOrderStore(state => state.setFoodStandId);
  const setFoodStandName = useOrderStore(state => state.setFoodStandName);


  if(isError && !isLoading && !foodStands) {
    return (
      <ErrorScreen 
        onRetry={refetch}
        message={error.message}
      />
    )
  }


    return (
      <FlatList
        data={foodStands}
        style = {{backgroundColor: 'white'}}
        keyExtractor={(item) => item.id}
        contentContainerStyle = {{paddingHorizontal: 20, paddingTop: 30}}
        ListHeaderComponent={
            <Text category='label' >Elige un local para ver las ordenes</Text>
        }
        ListHeaderComponentStyle = {{padding: 10}}
        renderItem={({item, index})=> (
          <FoodStandController
            name={item.name}
            isFirst={index === 0}
            //! foodStands posiblemente undefined
            isLast={index === (foodStands?.length ?? 0)  - 1}
            isSelected={foodStandId === item.id }
            onChange={() => {
              setFoodStandId(item.id);
              setFoodStandName(item.name);
            }}
          />
        )}
        
        
        ListEmptyComponent={
          isLoading ? <SkeletonCard/> :
          <NoticeScreen title='No hay locales con platillos asociados' message='Crear locales y agregar paltillos en Ajustes' />
        }
      />
    )
}
export default OrdersFoodStandScreen