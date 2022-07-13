const connect = require("./db/connection")
const { prompt } = require("inquirer")
const { removeListener } = require("./db/connection")
const db = require("./db/connection")
require("console.table")

function start() {
    prompt({
        type: "input",
        name: "doIt",
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
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

function department(){
    connect.promise().query("")
};

function role(){
    connect.promise().query("")
};

function employees(){
    connect.promise().query("")
};

function addDept(){
    connect.promise().query("")
}

function addRole(){
    connect.promise().query("")
}

function addEmp(){
    connect.promise().query("")
}

function updateEmp(){
    connect.promise().query("")
}

start();