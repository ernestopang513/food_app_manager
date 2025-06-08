import { StackScreenProps } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import { StackParamsWaiting } from '../../routes/orders/waitingStack/WaitingStackNavigator'

interface Props extends StackScreenProps<StackParamsWaiting, 'DeliveryPointScreen'>{}

const DeliveryPointScreen = ({route}: Props) => {

  const {deliveryPointId} = route.params



  return (
    <View>
      <Text>{deliveryPointId}</Text>
    </View>
  )
}
export default DeliveryPointScreen