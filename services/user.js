import { getData, createData, getDataById, updateData, deleteData } from "../repositories/users.js";

export const createUser = async (nama, email, password) => {
    const [result] = await createData(nama, email, password)

    if (result.insertId > 0) {
        console.log(`Data User Berhasil Dibuat Dengan ID: ${result.insertId}`);
    } else {
        console.log(`Data Gagal Dibuat.`);
    }
}

export const getUser = async () => {
    const [result] = await getData();

    if (result.length > 0) {
        console.log(result);
    } else {
        console.log(`Data User Tidak Ada`);
    }
}

export const getUserById = async(id) => {
    const [result] = await getDataById(id);

    if (result.length > 0) {
        console.log(result[0]);
    } else {
        console.log(`Data User Tidak Ditemukan`);
    }
};

export const updateUser = async(id, nama, email) => {
    const [result] = await updateData(id, nama, email);
    
    if (result.affectedRows > 0) {
        console.log(`Update Berhasil Dilakukan`);
    } else {
        console.log(`Update Gagal`);
    }
    
}

export const deleteUser = async(id) => {
    const [result] = await deleteData(id);

    if (result.affectedRows > 0) {
        console.log(`User Berhasil Dihapus`);
    } else {
        console.log(`Gagal Menghapus User`);
    }
}

