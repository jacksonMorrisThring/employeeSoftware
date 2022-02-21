//.should work once package.json, node modules and packae-lock files are created

//IDEAS FOR SOLUTIONS: DYNAMICALLY GENRATE IT ALL USING FS
//->do some googling on dynamic generation using jquery and fs
//->keep looking at github example


const inquirer = require('inquirer');
const fs = require('fs');

//Used to keep traqck of employees being added
index = 0;

class Employee{
    constructor(position, name, id, email, officeNumber){
        this.position  = position
        this.name = name;
        this.id = id;
        this.officeNumber = officeNumber;
        this.email = email;
    }
    getPosition(){
        console.log(this.position);
        return this.position;
    }
    getName(){
        console.log(this.name);
        return this.name;
    }

    getId(){
        console.log(this.id);
        return this.id;
    }

    getOffice(){
        console.log(this.officeNumber);
        return this.officeNumber;
    }

    getEmail(){
        console.log(this.email);
        return this.email;
    }
}

class Manager extends Employee{
   
    constructor(position, name, id, email, officeNumber){

        super(name, id, officeNumber, email)
        this.position = "Manager";
    }
}

class Engineer extends Employee{
   
    constructor(position, name, id, email, officeNumber){

        super(name, id, officeNumber, email)
        this.position = "Engineer";
    }
}

class Intern extends Employee{
   
    constructor(position, name, id, email, officeNumber){

        super(name, id, officeNumber, email)
        this.position = "intern";
    }
}


employeeArray = []







// inquirer
//     .prompt([
//         {
//             type: 'input',
//             name: 'teamManagersName',
//             default: 'Prabh Hoz',
//             message: 'Enter the name of the team manager!',

//         },

//         {
//             type: 'input',
//             name: 'employeeID',
//             message: 'Enter their employee ID',
//         },

//         {
//             type: 'input',
//             name: 'email',

//             message: 'Enter their email',
//         },


//         {
//             type: 'input',
//             name: 'officeNumber',

//             message: 'Enter their office number ',

//         },

//         {
//             type: 'input',
//             name: 'usage',
//             message: 'Write down the usage',

//         },

//         {
//             type: 'list',
//             name: 'license',
//             message: 'Select the license',
//             choices: ['MIT', 'public', 'GNU', 'GPL'],
//         },

//         {
//             type: 'input',
//             name: 'tests',
//             message: 'Write down the tests done',

//         },

//         {
//             type: 'input',
//             name: 'gmail',
//             default: 'jacksonmorristhring2000@gmail.com',
//             message: 'Enter your email',

//         },

//         {
//             type: 'input',
//             name: 'github',
//             default: 'https://github.com/jacksonMorrisThring',
//             message: 'Enter your link to your github account',

//         },



//     ])

//     .then((answers) => {
//         const READMEpageContent = generateREADME(answers);

//         fs.writeFile('README.md', READMEpageContent, (err) =>
//         err ? console.log(err) : console.log('Successfully created html')
//         );
//     });

const nodeMan = () => {
    
    const askQuestion = () => {
        inquirer.prompt([
        {
            type: 'list',
            name: 'position',

            message: 'Select the position of the team member!',
            choices: ["Team Manager", "Engineer", "Intern"],
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
        
     
        // if (nextSelection !== "Ive finnished building my team!") {
        //     // Ask the next question
        //     console.log(`Success!`)
        //     askQuestion (); // Recursion !
        // }
        });                                                                                                             
    };
    askQuestion() 
}
nodeMan();


const handleAnswers = ({position, name, employeeID, email, officeNumber, nextSelection}) => {
    console.log("Creating emplyee... email:" + email + " and officeNumber: "+officeNumber);
    var tempEmployee = new Employee(position, name, employeeID, email, officeNumber);
    
    console.log(`New employee created with name ${tempEmployee.name}`);
    employeeArray[index] = tempEmployee;
    index++;

    
    console.log("employee array is now");
    console.log(employeeArray);

    if (nextSelection === "Add another team member") {
        nodeMan();
    }
    else{
        console.log("all done!")
        //generate html
        const HTMLpageContent = generateHTML({position, name, employeeID, email, officeNumber, nextSelection});

        fs.writeFile('index.html', HTMLpageContent, (err) => {
            err ? console.log(err) : console.log('Successfully created html')
        });
    }
}

const generateHTML = ({position, name, employeeID, email, officeNumber, nextSelection}) => 
   
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
                <li class="list-group-item">ID: 1</li>
                <li class="list-group-item">Email: <a href="mailto:bob@team.com">bob@team.com</a></li>
                <li class="list-group-item">Office number: Manager</li>
            </ul>
        </div>
    </div>
    <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">Jane</h2>
            <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>Engineer</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: 2</li>
                <li class="list-group-item">Email: <a href="mailto:jane@team.com">jane@team.com</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/Engineer" target="_blank" rel="noopener noreferrer">Engineer</a></li>
            </ul>
        </div>
    </div>
    <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">Joe</h2>
            <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>Intern</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: 3</li>
                <li class="list-group-item">Email: <a href="mailto:joe@team.com">joe@team.com</a></li>
                <li class="list-group-item">School: Intern</li>
            </ul>
        </div>
    </div>
    
                </div>
            </div>
        </div>
    </body>
    
    </html>`
