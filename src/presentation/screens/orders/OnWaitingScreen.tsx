import { useQuery } from '@tanstack/react-query'
import { Card, Layout, Text } from '@ui-kitten/components'
import { getWaitingOrders } from '../../../actions/orders/get-waiting-orders'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import SkeletonCard from '../../components/ui/SkeletonCard'
import { OrderDishOrderResp, UserOrderResp } from '../../../infrastructure/interfaces/orders.response'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackParamsWaiting } from '../../routes/orders/waitingStack/WaitingStackNavigator'
import { useCallback, useState } from 'react'
const OnWaitingScreen = () => {

    const { data: waitingOrders, isLoading, error, refetch } = useQuery({
        queryKey: ['OrdersByDeliveryPoint'],
        queryFn: getWaitingOrders,
        staleTime: 0,

    })
    const {navigate} = useNavigation<NavigationProp<StackParamsWaiting>>();
    console.log(waitingOrders)

     useFocusEffect(
        useCallback(() => {
          refetch();
        }, [refetch])
      );

      const [refreshing, setRefreshing] = useState(false);
      
          const handleRefresh = useCallback(async () => {
              setRefreshing(true);
              try {
                  await refetch()
              } finally {
                  setRefreshing(false)
              }
          }, [refetch]);

  return (
    <Layout style={{flex:1, paddingHorizontal: 20, paddingTop: 10}}>

        <ScrollView

            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >

            {
                isLoading && <SkeletonCard/>
            }
            
            {
                !isLoading && !error && waitingOrders && 
                waitingOrders.map(({deliveryPoint, orders}) => {
                    return (
                        <Card
                            onPress={() => navigate('DeliveryPointScreen', {deliveryPointId: deliveryPoint.id}) }
                            header={() => <Header nombre ={`${deliveryPoint.name}: ${orders.length}`} />}
                            key={deliveryPoint.id}
                        >
                            {
                                orders.map((item, index) => (
                                    <OrderPreview
                                        orderDishes={item.orderDish}
                                        user = {item.user}
                                        level = {index % 2 === 0 ? '4' : '2'}
                                        key={item.id}
                                    />
                                ))
                            }
                        </Card>
                    )
                    
                })
            }

        </ScrollView>

    </Layout>
  )
}
export default OnWaitingScreen

interface OrderPreviewProps {
    level: "2" | "4";
    orderDishes: OrderDishOrderResp[];
    user: UserOrderResp;
}


const OrderPreview = ({level, orderDishes, user}: OrderPreviewProps) => {
    return (
        <Layout  level = {level} style = {{padding: 10, borderRadius: 10, marginVertical: 10}} >
            <Text category='h6'>{`UserName: ${user.userName}`}</Text>

            {
                orderDishes.map((item)=>(
                    <Layout level={level} style={styles.amount} key={item.id}>
                        <Text>{`${item.dish.name}:`}</Text>
                        <Text>{item.quantity}</Text>
                    </Layout>
                ))
            }

        </Layout>
    )

    
}

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
  return (
    <View>
        <Text category="h3" style = {{marginLeft: 10, padding: 10}}>{nombre}</Text>
    </View>
  )
}