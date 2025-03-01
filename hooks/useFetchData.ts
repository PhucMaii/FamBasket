import { logger } from "@/lib/logger";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useFetchData = (fn: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await fn();

      if (error) {
        Alert.alert("Error", error.message);
      }

      setData(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
      logger("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onAddItemToData = (newItem: any) => {
    setData([...data, newItem]);
  };

  const onUpdateItemInData = (updatedItem: any) => {
    const newData = data.map((item: any) => {
      if (item.id == updatedItem.id) {
        return updatedItem;
      }
      return item;
    });

    setData(newData);
  };

  const onRemoveItemFromData = (id: number) => {
    setData(data.filter((item: any) => item.id !== id));
  };

  const refetch = () => fetchData();

  return {
    data,
    onAddItemToData,
    onUpdateItemInData,
    onRemoveItemFromData,
    loading,
    refetch,
  };
};
