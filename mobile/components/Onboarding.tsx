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
    id: "market",
    eyebrow: "Rent smarter",
    title: "Find the product you need, right when you need it.",
    description:
      "Browse trusted products near you, compare prices, and reserve in a few taps.",
    accent: "#0F766E",
    softAccent: "#CCFBF1",
    metric: "2.4k",
    metricLabel: "products nearby",
    previewTitle: "Camera Kit",
    previewMeta: "Available today",
    tags: ["Verified", "Insured"],
  },
  {
    id: "earn",
    eyebrow: "Earn more",
    title: "Turn idle products into everyday income.",
    description:
      "List your items, set availability, and receive clean booking requests from renters.",
    accent: "#EA580C",
    softAccent: "#FFEDD5",
    metric: "₦18k",
    metricLabel: "weekly potential",
    previewTitle: "Power Drill",
    previewMeta: "3 booking requests",
    tags: ["Fast payout", "Protected"],
  },
  {
    id: "trust",
    eyebrow: "Trade with confidence",
    title: "Every rental feels clear, secure, and simple.",
    description:
      "Profiles, deposits, pickup notes, and status updates keep both sides protected.",
    accent: "#2563EB",
    softAccent: "#DBEAFE",
    metric: "98%",
    metricLabel: "verified users",
    previewTitle: "Rental Confirmed",
    previewMeta: "Pickup at 4:30 PM",
    tags: ["ID checked", "Chat ready"],
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
