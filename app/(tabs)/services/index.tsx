import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  SafeAreaView, FlatList, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SERVICE_CATEGORIES, VET_CLINICS, GROOMERS, BOARDING, PET_PLACES } from '@/data/services';
import { Colors } from '@/constants/colors';
import StarRating from '@/components/StarRating';

const POPULAR = [
  { label: 'Animal Recovery Centre', sub: '24hr Emergency Vet', emoji: '🏥', color: '#F44336', route: '/services/vets' },
  { label: 'The Wagington', sub: 'Luxury Grooming & Boarding', emoji: '✂️', color: '#E91E63', route: '/services/grooming' },
  { label: "Snoopy's Dream Resort", sub: 'Pet Boarding — from $65/night', emoji: '🏨', color: '#9C27B0', route: '/services/boarding' },
  { label: 'East Coast Park', sub: 'Dog Run & Beach', emoji: '📍', color: '#FF5722', route: '/services/places' },
  { label: 'Jake Tan', sub: 'Dog Walker — from $22/walk', emoji: '🐕', color: '#4CAF50', route: '/services/walking' },
];

const NEW_LISTINGS = [
  { label: 'Pawfect Care Insurance', sub: 'New insurer — from $38/month', emoji: '🛡️', route: '/services/insurance' },
  { label: 'Royal Canin on Perromart', sub: 'Up to 15% off this week', emoji: '🛒', route: '/services/supplies' },
  { label: 'David Ng — Train+Walk', sub: 'Trainer-walker combo sessions', emoji: '🎓', route: '/services/walking' },
];

export default function ServicesHome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Services</Text>
            <Text style={styles.subtitle}>Everything your pet needs</Text>
          </View>
          <View style={styles.pawBadge}><Text style={styles.pawEmoji}>🐾</Text></View>
        </View>

        {/* Hero Banner */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>Singapore's Pet Marketplace</Text>
            <Text style={styles.heroTitle}>Find trusted{'\n'}pet services nearby</Text>
            <View style={styles.heroStats}>
              <HeroStat number="50+" label="Listings" />
              <View style={styles.heroDivider} />
              <HeroStat number="8" label="Categories" />
              <View style={styles.heroDivider} />
              <HeroStat number="4.7★" label="Avg Rating" />
            </View>
          </View>
          <Text style={styles.heroIllustration}>🏥✂️🐕🛒</Text>
        </View>

        {/* Category Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
        </View>
        <View style={styles.categoryGrid}>
          {SERVICE_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: cat.bgColor }]}
              onPress={() => router.push(cat.route as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.categoryIconCircle, { backgroundColor: cat.color + '25' }]}>
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={[styles.categoryLabel, { color: cat.color }]}>{cat.label}</Text>
              <Text style={styles.categoryCount}>{cat.count} listings</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Near You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Near You</Text>
          <Text style={styles.sectionSub}>Highly rated</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {POPULAR.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.popularCard, { borderLeftColor: item.color }]}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.popularEmoji}>{item.emoji}</Text>
              <Text style={styles.popularLabel} numberOfLines={1}>{item.label}</Text>
              <Text style={styles.popularSub} numberOfLines={1}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* New on PawFinder */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New on PawFinder</Text>
          <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
        </View>
        <View style={styles.newListings}>
          {NEW_LISTINGS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.newCard}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.newEmoji}>{item.emoji}</Text>
              <View style={styles.newInfo}>
                <Text style={styles.newLabel}>{item.label}</Text>
                <Text style={styles.newSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.mediumGray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Vet Emergency CTA */}
        <TouchableOpacity style={styles.emergencyCta} onPress={() => router.push('/services/vets' as any)}>
          <View style={styles.emergencyIcon}>
            <Text style={{ fontSize: 22 }}>🚨</Text>
          </View>
          <View style={styles.emergencyText}>
            <Text style={styles.emergencyTitle}>24-Hour Emergency Vets</Text>
            <Text style={styles.emergencySub}>3 clinics open now — tap to see all</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.white} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function HeroStat({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.heroStat}>
      <Text style={styles.heroStatNum}>{number}</Text>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scroll: { paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: Colors.charcoal },
  subtitle: { fontSize: 14, color: Colors.mediumGray, marginTop: 2 },
  pawBadge: { width: 46, height: 46, borderRadius: 23, backgroundColor: Colors.primary + '20', alignItems: 'center', justifyContent: 'center' },
  pawEmoji: { fontSize: 22 },
  hero: { marginHorizontal: 20, marginBottom: 24, backgroundColor: Colors.primary, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center' },
  heroContent: { flex: 1 },
  heroEyebrow: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  heroTitle: { color: Colors.white, fontSize: 22, fontWeight: '800', lineHeight: 28, marginBottom: 14 },
  heroStats: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroStat: { alignItems: 'center' },
  heroStatNum: { color: Colors.white, fontSize: 16, fontWeight: '800' },
  heroStatLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 10 },
  heroDivider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.3)' },
  heroIllustration: { fontSize: 32, lineHeight: 40, textAlign: 'center', marginLeft: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.charcoal },
  sectionSub: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  categoryCard: { width: '22%', flexGrow: 1, borderRadius: 14, padding: 12, alignItems: 'center', gap: 6, minWidth: 76 },
  categoryIconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  categoryEmoji: { fontSize: 20 },
  categoryLabel: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  categoryCount: { fontSize: 10, color: Colors.mediumGray, textAlign: 'center' },
  hScroll: { paddingHorizontal: 20, gap: 10, paddingBottom: 4, marginBottom: 24 },
  popularCard: { width: 150, backgroundColor: Colors.white, borderRadius: 14, padding: 14, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  popularEmoji: { fontSize: 24, marginBottom: 8 },
  popularLabel: { fontSize: 13, fontWeight: '700', color: Colors.charcoal, marginBottom: 3 },
  popularSub: { fontSize: 11, color: Colors.mediumGray },
  newBadge: { backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  newBadgeText: { color: Colors.white, fontSize: 10, fontWeight: '800' },
  newListings: { marginHorizontal: 20, gap: 8, marginBottom: 24 },
  newCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  newEmoji: { fontSize: 26 },
  newInfo: { flex: 1 },
  newLabel: { fontSize: 14, fontWeight: '700', color: Colors.charcoal, marginBottom: 2 },
  newSub: { fontSize: 12, color: Colors.mediumGray },
  emergencyCta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, backgroundColor: '#F44336', borderRadius: 16, padding: 16 },
  emergencyIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  emergencyText: { flex: 1 },
  emergencyTitle: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  emergencySub: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
});
