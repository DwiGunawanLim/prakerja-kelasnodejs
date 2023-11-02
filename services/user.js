import { request, response } from "express";
import { getData, createData, getDataById, updateData, deleteData } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createUser = async (request, response, next) => {
    let nama = request.body.name;
    let email = request.body.email;
    let password = request.body.password;

    const [result] = await createData(nama, email, password);
    const [detailUser] = await getDataById(result.insertId);

    if (result.insertId > 0) {
        successResponse(response, "Success", detailUser[0]);
        // console.log(`Data User Berhasil Dibuat Dengan ID: ${result.insertId}`);
    } else {
        errorResponse(response, "Failed Create Data")
        // console.log(`Data Gagal Dibuat.`);
    }
}

export const getUser = async (request, response, next) => {
    try {
        const [result] = await getData();

        if (result.length > 0) {
            successResponse(response, "Success", result);
        } else {
            errorResponse(response, "Data Not Found", 404)
            // console.log(`Data User Tidak Ada`);
        }
    } catch (error) {
        next(error);
    }
}

export const getUserById = async(request, response, next) => {
    try {
        let id = request.body.id;

        const [result] = await getDataById(id);

        if (result.length > 0) {
            successResponse(response, "Update Berhasil Dilakukan", result[0]);
            // console.log(result[0]);
        } else {
            errorResponse(response, "User ID Not Found!");
            // console.log(`Data User Tidak Ditemukan`);
        }
    } catch (error) {
        next(error);
    }
    
};

export const updateUser = async(request, response, next) => {
    try {
        let id = request.params.id;
        let nama = request.body.name;
        let email = request.body.email;

        const [result] = await updateData(id, nama, email);
        const [detailUser] = await getDataById(id);
    
        if (result.affectedRows > 0) {
            successResponse(response, "Update Berhasil Dilakukan", detailUser[0]);
            // console.log(`Update Berhasil Dilakukan`);
        } else {
            errorResponse(response, "User ID Not Found!");
            // console.log(`Update Gagal`);
        }
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(request, response, next) => {
    try {
        let id = request.params.id;

        const [result] = await deleteData(id);

        if (result.affectedRows > 0) {
            successResponse(response, "User Berhasil Dihapus", result.affectedRows);
            // console.log(`User Berhasil Dihapus`);
        } else {
            errorResponse(response, "Gagal Menghapus User");
            // console.log(`Gagal Menghapus User`);
        }
    } catch (error) {
        next(error);
    }
}

export const login = async(request, response, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;

        const [result] = await getData();

        for (let i = 0; i < result.length; i++) {
            if (result[i].email == email && result[i].password == password) {
                const element = result[i];
                successResponse(response, "Login Berhasil", element);
            }
        }
    } catch (error) {
        next(error);
    }
}

