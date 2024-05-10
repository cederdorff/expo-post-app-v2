import { primary, tintColorLight } from "@/constants/ThemeVariables";
import { Stack } from "expo-router";

export default function UsersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: primary
        },
        headerTintColor: tintColorLight,
        headerTitleStyle: {
          fontWeight: "bold"
        },
        tabBarStyle: {
          backgroundColor: primary
        }
      }}>
      <Stack.Screen name="index" options={{ title: "Users" }} />
    </Stack>
  );
}
