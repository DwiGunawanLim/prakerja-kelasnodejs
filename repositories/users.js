import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT user_id, name, email, password, created_at FROM users";

    return dbPool.query(query);
}

const createData = (nama, email, password) => {
    let createdAt = new Date();
    const query = "INSERT INTO users(name, email, password, created_at) VALUES (?,?,?,?)";
    const value = [nama, email, password, createdAt];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT user_id, name, email, password, created_at FROM users WHERE user_id=?";

    return dbPool.query(query, [id]);
}

const updateData = (id, nama, email) => {
    const query = "UPDATE users SET name=?, email=? WHERE user_id=?";
    const value = [nama, email, id];

    return dbPool.query(query, value);
}

const deleteData = (id) => {
    const query = "DELETE FROM users WHERE user_id=?";

    return dbPool.query(query, [id]);
}

export {createData, getData, getDataById, updateData, deleteData} 