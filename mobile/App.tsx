// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
// import "./global.css";
// // import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";

// export default function App() {
//   return (
//     <View className="flex-1 items-center justify-center bg-white px-6">
//       <View className="w-full max-w-sm rounded-3xl bg-violet-600 p-6">
//         <Text className="text-2xl font-bold text-white">NativeWind is working</Text>
//         <Text className="mt-2 text-sm text-violet-100">
//           Bare React Native + NativeWind setup complete.
//         </Text>

//         <TouchableOpacity className="mt-5 rounded-2xl bg-white px-4 py-3">
//           <Text className="text-center font-semibold text-violet-700">
//             Test Button
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 24 }}>
      <View style={{ width: "100%", backgroundColor: "#7c3aed", padding: 24, borderRadius: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "white" }}>
          NativeWind is working
        </Text>

        <Text style={{ marginTop: 8, fontSize: 14, color: "#ddd6fe" }}>
          Bare React Native + NativeWind setup complete.
        </Text>

        <TouchableOpacity style={{ marginTop: 20, backgroundColor: "white", paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 }}>
          <Text style={{ textAlign: "center", fontWeight: "600", color: "#6d28d9" }}>
            Test Button
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}