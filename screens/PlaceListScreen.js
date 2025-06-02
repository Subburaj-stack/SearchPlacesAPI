import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getHistory } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

const PlaceListScreen = () => {
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  const handleSelect = (place) => {
    navigation.popToTop(); // Go back to Home
    setTimeout(() => {
      navigation.navigate('Home', { place });
    }, 0); // Ensure navigation happens after pop
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.address}>{item.formatted_address}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: { fontWeight: 'bold' },
  address: { color: '#666' },
});

export default PlaceListScreen;
