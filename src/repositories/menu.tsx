import { getDatabase } from "@/storage/db";

export class MenuRepository {
  table = "menuitems";
  constructor() {
    this.createTable();
  }

  deleteTable = async () => {
    const db = getDatabase();
    await db.execAsync(`DELETE FROM ${this.table}`);
  };

  createTable = async () => {
    const db = getDatabase();
    db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS ${this.table} (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT, price REAL, image TEXT, category TEXT);
    `);
  };
  getMenu = async ({ limit = 100, offset = 0 } = {}) => {
    const db = getDatabase();
    const items = await db.getAllAsync(
      `SELECT * FROM ${this.table} LIMIT ${limit} OFFSET ${offset}`
    );

    return items as Dish[];
  };
  insertManyMenu = async (items: Dish[]) => {
    if (!items) return [];
    const db = getDatabase();
    let sql = `INSERT INTO ${this.table} (name, description, price, image, category) VALUES `;
    items?.forEach((item, index) => {
      sql += `("${item.name}", "${item.description}", ${item.price}, "${item.image}", "${item.category}")`;
      if (index < items?.length - 1) {
        sql += `,`;
      }
    });

    sql += `;`;
    await db.execAsync(sql);
    const result = await this.getMenu();
    return result;
  };
}

export const menuRepository = new MenuRepository();
