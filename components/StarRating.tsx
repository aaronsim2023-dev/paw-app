import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
  compact?: boolean;
}

export default function StarRating({ rating, reviewCount, size = 13, showCount = true, compact = false }: StarRatingProps) {
  const filled = Math.floor(rating);
  const hasHalf = rating - filled >= 0.5;

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= filled ? 'star' : hasHalf && i === filled + 1 ? 'star-half' : 'star-outline'}
          size={size}
          color={Colors.primary}
        />
      ))}
      {!compact && (
        <Text style={[styles.ratingText, { fontSize: size }]}>{rating.toFixed(1)}</Text>
      )}
      {showCount && reviewCount !== undefined && (
        <Text style={[styles.countText, { fontSize: size - 1 }]}>({reviewCount})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: Colors.charcoal,
    fontWeight: '700',
    marginLeft: 3,
  },
  countText: {
    color: Colors.mediumGray,
    marginLeft: 1,
  },
});
