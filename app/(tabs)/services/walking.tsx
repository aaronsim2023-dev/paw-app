import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Linking, Image, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WALKERS, Walker } from '@/data/services';
import StarRating from '@/components/StarRating';
import { Colors } from '@/constants/colors';

function WalkerCard({ walker }: { walker: Walker }) {
  const [expanded, setExpanded] = useState(false);

  const handleBook = () => {
    const msg = encodeURIComponent(`Hi ${walker.name}! I found your profile on PawFinder SG and I'd like to book a dog walk. Are you available?`);
    Linking.openURL(`https://wa.me/${walker.phone.replace(/\D/g, '')}?text=${msg}`);
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: walker.photo }} style={styles.avatar} />
          {walker.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.blue} />
            </View>
          )}
        </View>
        <View style={styles.walkerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.walkerName}>{walker.name}</Text>
            <View style={styles.ratePill}>
              <Text style={styles.rateText}>${walker.ratePerWalk}</Text>
              <Text style={styles.rateUnit}>/{walker.walkDuration}</Text>
            </View>
          </View>
          <StarRating rating={walker.rating} reviewCount={walker.reviewCount} size={12} />
          <Text style={styles.walksCount}>{walker.totalWalks.toLocaleString()} walks · {walker.experience} exp</Text>
          <View style={styles.badgesRow}>
            {walker.badges.map((b) => (
              <View key={b} style={styles.badge}><Text style={styles.badgeText}>{b}</Text></View>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.bio} numberOfLines={expanded ? undefined : 2}>{walker.bio}</Text>

      <View style={styles.areasRow}>
        <Ionicons name="location-outline" size={13} color={Colors.mediumGray} />
        <Text style={styles.areasText}>{walker.areas.join(' · ')}</Text>
      </View>

      {expanded && (
        <View style={styles.expandedSection}>
          <Text style={styles.sectionLabel}>Weekly Availability</Text>
          <View style={styles.availGrid}>
            {walker.availability.map(({ day, slots }) => {
              const isToday = day === today.slice(0, 3);
              const hasSlots = slots.length > 0 && slots[0] !== 'Fully Booked';
              return (
                <View key={day} style={[styles.availRow, isToday && styles.availRowToday]}>
                  <Text style={[styles.availDay, isToday && styles.availDayToday]}>{day}</Text>
                  {slots.length === 0 ? (
                    <Text style={styles.unavailText}>Off</Text>
                  ) : slots[0] === 'Fully Booked' ? (
                    <Text style={styles.fullyBooked}>Full</Text>
                  ) : (
                    <Text style={styles.slotsText}>{slots.join(', ')}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.expandBtn} onPress={() => setExpanded(!expanded)}>
          <Text style={styles.expandBtnText}>{expanded ? 'Less' : 'View Availability'}</Text>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
          <Ionicons name="logo-whatsapp" size={15} color={Colors.white} />
          <Text style={styles.bookBtnText}>Book Walker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function WalkingScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return WALKERS;
    const q = search.toLowerCase();
    return WALKERS.filter((w) =>
      w.name.toLowerCase().includes(q) ||
      w.areas.some((a) => a.toLowerCase().includes(q)),
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Dog Walking</Text>
          <Text style={styles.subtitle}>{WALKERS.length} verified walkers</Text>
        </View>
      </View>

      <View style={styles.infoBanner}>
        <Ionicons name="shield-checkmark-outline" size={18} color="#4CAF50" />
        <Text style={styles.infoText}>All walkers are background-checked and verified by PawFinder SG</Text>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={Colors.mediumGray} />
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search by name or area..." placeholderTextColor={Colors.mediumGray} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(w) => w.id}
        renderItem={({ item }) => <WalkerCard walker={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No walkers found for that area.</Text>}
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
  infoBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginBottom: 10, backgroundColor: '#E8F5E9', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#4CAF5030' },
  infoText: { flex: 1, fontSize: 12, color: '#2E7D32', fontWeight: '500' },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 12, backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8, borderWidth: 1, borderColor: Colors.border },
  searchInput: { flex: 1, fontSize: 14, color: Colors.charcoal, padding: 0 },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 14, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  cardTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  avatarWrap: { position: 'relative', flexShrink: 0 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.lightGray },
  verifiedBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.white, borderRadius: 8 },
  walkerInfo: { flex: 1, gap: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  walkerName: { fontSize: 16, fontWeight: '800', color: Colors.charcoal },
  ratePill: { flexDirection: 'row', alignItems: 'baseline', backgroundColor: Colors.primary + '18', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  rateText: { fontSize: 15, fontWeight: '800', color: Colors.primary },
  rateUnit: { fontSize: 10, color: Colors.primary, marginLeft: 1 },
  walksCount: { fontSize: 11, color: Colors.mediumGray },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 2 },
  badge: { backgroundColor: '#E8F5E9', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10 },
  badgeText: { fontSize: 10, color: '#2E7D32', fontWeight: '600' },
  bio: { fontSize: 13, color: Colors.darkGray, lineHeight: 19, marginBottom: 8 },
  areasRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  areasText: { fontSize: 12, color: Colors.mediumGray, flex: 1 },
  expandedSection: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 10, marginBottom: 10 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.charcoal, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 },
  availGrid: { gap: 6 },
  availRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  availRowToday: { backgroundColor: Colors.primary + '12' },
  availDay: { width: 34, fontSize: 12, fontWeight: '700', color: Colors.charcoal },
  availDayToday: { color: Colors.primary },
  slotsText: { fontSize: 12, color: Colors.darkGray, flex: 1 },
  unavailText: { fontSize: 12, color: Colors.mediumGray, fontStyle: 'italic' },
  fullyBooked: { fontSize: 12, color: '#F44336', fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 8, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 10 },
  expandBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.primary },
  expandBtnText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  bookBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#25D366', paddingVertical: 10, borderRadius: 10 },
  bookBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  empty: { textAlign: 'center', color: Colors.mediumGray, marginTop: 40, fontSize: 14 },
});
