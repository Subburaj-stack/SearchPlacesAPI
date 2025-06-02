import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_API_KEY = 'AIzaSyDSXVOY0RaJiWBUhsEKPhsO0m0TXsi_4Vk';

const SearchBar = ({ onPlaceSelect, selectedPlace }) => {
  const ref = useRef();

  useEffect(() => {
    if (selectedPlace && ref.current) {
      ref.current.setAddressText(selectedPlace.name);
    }
  }, [selectedPlace]);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Search"
      fetchDetails
      onPress={(data, details = null) => {
        if (details) {
          onPlaceSelect(details);
        }
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
      styles={{
        container: {
          flex: 0,
          backgroundColor: 'transparent',
        },
        textInputContainer: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 8,
        },
        textInput: {
          height: 48,
          borderWidth: 1,
          borderColor: '#ccc',
          paddingHorizontal: 10,
          borderRadius: 8,
          fontSize: 16,
          backgroundColor: 'white',
        },
        listView: {
          backgroundColor: 'white',
        },
      }}
      
    />
  );
};

export default SearchBar;
