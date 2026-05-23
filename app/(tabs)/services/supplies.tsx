import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Linking, Image, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, PRODUCT_CATEGORIES, Product, ProductCategory } from '@/data/services';
import StarRating from '@/components/StarRating';
import { Colors } from '@/constants/colors';

const STORES = ['All', 'Pet Lovers Centre', 'Kohepets', 'Perromart'];

const STORE_COLORS: Record<string, string> = {
  'Pet Lovers Centre': '#FF8C42',
  'Kohepets': '#9C27B0',
  'Perromart': '#2196F3',
};

const CAT_ICONS: Record<ProductCategory, string> = {
  Food: '🍖', Treats: '🦴', Toys: '🎾', Health: '💊', Accessories: '🎀',
};

function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <View style={styles.productCard}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
        {product.deal && <View style={styles.dealBadge}><Text style={styles.dealText}>DEAL</Text></View>}
        {discount > 0 && <View style={styles.discountBadge}><Text style={styles.discountText}>-{discount}%</Text></View>}
      </View>
      <View style={styles.productBody}>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={11} />
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price}</Text>
          {product.originalPrice && <Text style={styles.originalPrice}>${product.originalPrice}</Text>}
        </View>
        <View style={[styles.storeBadge, { backgroundColor: (STORE_COLORS[product.store] ?? Colors.primary) + '18' }]}>
          <Text style={[styles.storeText, { color: STORE_COLORS[product.store] ?? Colors.primary }]}>{product.store}</Text>
        </View>
        <TouchableOpacity style={styles.shopBtn} onPress={() => Linking.openURL(product.storeUrl)}>
          <Ionicons name="open-outline" size={13} color={Colors.white} />
          <Text style={styles.shopBtnText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SuppliesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<ProductCategory | 'All'>('All');
  const [storeFilter, setStoreFilter] = useState('All');

  const deals = useMemo(() => PRODUCTS.filter((p) => p.deal), []);

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (catFilter !== 'All') list = list.filter((p) => p.category === catFilter);
    if (storeFilter !== 'All') list = list.filter((p) => p.store === storeFilter);
    return list;
  }, [search, catFilter, storeFilter]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No products found.</Text>}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={22} color={Colors.charcoal} />
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>Pet Supplies</Text>
                <Text style={styles.subtitle}>{PRODUCTS.length} products curated for Singapore</Text>
              </View>
            </View>

            <View style={styles.searchRow}>
              <Ionicons name="search-outline" size={16} color={Colors.mediumGray} />
              <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search products or brands..." placeholderTextColor={Colors.mediumGray} />
            </View>

            {/* Featured Deals Banner */}
            <View style={styles.dealsBanner}>
              <View style={styles.dealsHeader}>
                <Text style={styles.dealsTitle}>🔥 Featured Deals</Text>
                <Text style={styles.dealsSub}>Limited time offers</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsScroll}>
                {deals.map((p) => (
                  <TouchableOpacity key={p.id} style={styles.dealCard} onPress={() => Linking.openURL(p.storeUrl)}>
                    <Image source={{ uri: p.image }} style={styles.dealImage} resizeMode="cover" />
                    <View style={styles.dealInfo}>
                      <Text style={styles.dealProductName} numberOfLines={1}>{p.name}</Text>
                      <View style={styles.dealPriceRow}>
                        <Text style={styles.dealPrice}>${p.price}</Text>
                        {p.originalPrice && <Text style={styles.dealOriginal}>${p.originalPrice}</Text>}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Store filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
              {STORES.map((s) => (
                <TouchableOpacity key={s} style={[styles.filterChip, storeFilter === s && styles.filterChipActive, s !== 'All' && { borderColor: STORE_COLORS[s] + '60' }]} onPress={() => setStoreFilter(s)}>
                  <Text style={[styles.filterChipText, storeFilter === s && styles.filterChipTextActive, s !== 'All' && storeFilter !== s && { color: STORE_COLORS[s] ?? Colors.darkGray }]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Category tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
              <TouchableOpacity style={[styles.catTab, catFilter === 'All' && styles.catTabActive]} onPress={() => setCatFilter('All')}>
                <Text style={[styles.catTabText, catFilter === 'All' && styles.catTabTextActive]}>All</Text>
              </TouchableOpacity>
              {PRODUCT_CATEGORIES.map((c) => (
                <TouchableOpacity key={c} style={[styles.catTab, catFilter === c && styles.catTabActive]} onPress={() => setCatFilter(c)}>
                  <Text style={styles.catEmoji}>{CAT_ICONS[c]}</Text>
                  <Text style={[styles.catTabText, catFilter === c && styles.catTabTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.resultCount}>{filtered.length} products</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 14 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.charcoal },
  subtitle: { fontSize: 12, color: Colors.mediumGray },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 12, backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8, borderWidth: 1, borderColor: Colors.border },
  searchInput: { flex: 1, fontSize: 14, color: Colors.charcoal, padding: 0 },
  dealsBanner: { marginHorizontal: 20, marginBottom: 16, backgroundColor: Colors.white, borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  dealsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  dealsTitle: { fontSize: 15, fontWeight: '800', color: Colors.charcoal },
  dealsSub: { fontSize: 12, color: Colors.mediumGray },
  dealsScroll: { gap: 10 },
  dealCard: { width: 130, borderRadius: 10, overflow: 'hidden', backgroundColor: Colors.veryLightGray },
  dealImage: { width: '100%', height: 80 },
  dealInfo: { padding: 6 },
  dealProductName: { fontSize: 11, fontWeight: '600', color: Colors.charcoal, marginBottom: 3 },
  dealPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dealPrice: { fontSize: 13, fontWeight: '800', color: Colors.primary },
  dealOriginal: { fontSize: 11, color: Colors.mediumGray, textDecorationLine: 'line-through' },
  filterScroll: { paddingHorizontal: 20, gap: 8, marginBottom: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.darkGray },
  filterChipTextActive: { color: Colors.white },
  catScroll: { paddingHorizontal: 20, gap: 8, marginBottom: 12 },
  catTab: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.veryLightGray, borderWidth: 1.5, borderColor: Colors.border },
  catTabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catTabText: { fontSize: 13, fontWeight: '600', color: Colors.darkGray },
  catTabTextActive: { color: Colors.white },
  catEmoji: { fontSize: 14 },
  resultCount: { paddingHorizontal: 20, marginBottom: 8, fontSize: 13, color: Colors.mediumGray },
  list: { paddingBottom: 24 },
  columnWrapper: { paddingHorizontal: 20, gap: 10 },
  productCard: { flex: 1, backgroundColor: Colors.white, borderRadius: 14, overflow: 'hidden', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  imageWrap: { position: 'relative' },
  productImage: { width: '100%', height: 120 },
  dealBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: '#F44336', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  dealText: { color: Colors.white, fontSize: 9, fontWeight: '800' },
  discountBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: '#FF9800', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },
  discountText: { color: Colors.white, fontSize: 9, fontWeight: '800' },
  productBody: { padding: 10, gap: 4 },
  productBrand: { fontSize: 10, color: Colors.mediumGray, fontWeight: '600', textTransform: 'uppercase' },
  productName: { fontSize: 12, fontWeight: '700', color: Colors.charcoal, lineHeight: 16 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  price: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  originalPrice: { fontSize: 12, color: Colors.mediumGray, textDecorationLine: 'line-through' },
  storeBadge: { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8 },
  storeText: { fontSize: 10, fontWeight: '700' },
  shopBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: Colors.primary, paddingVertical: 8, borderRadius: 9, marginTop: 4 },
  shopBtnText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  empty: { textAlign: 'center', color: Colors.mediumGray, marginTop: 40, fontSize: 14 },
});
