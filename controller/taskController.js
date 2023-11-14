// // const Task = require("../modals/task"); // قد تحتاج إلى تعديل المسار حسب مكان ملف النموذج

// // // عرض كل المهام
// // const getAllTasks = async () => {
// //   try {
// //     const tasks = await Task.find();
// //     return tasks;
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error('Internal Server Error');
// //   }
// // };

// // // إنشاء مهمة جديدة
// // const createTask = async (title, description) => {
// //   try {
// //     const newTask = await Task.create({ title, description });
// //     return newTask;
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error('Internal Server Error');
// //   }
// // };

// // // تحديث مهمة محددة
// // const updateTask = async (id, title, description, completed) => {
// //   try {
// //     const updatedTask = await Task.findByIdAndUpdate(
// //       id,
// //       { title, description, completed },
// //       { new: true } // يعيد الوثيقة المحدثة بدلاً من الوثيقة القديمة
// //     );
// //     return updatedTask;
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error('Internal Server Error');
// //   }
// // };

// // // حذف مهمة محددة
// // const deleteTask = async (id) => {
// //   try {
// //     const deletedTask = await Task.findByIdAndDelete(id);
// //     if (!deletedTask) {
// //       throw new Error('Task not found');
// //     }
// //     return deletedTask;
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error('Internal Server Error');
// //   }
// // };

// // module.exports = {
// //   getAllTasks,
// //   createTask,
// //   updateTask,
// //   deleteTask,

// const Task = require('../modals/task');

// exports.createTask = async (req, res) => {
//     try {
//         const newTask = new Task(req.body);
//         await newTask.save();
//         res.status(201).json(newTask);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get all tasks
// exports.getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get a single task by ID
// exports.getTaskById = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id);
//         if (!task) {
//             return res.status(404).json({ error: 'Task not found' });
//         }
//         res.status(200).json(task);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Update a task by ID
// exports.updateTaskById = async (req, res) => {
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
//         if (!updatedTask) {
//             return res.status(404).json({ error: 'Task not found' });
//         }
//         res.status(200).json(updatedTask);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Delete a task by ID
// exports.deleteTaskById = async (req, res) => {
//     try {
//         const deletedTask = await Task.findByIdAndDelete(req.params.id);
//         if (!deletedTask) {
//             return res.status(404).json({ error: 'Task not found' });
//         }
//         res.status(200).json(deletedTask);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const Task = require("../modals/task");

// Create a new task for a specific user
exports.createTask = async (req, res) => {
  try {
    // Assuming userId is available from authentication
    const userId = req.body.user_id;

    console.log(req.body);
    const newTask = new Task({
      ...req.body,
      user_id: userId,
    });
    console.log(newTask);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Get all tasks for a specific user
exports.getAllTasksuser = async (req, res) => {
  try {
    // يفترض أن يكون userId متاحًا من عملية المصادقة أو أي مصدر آخر
    const userId = req.body.userId;

    // استخدم userId للحصول على المهام الخاصة به
    const tasks = await Task.find({ user_id: userId, is_deleted: false });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks for a specific user
exports.getAllTasks = async (req, res) => {
  try {
    // Assuming userId is available from authentication
    const userId = req.body.userId;

    const tasks = await Task.find({ userId, is_deleted: false });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID for a specific user
exports.getTaskById = async (req, res) => {
  try {
    // Assuming userId is available from authentication
    const userId = req.body.userId;

    const task = await Task.findOne({ _id: req.params._id, userId });
    console.log(task);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID for a specific user
exports.updateTaskById = async (req, res) => {
  try {
    // Assuming userId is available from authentication
    const userId = req.body.userId;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params._id, userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID for a specific user
exports.deleteTaskById = async (req, res) => {
  try {
    // يفترض أن يكون userId متاحًا من عملية المصادقة
    // const userId = req.body.userId;
    // console.log(userId, req.params.user_id);
    // تحديث حقل is_deleted بدلاً من الحذف الفعلي
    const deletedTask = await Task.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { is_deleted: true } },
      { new: true } // يعيد الوثيقة المحدثة بدلاً من الوثيقة القديمة
    );

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeTaskById = async (req, res) => {
  try {
    // يفترض أن يكون userId متاحًا من عملية المصادقة

    // تحديث حقل is_deleted بدلاً من الحذف الفعلي
    const deletedTask = await Task.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { completed: true } },
      { new: true } // يعيد الوثيقة المحدثة بدلاً من الوثيقة القديمة
    );

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
