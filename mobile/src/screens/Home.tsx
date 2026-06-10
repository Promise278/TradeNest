import React, { useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  { id: '1', emoji: '💻', name: 'MacBook Pro M3',   price: '$1,299', seller: 'TechPro Store', rating: '4.9', badge: 'Top seller', reviews: '128' },
  { id: '2', emoji: '📷', name: 'Sony A7 III',       price: '$1,850', seller: 'CameraHub',     rating: '4.8', badge: 'Verified',   reviews: '94'  },
  { id: '3', emoji: '🎧', name: 'AirPods Max',       price: '$449',   seller: 'AudioWorld',    rating: '4.7', badge: 'New',        reviews: '61'  },
  { id: '4', emoji: '⌚', name: 'Apple Watch S9',    price: '$399',   seller: 'SmartGear',     rating: '4.9', badge: 'Hot',        reviews: '203' },
];

const RECENT = [
  { id: '1', emoji: '🛋️', name: 'IKEA Sofa 3-seat',      price: '$320', location: 'New York', time: '2h ago' },
  { id: '2', emoji: '🚲', name: 'Trek Mountain Bike',     price: '$780', location: 'Austin',   time: '4h ago' },
  { id: '3', emoji: '🎮', name: 'PS5 + 2 Controllers',   price: '$520', location: 'Miami',    time: '6h ago' },
];

const TABS = [
  { icon: '🏠', label: 'Home' },
  { icon: '🔍', label: 'Explore' },
  { icon: '💬', label: 'Messages' },
  { icon: '👤', label: 'Profile' },
];

