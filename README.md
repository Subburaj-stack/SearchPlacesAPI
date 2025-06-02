# SearchPlaces  - Google Maps Place Search in React Native

This is a React Native app that allows users to search for places using the Google Places API, view locations on a map, and maintain a persistent search history. Built using the React Native CLI (non-Expo), the app includes clean UI, geolocation support, and local storage.

---

## 🚀 Features

- 🔍 Google Places Autocomplete search
- 🗺️ Display selected place on Google Maps
- 📍 Auto-detect current location
- 🧠 Local search history stored with AsyncStorage
- 🧾 Separate history screen to view and select previous searches
- 📲 Smooth navigation and responsive UI

---

## 📦 Project Structure

```
SearchPlaces/
├── App.js
├── /assets/
│   └── list.png                # History icon image
├── /components/
│   ├── MapViewComponent.js     # Google Map display
│   ├── PlaceList.js            # History list view
│   └── SearchBar.js            # Google Places autocomplete search bar
├── /screens/
│   ├── HomeScreen.js           # Main screen with map and search
│   └── HistoryScreen.js        # History list screen
├── /utils/
│   └── storage.js              # AsyncStorage utility for history
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/AwesomeProject.git
cd AwesomeProject
```

### 2. Install dependencies

```bash
npm install
npx pod-install ios
```

### 3. Required Packages

```bash
npm install react-native-maps
npm install react-native-google-places-autocomplete
npm install @react-native-community/geolocation
npm install @react-navigation/native @react-navigation/native-stack
npm install @react-native-async-storage/async-storage
npx pod-install ios
```

> Ensure `react-native-vector-icons` is also linked and set up.

---

## 🔑 API Keys & Configuration

### 1. Google API Key

Generate a key from the [Google Cloud Console](https://console.cloud.google.com/) and enable the following APIs:
- Maps SDK for Android
- Places API

### 2. Add key to `AndroidManifest.xml` inside `<application>`:

```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_GOOGLE_API_KEY_HERE"/>
```

---

## 📱 Run the App

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```

> Make sure your emulator or device has location services enabled.

---

## 📌 Notes

- `Geolocation` requires location permissions.
- Use `PermissionsAndroid` for runtime permissions on Android.
- `list.png` should be placed inside `assets/` for the history icon to show properly.

---

## 🧹 Future Improvements

- Save user's favorite locations
- Use a state management library like Redux or Zustand
- UI improvements with animations
- Add unit tests

---

## 🧑‍💻 Author

Made with ❤️ by Subburaj

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
