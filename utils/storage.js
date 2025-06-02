import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'search_history';

export const getHistory = async () => {
  const json = await AsyncStorage.getItem(HISTORY_KEY);
  return json ? JSON.parse(json) : [];
};

export const storeHistory = async (place) => {
  const history = await getHistory();
  const newHistory = [place, ...history.filter(p => p.place_id !== place.place_id)].slice(0, 10);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};