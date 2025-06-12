import { useQuery } from '@tanstack/react-query'
import { Card, Layout, Text, useTheme } from '@ui-kitten/components'
import { View, ScrollView } from 'react-native'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import { getOnRouteOrders } from '../../../../actions/orders/get-onRoute-orders'
import { useAuthStore } from '../../../store/auth/useAuthStore'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import { StackParamsOnRoute } from '../../../routes/orders/onRouteStack/OnRouteStackNavigation'
import { useOrderByDevliveryPoint } from '../../../hooks/orders/useOrderByDeliveryPoint'
const OnRouteScreen = () => {

  const foodStandId = useOrderStore(state => state.foodStandId);
  const foodStandName = useOrderStore(state => state.foodStandName)
  const id = useAuthStore(state => state.user?.id);

  const {data: OnRouteOrders, isLoading, isError} = useOrderByDevliveryPoint({
    queryKey: 'onRouteOrdesByDeliveryPoint',
    foodStandId,
    id,
    queryFunction: () => getOnRouteOrders(foodStandId!, id!)
  })

    const {navigate} = useNavigation<NavigationProp<StackParamsOnRoute>>();

  return (
    <Layout style={{flex:1, paddingHorizontal: 20, paddingTop: 10}}>

        <ScrollView>
            <Text category='h3' style={{textAlign: 'center'}}>{foodStandName}</Text>
           
            {
                isLoading && <SkeletonCard/>
            }
            {
                !isLoading && OnRouteOrders && isError && 
                <ErrorScreen/>
            }
            {
                !isLoading && !isError && OnRouteOrders && 
                OnRouteOrders.map(({deliveryPoint, orders}) => {
                    return (
                        <Card
                            style ={{marginTop: 20, }}
                            onPress={() => navigate('DeliveryScreen') }
                            // onPress={() => {} }
                            header={() => <Header nombre ={`${deliveryPoint.name}`} />}
                            key={deliveryPoint.id}
                        >
                            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}} >

                            <Text category='h6' >Cantidad de ordenes: </Text>
                            <Text category='h6'>{orders}</Text>
                            </View>
                           
                        </Card>
                    )
                    
                })
            }

        </ScrollView>

    </Layout>
  )
}
export default OnRouteScreen


const Header = ({nombre}: {nombre: string}) => {
    const theme = useTheme();
  return (
    <View>
        <Text category="h4" style = {{ padding: 10, backgroundColor: theme['color-warning-400']}}>{nombre}</Text>
    </View>
  )
}