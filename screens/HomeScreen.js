import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapViewComponent';
import { getHistory, storeHistory } from '../utils/storage';

const HomeScreen = () => {
  const [region, setRegion] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Load local history when screen is focused
    getHistory().then(setHistory);
  }, [isFocused]);

  useEffect(() => {
    // When a place is selected from the history screen
    if (route.params?.place) {
      handlePlaceSelect(route.params.place);
    }
  }, [route.params]);

  useEffect(() => {
    // Get current location if no region is set
    if (!region && !route.params?.place) {
      getCurrentLocation();
    }
  }, []);

  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      console.warn('Permission error:', err);
    }
  };

  const handlePlaceSelect = async (place) => {
    const { lat, lng } = place.geometry.location;
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(newRegion);
    setSelectedPlace(place);
    await storeHistory(place);
    setHistory(await getHistory());
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBarWrapper}>
          <SearchBar onPlaceSelect={handlePlaceSelect} selectedPlace={selectedPlace} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={styles.iconButton}
        >
          <Image source={require('../assets/list.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      <MapViewComponent region={region} selectedPlace={selectedPlace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 4,
    backgroundColor: '#fff',
  },
  searchBarWrapper: {
    flex: 1,
  },
  iconButton: {
    marginLeft: 8,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
