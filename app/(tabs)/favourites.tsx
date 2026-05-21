import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PETS, Pet } from '@/data/pets';
import { useFavourites } from '@/hooks/useFavourites';
import PetCard from '@/components/PetCard';
import { Colors } from '@/constants/colors';

export default function FavouritesScreen() {
  const router = useRouter();
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  const favPets = PETS.filter((p) => favourites.includes(p.id));

  const renderItem = useCallback(
    ({ item, index }: { item: Pet; index: number }) => (
      <PetCard
        pet={item}
        isFavourite={isFavourite(item.id)}
        onToggleFavourite={toggleFavourite}
        style={index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 }}
      />
    ),
    [isFavourite, toggleFavourite],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Pets</Text>
        {favourites.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{favourites.length}</Text>
          </View>
        )}
      </View>

      {favPets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="heart-outline" size={48} color={Colors.primaryLight} />
          </View>
          <Text style={styles.emptyTitle}>No saved pets yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart icon on any pet to save them here for easy access later.
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => router.push('/')}
          >
            <Ionicons name="search-outline" size={16} color={Colors.white} />
            <Text style={styles.browseBtnText}>Browse Pets</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favPets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>
                You've saved {favPets.length} adorable pet{favPets.length > 1 ? 's' : ''}! 🐾
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  countBadge: {
    backgroundColor: Colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  browseBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    paddingHorizontal: 20,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  listHeaderText: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontStyle: 'italic',
  },
});
