import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pet } from '@/data/pets';
import { Colors } from '@/constants/colors';

interface FeaturedCarouselProps {
  pets: Pet[];
  favourites: string[];
  onToggleFavourite: (id: string) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

export default function FeaturedCarousel({ pets, favourites, onToggleFavourite }: FeaturedCarouselProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 12}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={styles.card}
            onPress={() => router.push(`/pet/${pet.id}`)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: pet.photos[0] }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <TouchableOpacity
              style={styles.heartBtn}
              onPress={() => onToggleFavourite(pet.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={favourites.includes(pet.id) ? 'heart' : 'heart-outline'}
                size={22}
                color={favourites.includes(pet.id) ? Colors.red : Colors.white}
              />
            </TouchableOpacity>
            <View style={styles.cardContent}>
              <View style={styles.featuredBadge}>
                <Ionicons name="star" size={10} color={Colors.white} />
                <Text style={styles.featuredText}>Featured</Text>
              </View>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>{pet.breed}</Text>
              <View style={styles.petMeta}>
                <View style={styles.metaChip}>
                  <Text style={styles.metaChipText}>{pet.age}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Text style={styles.metaChipText}>{pet.gender}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Text style={styles.metaChipText}>{pet.size}</Text>
                </View>
              </View>
              <View style={styles.shelterRow}>
                <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.8)" />
                <Text style={styles.shelterText}>{pet.shelterName}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {pets.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heartBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 6,
  },
  featuredText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  petName: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  petBreed: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginBottom: 8,
  },
  petMeta: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  metaChip: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  metaChipText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  shelterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shelterText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.lightGray,
  },
  dotActive: {
    width: 18,
    backgroundColor: Colors.primary,
  },
});
