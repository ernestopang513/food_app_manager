import { useQuery } from '@tanstack/react-query'
import { View, Text, Pressable, FlatList } from 'react-native'
import { getAllDeliveryPoints } from '../../../../actions/deliveryPoints/get-all-delivery-points';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamsDPSettings } from '../../../routes/settings/deliveryPointNav/DeliveryPStackNav';
import TopNavigationLayout from '../../../layouts/TopNavigationLayout';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import SkeletonCard from '../../../components/ui/SkeletonCard';
import ErrorScreen from '../../../components/ui/ErrorScreen';
import NoticeScreen from '../../../components/ui/NoticeScreen';
import DeliveryPointCard from '../../../components/settings/deliveryPointsSettings/DeliveryPointCard';

interface Props extends StackScreenProps<StackParamsDPSettings, 'AllDeliveryP'> {}

const AllDeliveryPoint = ({navigation}: Props) => {
    const {data: deliveryPoints, isLoading, isError, error} = useQuery({
        queryKey: ['AllDeliveryPointsSettings'],
        queryFn: getAllDeliveryPoints,
    });

  return (
    <TopNavigationLayout
        title='Puntos de entrega'
        subTitle='Edición'
        renderRightAction={Add}
    >
        {
            isLoading && 
            <View style={{paddingHorizontal: 20, paddingTop: 30}}>
                <SkeletonCard />
            </View>
        }

        {
            !deliveryPoints && !isLoading && isError &&
            <ErrorScreen message={error.message ?? 'Error inesperado'} />
        }

        {
            !isLoading && !isError && !!deliveryPoints && deliveryPoints.length === 0 &&
            <NoticeScreen title='Sin puntos de entrega!' message='No hay puntos de entrega, puedes crear uno!' />
        }

        {
            !isLoading && !isError && !!deliveryPoints && deliveryPoints.length !== 0 &&
        <FlatList
          data={deliveryPoints}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={
            ({ item }) => <DeliveryPointCard deliveryPoint={item} onPress={() => navigation.navigate('DeliveryPointScreen', { deliveryPId: item.id })} />
          }
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 40 }}
        />

        }

    </TopNavigationLayout>
  )
}
export default AllDeliveryPoint


export const Add = () => {
  const navigation = useNavigation<NavigationProp<StackParamsDPSettings>>();
  return(

    <Pressable
      onPress={() => navigation.navigate('DeliveryPointScreen', {deliveryPId: 'new'})}
    //   onPress={() => {}}
      style={({ pressed }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon
        style={{ height: 34 }}
        name={'add'}

      />
      {/* <Text category="label"></Text> */}
    </Pressable>
  )
}