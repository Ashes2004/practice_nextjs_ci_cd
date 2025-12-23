import { AppError } from "@/errorHandlers/AppError";
import { ErrorHandler } from "@/errorHandlers/ErrorHandler";
import { TaskService } from "@/services/task.service";
import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export class TaskController {

  static async createTask(req: NextRequest) {
    try {
      await connectDB();

      const body: { taskName?: string } = await req.json();
      const { taskName } = body;

      if (!taskName || taskName.trim() === "") {
        throw new AppError("Task name is required", 400);
      }

      const task = await TaskService.createTask({ taskName });
      return NextResponse.json(task, { status: 201 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async getAllTask() {
    try {
      await connectDB();

      const tasks = await TaskService.findAllTask();
      return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async toggleTask(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> }
  ) {
    try {
      await connectDB();

      const { id } = await context.params;
      if (!id) throw new AppError("Task id is required", 400);

      const task = await TaskService.toggleTask(id);
      return NextResponse.json(task, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async updateTaskName(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
  ) {
    try {
      await connectDB();

      const { id } = await context.params;
      if (!id) throw new AppError("Task id is required", 400);

      const body: { taskName?: string } = await req.json();
      if (!body.taskName || body.taskName.trim() === "") {
        throw new AppError("Task name is required", 400);
      }

      const task = await TaskService.updateTaskName(id, {
        taskName: body.taskName,
      });

      return NextResponse.json(task, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async deleteTask(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> }
  ) {
    try {
      await connectDB();

      const { id } = await context.params;
      if (!id) throw new AppError("Task id is required", 400);

      const deletedTask = await TaskService.deleteTask(id);
      return NextResponse.json(deletedTask, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }
}
