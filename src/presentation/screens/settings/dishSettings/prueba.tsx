import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';

type FoodStand = {
  id: string;
  name: string;
  dishes: string[];
};

type MenuItem = {
  stand: string;
  dish: string;
};

const App = () => {
  const [selectedStand, setSelectedStand] = useState<FoodStand | null>(null);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);

  const foodStands: FoodStand[] = [
    { id: '1', name: 'Taquería El Amigo', dishes: ['Tacos al pastor', 'Quesadillas', 'Gringas'] },
    { id: '2', name: 'Pizzeria Napoli', dishes: ['Margarita', 'Cuatro quesos', 'Hawaiana','Margarita', 'Cuatro quesos', 'Hawaiana','Margarita', 'Cuatro quesos', 'Hawaiana','Margarita', 'Cuatro quesos', 'Hawaiana','Margarita', 'Cuatro quesos', 'Hawaiana','Margarita', 'Cuatro quesos', 'Hawaiana','Margarita', 'Cuatro quesos', 'Hawaiana','Margarita', 'Cuatro quesos', 'Hawaiana', 'otro'] },
    { id: '3', name: 'Sushi Master', dishes: ['Roll California', 'Nigiri de salmón', 'Rollo de anguila'] },
    { id: '1', name: 'Taquería El Amigo', dishes: ['Tacos al pastor', 'Quesadillas', 'Gringas'] },
    { id: '2', name: 'Pizzeria Napoli', dishes: ['Margarita', 'Cuatro quesos', 'Hawaiana'] },
    { id: '3', name: 'Sushi Master', dishes: ['Roll California', 'Nigiri de salmón', 'Rollo de anguila'] },
    { id: '1', name: 'Taquería El Amigo', dishes: ['Tacos al pastor', 'Quesadillas', 'Gringas'] },
    { id: '2', name: 'Pizzeria Napoli', dishes: ['Margarita', 'Cuatro quesos', 'Hawaiana'] },
    { id: '3', name: 'Sushi Master', dishes: ['Roll California', 'Nigiri de salmón', 'Rollo de anguila'] },
    { id: '1', name: 'Taquería El Amigo', dishes: ['Tacos al pastor', 'Quesadillas', 'Gringas'] },
    { id: '2', name: 'Pizzeria Napoli', dishes: ['Margarita', 'Cuatro quesos', 'Hawaiana'] },
    { id: '3', name: 'Sushi Master', dishes: ['Roll California', 'Nigiri de salmón', 'Rollo de anguila'] },
    { id: '1', name: 'Taquería El Amigo', dishes: ['Tacos al pastor', 'Quesadillas', 'Gringas'] },
    { id: '2', name: 'Pizzeria Napoli', dishes: ['Margarita', 'Cuatro quesos', 'Hawaiana'] },
    { id: '3', name: 'Sushi Master', dishes: ['Roll California', 'Nigiri de salmón', 'Rollo de anguila'] },
  ];

  const addToMenu = () => {
    if (selectedStand && selectedDish) {
      setMenu((prev) => [...prev, { stand: selectedStand.name, dish: selectedDish }]);
      setSelectedDish(null);
      setSelectedStand(null);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Escoge un FoodStand</Text>
      <FlatList
        data={foodStands}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.standButton}
            onPress={() => setSelectedStand(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!selectedStand}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedStand(null)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            Platillos en {selectedStand?.name}
          </Text>
          <FlatList
            data={selectedStand?.dishes || []}
            keyExtractor={(item,index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dishButton,
                  selectedDish === item && styles.dishButtonSelected,
                ]}
                onPress={() => setSelectedDish(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Agregar al menú" onPress={addToMenu} disabled={!selectedDish} />
        </View>
      </Modal>
            <View style = {{height: '40%'}}>

      <Text style={styles.header}>Menú seleccionado:</Text>
      {menu.length === 0 && <Text>No has agregado platillos</Text>}
      <FlatList
        data={menu}
        keyExtractor={(item, index) => `${item.stand}-${item.dish}-${index}`}
        renderItem={({ item }) => (
            <Text>{item.dish} ({item.stand})</Text>
        )}
        />
        </View>

        <Button title='Aceptar'/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },
  standButton: {
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 8,
  },
  dishButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishButtonSelected: {
    backgroundColor: '#d1ffe1',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop: '30%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});
