import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Linking, Image, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TRAINERS, Trainer } from '@/data/services';
import StarRating from '@/components/StarRating';
import { Colors } from '@/constants/colors';

const SPECIALTIES = ['All', 'Puppy Training', 'Obedience', 'Agility', 'Behaviour Modification', 'Fearful Dogs'];

function TrainerCard({ trainer }: { trainer: Trainer }) {
  const handleEnquire = () => {
    const msg = encodeURIComponent(`Hi ${trainer.name}! I found your profile on PawFinder SG and I'm interested in training sessions for my dog. Could you share more details?`);
    Linking.openURL(`https://wa.me/${trainer.phone.replace(/\D/g, '')}?text=${msg}`);
  };

  return (
    <View style={styles.card}>
      {trainer.featured && (
        <View style={styles.featuredStrip}>
          <Ionicons name="star" size={10} color={Colors.white} />
          <Text style={styles.featuredText}>Top Trainer</Text>
        </View>
      )}
      <View style={styles.cardTop}>
        <Image source={{ uri: trainer.photo }} style={styles.avatar} />
        <View style={styles.trainerInfo}>
          <Text style={styles.trainerName}>{trainer.name}</Text>
          <Text style={styles.businessName}>{trainer.businessName}</Text>
          <StarRating rating={trainer.rating} reviewCount={trainer.reviewCount} size={12} />
          <View style={styles.areasRow}>
            <Ionicons name="location-outline" size={12} color={Colors.mediumGray} />
            <Text style={styles.areasText} numberOfLines={1}>{trainer.areas.join(', ')}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.bio}>{trainer.bio}</Text>

      {/* Specialties */}
      <Text style={styles.subLabel}>Specialties</Text>
      <View style={styles.tagWrap}>
        {trainer.specialties.map((s) => (
          <View key={s} style={styles.specialtyTag}><Text style={styles.specialtyTagText}>{s}</Text></View>
        ))}
      </View>

      {/* Credentials */}
      <Text style={styles.subLabel}>Credentials</Text>
      <View style={styles.credentialsWrap}>
        {trainer.credentials.map((c) => (
          <View key={c} style={styles.credRow}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.blue} />
            <Text style={styles.credText}>{c}</Text>
          </View>
        ))}
      </View>

      {/* Pricing */}
      <View style={styles.pricingRow}>
        <View style={styles.pricingCard}>
          <Ionicons name="people-outline" size={18} color={Colors.primary} />
          <Text style={styles.pricingType}>Group Session</Text>
          <Text style={styles.pricingAmount}>${trainer.groupRate}</Text>
          <Text style={styles.pricingDuration}>{trainer.sessionDuration}</Text>
        </View>
        <View style={styles.pricingDivider} />
        <View style={styles.pricingCard}>
          <Ionicons name="person-outline" size={18} color={Colors.primary} />
          <Text style={styles.pricingType}>Private Session</Text>
          <Text style={styles.pricingAmount}>${trainer.privateRate}</Text>
          <Text style={styles.pricingDuration}>{trainer.sessionDuration}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.enquireBtn} onPress={handleEnquire}>
        <Ionicons name="logo-whatsapp" size={15} color={Colors.white} />
        <Text style={styles.enquireBtnText}>Enquire About Training</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TrainingScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');

  const filtered = useMemo(() => {
    let list = TRAINERS;
    if (search) list = list.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.businessName.toLowerCase().includes(search.toLowerCase()),
    );
    if (specialty !== 'All') list = list.filter((t) =>
      t.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase())),
    );
    return list;
  }, [search, specialty]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Pet Training</Text>
          <Text style={styles.subtitle}>{TRAINERS.length} certified trainers</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={Colors.mediumGray} />
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search trainers..." placeholderTextColor={Colors.mediumGray} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {SPECIALTIES.map((s) => (
          <TouchableOpacity key={s} style={[styles.filterChip, specialty === s && styles.filterChipActive]} onPress={() => setSpecialty(s)}>
            <Text style={[styles.filterChipText, specialty === s && styles.filterChipTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => <TrainerCard trainer={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No trainers match your search.</Text>}
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
  filterChipActive: { backgroundColor: Colors.blue, borderColor: Colors.blue },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.darkGray },
  filterChipTextActive: { color: Colors.white },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 14, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2, overflow: 'hidden' },
  featuredStrip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.blue, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', borderRadius: 20, marginBottom: 10 },
  featuredText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  cardTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.lightGray, flexShrink: 0 },
  trainerInfo: { flex: 1, gap: 3 },
  trainerName: { fontSize: 16, fontWeight: '800', color: Colors.charcoal },
  businessName: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  areasRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  areasText: { fontSize: 11, color: Colors.mediumGray, flex: 1 },
  bio: { fontSize: 13, color: Colors.darkGray, lineHeight: 19, marginBottom: 10 },
  subLabel: { fontSize: 11, fontWeight: '700', color: Colors.charcoal, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6, marginTop: 4 },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  specialtyTag: { backgroundColor: '#E3F2FD', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  specialtyTagText: { fontSize: 11, color: Colors.blue, fontWeight: '600' },
  credentialsWrap: { gap: 4, marginBottom: 12 },
  credRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  credText: { fontSize: 13, color: Colors.darkGray },
  pricingRow: { flexDirection: 'row', backgroundColor: Colors.veryLightGray, borderRadius: 12, padding: 12, marginBottom: 12 },
  pricingCard: { flex: 1, alignItems: 'center', gap: 3 },
  pricingDivider: { width: 1, backgroundColor: Colors.border },
  pricingType: { fontSize: 11, color: Colors.mediumGray, fontWeight: '500' },
  pricingAmount: { fontSize: 22, fontWeight: '800', color: Colors.charcoal },
  pricingDuration: { fontSize: 11, color: Colors.mediumGray },
  enquireBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#25D366', paddingVertical: 12, borderRadius: 12 },
  enquireBtnText: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  empty: { textAlign: 'center', color: Colors.mediumGray, marginTop: 40, fontSize: 14 },
});
