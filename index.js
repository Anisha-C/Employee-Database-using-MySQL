const connect = require("./db/connection")
const { prompt } = require("inquirer")
const { removeListener } = require("./db/connection")
const db = require("./db/connection")
require("console.table")

function start() {
    prompt({
        type: "list",
        name: "doIt",
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "done"],
    }).then(({ doIt }) => {
        switch (doIt) {
            case "view all departments":
                department()

                break

            case "view all roles":
                role()
                break

            case "view all employees":
                employees()
                break

            case "add a department":
                addDept()
                break

            case "add a role":
                addRole()
                break

            case "add an employee":
                addEmp()
                break

            case "update an employee role":
                updateEmp()
                break

            case "done":
                done()
        }

    })
}

function department() {
    connect.promise().query("SELECT * FROM department").then(response => {
        console.table(response[0])
        start();
    })
};

function role() {
    connect.promise().query("SELECT * FROM role").then(response => {
        console.table(response[0])
    })
    start();
};

function employees() {
    connect.promise().query("SELECT * FROM employee").then(response => {
        console.table(response[0])
    })
    start();
};

function addDept() {
    prompt([
        {
            type: "input",
            name: "name",
            message: "What department would you like to add?",
        }
    ]).then(res => {
        console.log(res)
        connect.promise().query("INSERT into department SET ?", res)
    }).then(() => {
        console.log("added dept to database")
        start();
    })

}

function addRole() {
    prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the role would you like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role would you like to add?",
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id of the role would you like to add?",
        }
    ]).then(res => {
        console.log(res)
        connect.promise().query("INSERT into roles SET ?", res)
    }).then(() => {
        console.log("added roles to database")
        start();
    })
}

function addEmp() {
    prompt([

        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee you would like to add?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee you would like to add?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role of the employee you would like to add?",
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager of the employee you would like to add?",
        },
    ]).then(res => {
        console.log(res)
        connect.promise().query("INSERT into employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?", [res.first_name, res.last_name, res.role_id, res.manager_id])
    }).then(() => {
        console.log("added employee to database")
        start();
    })
}

function updateEmp() {
    prompt([
        {
            type: "input",
            name: "id",
            message: "What is the id of the employee you would like to update?",
        },
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee you would like to update?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee you would like to update?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role of the employee you would like to update?",
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager of the employee you would like to update?",
        },
    ]).then(res => {
        console.log(res)
        connect.promise().query("UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ? ", [res.first_name, res.last_name, res.role_id, res.manager_id, res.id])
    }).then(() => {
        console.log("added updated information to database")
        start();
    })
}

function done() {
    process.exit()
}

start();