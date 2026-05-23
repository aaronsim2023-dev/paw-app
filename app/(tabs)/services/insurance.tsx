import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  SafeAreaView, Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { INSURANCE_PLANS, InsurancePlan } from '@/data/services';
import { Colors } from '@/constants/colors';

type PetType = 'dog' | 'cat' | 'rabbit' | 'bird';
type AgeGroup = 'young' | 'adult' | 'senior';
type BreedSize = 'small' | 'medium' | 'large';

const AGE_MULTIPLIERS: Record<AgeGroup, number> = { young: 1.0, adult: 1.3, senior: 1.85 };
const SIZE_MULTIPLIERS: Record<BreedSize, number> = { small: 1.0, medium: 1.2, large: 1.45 };
const COVERAGE_LABELS: Record<string, string> = {
  accident: 'Accidents', illness: 'Illness', surgery: 'Surgery',
  dental: 'Dental', preventive: 'Preventive Care', liability: '3rd Party Liability', boarding: 'Emergency Boarding',
};

function CoverageCell({ covered }: { covered: boolean }) {
  return (
    <View style={[styles.coverCell, covered ? styles.coverCellYes : styles.coverCellNo]}>
      <Ionicons name={covered ? 'checkmark' : 'close'} size={14} color={covered ? '#4CAF50' : Colors.lightGray} />
    </View>
  );
}

