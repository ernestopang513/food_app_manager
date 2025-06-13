import { Layout, Card, Text, useTheme } from '@ui-kitten/components'
import { View, ScrollView } from 'react-native'
import ErrorScreen from '../ui/ErrorScreen'
import SkeletonCard from '../ui/SkeletonCard'
import { OrderByDeliveryPointResponse } from '../../../infrastructure/interfaces/orders.response'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { StackParamsOnRoute } from '../../routes/orders/onRouteStack/OnRouteStackNavigation'

interface Props {
    foodStandName: string;
    isLoading: boolean;
    isError: boolean;
    OnRouteOrders?: OrderByDeliveryPointResponse[];
}

const DeliveryPointList = ({
    foodStandName,
    isLoading,
    isError,
    OnRouteOrders,
}:Props) => {
     const {navigate} = useNavigation<NavigationProp<StackParamsOnRoute>>();
  return (
       <Layout style={{flex:1, paddingHorizontal: 20, paddingTop: 10}}>

        <ScrollView>
            <Text category='h3' style={{textAlign: 'center'}}>{foodStandName ?? 'no'}</Text>
           
            {
                isLoading && <SkeletonCard/>
            }
            {
                !isLoading && OnRouteOrders && isError && 
                <ErrorScreen/>
            }
            {
                !isLoading && !isError && OnRouteOrders?.length && 
                OnRouteOrders.map(({deliveryPoint, orders}) => {
                    return (
                        <Card
                            style ={{marginTop: 20, }}
                            onPress={() => navigate('DeliveryScreen', {deliveryPointId: deliveryPoint.id, dpName: deliveryPoint.name}) }
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
export default DeliveryPointList

const Header = ({nombre}: {nombre: string}) => {
    const theme = useTheme();
  return (
    <View>
        <Text category="h4" style = {{ padding: 10, backgroundColor: theme['color-warning-400']}}>{nombre}</Text>
    </View>
  )
}