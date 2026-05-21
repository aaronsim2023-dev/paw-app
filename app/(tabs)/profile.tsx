import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HDB_APPROVED_BREEDS = [
  'Affenpinscher', 'Australian Silky Terrier', 'Bichon Frise', 'Bohemian Terrier',
  'Brussels Griffon', 'Cairn Terrier', 'Cavalier King Charles Spaniel', 'Chihuahua',
  'Chinese Crested Dog', 'Chinese Imperial Chin', 'Cocker Spaniel (American)',
  'Cocker Spaniel (English)', 'Dachshund', 'English Toy Spaniel', 'Griffon Belge',
  'Griffon Bruxellois', 'Hairless Dog', 'Havanese', 'Italian Greyhound',
  'Japanese Spaniel / Chin', 'Japanese Spitz', 'King Charles Spaniel', 'Lhasa Apso',
  'Maltese', 'Manchester Terrier', 'Miniature Pinscher', 'Miniature Schnauzer',
  'Norfolk Terrier', 'Norwich Terrier', 'Papillon', 'Pekingese', 'Pomeranian',
  'Poodle (Miniature)', 'Poodle (Toy)', 'Pug', 'Sealyham Terrier', 'Shih Tzu',
  'Silky Terrier', 'Skye Terrier', 'Toy Fox Terrier', 'Toy Manchester Terrier',
  'West Highland White Terrier', 'Yorkshire Terrier',
];

const CHECKLIST_ITEMS = [
  { id: '1', text: 'Check if your housing type allows pets (HDB/condo rules)', icon: 'home-outline' as const },
  { id: '2', text: 'Obtain HDB approval if living in a flat (for dogs)', icon: 'document-text-outline' as const },
  { id: '3', text: 'Budget for food, vet, grooming, and boarding costs', icon: 'wallet-outline' as const },
  { id: '4', text: 'Research the specific care needs of your chosen animal', icon: 'book-outline' as const },
  { id: '5', text: 'Pet-proof your home (remove hazards, secure spaces)', icon: 'shield-outline' as const },
  { id: '6', text: 'Identify a reliable vet near your home', icon: 'medkit-outline' as const },
  { id: '7', text: 'License your dog with the AVS within 30 days of adoption', icon: 'card-outline' as const },
  { id: '8', text: 'Arrange for pet care when travelling', icon: 'airplane-outline' as const },
  { id: '9', text: 'Ensure all family members agree on adopting a pet', icon: 'people-outline' as const },
  { id: '10', text: 'Prepare food, bedding, toys, and carrier before bringing pet home', icon: 'basket-outline' as const },
];

interface AccordionSectionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  children: React.ReactNode;
}

function AccordionSection({ title, icon, iconColor = Colors.primary, children }: AccordionSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={accordionStyles.container}>
      <TouchableOpacity
        style={accordionStyles.header}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen(!open);
        }}
        activeOpacity={0.8}
      >
        <View style={[accordionStyles.iconBox, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <Text style={accordionStyles.title}>{title}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.mediumGray} />
      </TouchableOpacity>
      {open && <View style={accordionStyles.body}>{children}</View>}
    </View>
  );
}

