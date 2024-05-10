import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import React from "react";

import { primary, secondary, tintColorLight } from "@/constants/ThemeVariables";
import { Pressable, Text } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: tintColorLight,
        tabBarActiveBackgroundColor: secondary,
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
      <Tabs.Screen
        name="index"
        options={{
          title: "Posts",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/(modals)/post-modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                      color: tintColorLight,
                      fontWeight: "bold"
                    }}>
                    New Post
                  </Text>
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />
    </Tabs>
  );
}
