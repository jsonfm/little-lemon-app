import { menuRepository } from "@/repositories/menu";
import { getDatabase } from "@/storage/db";

const API_URL = `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json`;

const mapImage = (item: Dish) => {
  const image = item.image;
  const result = {
    ...item,
    image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
  };
  return result as Dish;
};

export class MenuService {
  static getMenuApi = async () => {
    const data = await fetch(`${API_URL}`).then((res) => res.json());
    const result = data?.menu?.map(mapImage);
    console.log("🚀 ~ MenuService ~ getMenuApi= ~ result:", result);
    return result as Dish[];
  };
  static getMenu = async () => {
    const dbMenu = await menuRepository.getMenu();
    if (!dbMenu?.length) {
      const menu = await this.getMenuApi();
      await menuRepository.insertManyMenu(menu);
      return menu;
    }
    return dbMenu;
  };
  static createDish = async () => {};
}
