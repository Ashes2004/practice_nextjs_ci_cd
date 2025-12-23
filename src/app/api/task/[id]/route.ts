import { TaskController } from "@/controllers/task.controller";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  return TaskController.updateTaskName(req, ctx);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  return TaskController.deleteTask(req, ctx);
}
