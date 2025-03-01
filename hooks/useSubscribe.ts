import { supabase } from "@/lib/supabase/config";
import { useEffect, useState } from "react";

const useSubscribe = (tableName: string) => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const { data, error } = await supabase.from(tableName).select("*");
    setData(data);
  };

  console.log(data)

  useEffect(() => {
    fetchData();
    const channel = supabase.channel("FamBasketDB").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: tableName,
      },
      (payload) => console.log(payload, 'payload')
    ).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return {data};
};

export default useSubscribe;