import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SHELTERS } from '@/data/shelters';
import ShelterCard from '@/components/ShelterCard';
import { Colors } from '@/constants/colors';

export default function SheltersScreen() {
  const [search, setSearch] = useState('');

  const filtered = SHELTERS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.animalTypes.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Shelters & Rescues</Text>
        <Text style={styles.subtitle}>Singapore's animal welfare organisations</Text>
      </View>

      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={17} color={Colors.mediumGray} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search shelters..."
          placeholderTextColor={Colors.mediumGray}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{SHELTERS.length}</Text>
          <Text style={styles.statLabel}>Organisations</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>🐾</Text>
          <Text style={styles.statLabel}>Saving Lives</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>🇸🇬</Text>
          <Text style={styles.statLabel}>Singapore</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>Tap any shelter to view details</Text>
        {filtered.map((shelter, i) => (
          <ShelterCard key={shelter.id} shelter={shelter} index={i} />
        ))}

        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.footerText}>
              Know of a shelter not listed here? Help us grow our directory by submitting via the Profile tab.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.charcoal,
    padding: 0,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.mediumGray,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: 12,
    color: Colors.mediumGray,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.primary + '12',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 19,
  },
});