export default function ProfileScreen() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showAllBreeds, setShowAllBreeds] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const visibleBreeds = showAllBreeds ? HDB_APPROVED_BREEDS : HDB_APPROVED_BREEDS.slice(0, 12);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Guide & Resources</Text>
          <Text style={styles.subtitle}>Everything you need to adopt in Singapore</Text>
        </View>

        <View style={styles.heroBanner}>
          <Text style={styles.heroBannerEmoji}>🐾</Text>
          <View style={styles.heroBannerText}>
            <Text style={styles.heroBannerTitle}>Ready to Adopt?</Text>
            <Text style={styles.heroBannerSub}>
              Singapore has specific rules for pet ownership. Let us guide you through the process.
            </Text>
          </View>
        </View>

        <AccordionSection title="Adoption Checklist" icon="checkmark-circle-outline" iconColor="#4CAF50">
          <View style={styles.checklistProgress}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${(checkedCount / CHECKLIST_ITEMS.length) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {checkedCount}/{CHECKLIST_ITEMS.length} completed
            </Text>
          </View>
          {CHECKLIST_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistItem}
              onPress={() => toggleCheck(item.id)}
            >
              <View style={[styles.checkbox, checkedItems[item.id] && styles.checkboxChecked]}>
                {checkedItems[item.id] && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
              <Ionicons name={item.icon} size={16} color={Colors.mediumGray} style={styles.itemIcon} />
              <Text style={[styles.checklistText, checkedItems[item.id] && styles.checklistTextDone]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </AccordionSection>

        <AccordionSection title="HDB Approved Dog Breeds" icon="paw-outline" iconColor={Colors.primary}>
          <Text style={styles.infoText}>
            If you live in an HDB flat, you may only keep one of the following 44 approved small dog breeds.
            Each dog must also be licensed with the Animal & Veterinary Service (AVS).
          </Text>
          <View style={styles.breedGrid}>
            {visibleBreeds.map((breed) => (
              <View key={breed} style={styles.breedChip}>
                <Text style={styles.breedChipText}>{breed}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.showMoreBtn}
            onPress={() => setShowAllBreeds(!showAllBreeds)}
          >
            <Text style={styles.showMoreText}>
              {showAllBreeds ? 'Show Less' : `Show all ${HDB_APPROVED_BREEDS.length} breeds`}
            </Text>
            <Ionicons
              name={showAllBreeds ? 'chevron-up' : 'chevron-down'}
              size={14}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </AccordionSection>

        <AccordionSection title="AVS Licensing Requirements" icon="document-text-outline" iconColor="#2196F3">
          <View style={styles.infoCard}>
            <Ionicons name="alert-circle-outline" size={18} color="#2196F3" />
            <Text style={styles.infoCardText}>
              All dogs in Singapore must be licensed with AVS (Animal & Veterinary Service) within 30 days of acquisition.
            </Text>
          </View>
          <InfoItem icon="card-outline" title="Dog Licence" text="Apply via the AVS website or SingPass. Annual renewal required. Fee: $15/year for sterilised dogs, $90/year for unsterilised dogs." />
          <InfoItem icon="paw-outline" title="Microchipping" text="All dogs and cats must be microchipped. This is usually done before adoption. Cost is covered by most shelters." />
          <InfoItem icon="shield-checkmark-outline" title="Vaccination" text="Dogs must be vaccinated against rabies and distemper. Keep records up to date." />
          <InfoItem icon="home-outline" title="HDB Flats" text="One dog from the approved breed list only. Written HDB approval required before keeping the dog." />
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => Linking.openURL('https://www.nparks.gov.sg/avs/pets/owning-a-pet/getting-a-pet/getting-a-dog')}
          >
            <Text style={styles.linkBtnText}>Visit AVS Official Website</Text>
            <Ionicons name="open-outline" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </AccordionSection>

        <AccordionSection title="Tips for First-Time Pet Owners" icon="bulb-outline" iconColor="#FF9800">
          <TipCard
            emoji="🏠"
            title="Prepare your home first"
            text="Before bringing your pet home, remove hazards, set up their space, and stock up on essentials: food, water bowls, bedding, toys, and a carrier."
          />
          <TipCard
            emoji="🩺"
            title="Register with a vet early"
            text="Find a vet near you before you need one. Schedule a health check within the first week. Keep all vaccination and health records safe."
          />
          <TipCard
            emoji="⏰"
            title="Be patient during adjustment"
            text="New pets need time to settle in. Give them space to explore at their own pace. It can take days to weeks for a pet to feel at home."
          />
          <TipCard
            emoji="🤝"
            title="Socialise gradually"
            text="Introduce your pet to family members, sounds, and environments slowly. Positive reinforcement builds confidence and trust."
          />
          <TipCard
            emoji="📅"
            title="Create a routine"
            text="Pets thrive on routine. Set consistent feeding times, exercise schedules, and sleep areas. Predictability reduces stress for your pet."
          />
          <TipCard
            emoji="💰"
            title="Budget for ongoing costs"
            text="Budget $100–$300/month for food, routine vet visits, grooming, and supplies. Set aside an emergency fund of $1,000–$2,000 for unexpected vet bills."
          />
        </AccordionSection>

        <AccordionSection title="Useful Singapore Resources" icon="globe-outline" iconColor="#9C27B0">
          {[
            { name: 'Animal & Veterinary Service (AVS)', url: 'https://www.nparks.gov.sg/avs', icon: 'business-outline' as const },
            { name: 'SPCA Singapore', url: 'https://www.spca.org.sg', icon: 'home-outline' as const },
            { name: 'Cat Welfare Society', url: 'https://www.catwelfare.org', icon: 'home-outline' as const },
            { name: 'Action for Singapore Dogs', url: 'https://www.asd.org.sg', icon: 'home-outline' as const },
            { name: 'SOSD', url: 'https://www.sosd.org.sg', icon: 'home-outline' as const },
            { name: 'Bunny Wonderland Singapore', url: 'https://www.bunnywonderland.com', icon: 'home-outline' as const },
          ].map(({ name, url, icon }) => (
            <TouchableOpacity
              key={name}
              style={styles.resourceItem}
              onPress={() => Linking.openURL(url)}
            >
              <Ionicons name={icon} size={16} color={Colors.mediumGray} />
              <Text style={styles.resourceName}>{name}</Text>
              <Ionicons name="open-outline" size={14} color={Colors.primary} />
            </TouchableOpacity>
          ))}
        </AccordionSection>

        <View style={styles.appInfo}>
          <Text style={styles.appName}>🐾 PawFinder SG</Text>
          <Text style={styles.appTagline}>Find your forever friend</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoItem({ icon, title, text }: { icon: keyof typeof Ionicons.glyphMap; title: string; text: string }) {
  return (
    <View style={infoItemStyles.container}>
      <View style={infoItemStyles.iconRow}>
        <Ionicons name={icon} size={15} color={Colors.primary} />
        <Text style={infoItemStyles.title}>{title}</Text>
      </View>
      <Text style={infoItemStyles.text}>{text}</Text>
    </View>
  );
}

function TipCard({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <View style={tipStyles.card}>
      <Text style={tipStyles.emoji}>{emoji}</Text>
      <View style={tipStyles.content}>
        <Text style={tipStyles.title}>{title}</Text>
        <Text style={tipStyles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollContent: {
    paddingBottom: 40,
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
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 18,
  },
  heroBannerEmoji: {
    fontSize: 36,
  },
  heroBannerText: {
    flex: 1,
  },
  heroBannerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  heroBannerSub: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    lineHeight: 18,
  },
  checklistProgress: {
    marginBottom: 14,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.mediumGray,
    textAlign: 'right',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  itemIcon: {
    flexShrink: 0,
  },
  checklistText: {
    flex: 1,
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 18,
  },
  checklistTextDone: {
    color: Colors.mediumGray,
    textDecorationLine: 'line-through',
  },
  infoText: {
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 19,
    marginBottom: 12,
  },
  breedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  breedChip: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  breedChipText: {
    fontSize: 11,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  showMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  showMoreText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#2196F315',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2196F330',
  },
  infoCardText: {
    flex: 1,
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 18,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  linkBtnText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resourceName: {
    flex: 1,
    fontSize: 13,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  appVersion: {
    fontSize: 12,
    color: Colors.lightGray,
  },
});

const accordionStyles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});

const infoItemStyles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    marginTop: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  text: {
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 19,
    paddingLeft: 21,
  },
});

const tipStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  emoji: {
    fontSize: 28,
    flexShrink: 0,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 19,
  },
});
