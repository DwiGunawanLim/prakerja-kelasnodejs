import { getTaskData, createTaskData, getTaskDataById, updateTaskData, deleteTaskData } from "../repositories/tasks.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createTask = async (request, response, next) => {
    try {
        let userId = request.body.user_id;
        let taskName = request.body.task_name;
        let taskDesc = request.body.task_description;
        let isDone = request.body.is_done;

        const [result] = await createTaskData(userId, taskName, taskDesc, isDone);
        const [detailTask] = await getTaskById(result.insertId);

        if (result.insertId > 0) {
            successResponse(response, "Berhasil Menambahkan Tugas", detailTask[0]);
            // console.log(`Data Tugas Berhasil Dibuat Dengan ID: ${result.insertId}`);
        } else {
            errorResponse(response, "Gagal Menambahkan Tugas");
            // console.log(`Data Tugas Gagal Dibuat.`);
        }
    } catch (error) {
        next(error);
    }
    
}

export const getTask = async (request, response, next) => {
    try {
        const [result] = await getTaskData();

        if (result.length > 0) {
            successResponse(response, "Tugas Ditemukan", result);
            // console.log(result);
        } else {
            errorResponse(response, "Tugas Tidak Ditemukan", 404);
            // console.log(`Data Tugas Tidak Ada`);
        }
    } catch (error) {
        next(error);
    }
    
}

export const getTaskById = async(request, response, next) => {
    try {
        let id = request.body.id;
    
        const [result] = await getTaskDataById(id);

        if (result.length > 0) {
            successResponse(response, `Tugas dengan ID ${id} Ditemukan`, result[0]);
            // console.log(result[0]);
        } else {
            errorResponse(response, "ID Tugas Tidak Ditemukan!");
            // console.log(`Data Tugas Tidak Ditemukan`);
        }
    } catch (error) {
        next(error);
    }

};

export const updateTask = async(request, response, next) => {
    try {
        let taskId = request.params.id;
        let taskName = request.body.task_name;
        let taskDesc = request.body.task_description;
        let isDone = request.body.is_done;

        const [result] = await updateTaskData(taskId, taskName, taskDesc, isDone);
        const [detailTask] = await getTaskById(taskId);
    
        if (result.affectedRows > 0) {
            successResponse(response, "Update Tugas Berhasil Dilakukan", detailTask[0]);
            // console.log(`Update Tugas Berhasil Dilakukan`);
        } else {
            errorResponse(response, "ID Tugas Tidak Ditemukan!");
            // console.log(`Update Tugas Gagal`);
        }
    } catch (error) {
        next(error);
    }

}

export const deleteTask = async(request, response, next) => {
    try {
        let id = request.params.id;

        const [result] = await deleteTaskData(id);

        if (result.affectedRows > 0) {
            successResponse(response, "Tugas Berhasil Dihapus", result.affectedRows);
            // console.log(`Tugas Berhasil Dihapus`);
        } else {
            errorResponse(response, "Gagal Menghapus Tugas");
            // console.log(`Gagal Menghapus Tugas`);
        }
    } catch (error) {
        next(error);
    }

}

