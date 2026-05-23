import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Linking, Image, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PET_PLACES, PetFriendlyPlace, PlaceCategory } from '@/data/services';
import StarRating from '@/components/StarRating';
import { Colors } from '@/constants/colors';

const CATEGORIES: { label: string; value: PlaceCategory | 'All'; emoji: string; color: string }[] = [
  { label: 'All', value: 'All' as any, emoji: '🗺️', color: Colors.primary },
  { label: 'Dining', value: 'Dining', emoji: '🍽️', color: '#FF5722' },
  { label: 'Outdoor', value: 'Outdoor', emoji: '🌿', color: '#4CAF50' },
  { label: 'Hotels', value: 'Hotel', emoji: '🏨', color: '#9C27B0' },
  { label: 'Events', value: 'Events', emoji: '🎉', color: '#2196F3' },
];

const CAT_COLORS: Record<string, string> = {
  Dining: '#FF5722', Outdoor: '#4CAF50', Hotel: '#9C27B0', Events: '#2196F3',
};

function PlaceCard({ place }: { place: PetFriendlyPlace }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: place.photos[0] }} style={styles.cardImage} resizeMode="cover" />
        <View style={[styles.catBadge, { backgroundColor: CAT_COLORS[place.category] ?? Colors.primary }]}>
          <Text style={styles.catBadgeText}>{CATEGORIES.find((c) => c.value === place.category)?.emoji} {place.category}</Text>
        </View>
        {place.featured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={10} color={Colors.white} />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{place.name}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={12} color={Colors.mediumGray} />
          <Text style={styles.metaText}>{place.area}</Text>
        </View>
        <StarRating rating={place.rating} reviewCount={place.reviewCount} size={12} />

        <View style={styles.policyBox}>
          <Ionicons name="paw-outline" size={13} color={Colors.primary} />
          <Text style={styles.policyText}>{place.petPolicy}</Text>
        </View>

        {place.sizeLimit && (
          <View style={styles.sizeLimitRow}>
            <Ionicons name="resize-outline" size={12} color={Colors.mediumGray} />
            <Text style={styles.sizeLimitText}>Size limit: {place.sizeLimit}</Text>
          </View>
        )}

        <View style={styles.petTypesRow}>
          {place.petTypes.map((t) => (
            <View key={t} style={styles.petChip}><Text style={styles.petChipText}>{t}</Text></View>
          ))}
        </View>

        <Text style={styles.description} numberOfLines={2}>{place.description}</Text>

        <View style={styles.hoursRow}>
          <Ionicons name="time-outline" size={12} color={Colors.mediumGray} />
          <Text style={styles.hoursText}>{place.hours}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.directionsBtn} onPress={() => Linking.openURL(place.mapUrl)}>
            <Ionicons name="map-outline" size={14} color={Colors.white} />
            <Text style={styles.directionsBtnText}>Directions</Text>
          </TouchableOpacity>
          {place.phone && (
            <TouchableOpacity style={styles.callBtn} onPress={() => Linking.openURL(`tel:${place.phone}`)}>
              <Ionicons name="call-outline" size={14} color={Colors.primary} />
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          )}
          {place.website && (
            <TouchableOpacity style={styles.callBtn} onPress={() => Linking.openURL(place.website!)}>
              <Ionicons name="globe-outline" size={14} color={Colors.primary} />
              <Text style={styles.callBtnText}>Website</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default function PlacesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<PlaceCategory | 'All'>('All');

  const filtered = useMemo(() => {
    let list = PET_PLACES;
    if (search) list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.area.toLowerCase().includes(search.toLowerCase()),
    );
    if (catFilter !== 'All') list = list.filter((p) => p.category === catFilter);
    return list;
  }, [search, catFilter]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Pet-Friendly Places</Text>
          <Text style={styles.subtitle}>{PET_PLACES.length} spots across Singapore</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={Colors.mediumGray} />
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search by name or area..." placeholderTextColor={Colors.mediumGray} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={String(cat.value)}
            style={[styles.filterChip, catFilter === cat.value && { backgroundColor: cat.color, borderColor: cat.color }]}
            onPress={() => setCatFilter(cat.value)}
          >
            <Text style={styles.filterEmoji}>{cat.emoji}</Text>
            <Text style={[styles.filterChipText, catFilter === cat.value && styles.filterChipTextActive]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          filtered.length > 0 ? (
            <Text style={styles.resultCount}>{filtered.length} pet-friendly spots</Text>
          ) : null
        }
        ListEmptyComponent={<Text style={styles.empty}>No places match your search.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 14 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.charcoal },
  subtitle: { fontSize: 12, color: Colors.mediumGray },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 10, backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8, borderWidth: 1, borderColor: Colors.border },
  searchInput: { flex: 1, fontSize: 14, color: Colors.charcoal, padding: 0 },
  filterScroll: { paddingHorizontal: 20, gap: 8, marginBottom: 12 },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border },
  filterEmoji: { fontSize: 14 },
  filterChipText: { fontSize: 13, fontWeight: '600', color: Colors.darkGray },
  filterChipTextActive: { color: Colors.white },
  resultCount: { paddingHorizontal: 20, marginBottom: 8, fontSize: 13, color: Colors.mediumGray },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  card: { backgroundColor: Colors.white, borderRadius: 16, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  imageWrap: { position: 'relative' },
  cardImage: { width: '100%', height: 170 },
  catBadge: { position: 'absolute', bottom: 10, left: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  catBadgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  featuredBadge: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  featuredText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  cardBody: { padding: 14, gap: 6 },
  cardName: { fontSize: 16, fontWeight: '800', color: Colors.charcoal },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: Colors.mediumGray },
  policyBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, backgroundColor: Colors.primary + '12', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: Colors.primary + '30' },
  policyText: { flex: 1, fontSize: 12, color: Colors.primaryDark, fontWeight: '500', lineHeight: 17 },
  sizeLimitRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sizeLimitText: { fontSize: 12, color: Colors.mediumGray },
  petTypesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  petChip: { backgroundColor: Colors.veryLightGray, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: Colors.border },
  petChipText: { fontSize: 11, color: Colors.darkGray, fontWeight: '500' },
  description: { fontSize: 13, color: Colors.darkGray, lineHeight: 18 },
  hoursRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  hoursText: { fontSize: 12, color: Colors.mediumGray },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 4, flexWrap: 'wrap' },
  directionsBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10 },
  directionsBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  callBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1.5, borderColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 10 },
  callBtnText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  empty: { textAlign: 'center', color: Colors.mediumGray, marginTop: 40, fontSize: 14 },
});
