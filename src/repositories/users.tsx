import { getDatabase } from "@/storage/db";
import { UserSchemaType } from "@/validators/users";

export class UsersRepositories {
  table = "users";

  constructor() {
    this.createTable();
  }

  deleteTable = async () => {
    const db = getDatabase();
    await db.execAsync(`DELETE FROM ${this.table}`);
  };

  getUserByEmail = async (email: string) => {
    const db = getDatabase();
    const item = await db.getFirstAsync(
      `SELECT * FROM ${this.table} WHERE email='${email}' LIMIT 1`
    );
    return item as UserSchemaType;
  };

  createTable = () => {
    const db = getDatabase();
    db.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${this.table} (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT, firstName TEXT, lastName TEXT);
    `);
  };

  register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    let sql = `INSERT INTO ${this.table} (email, description, price, image, category) VALUES `;
    sql += `('${data.email}', '${data.password}', '${data.firstName}', '${data.lastName}');`;

    const db = getDatabase();
    await db.execAsync(sql);
  };
}

export const usersRepository = new UsersRepositories();
