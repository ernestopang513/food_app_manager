import { View, Text, Pressable, StyleSheet } from 'react-native'
import { DeliveryPointOrderResponse } from '../../../../infrastructure/interfaces/orders.response'
import { NativeCardHeader } from '../dishSettings/DishCard';
import { useTheme } from '@ui-kitten/components';

interface Props {
    deliveryPoint: DeliveryPointOrderResponse;
    onPress?: () => void;
}



const DeliveryPointCard = ({ deliveryPoint, onPress }: Props) => {
    const theme = useTheme();
    return (
        <Pressable
            onPress={() => onPress?.()}
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                styles.card,
                deliveryPoint.is_active ?  styles.cardOpen : styles.cardClosed,
            ]}
        >
            <NativeCardHeader nombre={deliveryPoint.name}  />

            <View style={styles.infoView}>
                <Text>Nombre:</Text>
                <Text>{deliveryPoint.name}</Text>
            </View>
            <View style={[styles.infoView, { backgroundColor: theme['color-info-transparent-100']}]}>
                <Text>Latitud:</Text>
                <Text>{deliveryPoint.latitude}</Text>
            </View>
            <View style={styles.infoView}>
                <Text>Longitud:</Text>
                <Text>{deliveryPoint.longitude}</Text>
            </View>
            <View style={[styles.infoView, { backgroundColor: theme['color-info-transparent-100']}]}>
                <Text>Estado:</Text>
                <Text>{deliveryPoint.is_active ? 'Activo': 'Inactivo'}</Text>
            </View>


        </Pressable>
    )
}
export default DeliveryPointCard


const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        borderRadius: 5,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: 'rgba(0,0,0,0.1)',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.1)',
    },
    infoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10
    },
    cardOpen: {
        // borderLeftColor: '#00E096',
        borderTopColor: '#00E096',
        borderTopWidth: 4,
    },
    cardClosed: {
        borderTopColor: '#FF3D71',
        borderTopWidth: 4,
    },

})