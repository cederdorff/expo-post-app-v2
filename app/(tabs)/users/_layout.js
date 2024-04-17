import { Stack } from "expo-router";
import { primary, tintColorLight } from "../../../constants/ThemeVariables";

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