function PlanCard({ plan, premium, selected, onSelect }: {
  plan: InsurancePlan;
  premium: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.planCard, selected && { borderColor: plan.color, borderWidth: 2 }, plan.recommended && styles.planCardRecommended]}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      {plan.recommended && (
        <View style={[styles.recommendedBadge, { backgroundColor: plan.color }]}>
          <Text style={styles.recommendedText}>⭐ Most Popular</Text>
        </View>
      )}
      <View style={styles.planHeader}>
        <View style={[styles.planIconCircle, { backgroundColor: plan.color + '20' }]}>
          <Text style={{ fontSize: 20 }}>🛡️</Text>
        </View>
        <View style={styles.planTitleBlock}>
          <Text style={[styles.planInsurer, { color: plan.color }]}>{plan.insurer}</Text>
          <Text style={styles.planName}>{plan.planName}</Text>
          <Text style={styles.planTagline}>{plan.tagline}</Text>
        </View>
        <View style={[styles.selectCircle, selected && { backgroundColor: plan.color, borderColor: plan.color }]}>
          {selected && <Ionicons name="checkmark" size={14} color={Colors.white} />}
        </View>
      </View>

      <View style={[styles.premiumRow, { backgroundColor: plan.color + '12' }]}>
        <Text style={styles.premiumLabel}>Est. Monthly Premium</Text>
        <Text style={[styles.premiumAmount, { color: plan.color }]}>${premium.toFixed(0)}<Text style={styles.premiumUnit}>/mo</Text></Text>
      </View>

      <View style={styles.planStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${(plan.annualLimit / 1000).toFixed(0)}k</Text>
          <Text style={styles.statLabel}>Annual Limit</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${plan.deductible}</Text>
          <Text style={styles.statLabel}>Deductible</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{plan.reimbursementRate}%</Text>
          <Text style={styles.statLabel}>Reimbursement</Text>
        </View>
      </View>

      <View style={styles.featuresWrap}>
        {plan.features.map((f) => (
          <View key={f} style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={14} color={plan.color} />
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.quoteBtn, { backgroundColor: plan.color }]} onPress={() => Linking.openURL(plan.url)}>
        <Text style={styles.quoteBtnText}>Get Quote</Text>
        <Ionicons name="open-outline" size={14} color={Colors.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function InsuranceScreen() {
  const router = useRouter();
  const [petType, setPetType] = useState<PetType>('dog');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
  const [breedSize, setBreedSize] = useState<BreedSize>('medium');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const premiums = useMemo(() =>
    INSURANCE_PLANS.reduce((acc, plan) => {
      const base = plan.basePremium[petType];
      const ageMult = AGE_MULTIPLIERS[ageGroup];
      const sizeMult = petType === 'dog' ? SIZE_MULTIPLIERS[breedSize] : 1.0;
      acc[plan.id] = base * ageMult * sizeMult;
      return acc;
    }, {} as Record<string, number>),
    [petType, ageGroup, breedSize],
  );

  const coverageKeys = Object.keys(INSURANCE_PLANS[0].coverage) as (keyof InsurancePlan['coverage'])[];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Pet Insurance</Text>
            <Text style={styles.subtitle}>Compare Singapore insurers</Text>
          </View>
        </View>

        {/* Calculator */}
        <View style={styles.calcCard}>
          <Text style={styles.calcTitle}>🧮 Premium Calculator</Text>
          <Text style={styles.calcSub}>Adjust the options to estimate your monthly premium</Text>

          <Text style={styles.calcLabel}>Pet Type</Text>
          <View style={styles.optionRow}>
            {(['dog', 'cat', 'rabbit', 'bird'] as PetType[]).map((t) => (
              <TouchableOpacity key={t} style={[styles.optionChip, petType === t && styles.optionChipActive]} onPress={() => setPetType(t)}>
                <Text style={styles.optionEmoji}>{t === 'dog' ? '🐶' : t === 'cat' ? '🐱' : t === 'rabbit' ? '🐰' : '🐦'}</Text>
                <Text style={[styles.optionText, petType === t && styles.optionTextActive]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.calcLabel}>Age Group</Text>
          <View style={styles.optionRow}>
            {([['young', '0–3 yrs'], ['adult', '3–8 yrs'], ['senior', '8+ yrs']] as [AgeGroup, string][]).map(([v, label]) => (
              <TouchableOpacity key={v} style={[styles.optionChip, ageGroup === v && styles.optionChipActive]} onPress={() => setAgeGroup(v)}>
                <Text style={[styles.optionText, ageGroup === v && styles.optionTextActive]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {petType === 'dog' && (
            <>
              <Text style={styles.calcLabel}>Breed Size</Text>
              <View style={styles.optionRow}>
                {(['small', 'medium', 'large'] as BreedSize[]).map((s) => (
                  <TouchableOpacity key={s} style={[styles.optionChip, breedSize === s && styles.optionChipActive]} onPress={() => setBreedSize(s)}>
                    <Text style={[styles.optionText, breedSize === s && styles.optionTextActive]}>{s.charAt(0).toUpperCase() + s.slice(1)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View style={styles.calcDisclaimer}>
            <Ionicons name="information-circle-outline" size={14} color={Colors.mediumGray} />
            <Text style={styles.calcDisclaimerText}>Estimates only. Final premiums depend on breed, health history, and insurer assessment.</Text>
          </View>
        </View>

        {/* Coverage Comparison Table */}
        <TouchableOpacity style={styles.compareToggle} onPress={() => setShowComparison(!showComparison)}>
          <Text style={styles.compareToggleText}>Coverage Comparison Table</Text>
          <Ionicons name={showComparison ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.primary} />
        </TouchableOpacity>

        {showComparison && (
          <View style={styles.compareTable}>
            {/* Header row */}
            <View style={styles.tableRow}>
              <View style={styles.tableLabelCell} />
              {INSURANCE_PLANS.map((p) => (
                <View key={p.id} style={[styles.tableHeaderCell, { backgroundColor: p.color + '18' }]}>
                  <Text style={[styles.tableHeaderText, { color: p.color }]} numberOfLines={2}>{p.insurer}</Text>
                </View>
              ))}
            </View>
            {coverageKeys.map((key) => (
              <View key={key} style={styles.tableRow}>
                <View style={styles.tableLabelCell}>
                  <Text style={styles.tableLabelText}>{COVERAGE_LABELS[key]}</Text>
                </View>
                {INSURANCE_PLANS.map((p) => (
                  <View key={p.id} style={styles.tableDataCell}>
                    <CoverageCell covered={p.coverage[key]} />
                  </View>
                ))}
              </View>
            ))}
            <View style={styles.tableRow}>
              <View style={styles.tableLabelCell}><Text style={styles.tableLabelText}>Annual Limit</Text></View>
              {INSURANCE_PLANS.map((p) => (
                <View key={p.id} style={styles.tableDataCell}>
                  <Text style={styles.tableValueText}>${(p.annualLimit / 1000).toFixed(0)}k</Text>
                </View>
              ))}
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableLabelCell}><Text style={styles.tableLabelText}>Reimburse</Text></View>
              {INSURANCE_PLANS.map((p) => (
                <View key={p.id} style={styles.tableDataCell}>
                  <Text style={styles.tableValueText}>{p.reimbursementRate}%</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Plan Cards */}
        <Text style={styles.plansTitle}>Choose a Plan</Text>
        {INSURANCE_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            premium={premiums[plan.id]}
            selected={selectedPlan === plan.id}
            onSelect={() => setSelectedPlan(plan.id === selectedPlan ? null : plan.id)}
          />
        ))}

        <View style={styles.disclaimer}>
          <Ionicons name="shield-outline" size={16} color={Colors.mediumGray} />
          <Text style={styles.disclaimerText}>PawFinder SG is not an insurance agent. Clicking "Get Quote" takes you to the insurer's official website. Always read the policy documents carefully before purchasing.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scroll: { paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 14 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.charcoal },
  subtitle: { fontSize: 12, color: Colors.mediumGray },
  calcCard: { marginHorizontal: 20, marginBottom: 16, backgroundColor: Colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  calcTitle: { fontSize: 16, fontWeight: '800', color: Colors.charcoal, marginBottom: 3 },
  calcSub: { fontSize: 12, color: Colors.mediumGray, marginBottom: 14 },
  calcLabel: { fontSize: 12, fontWeight: '700', color: Colors.charcoal, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8, marginTop: 6 },
  optionRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 4 },
  optionChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.veryLightGray, borderWidth: 1.5, borderColor: Colors.border },
  optionChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  optionEmoji: { fontSize: 14 },
  optionText: { fontSize: 13, fontWeight: '600', color: Colors.darkGray },
  optionTextActive: { color: Colors.white },
  calcDisclaimer: { flexDirection: 'row', gap: 6, marginTop: 12, alignItems: 'flex-start' },
  calcDisclaimerText: { flex: 1, fontSize: 11, color: Colors.mediumGray, lineHeight: 16 },
  compareToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 8, backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: Colors.primary + '40' },
  compareToggleText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  compareTable: { marginHorizontal: 20, marginBottom: 16, backgroundColor: Colors.white, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.border },
  tableLabelCell: { width: 100, padding: 10, justifyContent: 'center' },
  tableLabelText: { fontSize: 11, color: Colors.darkGray, fontWeight: '500' },
  tableHeaderCell: { flex: 1, padding: 8, alignItems: 'center', justifyContent: 'center' },
  tableHeaderText: { fontSize: 10, fontWeight: '800', textAlign: 'center' },
  tableDataCell: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  coverCell: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  coverCellYes: { backgroundColor: '#E8F5E9' },
  coverCellNo: { backgroundColor: Colors.veryLightGray },
  tableValueText: { fontSize: 12, fontWeight: '700', color: Colors.charcoal },
  plansTitle: { paddingHorizontal: 20, marginBottom: 12, fontSize: 18, fontWeight: '800', color: Colors.charcoal },
  planCard: { marginHorizontal: 20, marginBottom: 16, backgroundColor: Colors.white, borderRadius: 16, padding: 16, borderWidth: 1.5, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2, overflow: 'hidden' },
  planCardRecommended: { shadowOpacity: 0.12 },
  recommendedBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 10 },
  recommendedText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  planHeader: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'center' },
  planIconCircle: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  planTitleBlock: { flex: 1 },
  planInsurer: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  planName: { fontSize: 16, fontWeight: '800', color: Colors.charcoal },
  planTagline: { fontSize: 11, color: Colors.mediumGray, marginTop: 1 },
  selectCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  premiumRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, padding: 12, marginBottom: 12 },
  premiumLabel: { fontSize: 13, color: Colors.darkGray, fontWeight: '500' },
  premiumAmount: { fontSize: 26, fontWeight: '800' },
  premiumUnit: { fontSize: 14, fontWeight: '500' },
  planStats: { flexDirection: 'row', backgroundColor: Colors.veryLightGray, borderRadius: 12, padding: 12, marginBottom: 12 },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 16, fontWeight: '800', color: Colors.charcoal },
  statLabel: { fontSize: 10, color: Colors.mediumGray },
  statDivider: { width: 1, backgroundColor: Colors.border },
  featuresWrap: { gap: 6, marginBottom: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 13, color: Colors.darkGray },
  quoteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 13, borderRadius: 12 },
  quoteBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  disclaimer: { flexDirection: 'row', gap: 8, marginHorizontal: 20, alignItems: 'flex-start', backgroundColor: Colors.veryLightGray, borderRadius: 12, padding: 14 },
  disclaimerText: { flex: 1, fontSize: 11, color: Colors.mediumGray, lineHeight: 16 },
});
