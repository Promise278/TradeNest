import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function SignIn({ navigation }: Props) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused]   = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-brand-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow px-6 pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className={`w-[42px] h-[42px] rounded-2xl bg-white items-center justify-center border border-brand-200 shadow-sm android:elevation-2 ${Platform.OS === 'ios' ? 'mt-1' : 'mt-3'}`}
            activeOpacity={0.7}
          >
            <Text className="text-xl text-brand-900 leading-6">←</Text>
          </TouchableOpacity>

          {/* Logo mark */}
          <View className="w-[72px] h-[72px] rounded-[22px] bg-brand-600 items-center justify-center mt-7 mb-5 shadow-md android:elevation-8">
            <Text className="text-[32px]">🌿</Text>
          </View>

          {/* Heading */}
          <Text className="text-[30px] font-black text-brand-900 tracking-tight">Welcome back</Text>
          <Text className="text-[15px] text-gray-500 mt-1.5 mb-8">Sign in to your TradeNest account</Text>

          {/* Email field */}
          <View className="mb-4">
            <Text className="text-[13px] font-bold text-brand-800 mb-2 tracking-wide">Email address</Text>
            <View className={`flex-row items-center bg-white rounded-2xl px-3.5 h-[54px] gap-2.5 shadow-sm android:elevation-1 border-[1.5px] ${focused === 'email' ? 'border-brand-600' : 'border-brand-200'}`}>
              <Text className="text-base">✉️</Text>
              <TextInput
                className="flex-1 text-[15px] text-brand-900 font-medium"
                placeholder="you@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Password field */}
          <View className="mb-1">
            <Text className="text-[13px] font-bold text-brand-800 mb-2 tracking-wide">Password</Text>
            <View className={`flex-row items-center bg-white rounded-2xl px-3.5 h-[54px] gap-2.5 shadow-sm android:elevation-1 border-[1.5px] ${focused === 'pass' ? 'border-brand-600' : 'border-brand-200'}`}>
              <Text className="text-base">🔑</Text>
              <TextInput
                className="flex-1 text-[15px] text-brand-900 font-medium"
                placeholder="Your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused(null)}
              />
              <TouchableOpacity onPress={() => setShowPass(p => !p)} className="p-1" activeOpacity={0.7}>
                <Text className="text-base">{showPass ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot password */}
          <TouchableOpacity className="self-end mt-1.5 mb-6" activeOpacity={0.7}>
            <Text className="text-[13px] font-bold text-brand-600">Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign in CTA */}
          <TouchableOpacity
            className="bg-brand-600 rounded-2xl py-[17px] items-center shadow-md android:elevation-6"
            activeOpacity={0.85}
            onPress={() => navigation.replace('Home')}
          >
            <Text className="text-[17px] font-black text-white tracking-wide">Sign in</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3 my-6">
            <View className="flex-1 h-px bg-brand-100" />
            <Text className="text-[13px] font-semibold text-gray-400">or continue with</Text>
            <View className="flex-1 h-px bg-brand-100" />
          </View>

          {/* Social buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center gap-2 bg-white rounded-2xl py-3.5 border-[1.5px] border-brand-200 shadow-sm android:elevation-1"
              activeOpacity={0.8}
            >
              <Text className="text-lg font-black text-brand-900">G</Text>
              <Text className="text-sm font-bold text-brand-900">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center gap-2 bg-white rounded-2xl py-3.5 border-[1.5px] border-brand-200 shadow-sm android:elevation-1"
              activeOpacity={0.8}
            >
              <Text className="text-lg font-black text-[#1877F2]">f</Text>
              <Text className="text-sm font-bold text-brand-900">Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="items-center mt-8"
            activeOpacity={0.7}
          >
            <Text className="text-sm text-gray-500">
              Don't have an account?{'  '}
              <Text className="text-brand-600 font-extrabold">Create one</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