// ─── CategoryChip ─────────────────────────────────────────────────────────────
function CategoryChip({ icon, label, active, onPress }: {
  icon: string; label: string; active: boolean; onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center gap-1.5 rounded-full px-4 py-[11px] border-[1.5px] shadow-sm android:elevation-1 ${
        active ? 'bg-brand-600 border-brand-600' : 'bg-white border-brand-200'
      }`}
      activeOpacity={0.75}
    >
      <Text className="text-[15px]">{icon}</Text>
      <Text className={`text-[13px] font-bold ${active ? 'text-white' : 'text-brand-900'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── FeaturedCard ─────────────────────────────────────────────────────────────
function FeaturedCard({ item }: { item: typeof FEATURED[0] }) {
  const [saved, setSaved] = useState(false);
  return (
    <View className="w-[180px] bg-white rounded-[22px] p-3.5 border border-brand-100 shadow-sm android:elevation-4">
      {/* Badge */}
      <View className="self-start bg-brand-50 rounded-full px-2.5 py-1 mb-2.5 border border-brand-200">
        <Text className="text-[10px] font-extrabold text-brand-600">{item.badge}</Text>
      </View>

      {/* Save heart */}
      <TouchableOpacity
        onPress={() => setSaved(p => !p)}
        className="absolute top-3 right-3 p-1"
        activeOpacity={0.8}
      >
        <Text className={`text-xl ${saved ? 'text-red-500' : 'text-brand-200'}`}>
          {saved ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>

      {/* Product image */}
      <View className="bg-brand-50 rounded-2xl h-[110px] items-center justify-center mb-3 border border-brand-100">
        <Text className="text-5xl">{item.emoji}</Text>
      </View>

      <Text className="text-sm font-extrabold text-brand-900 mb-1" numberOfLines={1}>{item.name}</Text>
      <Text className="text-lg font-black text-brand-600 mb-2">{item.price}</Text>

      <Text className="text-[11px] font-semibold text-gray-500 mb-1" numberOfLines={1}>{item.seller}</Text>
      <View className="flex-row items-center gap-1 mb-3">
        <Text className="text-xs text-yellow-500">★</Text>
        <Text className="text-xs font-extrabold text-brand-900">{item.rating}</Text>
        <Text className="text-[11px] text-gray-400">({item.reviews})</Text>
      </View>

      <TouchableOpacity
        className="bg-brand-50 rounded-xl py-2.5 items-center border-[1.5px] border-brand-200"
        activeOpacity={0.85}
      >
        <Text className="text-xs font-extrabold text-brand-600">+ Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── RecentCard ───────────────────────────────────────────────────────────────
function RecentCard({ item }: { item: typeof RECENT[0] }) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-[18px] p-3.5 gap-3 border border-brand-100 shadow-sm android:elevation-2"
      activeOpacity={0.85}
    >
      <View className="w-[60px] h-[60px] rounded-2xl bg-brand-50 items-center justify-center border border-brand-100">
        <Text className="text-[28px]">{item.emoji}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-extrabold text-brand-900 mb-1.5">{item.name}</Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-[11px] text-gray-500">📍 {item.location}</Text>
          <Text className="text-[11px] text-gray-400">{item.time}</Text>
        </View>
      </View>
      <View className="items-end gap-2">
        <Text className="text-[15px] font-black text-brand-600">{item.price}</Text>
        <TouchableOpacity className="bg-brand-600 rounded-xl px-3.5 py-1.5" activeOpacity={0.8}>
          <Text className="text-xs font-extrabold text-white">Chat</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function Home({ navigation: _nav }: Props) {
  const [activeTab, setActiveTab]         = useState(0);
  const [activeCat, setActiveCat]         = useState('1');
  const [searchQuery, setSearchQuery]     = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-brand-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName={Platform.OS === 'ios' ? 'pt-1' : 'pt-3'}
      >
        {/* ── Top bar ── */}
        <View className="flex-row items-center justify-between px-5 mb-4">
          <View>
            <Text className="text-[13px] text-gray-500">Good morning 👋</Text>
            <Text className="text-xl font-black text-brand-900 mt-0.5">Alex Johnson</Text>
          </View>
          <View className="flex-row items-center gap-2.5">
            <TouchableOpacity
              className="w-[42px] h-[42px] rounded-2xl bg-white items-center justify-center border border-brand-100 shadow-sm android:elevation-2"
              activeOpacity={0.8}
            >
              <Text className="text-lg">🔔</Text>
              <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-[1.5px] border-white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[42px] h-[42px] rounded-2xl bg-brand-600 items-center justify-center shadow-md android:elevation-4"
              activeOpacity={0.8}
            >
              <Text className="text-sm font-black text-white">AJ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Search ── */}
        <View className={`flex-row items-center bg-white rounded-2xl mx-5 mb-5 px-3.5 h-[52px] gap-2.5 shadow-sm android:elevation-3 border-[1.5px] ${searchFocused ? 'border-brand-600' : 'border-brand-200'}`}>
          <Text className="text-base">🔍</Text>
          <TextInput
            className="flex-1 text-[15px] text-brand-900 font-medium"
            placeholder="Search products, sellers…"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Text className="text-sm text-gray-400 px-1">✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Promo banner ── */}
        <View className="mx-5 mb-5 bg-brand-600 rounded-[22px] p-5 flex-row items-center justify-between overflow-hidden shadow-md android:elevation-8">
          <View className="flex-1">
            <View className="self-start bg-white/20 rounded-full px-2.5 py-1 mb-2.5">
              <Text className="text-[11px] font-bold text-white">🔥  Limited offer</Text>
            </View>
            <Text className="text-xl font-black text-white leading-[26px] mb-3.5">
              Up to 40% off{'\n'}top electronics
            </Text>
            <TouchableOpacity
              className="self-start bg-white rounded-full px-[18px] py-2"
              activeOpacity={0.85}
            >
              <Text className="text-[13px] font-extrabold text-brand-600">Shop now</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-[60px] ml-2">🎁</Text>
        </View>

        {/* ── Stats ── */}
        <View className="flex-row gap-2.5 mx-5 mb-6">
          {[
            { icon: '🏪', val: '12k+', lbl: 'Listings' },
            { icon: '👥', val: '8.5k', lbl: 'Sellers' },
            { icon: '📦', val: '98%',  lbl: 'Delivered' },
          ].map(stat => (
            <View key={stat.lbl} className="flex-1 bg-white rounded-2xl items-center py-3.5 border border-brand-100 shadow-sm android:elevation-2">
              <Text className="text-xl mb-1">{stat.icon}</Text>
              <Text className="text-base font-black text-brand-900">{stat.val}</Text>
              <Text className="text-[11px] text-gray-500 mt-0.5">{stat.lbl}</Text>
            </View>
          ))}
        </View>

        {/* ── Categories ── */}
        <View className="flex-row items-center justify-between px-5 mb-3">
          <Text className="text-lg font-black text-brand-900">Categories</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[13px] font-bold text-brand-600">See all →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-5 gap-2 pb-1 mb-6"
        >
          {CATEGORIES.map(cat => (
            <CategoryChip
              key={cat.id}
              icon={cat.icon}
              label={cat.label}
              active={activeCat === cat.id}
              onPress={() => setActiveCat(cat.id)}
            />
          ))}
        </ScrollView>

        {/* ── Featured ── */}
        <View className="flex-row items-center justify-between px-5 mb-3">
          <Text className="text-lg font-black text-brand-900">Featured</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[13px] font-bold text-brand-600">See all →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-5 gap-3.5 pb-1 mb-6"
        >
          {FEATURED.map(item => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* ── Recent listings ── */}
        <View className="flex-row items-center justify-between px-5 mb-3">
          <Text className="text-lg font-black text-brand-900">Recent listings</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[13px] font-bold text-brand-600">See all →</Text>
          </TouchableOpacity>
        </View>
        <View className="px-5 gap-2.5 mb-2">
          {RECENT.map(item => (
            <RecentCard key={item.id} item={item} />
          ))}
        </View>

        {/* Spacer for tab bar + FAB */}
        <View className="h-24" />
      </ScrollView>

      {/* ── FAB ── */}
      <TouchableOpacity
        className="absolute bottom-[84px] right-5 bg-brand-900 rounded-[18px] px-[22px] py-3.5 shadow-xl android:elevation-10"
        activeOpacity={0.85}
      >
        <Text className="text-[15px] font-black text-white tracking-wide">+  Sell</Text>
      </TouchableOpacity>

      {/* ── Tab bar ── */}
      <View className={`flex-row bg-white border-t border-brand-100 px-2 pt-2.5 ${Platform.OS === 'ios' ? 'pb-5' : 'pb-3'} shadow-2xl android:elevation-10`}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab.label}
            onPress={() => setActiveTab(i)}
            className="flex-1 items-center py-1"
            activeOpacity={0.75}
          >
            <Text className="text-lg mb-0.5">{tab.icon}</Text>
            <Text className={`text-[11px] font-bold ${activeTab === i ? 'text-brand-600' : 'text-gray-400'}`}>
              {tab.label}
            </Text>
            {activeTab === i && (
              <View className="mt-1 w-5 h-[3px] rounded-full bg-brand-600" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
