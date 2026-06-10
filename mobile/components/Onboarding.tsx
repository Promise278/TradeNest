import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 'discover',
    icon: '🛍️',
    eyebrow: 'Discover better deals',
    title: 'Source quality\nproducts smarter.',
    description: 'Explore curated listings, compare real offers, and find products that match your budget and location.',
    metric: '12k+',
    metricLabel: 'Active listings',
    tags: ['Curated', 'Local deals'],
  },
  {
    id: 'assistant',
    icon: '🤖',
    eyebrow: 'AI trade guidance',
    title: 'Choose with\nconfidence.',
    description: 'Get price context and product-fit suggestions before you message a seller or place an order.',
    metric: 'AI',
    metricLabel: 'Smart assistant',
    tags: ['Price check', 'Product fit'],
  },
  {
    id: 'trusted',
    icon: '✅',
    eyebrow: 'Verified connections',
    title: 'Meet reliable\ntraders.',
    description: 'Review seller profiles, ratings, and response signals so every conversation starts with more trust.',
    metric: '98%',
    metricLabel: 'Verified sellers',
    tags: ['ID checked', 'Rated'],
  },
  {
    id: 'secure',
    icon: '🔒',
    eyebrow: 'Protected exchange',
    title: 'Trade with\nsafeguards.',
    description: 'Secure payment flow, dispute support, and delivery tracking designed to protect both sides.',
    metric: '24/7',
    metricLabel: 'Order visibility',
    tags: ['Secure pay', 'Support ready'],
  },
  {
    id: 'growth',
    icon: '📈',
    eyebrow: 'Sell professionally',
    title: 'Grow your\nbusiness.',
    description: 'Publish polished listings, manage requests, and build your reputation across the TradeNest network.',
    metric: '4.9★',
    metricLabel: 'Seller rating',
    tags: ['Analytics', 'Fast replies'],
  },
];

type Slide = (typeof SLIDES)[number];
type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

function SlideCard({ item }: { item: Slide }) {
  return (
    <View className="bg-white rounded-[28px] p-[22px] border border-brand-100 shadow-sm android:elevation-6">
      {/* Brand pill */}
      <View className="flex-row items-center self-start bg-brand-50 rounded-full px-3 py-1.5 border border-brand-200 mb-4 gap-1.5">
        <View className="w-[7px] h-[7px] rounded-full bg-brand-600" />
        <Text className="text-[11px] font-extrabold text-brand-800 tracking-wider">TradeNest</Text>
      </View>

      {/* Icon + metric */}
      <View className="flex-row items-center justify-between">
        <View className="w-[76px] h-[76px] rounded-[22px] bg-brand-50 items-center justify-center border-2 border-brand-200">
          <Text className="text-[34px]">{item.icon}</Text>
        </View>
        <View className="bg-brand-600 rounded-[18px] px-5 py-3.5 items-center min-w-[96px]">
          <Text className="text-[28px] font-black text-white">{item.metric}</Text>
          <Text className="text-[11px] font-semibold text-brand-300 mt-0.5 text-center">{item.metricLabel}</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-brand-50 my-4" />

      {/* Tags */}
      <View className="flex-row gap-2">
        {item.tags.map(tag => (
          <View key={tag} className="flex-row items-center gap-1.5 bg-brand-50 rounded-full px-3.5 py-2 border border-brand-100">
            <View className="w-1.5 h-1.5 rounded-full bg-brand-600" />
            <Text className="text-xs font-bold text-brand-800">{tag}</Text>
          </View>
        ))}
      </View>

      {/* Skeleton bars */}
      <View className="flex-row gap-1.5 mt-4">
        <View className="flex-[3] h-[7px] rounded bg-brand-100" />
        <View className="flex-1 h-[7px] rounded bg-brand-100" />
        <View className="flex-[2] h-[7px] rounded bg-brand-100" />
      </View>
    </View>
  );
}

export default function Onboarding({ navigation }: Props) {
  const [idx, setIdx] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const next = () => {
    if (idx < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: idx + 1 });
    } else {
      navigation.replace('SignIn');
    }
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={{ width }} className="flex-1 px-6">
      <View className="flex-1 justify-center">
        <SlideCard item={item} />
        <View className="mt-7">
          <Text className="text-[11px] font-extrabold text-brand-600 uppercase tracking-[2.5px]">
            {item.eyebrow}
          </Text>
          <Text className="text-[34px] font-black text-brand-900 leading-[40px] mt-2">
            {item.title}
          </Text>
          <Text className="text-[15px] text-gray-500 leading-6 mt-2.5">
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-brand-50">
      {/* Header */}
      <View className={`flex-row items-center justify-between px-6 ${Platform.OS === 'ios' ? 'pt-1' : 'pt-3'} pb-1`}>
        <View>
          <Text className="text-[22px] font-black text-brand-900 tracking-tight">TradeNest</Text>
          <Text className="text-xs font-semibold text-brand-600 mt-0.5">Product marketplace</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace('SignIn')}
          className="bg-white px-[18px] py-2.5 rounded-full border border-brand-200 shadow-sm android:elevation-2"
          activeOpacity={0.7}
        >
          <Text className="text-[13px] font-bold text-brand-800">Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e =>
          setIdx(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        keyExtractor={item => item.id}
      />

      {/* Footer */}
      <View className={`px-6 ${Platform.OS === 'ios' ? 'pb-4' : 'pb-7'}`}>
        {/* Dots */}
        <View className="flex-row items-center justify-center gap-1.5 mb-5">
          {SLIDES.map((sl, i) => (
            <View
              key={sl.id}
              className={`h-2 rounded-full ${i === idx ? 'w-7 bg-brand-600' : 'w-2 bg-brand-200'}`}
            />
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={next}
          className="bg-brand-600 rounded-[18px] py-[18px] items-center shadow-md android:elevation-6"
          activeOpacity={0.85}
        >
          <Text className="text-[17px] font-black text-white tracking-wide">
            {idx === SLIDES.length - 1 ? 'Start trading  🚀' : 'Continue'}
          </Text>
        </TouchableOpacity>

        {/* Sign in link */}
        <TouchableOpacity
          onPress={() => navigation.replace('SignIn')}
          className="items-center mt-4 py-1"
          activeOpacity={0.7}
        >
          <Text className="text-sm text-gray-500">
            Already have an account?{'  '}
            <Text className="text-brand-600 font-extrabold">Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
