import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Linking, Image, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BOARDING, BoardingFacility } from '@/data/services';
import StarRating from '@/components/StarRating';
import { Colors } from '@/constants/colors';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Mock weekly availability — true = available
const AVAIL = [true, true, false, true, true, true, false];

function AvailabilityStrip() {
  return (
    <View style={styles.availStrip}>
      {DAYS.map((d, i) => (
        <View key={d} style={[styles.availDay, AVAIL[i] ? styles.availGreen : styles.availRed]}>
          <Text style={styles.availDayLabel}>{d}</Text>
          <Ionicons name={AVAIL[i] ? 'checkmark' : 'close'} size={12} color={Colors.white} />
        </View>
      ))}
    </View>
  );
}

function BoardingCard({ facility }: { facility: BoardingFacility }) {
  const handleEnquire = () => {
    const msg = encodeURIComponent(`Hi! I found ${facility.name} on PawFinder SG and I'd like to enquire about boarding my pet. Could you share available dates and more details?`);
    Linking.openURL(`https://wa.me/${facility.phone.replace(/\D/g, '')}?text=${msg}`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: facility.photos[0] }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.overlayBadges}>
        {facility.featured && <View style={styles.featuredBadge}><Ionicons name="star" size={10} color={Colors.white} /><Text style={styles.featuredText}>Featured</Text></View>}
        <View style={[styles.typeBadge, facility.type === 'sitter' ? styles.typeBadgeSitter : null]}>
          <Text style={styles.typeBadgeText}>{facility.type === 'facility' ? '🏠 Facility' : '🧑 Pet Sitter'}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.nameRow}>
          <Text style={styles.cardName}>{facility.name}</Text>
          <View style={styles.priceBox}>
            <Text style={styles.priceNum}>${facility.pricePerNight}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={12} color={Colors.mediumGray} />
          <Text style={styles.metaText}>{facility.area}</Text>
          <Text style={styles.dot}>·</Text>
          <Ionicons name="people-outline" size={12} color={Colors.mediumGray} />
          <Text style={styles.metaText}>{facility.capacity}</Text>
        </View>

        <StarRating rating={facility.rating} reviewCount={facility.reviewCount} size={12} />

        <Text style={styles.description} numberOfLines={2}>{facility.description}</Text>

        <View style={styles.petTypesRow}>
          {facility.petTypes.map((t) => <View key={t} style={styles.petChip}><Text style={styles.petChipText}>{t}</Text></View>)}
          <View style={[styles.petChip, { backgroundColor: facility.indoorOutdoor === 'indoor' ? '#E3F2FD' : '#E8F5E9' }]}>
            <Text style={[styles.petChipText, { color: facility.indoorOutdoor === 'indoor' ? Colors.blue : '#4CAF50' }]}>
              {facility.indoorOutdoor === 'indoor' ? 'Indoor' : facility.indoorOutdoor === 'outdoor' ? 'Outdoor' : 'Indoor & Outdoor'}
            </Text>
          </View>
        </View>

        <View style={styles.amenitiesRow}>
          {facility.amenities.slice(0, 4).map((a) => (
            <View key={a} style={styles.amenityChip}>
              <Ionicons name="checkmark-circle" size={11} color="#4CAF50" />
              <Text style={styles.amenityText}>{a}</Text>
            </View>
          ))}
          {facility.amenities.length > 4 && <Text style={styles.moreAmenities}>+{facility.amenities.length - 4} more</Text>}
        </View>

        <Text style={styles.availLabel}>This Week's Availability</Text>
        <AvailabilityStrip />

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.enquireBtn} onPress={handleEnquire}>
            <Ionicons name="logo-whatsapp" size={15} color={Colors.white} />
            <Text style={styles.enquireBtnText}>Enquire to Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapBtn} onPress={() => Linking.openURL(facility.mapUrl)}>
            <Ionicons name="map-outline" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function BoardingScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [petFilter, setPetFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'all' | 'facility' | 'sitter'>('all');

  const petTypes = ['All', 'Dogs', 'Cats', 'Rabbits'];

  const filtered = useMemo(() => {
    let list = BOARDING;
    if (search) list = list.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.area.toLowerCase().includes(search.toLowerCase()));
    if (petFilter !== 'All') list = list.filter((f) => f.petTypes.includes(petFilter));
    if (typeFilter !== 'all') list = list.filter((f) => f.type === typeFilter);
    return list;
  }, [search, petFilter, typeFilter]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Boarding & Sitting</Text>
          <Text style={styles.subtitle}>{BOARDING.length} listings in Singapore</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={Colors.mediumGray} />
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search by name or area..." placeholderTextColor={Colors.mediumGray} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {(['all', 'facility', 'sitter'] as const).map((t) => (
          <TouchableOpacity key={t} style={[styles.filterChip, typeFilter === t && styles.filterChipActive]} onPress={() => setTypeFilter(t)}>
            <Text style={[styles.filterChipText, typeFilter === t && styles.filterChipTextActive]}>{t === 'all' ? 'All' : t === 'facility' ? '🏠 Facility' : '🧑 Sitter'}</Text>
          </TouchableOpacity>
        ))}
        {petTypes.map((p) => (
          <TouchableOpacity key={p} style={[styles.filterChip, petFilter === p && styles.filterChipActive]} onPress={() => setPetFilter(p)}>
            <Text style={[styles.filterChipText, petFilter === p && styles.filterChipTextActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(f) => f.id}
        renderItem={({ item }) => <BoardingCard facility={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No boarding options found.</Text>}
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
  filterChipActive: { backgroundColor: '#9C27B0', borderColor: '#9C27B0' },
  filterChipText: { fontSize: 13, fontWeight: '600', color: Colors.darkGray },
  filterChipTextActive: { color: Colors.white },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  card: { backgroundColor: Colors.white, borderRadius: 16, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardImage: { width: '100%', height: 160 },
  overlayBadges: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', gap: 6 },
  featuredBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  featuredText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  typeBadge: { backgroundColor: '#9C27B0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  typeBadgeSitter: { backgroundColor: '#4CAF50' },
  typeBadgeText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  cardBody: { padding: 14, gap: 6 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardName: { fontSize: 15, fontWeight: '800', color: Colors.charcoal, flex: 1, marginRight: 8 },
  priceBox: { alignItems: 'flex-end' },
  priceNum: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  priceUnit: { fontSize: 11, color: Colors.mediumGray },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: Colors.mediumGray },
  dot: { color: Colors.mediumGray },
  description: { fontSize: 13, color: Colors.darkGray, lineHeight: 18, marginTop: 2 },
  petTypesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  petChip: { backgroundColor: '#F3E5F5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  petChipText: { fontSize: 11, color: '#9C27B0', fontWeight: '600' },
  amenitiesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  amenityChip: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  amenityText: { fontSize: 11, color: Colors.darkGray },
  moreAmenities: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  availLabel: { fontSize: 11, fontWeight: '700', color: Colors.charcoal, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 6 },
  availStrip: { flexDirection: 'row', gap: 4, marginTop: 6 },
  availDay: { flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 8, gap: 2 },
  availGreen: { backgroundColor: '#4CAF50' },
  availRed: { backgroundColor: Colors.lightGray },
  availDayLabel: { color: Colors.white, fontSize: 9, fontWeight: '700' },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  enquireBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#25D366', paddingVertical: 12, borderRadius: 12 },
  enquireBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  mapBtn: { width: 44, height: 44, borderRadius: 12, borderWidth: 1.5, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  empty: { textAlign: 'center', color: Colors.mediumGray, marginTop: 40, fontSize: 14 },
});
