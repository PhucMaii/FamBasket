import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BasketCard from "@/components/BasketCard";
import IconButton from "@/components/IconButton";
import { Plus } from "lucide-react-native";
import CreateBasket from "@/components/Modal/baskets/CreateBasket";
import useSubscribe from "@/hooks/useSubscribe";
import { useFetchData } from "@/hooks/useFetchData";
import { deleteBasket, getBaskets } from "@/lib/supabase/baskets";
import { useAuth } from "@/providers/AuthProvider";
import { RefreshControl } from "react-native";
import EditBasket from "@/components/Modal/baskets/EditBasket";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import Toast from "react-native-toast-message";
import { showToast } from "@/lib/toast";

const Baskets = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isOpenCreateBasket, setIsOpenCreateBasket] = useState<boolean>(false);
  const [editBasketProps, setEditBasketProps] = useState<any>({
    open: false,
    basket: null,
  });
  const [deleteBasketProps, setDeleteBasketProps] = useState<any>({
    open: false,
    basketId: null,
  });
  const { user } = useAuth();

  const {
    data: baskets,
    refetch,
    onAddItemToData,
    onUpdateItemInData,
    onRemoveItemFromData,
  } = useFetchData(() => getBaskets());

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleDelete = async () => {
    if (!deleteBasketProps.basketId) {
      return;
    }
    try {
      await deleteBasket(deleteBasketProps.basketId);
      onRemoveItemFromData(deleteBasketProps.basketId);
      setDeleteBasketProps({ open: false, basketId: null });
      showToast('success', 'Basket deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="h-full px-4">
      <ConfirmModal
        open={deleteBasketProps.open}
        onClose={() => setDeleteBasketProps({ open: false, basketId: null })}
        message="Are you sure you want to delete this basket?"
        type="error"
        onSubmit={handleDelete}
      />
      <CreateBasket
        open={isOpenCreateBasket}
        onClose={() => setIsOpenCreateBasket(false)}
        onAddBasketUI={onAddItemToData}
      />
      <EditBasket
        open={editBasketProps.open}
        onClose={() => setEditBasketProps({ open: false, basket: null })}
        basket={editBasketProps.basket}
        onUpdateBasketUI={onUpdateItemInData}
      />
      <FlatList
        data={baskets}
        renderItem={({ item }) => (
          <BasketCard
            onEdit={() => setEditBasketProps({ open: true, basket: item })}
            onRemove={() =>
              setDeleteBasketProps({ open: true, basketId: item.id })
            }
            basket={item}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl font-psemibold text-black">
              My Baskets
            </Text>
          </View>
        )}
        // onRefresh={refetch}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
