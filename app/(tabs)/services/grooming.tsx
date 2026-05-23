import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Linking, Image, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GROOMERS, Groomer, PricingTier } from '@/data/services';
import StarRating from '@/components/StarRating';
import { Colors } from '@/constants/colors';

const PET_FILTERS = ['All', 'Dogs', 'Cats', 'Rabbits'];

function GroomerCard({ groomer }: { groomer: Groomer }) {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'full' | 'premium'>('full');
  const tiers = Object.entries(groomer.pricing) as [string, PricingTier][];

  const handleBook = () => {
    const msg = encodeURIComponent(
      `Hi! I'd like to book a ${groomer.pricing[selectedTier]?.label ?? 'grooming'} session for my pet at ${groomer.name}. Could you share available slots?`,
    );
    Linking.openURL(`https://wa.me/${groomer.phone.replace(/\D/g, '')}?text=${msg}`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: groomer.photos[0] }} style={styles.cardImage} resizeMode="cover" />
      {groomer.featured && (
        <View style={styles.featuredBadge}><Ionicons name="star" size={10} color={Colors.white} /><Text style={styles.featuredText}>Featured</Text></View>
      )}
      <View style={styles.cardBody}>
        <View style={styles.nameRow}>
          <Text style={styles.cardName}>{groomer.name}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={12} color={Colors.mediumGray} />
          <Text style={styles.metaText}>{groomer.area}</Text>
          <Text style={styles.dot}>·</Text>
          <Ionicons name="time-outline" size={12} color={Colors.mediumGray} />
          <Text style={styles.metaText} numberOfLines={1}>{groomer.hours.split('|')[0]}</Text>
        </View>
        <StarRating rating={groomer.rating} reviewCount={groomer.reviewCount} size={12} />

        <View style={styles.petTypesRow}>
          {groomer.petTypes.map((t) => (
            <View key={t} style={styles.petTypeChip}><Text style={styles.petTypeText}>{t}</Text></View>
          ))}
        </View>

        {/* Pricing Tiers */}
        <Text style={styles.pricingLabel}>Select package</Text>
        <View style={styles.tiersRow}>
          {tiers.map(([key, tier]) => (
            <TouchableOpacity
              key={key}
              style={[styles.tierBtn, selectedTier === key && styles.tierBtnActive]}
              onPress={() => setSelectedTier(key as any)}
            >
              <Text style={[styles.tierName, selectedTier === key && styles.tierNameActive]}>{tier.label}</Text>
              <Text style={[styles.tierPrice, selectedTier === key && styles.tierPriceActive]}>${tier.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Includes */}
        <View style={styles.includesRow}>
          {(groomer.pricing[selectedTier]?.includes ?? []).map((inc) => (
            <View key={inc} style={styles.includeChip}>
              <Ionicons name="checkmark-circle" size={11} color="#4CAF50" />
              <Text style={styles.includeText}>{inc}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
            <Ionicons name="logo-whatsapp" size={15} color={Colors.white} />
            <Text style={styles.bookBtnText}>Book Now — ${groomer.pricing[selectedTier]?.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapBtn} onPress={() => Linking.openURL(groomer.mapUrl)}>
            <Ionicons name="map-outline" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function GroomingScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [petFilter, setPetFilter] = useState('All');

  const filtered = useMemo(() => {
    let list = GROOMERS;
    if (search) list = list.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.area.toLowerCase().includes(search.toLowerCase()));
    if (petFilter !== 'All') list = list.filter((g) => g.petTypes.includes(petFilter));
    return list;
  }, [search, petFilter]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Pet Grooming</Text>
          <Text style={styles.subtitle}>{GROOMERS.length} salons in Singapore</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={Colors.mediumGray} />
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search salons or area..." placeholderTextColor={Colors.mediumGray} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {PET_FILTERS.map((f) => (
          <TouchableOpacity key={f} style={[styles.filterChip, petFilter === f && styles.filterChipActive]} onPress={() => setPetFilter(f)}>
            <Text style={[styles.filterChipText, petFilter === f && styles.filterChipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => <GroomerCard groomer={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No groomers found.</Text>}
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
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border },
  filterChipActive: { backgroundColor: '#E91E63', borderColor: '#E91E63' },
  filterChipText: { fontSize: 13, fontWeight: '600', color: Colors.darkGray },
  filterChipTextActive: { color: Colors.white },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  card: { backgroundColor: Colors.white, borderRadius: 16, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardImage: { width: '100%', height: 160 },
  featuredBadge: { position: 'absolute', top: 12, left: 12, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  featuredText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  cardBody: { padding: 14, gap: 6 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardName: { fontSize: 16, fontWeight: '800', color: Colors.charcoal },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  metaText: { fontSize: 12, color: Colors.mediumGray },
  dot: { color: Colors.mediumGray, fontSize: 12 },
  petTypesRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  petTypeChip: { backgroundColor: '#FCE4EC', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  petTypeText: { fontSize: 11, color: '#E91E63', fontWeight: '600' },
  pricingLabel: { fontSize: 12, fontWeight: '700', color: Colors.charcoal, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 6 },
  tiersRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  tierBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.veryLightGray },
  tierBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tierName: { fontSize: 11, fontWeight: '600', color: Colors.darkGray },
  tierNameActive: { color: Colors.white },
  tierPrice: { fontSize: 15, fontWeight: '800', color: Colors.charcoal, marginTop: 2 },
  tierPriceActive: { color: Colors.white },
  includesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  includeChip: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  includeText: { fontSize: 11, color: Colors.darkGray },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  bookBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#25D366', paddingVertical: 12, borderRadius: 12 },
  bookBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  mapBtn: { width: 44, height: 44, borderRadius: 12, borderWidth: 1.5, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  empty: { textAlign: 'center', color: Colors.mediumGray, marginTop: 40, fontSize: 14 },
});
