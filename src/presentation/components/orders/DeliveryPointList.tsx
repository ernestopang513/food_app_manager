import { Layout, Card, Text, useTheme } from '@ui-kitten/components'
import { View, ScrollView, FlatList } from 'react-native'
import ErrorScreen from '../ui/ErrorScreen'
import SkeletonCard from '../ui/SkeletonCard'
import { OrderByDeliveryPointResponse } from '../../../infrastructure/interfaces/orders.response'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { StackParamsOnRoute } from '../../routes/orders/onRouteStack/OnRouteStackNavigation'
import NoticeScreen from '../ui/NoticeScreen'
import { useCallback, useState } from 'react'

interface Props {
    foodStandName: string;
    isLoading: boolean;
    OnRouteOrders?: OrderByDeliveryPointResponse[];
    refetch: () => void;
}

const DeliveryPointList = ({
    foodStandName,
    isLoading,
    OnRouteOrders,
    refetch
}:Props) => {
     const {navigate} = useNavigation<NavigationProp<StackParamsOnRoute>>();
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
      <FlatList
            data={OnRouteOrders}
            initialNumToRender={5}
            style={{ backgroundColor: '#fff' }}
            keyExtractor={(item) => item.deliveryPoint.id}
            ListHeaderComponentStyle={{ paddingTop: 15, marginBottom: 10 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            ListHeaderComponent={
                <View>
                    <Text category='h2'
                        style={{ textAlign: 'center' }}
                    >{foodStandName}</Text>
                   
                </View>
            }
            renderItem={({ item: {deliveryPoint, orders} }) => (
                 <Card
                    style={{ marginTop: 20, }}
                    onPress={() => navigate('DeliveryScreen', { deliveryPointId: deliveryPoint.id, dpName: deliveryPoint.name })}
                    header={() => <Header nombre={`${deliveryPoint.name}`} />}
                    key={deliveryPoint.id}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text category='h6' >Cantidad de ordenes: </Text>
                        <Text category='h6'>{orders}</Text>
                    </View>
                </Card>
            )}
            ListEmptyComponent={
                isLoading ?
                    <SkeletonCard /> :
                    <NoticeScreen title='Nada en el local' message='Aqui estarán las ordenes por local' />
            }
        />
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