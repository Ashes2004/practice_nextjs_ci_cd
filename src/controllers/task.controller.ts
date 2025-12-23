import { AppError } from "@/errorHandlers/AppError";
import { ErrorHandler } from "@/errorHandlers/ErrorHandler";
import { TaskService } from "@/services/task.service";
import { NextResponse } from "next/server";

export class TaskController {

  // CREATE TASK
  static async createTask(req: Request) {
    try {
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

  // GET ALL TASKS
  static async getAllTask() {
    try {
      const tasks = await TaskService.findAllTask();
      return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  // TOGGLE TASK
  static async toggleTask(
    _req: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await context.params;

      if (!id) {
        throw new AppError("Task id is required", 400);
      }

      const task = await TaskService.toggleTask(id);

      return NextResponse.json(task, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }


  //UPDATE TASK NAME
  static async updateTaskName(req: Request ,  context: { params: Promise<{ id: string }> })
  {
    try {
        const { id } = await context.params;

      if (!id) {
        throw new AppError("Task id is required", 400);
      }
       const body: { taskName?: string } = await req.json();
      const { taskName } = body;

      if (!taskName || taskName.trim() === "") {
        throw new AppError("Task name is required", 400);
      }

      const task = await TaskService.updateTaskName(id , { taskName });

      return NextResponse.json(task, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }
  // DELETE TASK
  static async deleteTask(
    _req: Request,
    context: { params:  Promise<{ id: string }> }
  ) {
    try {
      const { id } = await context.params;

      if (!id) {
        throw new AppError("Task id is required", 400);
      }

      const deletedTask = await TaskService.deleteTask(id);

      return NextResponse.json(deletedTask, { status: 200 });
    } catch (error) {
      return ErrorHandler(error);
    }
  }
}
