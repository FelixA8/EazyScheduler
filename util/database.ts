import * as SQLITE from "expo-sqlite";
import { useEffect } from "react";
import { Task } from "../constants/types";

let db: SQLITE.SQLiteDatabase;

function formatDate(dateObj: Date): string {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} 00:00:00`;
}

export async function init() {
  var promise;
  try {
    db = await SQLITE.openDatabaseAsync("tasks.db");
    promise = await db.execAsync(
      `CREATE TABLE IF NOT EXISTS tasks
    (id INTEGER PRIMARY KEY NOT NULL,
      date DATE TEXT NOT NULL,
      tasktitle TEXT NOT NULL,
      taskdescription TEXT,
      time TIME NOT NULL,
      important TEXT NOT NULL,
      urgent TEXT NOT NULL,
      isdone TEXT NOT NULL,
      theme TEXT NOT NULL)`
    );
  } catch (e) {}

  return promise;
}

export async function insertTask(task: Task) {
  const date = formatDate(task.date);
  const time = `${task.time.toLocaleTimeString()}`;
  const promise = await db.runAsync(
    `INSERT INTO tasks (date, tasktitle, taskdescription, time, important, urgent, isDone, theme)
        VALUES (?,?,?,?,?,?,?,?)`,
    date,
    task.taskTitle,
    task.taskDescription,
    time,
    task.important,
    task.urgent,
    task.isDone,
    task.theme
  );

  return promise;
}

export async function fetchTasksInaWeek() {
  var value: any;
  try {
    const allRows = await db.getAllAsync(
      "SELECT SUM(isDone) AS totalIsDone,  SUM(important) AS totalImportant, SUM(urgent) AS totalUrgent FROM tasks WHERE date >= DATE('now', '-7 days')"
    );
    value = allRows[0];
  } catch (e) {
    console.log(`${e}`);
    console.log("this");
  }

  return value;
}

export async function fetchTasksInaDay(day: Date) {
  const tasks = [];
  const db = await SQLITE.openDatabaseAsync("tasks.db");
  try {
    const formattedDate = formatDate(day);
    const allRows = await db.getAllAsync(
      "SELECT * FROM tasks WHERE date=? ORDER BY date, time",
      formattedDate
    );

    for (const row of allRows) {
      tasks.push(row);
    }
  } catch (e) {
    console.log(e);
  }

  return tasks;
}

export async function updateTask(task: Task) {
  const date = formatDate(task.date);
  const time = `${task.time.toLocaleTimeString()}`;
  const response = await db.getAllAsync(
    `UPDATE tasks SET date=?, tasktitle=?, taskdescription=?, time=?, important=?, urgent=?, isDone=?, theme=? WHERE id = ?`,
    date,
    task.taskTitle,
    task.taskDescription,
    time,
    task.important,
    task.urgent,
    task.isDone,
    task.theme,
    task.id
  );

  return response;
}

export async function deleteTask(id: string) {
  const response = await db.getAllAsync(`DELETE FROM tasks WHERE id = ?`, id);

  return response;
}

export async function changeDoneTask(id: string, isDone: boolean) {
  const response = await db.getAllAsync(
    `UPDATE tasks SET isDone = ? WHERE id = ?`,
    isDone,
    id
  );

  return response;
}
