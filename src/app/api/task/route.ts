import { TaskController } from "@/controllers/task.controller";
import { connectDB } from "@/lib/connectDB";

await connectDB();
export const POST = TaskController.createTask;
export const GET = TaskController.getAllTask;
