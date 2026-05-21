import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="w-full rounded-3xl bg-violet-600 p-6">
        <Text className="text-2xl font-bold text-white">
          NativeWind is working
        </Text>

        <Text className="mt-2 text-sm text-violet-100">
          Bare React Native + NativeWind setup complete.
        </Text>

        <TouchableOpacity className="mt-5 rounded-2xl bg-white px-4 py-3">
          <Text className="text-center font-semibold text-violet-700">
            Test Button
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
