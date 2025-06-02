import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapViewComponent = ({ region: externalRegion, selectedPlace }) => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
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
          console.error('Geolocation error:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  // If external region is provided (e.g. after selecting place), override
  const currentRegion = externalRegion || region;

  if (!currentRegion) return null;

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={currentRegion}
        showsUserLocation={true}
      >
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.geometry.location.lat,
              longitude: selectedPlace.geometry.location.lng,
            }}
            title={selectedPlace.name}
            description={selectedPlace.formatted_address}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: { flex: 1 ,marginTop:20},
  map: { ...StyleSheet.absoluteFillObject },
});

export default MapViewComponent;
