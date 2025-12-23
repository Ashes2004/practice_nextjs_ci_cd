import { AppError } from "@/errorHandlers/AppError";
import { TaskRepository } from "@/repositories/task.repo";

export class TaskService {
  static async createTask(data: { taskName: string }) {
    return TaskRepository.create(data);
  }

  static async findAllTask() {
    return TaskRepository.findAll();
  }

  static async toggleTask(id: string) {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new AppError("Task no found", 404);
    }

    task.isCompleted = !task.isCompleted;
    await task.save();
    return task;
  }

  static async updateTaskName(id: string, data: { taskName: string }) {
    const updatedTask = await TaskRepository.update(id, data);

    if (!updatedTask) {
      throw new AppError("Task not found", 404);
    }

    return updatedTask;
  }
  static async deleteTask(id: string) {
    const deletedTask = await TaskRepository.delete(id);

    if (!deletedTask) {
      throw new AppError("Task not found", 404);
    }

    return deletedTask;
  }
}
