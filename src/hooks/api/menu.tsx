import { MenuService } from "@/services/menu";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useGetMenu = () => {
  const response = useSWR(`/api/menu`, () => MenuService.getMenu());
  return response;
};

export const useGetCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { data } = useGetMenu();

  useEffect(() => {
    if (!data?.length) return;
    const filtered = data?.map((item) => item.category);
    const single = new Set(filtered);
    setCategories([...single]);
  }, [data]);

  return {
    categories,
  };
};
