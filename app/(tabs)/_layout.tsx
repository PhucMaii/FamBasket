import { View, Text, Image } from "react-native";
import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { CircleUserRound, ShoppingBasketIcon } from "lucide-react-native";
import { useAuth } from "@/providers/AuthProvider";

type TabIconProps = {
  Icon: any;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon = ({ Icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="w-auto flex items-center justify-center gap-1 min-w-[80px]">
      <Icon size={30} style={{ color: focused ? "#11441F" : "#AEAEAE" }} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: focused ? "#11441F" : "#AEAEAE" }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#11441F",
          tabBarInactiveTintColor: "#EBEBEB",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fffff",
            borderTopWidth: 0,
            borderTopColor: "#EBEBEB",
            elevation: 0,
            height: 85,
          },
        }}
      >
        <Tabs.Screen
          name="baskets"
          options={{
            title: "Baskets",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={ShoppingBasketIcon}
                color={color}
                name="Baskets"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={CircleUserRound}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
