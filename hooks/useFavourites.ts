import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pawfinder_favourites';

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setFavourites(JSON.parse(json));
      })
      .finally(() => setLoaded(true));
  }, []);

  const saveFavourites = useCallback(async (ids: string[]) => {
    setFavourites(ids);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  const toggleFavourite = useCallback(
    async (petId: string) => {
      const updated = favourites.includes(petId)
        ? favourites.filter((id) => id !== petId)
        : [...favourites, petId];
      await saveFavourites(updated);
    },
    [favourites, saveFavourites],
  );

  const isFavourite = useCallback(
    (petId: string) => favourites.includes(petId),
    [favourites],
  );

  return { favourites, toggleFavourite, isFavourite, loaded };
}
