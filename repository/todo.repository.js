const mysql = require('mysql');

//Create connection
const dataB = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: 'parola',
    database: 'taskDb'
});

//Connect
dataB.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL connected');
});

module.exports = function todoRepository(db) {
    return {
        create,
        list,
        remove,
        createTable,
    };

    function remove(id) {
        let sql = "DELETE FROM tasks WHERE id = " + id;
        dataB.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            return 1;
        });
    }

    function create(task) {
        let sql = "INSERT INTO tasks(taskName, date) VALUES ('Name', 'date')";
        return new Promise((resolve, reject) => {
            dataB.query(sql, (err, result) => {
                if(err) return reject(err);
                return task = resolve(result);
            });
        });
    }

    function createTable() {
        let sql = 'CREATE TABLE tasks(id int AUTO_INCREMENT, taskName VARCHAR(255), date VARCHAR(255), PRIMARY KEY(id))';
        dataB.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            return 1;
        });
    }

    function list() {
        let sql = "SELECT * FROM tasks";
        return new Promise((resolve, reject) => {
            dataB.query(sql, (err, result) => {
            if(err) return reject(err);
             return resolve(result);
            });
        });
    }
};

