import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Onboarding from "./components/Onboarding";

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <SafeAreaProvider>
      {hasCompletedOnboarding ? (
        <View className="flex-1 items-center justify-center bg-[#F8FAF6] px-6">
          <Text className="text-3xl font-black text-slate-950">Welcome to TradeNest</Text>
          <Text className="mt-3 text-center text-base font-medium leading-7 text-slate-500">
            Your product marketplace is ready.
          </Text>
        </View>
      ) : (
        <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />
      )}
    </SafeAreaProvider>
  );
}
