import { Stack } from "expo-router";

export default function UsersLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#264c59"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                },
                tabBarStyle: {
                    backgroundColor: "#264c59"
                }
            }}>
            <Stack.Screen name="index" options={{ title: "Users" }} />
        </Stack>
    );
}
