import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PlaceList = ({ history, onSelect }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { maxHeight: 200, backgroundColor: '#fff' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default PlaceList;
