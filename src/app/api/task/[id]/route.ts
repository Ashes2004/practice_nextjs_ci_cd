import { TaskController } from "@/controllers/task.controller";
import { connectDB } from "@/lib/connectDB";

await connectDB();
export const PATCH = TaskController.updateTaskName;
export const DELETE = TaskController.deleteTask;
