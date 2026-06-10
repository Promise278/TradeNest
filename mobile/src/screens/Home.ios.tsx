/**
 * Home screen — iOS
 *
 * iOS-specific choices:
 *  - No elevation, uses shadowColor/shadowOffset/shadowOpacity/shadowRadius
 *  - Larger rounded corners (feels more native on iOS)
 *  - Bottom tab bar has extra bottom padding for the home indicator bar
 *  - Search bar uses iOS-style rounded rect (borderRadius 14 vs 10 on Android)
 *  - Banner uses a softer shadow
 */
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CATEGORIES = [
  { id: '1', icon: '📱', label: 'Electronics' },
  { id: '2', icon: '👗', label: 'Fashion' },
  { id: '3', icon: '🏠', label: 'Home' },
  { id: '4', icon: '🚗', label: 'Vehicles' },
  { id: '5', icon: '⚽', label: 'Sports' },
  { id: '6', icon: '📚', label: 'Books' },
];

const FEATURED = [
  { id: '1', emoji: '💻', name: 'MacBook Pro M3', price: '$1,299', seller: 'TechPro Store', rating: '4.9', badge: 'Top seller', reviews: '128' },
  { id: '2', emoji: '📷', name: 'Sony A7 III',    price: '$1,850', seller: 'CameraHub',    rating: '4.8', badge: 'Verified',   reviews: '94'  },
  { id: '3', emoji: '🎧', name: 'AirPods Max',    price: '$449',   seller: 'AudioWorld',   rating: '4.7', badge: 'New',        reviews: '61'  },
  { id: '4', emoji: '⌚', name: 'Apple Watch S9', price: '$399',   seller: 'SmartGear',    rating: '4.9', badge: 'Hot',        reviews: '203' },
];

const RECENT = [
  { id: '1', emoji: '🛋️', name: 'IKEA Sofa 3-seat',    price: '$320', location: 'New York', time: '2h ago' },
  { id: '2', emoji: '🚲', name: 'Trek Mountain Bike',   price: '$780', location: 'Austin',   time: '4h ago' },
  { id: '3', emoji: '🎮', name: 'PS5 + 2 Controllers', price: '$520', location: 'Miami',    time: '6h ago' },
];

const TABS = [
  { icon: '🏠', label: 'Home' },
  { icon: '🔍', label: 'Explore' },
  { icon: '💬', label: 'Messages' },
  { icon: '👤', label: 'Profile' },
];

