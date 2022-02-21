//.should work once package.json, node modules and packae-lock files are created

//IDEAS FOR SOLUTIONS: DYNAMICALLY GENRATE IT ALL USING FS
//->do some googling on dynamic generation using jquery and fs
//->keep looking at github example


const inquirer = require('inquirer');
const fs = require('fs');
const { Console } = require('console');

//Used to keep traqck of employees being added
index = 0;

class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){
        console.log(this.name);
        return this.name;
    }

    getId(){
        console.log(this.id);
        return this.id;
    }

    getEmail(){
        console.log(this.email);
        return this.email;
    }
}

class Manager extends Employee{
   
    constructor(name, id, email, officeNumber){

        super(name, id, email)
        this.officeNumber = officeNumber;
    }
    getPosition(){
        return "Manager";
    }

    getOfficeNum(){
        return this.officeNumber;
    }

}

class Engineer extends Employee{
   
    constructor(name, id, email, officeNumber){

        super(name, id, email)
        this.officeNumber = officeNumber;
    }

    getPosition(){
        return "Engineer";
    }

    getOfficeNum(){
        return this.officeNumber;
    }
}

class Intern extends Employee{
   
    constructor(name, id, email, officeNumber){

        super(name, id, email)
        this.officeNumber = officeNumber;
    }

    getPosition(){
        return "Intern";
    }

    getOfficeNum(){
        return this.officeNumber;
    }
}


employeeArray = []


const nodeMan = () => {
    
    const askQuestion = () => {
        inquirer.prompt([
        {
            type: 'list',
            name: 'position',

            message: 'Select the position of the team member!',
            choices: ["Manager", "Engineer", "Intern"],
        },
        {
            type: 'input',
            name: 'name',

            message: 'Enter the name of the team member!',
        },

        {
            type: 'input',
            name: 'employeeID',
            message: 'Enter their employee ID',
        },
        {

            type: 'email',
            name: 'email',
    
            message: 'Enter their email',
        },
        {
    
            type: 'input',
            name: 'officeNumber',
    
            message: 'Enter their office number ',

        },
        {
            type: "list",
            name: 'nextSelection',

            message: "What do you want to do next?",
            choices: ["Add another team member", "Thats all!"]
        }
])
    
        .then((answers) => {
            handleAnswers(answers);
        });                                                                                                             
    };
    askQuestion() 
}
nodeMan();


const handleAnswers = ({position, name, employeeID, email, officeNumber, nextSelection}) => {
    console.log("Creating employee... email:" + email + " and officeNumber: "+officeNumber);
    if (position === "Manager") {
        console.log("Creating a manager");
        var tempEmployee = new Manager(name, employeeID, email, officeNumber);
    }
    else if(position === "Engineer"){
        console.log("Creating a Engineer");
        var tempEmployee = new Engineer(name, employeeID, email, officeNumber);
    }
    else if(position === "Intern"){
        console.log("Creating a Intern");
        var tempEmployee = new Intern(name, employeeID, email, officeNumber);
    }
    else{
        console.log("error")
    }
    //var tempEmployee = new Employee(position, name, employeeID, email, officeNumber);
    
    console.log(`New employee created with name ${tempEmployee.name}`);
    employeeArray[index] = tempEmployee;
    index++;

    
    console.log("employee array is now");
    console.log(employeeArray);

    if (nextSelection === "Add another team member") {
        nodeMan();
    }
    else{
        console.log("all done!");
        console.log(`total employees are...`)
        console.log(employeeArray);
        //generate html
        //defining string for all key values

        
        const HTMLpageContent = generateHTML(employeeArray);

        fs.writeFile('index.html', HTMLpageContent, (err) => {
            err ? console.log(err) : console.log('Successfully created html')
        });
        // console.log(HTMLpageContent);
    }
}


const generateHTML = (employeeArray) => 
   
`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">
                <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${employeeArray[0].name}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>Manager</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${employeeArray[0].id}</li>
                <li class="list-group-item">Email: <a href="mailto:${employeeArray[0].email}">${employeeArray[0].email}</a></li>
                <li class="list-group-item">Office number: ${employeeArray[0].officeNum}</li>
            </ul>
        </div>
    </div>
`

   
for (let i = 0; i < employeeArray.length; i++) {

    var employee = employeeArray[i];
    
if(employee.getPosition() === "Engineer"){
        function generateEngineerCard (employee) {
            const Engineer = () =>
             `<div class="card employee-card">
                <div class="card-header">
                    <h2 class="card-title">${employee.getName()}</h2>
                    <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>Engineer</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${JSON.stringify(employee.id)}</li>
                        <li class="list-group-item">Email: <a href="mailto:${JSON.stringify(employee.email)}">${JSON.stringify(employee.email)}</a></li>
                        <li class="list-group-item">Office number: ${JSON.stringify(employee.officeNumber)}</li>
                    </ul>
                </div>
            </div>`
            fs.appendFile("index.html", Engineer, (err) => {
                err ? console.log(err) : console.log('Successfully created html')
            });
        }

        generateEngineerCard(employee);
    }
    else if(employee.getPosition() === "Intern"){
        
        function generateInternCard (employee) {
            return `<div class="card employee-card">
                <div class="card-header">
                    <h2 class="card-title">${employee.getName()}</h2>
                    <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>Intern</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${JSON.stringify(employee.id)}</li>
                        <li class="list-group-item">Email: <a href="mailto:${JSON.stringify(employee.email)}">${JSON.stringify(employee.email)}</a></li>
                        <li class="list-group-item">Office number: ${JSON.stringify(employee.officeNumber)}</li>
                    </ul>
                </div>
            </div>`
        }
        generateInternCard(employee);
    }
    else{
        console.log("error")
    }

    `
        </body>
    
    </html>`
    }