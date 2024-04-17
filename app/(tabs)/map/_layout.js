import { Stack } from "expo-router";
import { primary, tintColorLight } from "../../../constants/Colors";

export default function MapLayout() {
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
      <Stack.Screen name="index" options={{ title: "Map" }} />
    </Stack>
  );
}
