import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FoodStand } from '../../../../domain/entities/foodStand'
import { DishInfoItem } from '../../foodStands/DishInfoItem';
import { FoodStandDishStatusCard } from './FoodStandDishStatusCard';


interface Props {
    foodStand: FoodStand;
    onPress?: () => void;
}


const FoodStandDishCard = ({foodStand, onPress} : Props) => {
  return (
    <Pressable
     onPress={() => onPress?.()}
           style={({pressed}) => [
             {opacity: pressed? 0.5: 1},
             styles.card,
             
             
           ]}>
           {/* <Header nombre={foodStand.name} /> */}

          <View style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)' }}>
                <Text style = { styles.headerText}>{foodStand.name}</Text>
          </View>

          <View style={{ marginTop: 5 }} />

          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>


              {foodStand?.foodStandDishes?.length !== 0 ? (
                  foodStand?.foodStandDishes?.map((fsDish, index) => (
                      <FoodStandDishStatusCard
                          key={fsDish.id}
                          dishName={fsDish.dish.name}
                          quantity={fsDish.quantity}
                          level={index % 2 === 0 ? '2' : '1'}
                          is_active = {fsDish.is_active}

                      />
                  ))
              ) : (
                 <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>
                 Sin platillos registrados, agrégalos en el menú de platillos.
               </Text>
             </View>
           )}
           </View>
         </Pressable>
  )
}
export default FoodStandDishCard
const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    // padding: 15,
    borderRadius: 5,
    elevation: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderRightColor: 'rgba(0,0,0,0.1)',
    
    backgroundColor: '#fff',
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
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    padding: 10,
  },
  emptyContainer: {
    padding: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#555',
  },
});