import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

interface DishInfoItemProps {
  dishName: string;
  quantity: number;
  level: "1" | "2";
  is_active: boolean
  
}

export const FoodStandDishStatusCard = ({ dishName, quantity, level, is_active }: DishInfoItemProps) => {
  return (
    <Layout 
        level={level} 
        style={[
            styles.amount,
            is_active? styles.cardActive : styles.cardInactive
        ]}
    >
      <Text>{dishName}: </Text>
      <Text>{quantity}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  amount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 2,
    borderRadius: 8,
  },
  cardActive: {
    // borderLeftColor: '#00E096',
    borderLeftColor: '#00E096',
    borderLeftWidth: 4,
  },
  cardInactive: {
    borderLeftColor: '#FF3D71',
    borderLeftWidth: 4,
  },
});