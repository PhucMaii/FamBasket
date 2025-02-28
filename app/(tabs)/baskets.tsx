import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BasketCard from "@/components/BasketCard";
import IconButton from "@/components/IconButton";
import { Plus } from "lucide-react-native";
import CreateBasket from "@/components/Modal/CreateBasket";

const Baskets = () => {
  const [isOpenCreateBasket, setIsOpenCreateBasket] = useState<boolean>(false);

  return (
    <SafeAreaView className="h-full px-4">
      <CreateBasket
        open={isOpenCreateBasket}
        onClose={() => setIsOpenCreateBasket(false)}
      />
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

      {/* Only FlatList can be scrolled, so position absolute is totally fine */}
      <View className="absolute bottom-10 right-4">
        <IconButton
          onPress={() => setIsOpenCreateBasket(true)}
          className="bg-primary-100 w-20 h-20 shadow-lg"
        >
          <Plus color="#11441F" size={40} />
        </IconButton>
      </View>
    </SafeAreaView>
  );
};

export default Baskets;
