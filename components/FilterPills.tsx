import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimalType } from '@/data/pets';
import { Colors } from '@/constants/colors';

const ANIMAL_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Dog: 'paw',
  Cat: 'paw',
  Rabbit: 'paw',
  Bird: 'paw',
  Reptile: 'paw',
  Hamster: 'paw',
  Other: 'ellipsis-horizontal',
};

const ANIMAL_EMOJIS: Record<string, string> = {
  Dog: '🐶',
  Cat: '🐱',
  Rabbit: '🐰',
  Bird: '🐦',
  Reptile: '🦎',
  Hamster: '🐹',
  Other: '🐾',
};

interface FilterPillsProps {
  selected: AnimalType | null;
  onSelect: (type: AnimalType | null) => void;
  counts: Record<string, number>;
}

const TYPES: AnimalType[] = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile', 'Hamster', 'Other'];

export default function FilterPills({ selected, onSelect, counts }: FilterPillsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[styles.pill, !selected && styles.pillActive]}
        onPress={() => onSelect(null)}
      >
        <Text style={[styles.pillText, !selected && styles.pillTextActive]}>
          All
        </Text>
      </TouchableOpacity>
      {TYPES.map((type) => {
        const isActive = selected === type;
        return (
          <TouchableOpacity
            key={type}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onSelect(isActive ? null : type)}
          >
            <Text style={styles.emoji}>{ANIMAL_EMOJIS[type]}</Text>
            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
              {type}s
            </Text>
            {counts[type] !== undefined && (
              <View style={[styles.countBadge, isActive && styles.countBadgeActive]}>
                <Text style={[styles.countText, isActive && styles.countTextActive]}>
                  {counts[type]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: Colors.veryLightGray,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  emoji: {
    fontSize: 14,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  pillTextActive: {
    color: Colors.white,
  },
  countBadge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  countBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.mediumGray,
  },
  countTextActive: {
    color: Colors.white,
  },
});
