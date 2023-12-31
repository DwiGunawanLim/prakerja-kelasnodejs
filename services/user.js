import { request, response } from "express";
import { getData, createData, getDataById, updateData, deleteData, getDataByEmail } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_ACCESS_TOKEN = "kelas.com";
const SECRET_REFRESH_TOKEN = "backend";

export const createUser = async (request, response, next) => {
    let nama = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    let saltRound = 10;

    bcrypt.hash(password, saltRound, async(err, hashedPassword) => {
        const [result] = await createData(nama, email, hashedPassword);
        const [detailUser] = await getDataById(result.insertId);

        if (result.insertId > 0) {
            successResponse(response, "Success", detailUser[0]);
            // console.log(`Data User Berhasil Dibuat Dengan ID: ${result.insertId}`);
        } else {
            errorResponse(response, err);
            // errorResponse(response, "Failed Create Data")
            // console.log(`Data Gagal Dibuat.`);
        }
    });
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
            successResponse(response, `User dengan ID ${id} Ditemukan`, result[0]);
            // console.log(result[0]);
        } else {
            errorResponse(response, `User ID:${id}  Not Found!`);
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

        // const [result] = await getData();
        const [result] = await getDataByEmail(email);

        if (result.length > 0) {
            let user = result[0];
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (isValid) {
                    let payload = {
                        id: user.user_id,
                        name: user.name,
                        email: user.email
                    };
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn: '15m'});
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, {expiresIn: '30m'});
                    let data = {
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }
                    successResponse(response, "Login Berhasil", data);
                } else {
                    errorResponse(response, "Email atau Password Salah!", 401);
                }
            })
        }

        // for (let i = 0; i < result.length; i++) {
        //     if (result[i].email == email && result[i].password == password) {
        //         const element = result[i];
        //         successResponse(response, "Login Berhasil", element);
        //     }
        // }
    } catch (error) {
        next(error);
    }
}

export const validateToken = (request, response, next) => {
    try {
        let authToken = request.headers.authorization;
        let accessToken = authToken && authToken.split(' ')[1]; 
        
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, payload) => {
            if (!error) {
                request.claims = payload;
                next();
            } else {
                errorResponse(response, error.message, 403);
            }
        })

    } catch (error) {
        next(error);
    }
}