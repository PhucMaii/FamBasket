import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BasketCard from "@/components/BasketCard";

const Baskets = () => {
  return (
    <SafeAreaView className="h-full px-4">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        renderItem={({ item }) => <BasketCard />}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl font-psemibold text-primary">
              My Baskets
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Baskets;
