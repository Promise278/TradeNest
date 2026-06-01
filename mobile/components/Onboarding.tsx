import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "discover",
    eyebrow: "Discover better deals",
    title: "Source quality products from a smarter marketplace.",
    description:
      "Explore curated listings, compare real offers, and find products that match your budget, location, and buying intent.",
    accent: "#0F766E",
    softAccent: "#CCFBF1",
    metric: "12k+",
    metricLabel: "active listings",
    previewTitle: "Premium Gadgets",
    previewMeta: "Best match found",
    tags: ["Curated", "Local deals"],
  },
  {
    id: "assistant",
    eyebrow: "AI trade guidance",
    title: "Let TradeNest help you choose with confidence.",
    description:
      "Get useful recommendations, price context, and product-fit suggestions before you message a seller or place an order.",
    accent: "#EA580C",
    softAccent: "#FFEDD5",
    metric: "AI",
    metricLabel: "market assistant",
    previewTitle: "Smart Match",
    previewMeta: "3 insights ready",
    tags: ["Price check", "Product fit"],
  },
  {
    id: "trusted",
    eyebrow: "Verified connections",
    title: "Meet reliable buyers and sellers before you trade.",
    description:
      "Review seller profiles, product details, ratings, and response signals so every conversation starts with more trust.",
    accent: "#2563EB",
    softAccent: "#DBEAFE",
    metric: "98%",
    metricLabel: "verified activity",
    previewTitle: "Trusted Seller",
    previewMeta: "Replies in minutes",
    tags: ["ID checked", "Rated"],
  },
  {
    id: "secure",
    eyebrow: "Protected exchange",
    title: "Trade with safeguards from checkout to delivery.",
    description:
      "Use clear order details, secure payment flow, dispute support, and delivery updates designed to protect both sides.",
    accent: "#7C3AED",
    softAccent: "#EDE9FE",
    metric: "24/7",
    metricLabel: "order visibility",
    previewTitle: "Order Protected",
    previewMeta: "Tracking active",
    tags: ["Secure pay", "Support ready"],
  },
  {
    id: "growth",
    eyebrow: "Sell professionally",
    title: "Build a storefront that turns interest into orders.",
    description:
      "Publish polished listings, manage requests, understand demand, and grow your reputation across the TradeNest network.",
    accent: "#BE123C",
    softAccent: "#FFE4E6",
    metric: "4.9",
    metricLabel: "seller rating",
    previewTitle: "Storefront Live",
    previewMeta: "New inquiry",
    tags: ["Analytics", "Fast replies"],
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

type Slide = (typeof SLIDES)[number];

function ProductPreview({ item }: { item: Slide }) {
  return (
    <View className="w-full px-4">
      <View
        className="rounded-[34px] p-5 shadow-2xl"
        style={{ backgroundColor: item.accent }}
      >
        <View className="flex-row items-center justify-between">
          <View className="rounded-full bg-white/20 px-4 py-2">
            <Text className="text-xs font-black uppercase tracking-[2px] text-white">
              TradeNest
            </Text>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-full bg-white">
            <Text className="text-lg font-black" style={{ color: item.accent }}>
              T
            </Text>
          </View>
        </View>

        <View className="mt-8 rounded-[28px] bg-white p-5">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-sm font-bold text-slate-400">Featured product</Text>
              <Text className="mt-1 text-2xl font-black text-slate-950">
                {item.previewTitle}
              </Text>
            </View>
            <View
              className="h-16 w-16 rounded-3xl"
              style={{ backgroundColor: item.softAccent }}
            />
          </View>

          <View className="mt-7 flex-row items-end justify-between">
            <View>
              <Text className="text-4xl font-black" style={{ color: item.accent }}>
                {item.metric}
              </Text>
              <Text className="mt-1 text-sm font-bold text-slate-500">
                {item.metricLabel}
              </Text>
            </View>
            <View className="rounded-2xl bg-slate-950 px-4 py-3">
              <Text className="text-sm font-black text-white">{item.previewMeta}</Text>
            </View>
          </View>

          <View className="mt-6 flex-row gap-2">
            {item.tags.map((tag) => (
              <View
                key={tag}
                className="rounded-full px-4 py-2"
                style={{ backgroundColor: item.softAccent }}
              >
                <Text className="text-xs font-black text-slate-800">{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      return;
    }

    onComplete();
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={{ width }} className="flex-1 px-6">
      <View className="flex-1 justify-center">
        <ProductPreview item={item} />

        <View className="mt-10">
          <Text
            className="text-sm font-black uppercase tracking-[2px]"
            style={{ color: item.accent }}
          >
            {item.eyebrow}
          </Text>
          <Text className="mt-3 text-4xl font-black leading-[44px] text-slate-950">
            {item.title}
          </Text>
          <Text className="mt-4 text-base font-medium leading-7 text-slate-500">
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAF6]">
      <View className="flex-row items-center justify-between px-6 pt-4">
        <View>
          <Text className="text-2xl font-black text-slate-950">TradeNest</Text>
          <Text className="text-sm font-semibold text-slate-500">Product rental marketplace</Text>
        </View>
        <TouchableOpacity
          onPress={onComplete}
          activeOpacity={0.8}
          className="rounded-full bg-white px-5 py-3 shadow-sm"
        >
          <Text className="text-sm font-black text-slate-600">Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      <View className="px-6 pb-8">
        <View className="mb-6 flex-row items-center justify-center gap-2">
          {SLIDES.map((slide, index) => (
            <View
              key={slide.id}
              className={`h-2 rounded-full ${
                index === currentIndex ? "w-8 bg-teal-700" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.86}
          className="rounded-[26px] py-5 shadow-xl"
          style={{ backgroundColor: SLIDES[currentIndex].accent }}
        >
          <Text className="text-center text-lg font-black text-white">
            {currentIndex === SLIDES.length - 1 ? "Start trading" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
