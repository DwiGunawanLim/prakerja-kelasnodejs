import * as UserService from './services/user.js';
import * as TaskService from './services/task.js';
import express from 'express';

const host = "localhost";
const port = 8080;
const app = express();

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
await UserService.getUser();

// await TaskService.createTask(2, "Buat PR", "PR Matematika dan IPA", false);
// await TaskService.getTask();
// await TaskService.getTaskById(1);
// await TaskService.updateTask(1, "Kerjain PR Bro", "Matem sama IPAS", true);
// await TaskService.deleteTask(1);
await TaskService.getTask();