import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Linking, LayoutAnimation,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { VET_CLINICS, VetClinic } from '@/data/services';
import StarRating from '@/components/StarRating';
import { Colors } from '@/constants/colors';

function VetCard({ vet }: { vet: VetClinic }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={toggle} activeOpacity={0.9}>
      <View style={styles.cardTop}>
        <View style={styles.cardIconWrap}>
          <Text style={{ fontSize: 22 }}>🏥</Text>
        </View>
        <View style={styles.cardMain}>
          <View style={styles.nameRow}>
            <Text style={styles.cardName} numberOfLines={1}>{vet.name}</Text>
            {vet.emergency24hr && (
              <View style={styles.emergencyBadge}>
                <Ionicons name="flash" size={10} color={Colors.white} />
                <Text style={styles.emergencyText}>24hr</Text>
              </View>
            )}
          </View>
          <View style={styles.areaRow}>
            <Ionicons name="location-outline" size={12} color={Colors.mediumGray} />
            <Text style={styles.areaText}>{vet.area}</Text>
          </View>
          <StarRating rating={vet.rating} reviewCount={vet.reviewCount} size={12} />
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.mediumGray} />
      </View>

      {expanded && (
        <View style={styles.expandedBody}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={13} color={Colors.mediumGray} />
            <Text style={styles.infoText}>{vet.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={13} color={Colors.mediumGray} />
            <Text style={styles.infoText}>{vet.phone}</Text>
          </View>

          <Text style={styles.subLabel}>Hours</Text>
          {vet.hours.map((h, i) => <Text key={i} style={styles.hoursText}>• {h}</Text>)}

          <Text style={styles.subLabel}>Services</Text>
          <View style={styles.tagWrap}>
            {vet.services.map((s) => (
              <View key={s} style={styles.tag}><Text style={styles.tagText}>{s}</Text></View>
            ))}
          </View>

          <Text style={styles.subLabel}>Specialties</Text>
          <View style={styles.tagWrap}>
            {vet.specialties.map((s) => (
              <View key={s} style={[styles.tag, styles.tagBlue]}><Text style={[styles.tagText, { color: Colors.blue }]}>{s}</Text></View>
            ))}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => Linking.openURL(`tel:${vet.phone}`)}>
              <Ionicons name="call" size={15} color={Colors.white} />
              <Text style={styles.primaryBtnText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineBtn} onPress={() => Linking.openURL(vet.mapUrl)}>
              <Ionicons name="map-outline" size={15} color={Colors.primary} />
              <Text style={styles.outlineBtnText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineBtn} onPress={() => Linking.openURL(vet.website)}>
              <Ionicons name="globe-outline" size={15} color={Colors.primary} />
              <Text style={styles.outlineBtnText}>Website</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function VetsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [only24hr, setOnly24hr] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState<string | null>(null);

  const specialties = useMemo(() => {
    const all = new Set<string>();
    VET_CLINICS.forEach((v) => v.specialties.forEach((s) => all.add(s)));
    return Array.from(all);
  }, []);

  const filtered = useMemo(() => {
    let list = VET_CLINICS;
    if (search) list = list.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.area.toLowerCase().includes(search.toLowerCase()));
    if (only24hr) list = list.filter((v) => v.emergency24hr);
    if (filterSpecialty) list = list.filter((v) => v.specialties.includes(filterSpecialty));
    return list;
  }, [search, only24hr, filterSpecialty]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Vet Directory</Text>
          <Text style={styles.subtitle}>{VET_CLINICS.length} clinics in Singapore</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={Colors.mediumGray} />
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search by name or area..." placeholderTextColor={Colors.mediumGray} />
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterChip, only24hr && styles.filterChipActive]} onPress={() => setOnly24hr(!only24hr)}>
          <Ionicons name="flash-outline" size={13} color={only24hr ? Colors.white : Colors.darkGray} />
          <Text style={[styles.filterChipText, only24hr && styles.filterChipTextActive]}>24hr Emergency</Text>
        </TouchableOpacity>
        {specialties.map((s) => (
          <TouchableOpacity key={s} style={[styles.filterChip, filterSpecialty === s && styles.filterChipActive]} onPress={() => setFilterSpecialty(filterSpecialty === s ? null : s)}>
            <Text style={[styles.filterChipText, filterSpecialty === s && styles.filterChipTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(v) => v.id}
        renderItem={({ item }) => <VetCard vet={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No vets match your filters.</Text>}
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
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20, marginBottom: 12 },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.darkGray },
  filterChipTextActive: { color: Colors.white },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 14, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIconWrap: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFEBEE', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cardMain: { flex: 1, gap: 3 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  cardName: { fontSize: 14, fontWeight: '700', color: Colors.charcoal, flex: 1 },
  emergencyBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#F44336', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  emergencyText: { color: Colors.white, fontSize: 9, fontWeight: '800' },
  areaRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  areaText: { fontSize: 12, color: Colors.mediumGray },
  expandedBody: { marginTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 12, gap: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  infoText: { fontSize: 13, color: Colors.darkGray, flex: 1 },
  subLabel: { fontSize: 11, fontWeight: '700', color: Colors.charcoal, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 8 },
  hoursText: { fontSize: 12, color: Colors.darkGray, marginBottom: 2 },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  tag: { backgroundColor: Colors.primary + '15', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  tagBlue: { backgroundColor: Colors.blue + '15' },
  tagText: { fontSize: 11, color: Colors.primaryDark, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10 },
  primaryBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  outlineBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1.5, borderColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 10 },
  outlineBtnText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  empty: { textAlign: 'center', color: Colors.mediumGray, marginTop: 40, fontSize: 14 },
});
