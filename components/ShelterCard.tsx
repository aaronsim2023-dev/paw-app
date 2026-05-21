import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shelter } from '@/data/shelters';
import { Colors } from '@/constants/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SHELTER_COLORS = [
  '#FF8C42', '#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800',
];

interface ShelterCardProps {
  shelter: Shelter;
  index: number;
}

export default function ShelterCard({ shelter, index }: ShelterCardProps) {
  const [expanded, setExpanded] = useState(false);
  const accentColor = SHELTER_COLORS[index % SHELTER_COLORS.length];

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleCall = () => Linking.openURL(`tel:${shelter.phone}`);
  const handleEmail = () => Linking.openURL(`mailto:${shelter.email}`);
  const handleWebsite = () => Linking.openURL(shelter.website);
  const handleMap = () => Linking.openURL(shelter.mapUrl);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={toggleExpand}
      activeOpacity={0.92}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: accentColor + '20' }]}>
            <Ionicons name="home" size={22} color={accentColor} />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.name}>{shelter.name}</Text>
            <View style={styles.tagsRow}>
              {shelter.animalTypes.map((type) => (
                <View key={type} style={[styles.animalTag, { backgroundColor: accentColor + '15' }]}>
                  <Text style={[styles.animalTagText, { color: accentColor }]}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={Colors.mediumGray}
          />
        </View>

        <View style={styles.quickInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={13} color={Colors.mediumGray} />
            <Text style={styles.infoText} numberOfLines={1}>{shelter.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={13} color={Colors.mediumGray} />
            <Text style={styles.infoText}>{shelter.phone}</Text>
          </View>
        </View>

        {expanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.description}>{shelter.description}</Text>

            <View style={styles.hoursSection}>
              <Text style={styles.sectionLabel}>Operating Hours</Text>
              {shelter.operatingHours.map((h, i) => (
                <View key={i} style={styles.hourRow}>
                  <View style={styles.hourDot} />
                  <Text style={styles.hourText}>{h}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: accentColor }]} onPress={handleCall}>
                <Ionicons name="call" size={16} color={Colors.white} />
                <Text style={styles.actionBtnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: accentColor }]} onPress={handleEmail}>
                <Ionicons name="mail-outline" size={16} color={accentColor} />
                <Text style={[styles.actionBtnText, { color: accentColor }]}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: accentColor }]} onPress={handleWebsite}>
                <Ionicons name="globe-outline" size={16} color={accentColor} />
                <Text style={[styles.actionBtnText, { color: accentColor }]}>Website</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: accentColor }]} onPress={handleMap}>
                <Ionicons name="map-outline" size={16} color={accentColor} />
                <Text style={[styles.actionBtnText, { color: accentColor }]}>Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  accentBar: {
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  titleBlock: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  animalTag: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  animalTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  quickInfo: {
    gap: 4,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: Colors.mediumGray,
    flex: 1,
  },
  expandedContent: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  description: {
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 19,
    marginBottom: 12,
  },
  hoursSection: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  hourDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  hourText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionBtnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  actionBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
