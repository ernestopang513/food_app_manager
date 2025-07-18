import { useQuery } from '@tanstack/react-query'
import { Card, Layout, Text, useTheme } from '@ui-kitten/components'
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { getWaitingOrders } from '../../../../actions/orders/get-waiting-orders'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import ErrorScreen from '../../../components/ui/ErrorScreen'
const OnWaitingScreen = () => {

    const foodStandId = useOrderStore(values => values.foodStandId);
    const foodStandName = useOrderStore(value => value.foodStandName);
    const { navigate } = useNavigation<NavigationProp<StackParamsWaiting>>();
    const theme = useTheme();



    const waitingOrders = useQuery({
        queryKey: ['OrdersWaitingByDeliveryPoints', foodStandId],
        queryFn: () => {
            if (!foodStandId) throw new Error('foodStandId es requerido')
            return getWaitingOrders(foodStandId)
        },
        staleTime: 0,
        enabled: !!foodStandId,

    })

    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            waitingOrders.refetch();
        }, [waitingOrders.refetch])
    );


    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await waitingOrders.refetch()
        } finally {
            setRefreshing(false)
        }
    }, [waitingOrders.refetch]);

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

    if (waitingOrders.isError) {
        return (
            <ErrorScreen
                message={waitingOrders.error.message ?? 'Error inesperado'}
                onRetry={waitingOrders.refetch} />
        )
    }

    return (
        <FlatList
            data={waitingOrders.data}
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
            renderItem={({ item }) => (
                <Card
                    style={{ marginTop: 20, }}
                    onPress={() => navigate('DeliveryPointScreen', { deliveryPointId: item.deliveryPoint.id, dpName: item.deliveryPoint.name })}
                    header={() => <Header nombre={`${item.deliveryPoint.name}`} />}
                    key={item.deliveryPoint.id}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                        <Text category='h6' >Cantidad de ordenes: </Text>
                        <Text category='h6'>{item.orders}</Text>
                    </View>
                </Card>
            )}
            ListEmptyComponent={
                waitingOrders.isLoading ?
                    <SkeletonCard /> :
                    <NoticeScreen title='Nada en el local' message='Aqui estarán las ordenes por local' />
            }
        />
    )
}
export default OnWaitingScreen


const Header = ({ nombre }: { nombre: string }) => {
    const theme = useTheme();
    return (
        <View>
            <Text category="h4" style={{ padding: 10, backgroundColor: theme['color-primary-200'] }}>{nombre}</Text>
        </View>
    )
}