import { getTaskData, createTaskData, getTaskDataById, updateTaskData, deleteTaskData } from "../repositories/tasks.js";

export const createTask = async (userId, taskName, taskDesc, isDone) => {
    const [result] = await createTaskData(userId, taskName, taskDesc, isDone)

    if (result.insertId > 0) {
        console.log(`Data Tugas Berhasil Dibuat Dengan ID: ${result.insertId}`);
    } else {
        console.log(`Data Tugas Gagal Dibuat.`);
    }
}

export const getTask = async () => {
    const [result] = await getTaskData();

    if (result.length > 0) {
        console.log(result);
    } else {
        console.log(`Data Tugas Tidak Ada`);
    }
}

export const getTaskById = async(id) => {
    const [result] = await getTaskDataById(id);

    if (result.length > 0) {
        console.log(result[0]);
    } else {
        console.log(`Data Tugas Tidak Ditemukan`);
    }
};

export const updateTask = async(taskId, taskName, taskDesc, isDone) => {
    const [result] = await updateTaskData(taskId, taskName, taskDesc, isDone);
    
    if (result.affectedRows > 0) {
        console.log(`Update Tugas Berhasil Dilakukan`);
    } else {
        console.log(`Update Tugas Gagal`);
    }
    
}

export const deleteTask = async(id) => {
    const [result] = await deleteTaskData(id);

    if (result.affectedRows > 0) {
        console.log(`Tugas Berhasil Dihapus`);
    } else {
        console.log(`Gagal Menghapus Tugas`);
    }
}

