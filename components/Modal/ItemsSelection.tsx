import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../FormField";
import { FilePenLine, Minus, Plus, Search, X } from "lucide-react-native";
import IconButton from "../IconButton";
import { useAuth } from "@/providers/AuthProvider";
import { addUserItemsToBasket, getUserItems } from "@/lib/supabase/userItems";
import { UserItem } from "@/lib/supabase/config";
import Divider from "../Divider";
import { showToast } from "@/lib/toast";

type Props = {
  open: boolean;
  onClose: () => void;
  basketId: number;
};

const ItemsSelection = ({ open, onClose, basketId }: Props) => {
  const { user } = useAuth();
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [items, setItems] = useState<UserItem[]>([]);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const totalQuantity = useMemo(
    () =>
      items.reduce((acc, item) => {
        return acc + (item?.quantity || 0);
      }, 0),
    [items]
  );

  const popUp = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        mass: 0.3,
        stiffness: 200,
        damping: 10,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        mass: 0.3,
        stiffness: 200,
        damping: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user || !user.id) {
        return;
      }

      const { data } = await getUserItems(user?.id);

      if (data) {
        const itemWithQuantity = data.map((item) => ({
          ...item,
          quantity: 0,
        }));
        setItems(itemWithQuantity);
      }
    };

    fetchUserItems();
  }, [user]);

  const handleSaveAddedItems = async () => {
    const addedItems = items.filter((item) => (item?.quantity || 0) > 0);

    if (addedItems.length === 0) {
      onClose();
      return;
    }

    await addUserItemsToBasket(basketId, addedItems);
    onClose();
  };

  const onIncrementItem = (item: UserItem) => {
    const newItems = items.map((i) => {
      if (i.name === item.name) {
        return { ...i, quantity: (i?.quantity || 0) + 1 };
      }
      return i;
    });

    setItems(newItems);

    popUp();
  };

  const onDecrementItem = (item: UserItem) => {
    const newItems = items.map((i) => {
      if (i.name === item.name) {
        if (i.quantity === 0) {
          return i;
        }
        return { ...i, quantity: (i?.quantity || 0) - 1 };
      }
      return i;
    });

    setItems(newItems);

    // popUp();
  };

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
          <IconButton className="bg-gray-50" onPress={handleSaveAddedItems}>
            <X size={20} color="black" />
          </IconButton>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full flex flex-col flex-wrap gap-4 mt-4">
            {items.length > 0 ? (
              items.map((item: UserItem, index: number) => (
                <Fragment key={index}>
                  <TouchableOpacity
                    className="w-full flex flex-row items-center justify-between px-4 py-2 bg-white rounded-xl"
                    key={index}
                    onPress={() => {
                      onIncrementItem(item);
                    }}
                  >
                    <Text className="text-lg font-pregular">{item.name}</Text>
                    {(item?.quantity || 0) > 0 && (
                      <View className="flex flex-row items-center gap-4">
                        <IconButton
                          className="bg-gray-80"
                          onPress={() => onDecrementItem(item)}
                        >
                          <Minus size={20} color="black" />
                        </IconButton>
                        <Text className="text-lg font-psemibold text-primary">
                          {item?.quantity || 0}
                        </Text>

                        <IconButton
                          className="bg-gray-80"
                          onPress={() => onIncrementItem(item)}
                        >
                          <Plus size={20} color="black" />
                        </IconButton>
                      </View>
                    )}
                  </TouchableOpacity>
                  <Divider />
                </Fragment>
              ))
            ) : (
              <Text className="text-lg font-pregular">No items found</Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity>
          <Animated.View
            style={{ transform: [{ scale: scaleAnim }] }}
            className="w-full flex flex-row items-center justify-center mt-4"
          >
            <IconButton
              className="absolute w-24 h-24 z-50 bg-primary bottom-10"
              onPress={handleSaveAddedItems}
              badgeCount={totalQuantity}
            >
              <FilePenLine size={36} color="white" />
            </IconButton>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    </ModalWrapper>
  );
};

export default ItemsSelection;
