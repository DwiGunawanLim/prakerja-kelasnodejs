import * as UserService from './services/user.js';
import * as TaskService from './services/task.js';
import express from 'express';

const host = "localhost";
const port = 8080;
const app = express();

app.use(express.json()); //ngehandle js nya

// Handle Routing User
app.get("/users", UserService.getUser);
app.get("/users/detail", UserService.getUserById);
app.post("/users", UserService.createUser);
app.put("/users/:id", UserService.updateUser);
app.delete("/users/:id", UserService.deleteUser);
app.post("/login", UserService.login);

// Handle Routing Task
app.get("/tasks", TaskService.getTask);
app.get("/tasks/detail", TaskService.getTaskById);
app.post("/tasks", TaskService.createTask);
app.put("/tasks/:id", TaskService.updateTask);
app.delete("/tasks/:id", TaskService.deleteTask);

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
})

// console.log(`Jalankan Function Create Data`);
// UserService.createUser("Dwi","dwi@test.com", "dwi123");
// console.log(`Jalankan Function Get Data`);
// await UserService.getUser();

// console.log("Jalankan Function Get Detail");

// await UserService.getUserById(1);

/*
    1. Buat fungsi untuk mengupdate data user berdasarkan id
        - value yang diupdate adalah nama dan email
    2. Buat fungsi untuk menghapus data user berdasarkan id
    3. Buat table task dengan kolom :
        - task_id (int)
        - user_id (int)
        - task_name (varchar)
        - task_description (varchar)
        - is_done (int)
    4. Buat fungsi Create, Read, Update, dan Delete untuk table task diatas;
*/

// console.log(`Jalankan Function Edit Data`);
// await UserService.updateUser(2, "wid", "widya@test.com");

// await UserService.deleteUser(5);
// await UserService.getUser();

// await TaskService.createTask(2, "Buat PR", "PR Matematika dan IPA", false);
// await TaskService.getTask();
// await TaskService.getTaskById(1);
// await TaskService.updateTask(1, "Kerjain PR Bro", "Matem sama IPAS", true);
// await TaskService.deleteTask(1);
// await TaskService.getTask();

/*
1. buat api delete user
2. Modifikasi API create, update user
 - respon data user detail yang di create/update
3. buat api login
 - path yang dibuat /login
 - method post
 - request body yang diberikan email dan pass
 - jika cocok email dan pass maka berikan respon data user tsb
 - bila tidak cocok maka berikan response dengan message "email atau password salah"
*/