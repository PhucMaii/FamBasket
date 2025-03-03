import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../FormField";
import { FilePenLine, Minus, Plus, Search, X } from "lucide-react-native";
import IconButton from "../IconButton";
import { useAuth } from "@/providers/AuthProvider";
import { getUserItems } from "@/lib/supabase/userItems";
import { showToast } from "@/lib/toast";
import { UserItem } from "@/lib/supabase/config";
import Divider from "../Divider";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ItemsSelection = ({ open, onClose }: Props) => {
  const { user } = useAuth();
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [items, setItems] = useState<UserItem[]>([]);

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user || !user.id) {
        return;
      }

      const { data } = await getUserItems(user?.id);

      if (data) {
        setItems(data);
      }
    };

    fetchUserItems();
  }, [user]);

  return (
    <ModalWrapper open={open} onClose={onClose} className="h-full">
      <SafeAreaView className="w-full mt-8">
        <View className="flex w-full items-center justify-between gap-2 flex-row">
          <FormField
            value={searchKeywords}
            onChangeText={(text: string) => setSearchKeywords(text)}
            placeholder="Search for items"
            startIcon={() => <Search size={20} color="gray" />}
            otherStyles="flex-[5]"
          />
          <IconButton className="bg-gray-50" onPress={onClose}>
            <X size={20} color="black" />
          </IconButton>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full flex flex-col flex-wrap gap-4 mt-4">
            {items.length > 0 ? (
              items.map((item: UserItem, index: number) => (
                <>
                  <TouchableOpacity
                    className="w-full flex flex-row items-center justify-between px-4 py-2 bg-white rounded-xl"
                    key={index}
                  >
                    <Text className="text-lg font-pregular">{item.name}</Text>
                    <View className="flex flex-row items-center gap-4">
                      <IconButton className="bg-gray-80" onPress={() => {}}>
                        <Minus size={20} color="black" />
                      </IconButton>
                      <Text className="text-lg font-psemibold text-primary">
                        {5}
                      </Text>

                      <IconButton className="bg-gray-80" onPress={() => {}}>
                        <Plus size={20} color="black" />
                      </IconButton>
                    </View>
                  </TouchableOpacity>
                  <Divider />
                </>
              ))
            ) : (
              <Text className="text-lg font-pregular">No items found</Text>
            )}
          </View>
        </ScrollView>

        <View className="w-full flex flex-row items-center justify-center mt-4">
          <IconButton
            className="absolute w-24 h-24 z-50 bg-primary bottom-10"
            onPress={() => {}}
            badgeCount={12}
          >
            <FilePenLine size={36} color="white" />
          </IconButton>
        </View>
      </SafeAreaView>
    </ModalWrapper>
  );
};

export default ItemsSelection;
