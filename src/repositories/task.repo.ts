import { UserModel } from "@/models/task.model";

export class TaskRepository {
  static async create(data: { taskName: string }) {
    return UserModel.create(data);
  }

  static async findAll() {
    return UserModel.find();
  }

  static async findById(id: string) {
    return UserModel.findById(id);
  }

  static async update(id: string, data: { taskName: string }) {
    return UserModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  static async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}
