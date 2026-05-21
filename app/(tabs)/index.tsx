import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { PETS, Pet, AnimalType, ANIMAL_TYPES, Size, Gender } from '@/data/pets';
import { useFavourites } from '@/hooks/useFavourites';
import PetCard from '@/components/PetCard';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import SearchBar from '@/components/SearchBar';
import FilterPills from '@/components/FilterPills';
import { Colors } from '@/constants/colors';

type SortOption = 'name' | 'age_asc' | 'age_desc';

interface Filters {
  animalType: AnimalType | null;
  gender: Gender | null;
  size: Size | null;
  vaccinated: boolean | null;
  sterilised: boolean | null;
}

const DEFAULT_FILTERS: Filters = {
  animalType: null,
  gender: null,
  size: null,
  vaccinated: null,
  sterilised: null,
};

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  const featuredPets = useMemo(() => PETS.filter((p) => p.featured), []);

  const animalCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PETS.forEach((p) => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredPets = useMemo(() => {
    let result = [...PETS];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.breed.toLowerCase().includes(q) ||
          p.shelterName.toLowerCase().includes(q),
      );
    }

    if (filters.animalType) result = result.filter((p) => p.type === filters.animalType);
    if (filters.gender) result = result.filter((p) => p.gender === filters.gender);
    if (filters.size) result = result.filter((p) => p.size === filters.size);
    if (filters.vaccinated !== null) result = result.filter((p) => p.vaccinated === filters.vaccinated);
    if (filters.sterilised !== null) result = result.filter((p) => p.sterilised === filters.sterilised);

    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'age_asc') result.sort((a, b) => a.ageMonths - b.ageMonths);
    else if (sortBy === 'age_desc') result.sort((a, b) => b.ageMonths - a.ageMonths);

    return result;
  }, [search, filters, sortBy]);

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((v) => v !== null).length,
    [filters],
  );

  const openFilterModal = () => {
    setTempFilters({ ...filters });
    setShowFilterModal(true);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setTempFilters(DEFAULT_FILTERS);
  };

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

  const ListHeader = useMemo(
    () => (
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello! 👋</Text>
            <Text style={styles.headline}>Find Your Forever Friend</Text>
          </View>
          <View style={styles.pawIcon}>
            <Text style={styles.pawEmoji}>🐾</Text>
          </View>
        </View>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          onFilterPress={openFilterModal}
        />

        <FilterPills
          selected={filters.animalType}
          onSelect={(type) => setFilters((f) => ({ ...f, animalType: type }))}
          counts={animalCounts}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Pets</Text>
          <Text style={styles.sectionSub}>{featuredPets.length} available</Text>
        </View>

        <FeaturedCarousel
          pets={featuredPets}
          favourites={favourites}
          onToggleFavourite={toggleFavourite}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Pets</Text>
          <View style={styles.sortRow}>
            <Text style={styles.resultCount}>{filteredPets.length} results</Text>
            <TouchableOpacity
              style={styles.sortBtn}
              onPress={() => {
                const opts: SortOption[] = ['name', 'age_asc', 'age_desc'];
                const next = opts[(opts.indexOf(sortBy) + 1) % opts.length];
                setSortBy(next);
              }}
            >
              <Ionicons name="swap-vertical-outline" size={14} color={Colors.primary} />
              <Text style={styles.sortText}>
                {sortBy === 'name' ? 'Name' : sortBy === 'age_asc' ? 'Youngest' : 'Oldest'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeFilterCount > 0 && (
          <View style={styles.activeFiltersRow}>
            <Text style={styles.activeFiltersText}>{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</Text>
            <TouchableOpacity onPress={() => setFilters(DEFAULT_FILTERS)}>
              <Text style={styles.clearFiltersText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ),
    [search, filters, animalCounts, featuredPets, favourites, toggleFavourite, filteredPets.length, sortBy, activeFilterCount],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No pets found</Text>
            <Text style={styles.emptyText}>Try adjusting your search or filters</Text>
          </View>
        }
      />

      <Modal
        visible={showFilterModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={24} color={Colors.charcoal} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <FilterSection title="Animal Type">
              <View style={styles.filterGrid}>
                {ANIMAL_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.filterChip, tempFilters.animalType === type && styles.filterChipActive]}
                    onPress={() =>
                      setTempFilters((f) => ({
                        ...f,
                        animalType: f.animalType === type ? null : type,
                      }))
                    }
                  >
                    <Text style={[styles.filterChipText, tempFilters.animalType === type && styles.filterChipTextActive]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </FilterSection>

            <FilterSection title="Gender">
              <View style={styles.filterRow}>
                {(['Male', 'Female'] as Gender[]).map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.filterChip, tempFilters.gender === g && styles.filterChipActive]}
                    onPress={() =>
                      setTempFilters((f) => ({ ...f, gender: f.gender === g ? null : g }))
                    }
                  >
                    <Ionicons
                      name={g === 'Male' ? 'male-outline' : 'female-outline'}
                      size={14}
                      color={tempFilters.gender === g ? Colors.white : Colors.darkGray}
                    />
                    <Text style={[styles.filterChipText, tempFilters.gender === g && styles.filterChipTextActive]}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </FilterSection>

            <FilterSection title="Size">
              <View style={styles.filterRow}>
                {(['Small', 'Medium', 'Large'] as Size[]).map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.filterChip, tempFilters.size === s && styles.filterChipActive]}
                    onPress={() =>
                      setTempFilters((f) => ({ ...f, size: f.size === s ? null : s }))
                    }
                  >
                    <Text style={[styles.filterChipText, tempFilters.size === s && styles.filterChipTextActive]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </FilterSection>

            <FilterSection title="Health Status">
              <View style={styles.filterRow}>
                <TouchableOpacity
                  style={[styles.filterChip, tempFilters.vaccinated === true && styles.filterChipActive]}
                  onPress={() =>
                    setTempFilters((f) => ({ ...f, vaccinated: f.vaccinated === true ? null : true }))
                  }
                >
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={14}
                    color={tempFilters.vaccinated === true ? Colors.white : Colors.darkGray}
                  />
                  <Text style={[styles.filterChipText, tempFilters.vaccinated === true && styles.filterChipTextActive]}>
                    Vaccinated
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterChip, tempFilters.sterilised === true && styles.filterChipActive]}
                  onPress={() =>
                    setTempFilters((f) => ({ ...f, sterilised: f.sterilised === true ? null : true }))
                  }
                >
                  <Ionicons
                    name="medical-outline"
                    size={14}
                    color={tempFilters.sterilised === true ? Colors.white : Colors.darkGray}
                  />
                  <Text style={[styles.filterChipText, tempFilters.sterilised === true && styles.filterChipTextActive]}>
                    Sterilised
                  </Text>
                </TouchableOpacity>
              </View>
            </FilterSection>

            <FilterSection title="Sort By">
              <View style={styles.filterRow}>
                {[
                  { value: 'name', label: 'Name A–Z' },
                  { value: 'age_asc', label: 'Youngest First' },
                  { value: 'age_desc', label: 'Oldest First' },
                ].map(({ value, label }) => (
                  <TouchableOpacity
                    key={value}
                    style={[styles.filterChip, sortBy === value && styles.filterChipActive]}
                    onPress={() => setSortBy(value as SortOption)}
                  >
                    <Text style={[styles.filterChipText, sortBy === value && styles.filterChipTextActive]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </FilterSection>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
              <Text style={styles.applyBtnText}>Show Results</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  listContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginBottom: 2,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  pawIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pawEmoji: {
    fontSize: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  sectionSub: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultCount: {
    fontSize: 13,
    color: Colors.mediumGray,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.primary + '15',
    borderRadius: 20,
  },
  sortText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  activeFiltersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary + '15',
    borderRadius: 10,
  },
  activeFiltersText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  clearFiltersText: {
    fontSize: 13,
    color: Colors.primaryDark,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  resetText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
  },
  modalBody: {
    flex: 1,
    paddingTop: 8,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
    backgroundColor: Colors.veryLightGray,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  applyBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