function FeaturedCard({ item }: { item: typeof FEATURED[0] }) {
  const [saved, setSaved] = useState(false);
  return (
    <View style={s.featCard}>
      <View style={s.featBadge}>
        <Text style={s.featBadgeTxt}>{item.badge}</Text>
      </View>
      <TouchableOpacity onPress={() => setSaved(p => !p)} style={s.saveBtn} activeOpacity={0.8}>
        <Text style={[s.saveIcon, saved && s.saveIconOn]}>{saved ? '♥' : '♡'}</Text>
      </TouchableOpacity>
      <View style={s.featImg}>
        <Text style={s.featEmoji}>{item.emoji}</Text>
      </View>
      <Text style={s.featName} numberOfLines={1}>{item.name}</Text>
      <Text style={s.featPrice}>{item.price}</Text>
      <View style={s.featMeta}>
        <Text style={s.featSeller} numberOfLines={1}>{item.seller}</Text>
        <View style={s.ratingRow}>
          <Text style={s.ratingStar}>★</Text>
          <Text style={s.ratingVal}>{item.rating}</Text>
          <Text style={s.ratingCount}>({item.reviews})</Text>
        </View>
      </View>
      <TouchableOpacity style={s.addBtn} activeOpacity={0.85}>
        <Text style={s.addBtnTxt}>+ Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

function RecentCard({ item }: { item: typeof RECENT[0] }) {
  return (
    <TouchableOpacity style={s.recentCard} activeOpacity={0.85}>
      <View style={s.recentImg}>
        <Text style={s.recentEmoji}>{item.emoji}</Text>
      </View>
      <View style={s.recentInfo}>
        <Text style={s.recentName}>{item.name}</Text>
        <View style={s.recentMeta}>
          <Text style={s.recentLoc}>📍 {item.location}</Text>
          <Text style={s.recentTime}>{item.time}</Text>
        </View>
      </View>
      <View style={s.recentRight}>
        <Text style={s.recentPrice}>{item.price}</Text>
        <TouchableOpacity style={s.msgBtn} activeOpacity={0.8}>
          <Text style={s.msgBtnTxt}>Chat</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeIOS({ navigation: _nav }: Props) {
  const [activeTab, setActiveTab]         = useState(0);
  const [activeCat, setActiveCat]         = useState('1');
  const [searchQuery, setSearchQuery]     = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <SafeAreaView style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Top bar */}
        <View style={s.topBar}>
          <View>
            <Text style={s.greeting}>Good morning 👋</Text>
            <Text style={s.userName}>Alex Johnson</Text>
          </View>
          <View style={s.topRight}>
            <TouchableOpacity style={s.iconBtn} activeOpacity={0.8}>
              <Text style={s.iconBtnTxt}>🔔</Text>
              <View style={s.notifDot} />
            </TouchableOpacity>
            <TouchableOpacity style={s.avatarBtn} activeOpacity={0.8}>
              <Text style={s.avatarTxt}>AJ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={[s.searchBar, searchFocused && s.searchFocused]}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search products, sellers…"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Text style={s.clearTxt}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Banner */}
        <View style={s.banner}>
          <View style={s.bannerLeft}>
            <View style={s.bannerBadge}>
              <Text style={s.bannerBadgeTxt}>🔥  Limited offer</Text>
            </View>
            <Text style={s.bannerTitle}>Up to 40% off{'\n'}top electronics</Text>
            <TouchableOpacity style={s.bannerBtn} activeOpacity={0.85}>
              <Text style={s.bannerBtnTxt}>Shop now</Text>
            </TouchableOpacity>
          </View>
          <Text style={s.bannerEmoji}>🎁</Text>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          {[
            { icon: '🏪', val: '12k+', lbl: 'Listings'  },
            { icon: '👥', val: '8.5k', lbl: 'Sellers'   },
            { icon: '📦', val: '98%',  lbl: 'Delivered' },
          ].map(st => (
            <View key={st.lbl} style={s.statCard}>
              <Text style={s.statIcon}>{st.icon}</Text>
              <Text style={s.statVal}>{st.val}</Text>
              <Text style={s.statLbl}>{st.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Categories */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Categories</Text>
          <TouchableOpacity activeOpacity={0.7}><Text style={s.sectionLink}>See all →</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.catList}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCat(cat.id)}
              style={[s.catChip, activeCat === cat.id && s.catChipOn]}
              activeOpacity={0.75}
            >
              <Text style={s.catIcon}>{cat.icon}</Text>
              <Text style={[s.catLabel, activeCat === cat.id && s.catLabelOn]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Featured</Text>
          <TouchableOpacity activeOpacity={0.7}><Text style={s.sectionLink}>See all →</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.featList}>
          {FEATURED.map(item => <FeaturedCard key={item.id} item={item} />)}
        </ScrollView>

        {/* Recent */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Recent listings</Text>
          <TouchableOpacity activeOpacity={0.7}><Text style={s.sectionLink}>See all →</Text></TouchableOpacity>
        </View>
        <View style={s.recentList}>
          {RECENT.map(item => <RecentCard key={item.id} item={item} />)}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={s.fab} activeOpacity={0.85}>
        <Text style={s.fabTxt}>+  Sell</Text>
      </TouchableOpacity>

      {/* iOS Tab bar — larger bottom padding for home indicator */}
      <View style={s.tabBar}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab.label} onPress={() => setActiveTab(i)} style={s.tabItem} activeOpacity={0.7}>
            <Text style={[s.tabIcon, activeTab === i && s.tabIconOn]}>{tab.icon}</Text>
            <Text style={[s.tabLabel, activeTab === i && s.tabLabelOn]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const shadow = (color = '#16A34A', y = 4, op = 0.1, r = 12) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: y },
  shadowOpacity: op,
  shadowRadius: r,
});

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#F0FDF4' },
  scroll: { paddingTop: 8 },

  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  greeting: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  userName: { fontSize: 20, fontWeight: '900', color: '#14532D', marginTop: 2 },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DCFCE7', ...shadow('#16A34A', 2, 0.06, 6) },
  iconBtnTxt: { fontSize: 18 },
  notifDot: { position: 'absolute', top: 9, right: 9, width: 8, height: 8, borderRadius: 4, backgroundColor: '#DC2626', borderWidth: 1.5, borderColor: '#FFFFFF' },
  avatarBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#16A34A', alignItems: 'center', justifyContent: 'center', ...shadow('#16A34A', 4, 0.2, 10) },
  avatarTxt: { fontSize: 14, fontWeight: '900', color: '#FFFFFF' },

  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, marginHorizontal: 20, marginBottom: 20, paddingHorizontal: 14, height: 52, borderWidth: 1.5, borderColor: '#BBF7D0', gap: 10, ...shadow('#16A34A', 3, 0.07, 10) },
  searchFocused: { borderColor: '#16A34A', borderWidth: 2 },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 15, color: '#14532D', fontWeight: '500' },
  clearTxt: { fontSize: 14, color: '#9CA3AF', paddingHorizontal: 4 },

  banner: { marginHorizontal: 20, marginBottom: 20, backgroundColor: '#16A34A', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', ...shadow('#16A34A', 10, 0.28, 20) },
  bannerLeft: { flex: 1 },
  bannerBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 10 },
  bannerBadgeTxt: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  bannerTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', lineHeight: 26, marginBottom: 14 },
  bannerBtn: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 50, paddingHorizontal: 18, paddingVertical: 9 },
  bannerBtnTxt: { fontSize: 13, fontWeight: '800', color: '#16A34A' },
  bannerEmoji: { fontSize: 60, marginLeft: 8 },

  statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 20, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 18, alignItems: 'center', paddingVertical: 16, borderWidth: 1, borderColor: '#DCFCE7', ...shadow('#16A34A', 2, 0.05, 8) },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statVal:  { fontSize: 16, fontWeight: '900', color: '#14532D' },
  statLbl:  { fontSize: 11, fontWeight: '500', color: '#6B7280', marginTop: 2 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle:  { fontSize: 18, fontWeight: '900', color: '#14532D' },
  sectionLink:   { fontSize: 13, fontWeight: '700', color: '#16A34A' },

  catList: { paddingHorizontal: 20, gap: 8, paddingBottom: 4, marginBottom: 24 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFFFFF', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 11, borderWidth: 1.5, borderColor: '#BBF7D0', ...shadow('#16A34A', 2, 0.04, 6) },
  catChipOn:  { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  catIcon:    { fontSize: 15 },
  catLabel:   { fontSize: 13, fontWeight: '700', color: '#14532D' },
  catLabelOn: { color: '#FFFFFF' },

  featList: { paddingHorizontal: 20, gap: 14, paddingBottom: 4, marginBottom: 24 },
  featCard: { width: 184, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 14, borderWidth: 1, borderColor: '#DCFCE7', ...shadow('#16A34A', 6, 0.1, 16) },
  featBadge: { alignSelf: 'flex-start', backgroundColor: '#F0FDF4', borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 10, borderWidth: 1, borderColor: '#BBF7D0' },
  featBadgeTxt: { fontSize: 10, fontWeight: '800', color: '#16A34A' },
  saveBtn: { position: 'absolute', top: 12, right: 12, padding: 4 },
  saveIcon:   { fontSize: 20, color: '#BBF7D0' },
  saveIconOn: { color: '#DC2626' },
  featImg: { backgroundColor: '#F0FDF4', borderRadius: 18, height: 110, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#DCFCE7' },
  featEmoji:  { fontSize: 48 },
  featName:   { fontSize: 14, fontWeight: '800', color: '#14532D', marginBottom: 4 },
  featPrice:  { fontSize: 18, fontWeight: '900', color: '#16A34A', marginBottom: 8 },
  featMeta:   { marginBottom: 12 },
  featSeller: { fontSize: 11, fontWeight: '600', color: '#6B7280', marginBottom: 4 },
  ratingRow:  { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingStar: { fontSize: 12, color: '#D97706' },
  ratingVal:  { fontSize: 12, fontWeight: '800', color: '#14532D' },
  ratingCount:{ fontSize: 11, color: '#9CA3AF' },
  addBtn: { backgroundColor: '#F0FDF4', borderRadius: 12, paddingVertical: 10, alignItems: 'center', borderWidth: 1.5, borderColor: '#BBF7D0' },
  addBtnTxt: { fontSize: 12, fontWeight: '800', color: '#16A34A' },

  recentList: { paddingHorizontal: 20, gap: 10, marginBottom: 8 },
  recentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, gap: 12, borderWidth: 1, borderColor: '#DCFCE7', ...shadow('#16A34A', 3, 0.06, 10) },
  recentImg:  { width: 62, height: 62, borderRadius: 18, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DCFCE7' },
  recentEmoji:{ fontSize: 28 },
  recentInfo: { flex: 1 },
  recentName: { fontSize: 14, fontWeight: '800', color: '#14532D', marginBottom: 6 },
  recentMeta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  recentLoc:  { fontSize: 11, fontWeight: '500', color: '#6B7280' },
  recentTime: { fontSize: 11, fontWeight: '500', color: '#9CA3AF' },
  recentRight:{ alignItems: 'flex-end', gap: 8 },
  recentPrice:{ fontSize: 15, fontWeight: '900', color: '#16A34A' },
  msgBtn:    { backgroundColor: '#16A34A', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  msgBtnTxt: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },

  fab: { position: 'absolute', bottom: 96, right: 20, backgroundColor: '#14532D', borderRadius: 20, paddingHorizontal: 22, paddingVertical: 14, ...shadow('#14532D', 10, 0.3, 18) },
  fabTxt: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.3 },

  // iOS tab bar — taller to accommodate the home indicator (34pt safe area)
  tabBar: { flexDirection: 'row', backgroundColor: '#FFFFFF', paddingBottom: 28, paddingTop: 12, paddingHorizontal: 8, borderTopWidth: 1, borderTopColor: '#DCFCE7', ...shadow('#16A34A', -4, 0.06, 10) },
  tabItem:   { flex: 1, alignItems: 'center', gap: 3 },
  tabIcon:   { fontSize: 20, color: '#BBF7D0' },
  tabIconOn: { color: '#16A34A' },
  tabLabel:  { fontSize: 10, fontWeight: '600', color: '#9CA3AF' },
  tabLabelOn:{ color: '#16A34A', fontWeight: '800' },
});
