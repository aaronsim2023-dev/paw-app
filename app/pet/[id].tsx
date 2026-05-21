import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Alert,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PETS } from '@/data/pets';
import { SHELTERS } from '@/data/shelters';
import { useFavourites } from '@/hooks/useFavourites';
import { Colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavourite, toggleFavourite } = useFavourites();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const pet = PETS.find((p) => p.id === id);
  const shelter = pet ? SHELTERS.find((s) => s.id === pet.shelterId) : null;

  if (!pet) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={styles.notFoundText}>Pet not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const fav = isFavourite(pet.id);

  const handleAdopt = () => {
    Alert.alert(
      `Enquire about ${pet.name}`,
      'How would you like to contact the shelter?',
      [
        {
          text: 'WhatsApp',
          onPress: () => {
            const phone = shelter?.phone.replace(/\D/g, '') || '';
            const msg = encodeURIComponent(
              `Hi! I'm interested in adopting ${pet.name} (${pet.breed}) from PawFinder SG. Could you share more details about the adoption process?`,
            );
            Linking.openURL(`https://wa.me/${phone}?text=${msg}`);
          },
        },
        {
          text: 'Email',
          onPress: () => {
            const subject = encodeURIComponent(`Adoption Enquiry: ${pet.name}`);
            const body = encodeURIComponent(
              `Hello,\n\nI found ${pet.name} (${pet.breed}, ${pet.age}, ${pet.gender}) on PawFinder SG and would like to enquire about adopting them.\n\nCould you please share more details about the adoption process and requirements?\n\nThank you!`,
            );
            Linking.openURL(`mailto:${shelter?.email}?subject=${subject}&body=${body}`);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActivePhotoIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        {/* Photo Gallery */}
        <View style={styles.gallery}>
          <FlatList
            data={pet.photos}
            keyExtractor={(_, i) => String(i)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.photo} resizeMode="cover" />
            )}
          />

          {/* Navigation overlay */}
          <SafeAreaView style={styles.galleryOverlay} pointerEvents="box-none">
            <View style={styles.galleryTopRow}>
              <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.heartBtnLarge, fav && styles.heartBtnLargeActive]}
                onPress={() => toggleFavourite(pet.id)}
              >
                <Ionicons
                  name={fav ? 'heart' : 'heart-outline'}
                  size={22}
                  color={fav ? Colors.white : Colors.white}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Dots */}
          {pet.photos.length > 1 && (
            <View style={styles.photoDots}>
              {pet.photos.map((_, i) => (
                <View key={i} style={[styles.photoDot, i === activePhotoIndex && styles.photoDotActive]} />
              ))}
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Name & Basics */}
          <View style={styles.nameRow}>
            <View style={styles.nameBlock}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>{pet.breed}</Text>
            </View>
            <View style={[styles.typeBadgeLarge, { backgroundColor: Colors.primary }]}>
              <Text style={styles.typeBadgeText}>{pet.type}</Text>
            </View>
          </View>

          {/* Stats grid */}
          <View style={styles.statsGrid}>
            <StatItem icon="calendar-outline" label="Age" value={pet.age} />
            <StatItem
              icon={pet.gender === 'Male' ? 'male-outline' : 'female-outline'}
              label="Gender"
              value={pet.gender}
              iconColor={pet.gender === 'Male' ? Colors.blue : Colors.primaryLight}
            />
            <StatItem icon="resize-outline" label="Size" value={pet.size} />
            <StatItem icon="color-palette-outline" label="Color" value={pet.color} />
          </View>

          {/* Health badges */}
          <View style={styles.healthRow}>
            <HealthBadge
              icon="shield-checkmark-outline"
              label="Vaccinated"
              active={pet.vaccinated}
            />
            <HealthBadge
              icon="medical-outline"
              label="Sterilised"
              active={pet.sterilised}
            />
          </View>

          {/* Personality */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personality</Text>
            <View style={styles.personalityTags}>
              {pet.personalities.map((tag) => (
                <View key={tag} style={styles.personalityTag}>
                  <Text style={styles.personalityTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About {pet.name}</Text>
            <Text style={styles.description}>{pet.description}</Text>
          </View>

          {/* Shelter info */}
          {shelter && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shelter</Text>
              <View style={styles.shelterCard}>
                <View style={styles.shelterHeader}>
                  <View style={styles.shelterIconCircle}>
                    <Ionicons name="home" size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.shelterInfo}>
                    <Text style={styles.shelterName}>{shelter.name}</Text>
                    <View style={styles.shelterAddrRow}>
                      <Ionicons name="location-outline" size={12} color={Colors.mediumGray} />
                      <Text style={styles.shelterAddr}>{shelter.address}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.shelterActions}>
                  <TouchableOpacity
                    style={styles.shelterActionBtn}
                    onPress={() => Linking.openURL(`tel:${shelter.phone}`)}
                  >
                    <Ionicons name="call-outline" size={15} color={Colors.primary} />
                    <Text style={styles.shelterActionText}>{shelter.phone}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.shelterActionBtn}
                    onPress={() => Linking.openURL(shelter.mapUrl)}
                  >
                    <Ionicons name="map-outline" size={15} color={Colors.primary} />
                    <Text style={styles.shelterActionText}>View Map</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.hoursBlock}>
                  <Text style={styles.hoursLabel}>Operating Hours</Text>
                  {shelter.operatingHours.map((h, i) => (
                    <Text key={i} style={styles.hoursText}>• {h}</Text>
                  ))}
                </View>
              </View>
            </View>
          )}

          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      {/* Fixed Adopt Button */}
      <View style={styles.adoptBar}>
        <TouchableOpacity
          style={[styles.heartBtnBottom, fav && styles.heartBtnBottomActive]}
          onPress={() => toggleFavourite(pet.id)}
        >
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={22} color={fav ? Colors.white : Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.adoptBtn} onPress={handleAdopt}>
          <Ionicons name="paw" size={18} color={Colors.white} />
          <Text style={styles.adoptBtnText}>Enquire to Adopt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatItem({
  icon,
  label,
  value,
  iconColor = Colors.primary,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  iconColor?: string;
}) {
  return (
    <View style={statStyles.container}>
      <View style={[statStyles.iconCircle, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={statStyles.label}>{label}</Text>
      <Text style={statStyles.value}>{value}</Text>
    </View>
  );
}

function HealthBadge({ icon, label, active }: { icon: keyof typeof Ionicons.glyphMap; label: string; active: boolean }) {
  return (
    <View style={[healthStyles.badge, active ? healthStyles.badgeActive : healthStyles.badgeInactive]}>
      <Ionicons
        name={active ? icon : 'close-circle-outline'}
        size={16}
        color={active ? '#4CAF50' : Colors.mediumGray}
      />
      <Text style={[healthStyles.text, active ? healthStyles.textActive : healthStyles.textInactive]}>
        {active ? `✓ ${label}` : `✗ Not ${label}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.charcoal,
    marginBottom: 8,
  },
  backLink: {
    color: Colors.primary,
    fontSize: 15,
  },
  gallery: {
    width,
    height: width * 1.1,
    position: 'relative',
  },
  photo: {
    width,
    height: width * 1.1,
  },
  galleryOverlay: {
    ...StyleSheet.absoluteFill,
  },
  galleryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 44 : 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBtnLarge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBtnLargeActive: {
    backgroundColor: Colors.red,
  },
  photoDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  photoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  photoDotActive: {
    width: 18,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  nameBlock: {
    flex: 1,
    marginRight: 12,
  },
  petName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 3,
  },
  petBreed: {
    fontSize: 15,
    color: Colors.mediumGray,
    fontWeight: '500',
  },
  typeBadgeLarge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  typeBadgeText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: Colors.veryLightGray,
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  healthRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 10,
  },
  personalityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  personalityTag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.primary + '18',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  personalityTagText: {
    fontSize: 13,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: Colors.darkGray,
    lineHeight: 24,
  },
  shelterCard: {
    backgroundColor: Colors.veryLightGray,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shelterHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  shelterIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  shelterInfo: {
    flex: 1,
  },
  shelterName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  shelterAddrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shelterAddr: {
    fontSize: 12,
    color: Colors.mediumGray,
    flex: 1,
  },
  shelterActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  shelterActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  shelterActionText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  hoursBlock: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
  },
  hoursLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  hoursText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 2,
  },
  bottomPadding: {
    height: 100,
  },
  adoptBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  heartBtnBottom: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBtnBottomActive: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  adoptBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  adoptBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

const statStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    color: Colors.mediumGray,
    fontWeight: '500',
  },
  value: {
    fontSize: 12,
    color: Colors.charcoal,
    fontWeight: '700',
    textAlign: 'center',
  },
});

const healthStyles = StyleSheet.create({
  badge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  badgeActive: {
    backgroundColor: '#4CAF5015',
    borderColor: '#4CAF5040',
  },
  badgeInactive: {
    backgroundColor: Colors.veryLightGray,
    borderColor: Colors.border,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textActive: {
    color: '#4CAF50',
  },
  textInactive: {
    color: Colors.mediumGray,
  },
});
