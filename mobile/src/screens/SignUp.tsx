import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
type AccountType = 'buyer' | 'seller';

export default function SignUp({ navigation }: Props) {
  const [accountType, setAccountType] = useState<AccountType>('buyer');
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [phone, setPhone]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [agreed, setAgreed]           = useState(false);
  const [focused, setFocused]         = useState<string | null>(null);

  const strengthLevel =
    password.length === 0 ? 0 :
    password.length < 4   ? 1 :
    password.length < 8   ? 2 : 3;

  const strengthLabel = ['Enter a password', 'Too short', 'Almost there', 'Strong ✓'][strengthLevel];

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
          {/* Back */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className={`w-[42px] h-[42px] rounded-2xl bg-white items-center justify-center border border-brand-200 shadow-sm android:elevation-2 ${Platform.OS === 'ios' ? 'mt-1' : 'mt-3'}`}
            activeOpacity={0.7}
          >
            <Text className="text-xl text-brand-900 leading-6">←</Text>
          </TouchableOpacity>

          {/* Header */}
          <View className="mt-6 mb-7">
            <View className="w-16 h-16 rounded-[20px] bg-brand-600 items-center justify-center mb-5 shadow-md android:elevation-8">
              <Text className="text-[28px]">🌿</Text>
            </View>
            <Text className="text-[28px] font-black text-brand-900 tracking-tight">Create account</Text>
            <Text className="text-[15px] text-gray-500 mt-1.5">Join TradeNest and start trading today</Text>
          </View>

          {/* Account type toggle */}
          <View className="flex-row gap-2.5 mb-6 bg-white rounded-[18px] p-1.5 border border-brand-100 shadow-sm android:elevation-2">
            {(['buyer', 'seller'] as AccountType[]).map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => setAccountType(type)}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-[13px] ${accountType === type ? 'bg-brand-600' : ''}`}
                activeOpacity={0.8}
              >
                <Text className="text-base">{type === 'buyer' ? '🛒' : '🏪'}</Text>
                <Text className={`text-[13px] font-bold ${accountType === type ? 'text-white' : 'text-gray-500'}`}>
                  {type === 'buyer' ? 'I want to buy' : 'I want to sell'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Full name */}
          <View className="mb-3.5">
            <Text className="text-[13px] font-bold text-brand-800 mb-2 tracking-wide">Full name</Text>
            <View className={`flex-row items-center bg-white rounded-2xl px-3.5 h-[54px] gap-2.5 shadow-sm android:elevation-1 border-[1.5px] ${focused === 'name' ? 'border-brand-600' : 'border-brand-200'}`}>
              <Text className="text-base">👤</Text>
              <TextInput
                className="flex-1 text-[15px] text-brand-900 font-medium"
                placeholder="John Appleseed"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Email */}
          <View className="mb-3.5">
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

          {/* Phone */}
          <View className="mb-3.5">
            <Text className="text-[13px] font-bold text-brand-800 mb-2 tracking-wide">Phone number</Text>
            <View className={`flex-row items-center bg-white rounded-2xl px-3.5 h-[54px] gap-2.5 shadow-sm android:elevation-1 border-[1.5px] ${focused === 'phone' ? 'border-brand-600' : 'border-brand-200'}`}>
              <Text className="text-base">📱</Text>
              <TextInput
                className="flex-1 text-[15px] text-brand-900 font-medium"
                placeholder="+1 000 000 0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-1">
            <Text className="text-[13px] font-bold text-brand-800 mb-2 tracking-wide">Password</Text>
            <View className={`flex-row items-center bg-white rounded-2xl px-3.5 h-[54px] gap-2.5 shadow-sm android:elevation-1 border-[1.5px] ${focused === 'pass' ? 'border-brand-600' : 'border-brand-200'}`}>
              <Text className="text-base">🔑</Text>
              <TextInput
                className="flex-1 text-[15px] text-brand-900 font-medium"
                placeholder="Min. 8 characters"
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

          {/* Strength indicator */}
          <View className="flex-row items-center gap-1.5 mt-1.5 mb-4">
            {[1, 2, 3].map(i => (
              <View
                key={i}
                className={`flex-1 h-1 rounded-sm ${
                  strengthLevel >= i
                    ? strengthLevel === 3 ? 'bg-brand-600' : 'bg-brand-300'
                    : 'bg-brand-100'
                }`}
              />
            ))}
            <Text className="text-[11px] font-semibold text-gray-500 ml-1">{strengthLabel}</Text>
          </View>

          {/* Terms */}
          <TouchableOpacity
            onPress={() => setAgreed(a => !a)}
            className="flex-row items-start gap-3 mb-6"
            activeOpacity={0.8}
          >
            <View className={`w-[22px] h-[22px] rounded-lg border-2 items-center justify-center mt-0.5 ${agreed ? 'bg-brand-600 border-brand-600' : 'bg-white border-brand-200'}`}>
              {agreed && <Text className="text-xs text-white font-black">✓</Text>}
            </View>
            <Text className="flex-1 text-[13px] text-gray-500 leading-5">
              I agree to the{' '}
              <Text className="text-brand-600 font-bold">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-brand-600 font-bold">Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* CTA */}
          <TouchableOpacity
            className={`rounded-2xl py-[17px] items-center shadow-md android:elevation-6 ${agreed ? 'bg-brand-600' : 'bg-brand-300'}`}
            activeOpacity={agreed ? 0.85 : 1}
            onPress={() => agreed && navigation.replace('Home')}
          >
            <Text className="text-[17px] font-black text-white tracking-wide">Create account  🚀</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3 my-6">
            <View className="flex-1 h-px bg-brand-100" />
            <Text className="text-[13px] font-semibold text-gray-400">or sign up with</Text>
            <View className="flex-1 h-px bg-brand-100" />
          </View>

          {/* Social */}
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
            onPress={() => navigation.navigate('SignIn')}
            className="items-center mt-7"
            activeOpacity={0.7}
          >
            <Text className="text-sm text-gray-500">
              Already have an account?{'  '}
              <Text className="text-brand-600 font-extrabold">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
