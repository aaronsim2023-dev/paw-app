import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pet } from '@/data/pets';
import { Colors } from '@/constants/colors';

interface PetCardProps {
  pet: Pet;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
  style?: object;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function PetCard({ pet, isFavourite, onToggleFavourite, style }: PetCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => router.push(`/pet/${pet.id}`)}
      activeOpacity={0.88}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pet.photos[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => onToggleFavourite(pet.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavourite ? Colors.red : Colors.white}
          />
        </TouchableOpacity>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{pet.type}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{pet.name}</Text>
        <Text style={styles.breed} numberOfLines={1}>{pet.breed}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={11} color={Colors.mediumGray} />
            <Text style={styles.metaText}>{pet.age}</Text>
          </View>
          <View style={styles.dot} />
          <View style={styles.metaItem}>
            <Ionicons
              name={pet.gender === 'Male' ? 'male-outline' : 'female-outline'}
              size={11}
              color={pet.gender === 'Male' ? Colors.blue : Colors.primaryLight}
            />
            <Text style={styles.metaText}>{pet.gender}</Text>
          </View>
        </View>
        <Text style={styles.shelter} numberOfLines={1}>{pet.shelterName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  typeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 2,
  },
  breed: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 11,
    color: Colors.mediumGray,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 6,
  },
  shelter: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
});
