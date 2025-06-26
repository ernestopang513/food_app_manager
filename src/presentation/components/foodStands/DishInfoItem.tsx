import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

interface DishInfoItemProps {
  dishName: string;
  quantity: number;
  level: "1" | "2";
}

export const DishInfoItem = ({ dishName, quantity, level }: DishInfoItemProps) => {
  return (
    <Layout level={level} style={styles.amount}>
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
});