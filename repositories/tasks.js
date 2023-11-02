import dbPool from "../utils/db.js";

const getTaskData = () => {
    const query = "SELECT task_id, user_id, task_name, task_description, is_done FROM tasks";

    return dbPool.query(query);
}

const createTaskData = (userId, taskName, taskDesc, isDone) => {
    let createdAt = new Date();
    const query = "INSERT INTO tasks(user_id, task_name, task_description, is_done) VALUES (?,?,?,?)";
    const value = [userId, taskName, taskDesc, isDone];

    return dbPool.query(query, value);
}

const getTaskDataById = (id) => {
    const query = "SELECT * FROM tasks WHERE task_id=?";

    return dbPool.query(query, [id]);
}

const updateTaskData = (taskId, taskName, taskDesc, isDone) => {
    const query = "UPDATE tasks SET task_name=?, task_description=?, is_done=? WHERE task_id=?";
    const value = [taskName, taskDesc, isDone, taskId];

    return dbPool.query(query, value);
}

const deleteTaskData = (id) => {
    const query = "DELETE FROM tasks WHERE task_id=?";

    return dbPool.query(query, [id]);
}

export {createTaskData, getTaskData, getTaskDataById, updateTaskData, deleteTaskData} 