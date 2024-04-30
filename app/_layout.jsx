import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { primary, tintColorLight } from "@/constants/ThemeVariables";
import { auth } from "@/firebase-config";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log("user: ", user);
      if (!user) {
        // No user is signed in.
        router.replace("/sign-in");
      }
    });
  });

  return (
    <ActionSheetProvider>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="light" />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/post-modal"
            options={{
              presentation: "modal",
              headerStyle: {
                backgroundColor: primary,
                headerTintColor: tintColorLight
              },
              headerTintColor: tintColorLight,
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
        </Stack>
      </ThemeProvider>
    </ActionSheetProvider>
  );
}
