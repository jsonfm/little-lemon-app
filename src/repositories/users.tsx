import { getDatabase } from "@/storage/db";
import { UserSchemaType } from "@/validators/users";

export class UsersRepositories {
  table = "users";

  constructor() {
    this.createTable();
  }

  deleteTable = async () => {
    const db = getDatabase();
    await db.execAsync(`DELETE FROM ${this.table};`);
  };

  getUserByEmail = async (email: string) => {
    const db = getDatabase();
    const item = await db.getFirstAsync(
      `SELECT * FROM ${this.table} WHERE email='${email}' LIMIT 1`
    );
    if (!item) {
      throw new Error(`user with email '${email}' not found`);
    }
    return item as UserSchemaType;
  };

  getUserById = async (userId: string | number) => {
    const db = getDatabase();
    const item = await db.getFirstAsync(
      `SELECT * FROM ${this.table} WHERE id=${userId} LIMIT 1`
    );
    if (!item) {
      throw new Error(`user with id '${userId}' not found`);
    }
    return item as UserSchemaType;
  };

  createTable = () => {
    const db = getDatabase();
    db.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${this.table} (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT, firstName TEXT, lastName TEXT);
    `);
  };

  register = async (
    data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    return_: boolean = true
  ) => {
    let sql = `INSERT INTO ${this.table} (email, password, firstName, lastName) VALUES `;
    sql += `('${data.email}', '${data.password}', '${data.firstName}', '${data.lastName}');`;
    console.log(`sql: ${sql}`);
    const db = getDatabase();
    await db.execAsync(sql);
    if (return_) {
      return this.getUserByEmail(data?.email);
    }
  };

  update = async (
    id: number,
    data: {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
    },
    return_: boolean = true
  ) => {
    let updates = [];

    if (data.email) {
      updates.push(`email='${data.email}'`);
    }

    if (data.password) {
      updates.push(`password='${data.password}'`);
    }

    if (data.firstName) {
      updates.push(`firstName='${data.firstName}'`);
    }

    if (data.lastName) {
      updates.push(`lastName='${data.lastName}'`);
    }

    if (updates.length === 0) {
      console.log("No updates provided");
      return null;
    }

    let sql = `UPDATE ${this.table} SET `;
    sql += updates.join(", ");
    sql += ` WHERE id=${id}`;

    const db = getDatabase();
    await db.execAsync(sql);

    if (return_) {
      return await this.getUserById(id);
    }
  };
}

export const usersRepository = new UsersRepositories();
