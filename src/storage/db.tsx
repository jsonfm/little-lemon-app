import * as SQLite from "expo-sqlite/next";
import { SQLiteDatabase } from "expo-sqlite/next";

let db: SQLiteDatabase;

export const getDatabase = () => {
  if (!db) {
    db = SQLite.openDatabaseSync("litteLemonDB");
  }
  return db;
};
