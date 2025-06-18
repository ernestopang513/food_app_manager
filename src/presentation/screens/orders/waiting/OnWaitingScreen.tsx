import { useQuery } from '@tanstack/react-query'
import { Card, Layout, Text, useTheme } from '@ui-kitten/components'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { getWaitingOrders } from '../../../../actions/orders/get-waiting-orders'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import ErrorScreen from '../../../components/ui/ErrorScreen'
const OnWaitingScreen = () => {

    const foodStandId = useOrderStore(values => values.foodStandId );
    const foodStandName = useOrderStore(value => value.foodStandName);
    // const foodStandId = null;
    const { navigate } = useNavigation<NavigationProp<StackParamsWaiting>>();
    const theme = useTheme();

    
    
    const { data: waitingOrders, isLoading, error, refetch } = useQuery({
      queryKey: ['OrdersWaitingByDeliveryPoints', foodStandId],
      queryFn: () => {
        if(!foodStandId) throw new Error('foodStandId es requerido')
          return getWaitingOrders( foodStandId )},
        staleTime: 0,
        enabled: !!foodStandId,
        
      })
    
      console.log(waitingOrders)
      
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );


    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch()
        } finally {
            setRefreshing(false)
        }
    }, [refetch]);

    if (foodStandId === undefined) {
        return (
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NoticeScreen
                    title="Sin local"
                    message="Debes elegir un local de la pestaña de entregas"
                />
            </Layout>
        );
    }

  return (
    <Layout style={{flex:1, paddingHorizontal: 20, paddingTop: 10}}>

        <ScrollView

            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            <Text category='h3' style={{textAlign: 'center'}}>{foodStandName}</Text>
           
            {
                isLoading && <SkeletonCard/>
            }
            {
                !isLoading && !waitingOrders && error && 
                <ErrorScreen/>
            }
            {
                !isLoading && !error && waitingOrders && 
                waitingOrders.map(({deliveryPoint, orders}) => {
                    return (
                        <Card
                            style ={{marginTop: 20, }}
                            onPress={() => navigate('DeliveryPointScreen', {deliveryPointId: deliveryPoint.id, dpName: deliveryPoint.name }) }
                            header={() => <Header nombre ={`${deliveryPoint.name}`} />}
                            key={deliveryPoint.id}
                        >
                            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}} >

                            <Text category='h6' >Cantidad de ordenes: </Text>
                            <Text category='h6'>{orders}</Text>
                            </View>
                            {/* {
                                orders.map((item, index) => (
                                    <OrderPreview
                                        orderDishes={item.orderDish}
                                        user = {item.user}
                                        level = {index % 2 === 0 ? '4' : '2'}
                                        key={item.id}
                                    />
                                ))
                            } */}
                        </Card>
                    )
                    
                })
            }

        </ScrollView>

    </Layout>
  )
}
export default OnWaitingScreen

// interface OrderPreviewProps {
//     level: "2" | "4";
//     orderDishes: OrderDishOrderResp[];
//     user: UserOrderResp;
// }


// const OrderPreview = ({level, orderDishes, user}: OrderPreviewProps) => {
//     return (
//         <Layout  level = {level} style = {{padding: 10, borderRadius: 10, marginVertical: 10}} >
//             <Text category='h6'>{`UserName: ${user.userName}`}</Text>

//             {
//                 orderDishes.map((item)=>(
//                     <Layout level={level} style={styles.amount} key={item.id}>
//                         <Text>{`${item.dish.name}:`}</Text>
//                         <Text>{item.quantity}</Text>
//                     </Layout>
//                 ))
//             }

//         </Layout>
//     )

    
// }

const styles = StyleSheet.create({
  amount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 2,
    borderRadius: 8,
  },
});


const Header = ({nombre}: {nombre: string}) => {
    const theme = useTheme();
  return (
    <View>
        <Text category="h4" style = {{ padding: 10, backgroundColor: theme['color-primary-200']}}>{nombre}</Text>
    </View>
  )
}