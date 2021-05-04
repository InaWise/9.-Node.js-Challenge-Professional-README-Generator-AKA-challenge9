// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const { report } = require('process');
const util = require('util');

const writeToFile = util.promisify(fs.writeFile)


function promptUser(){
    return inquirer.prompt([
      {
            type: 'input',
            name: 'authors',
            message: 'What is the author name?'

        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your Github username?'
  
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email adress?'
      
        },
        { 
            type: 'input',
            name: 'title',
            message: 'What is your project title?'
        },    
        { 
            type: 'input',
            name: 'description',
            message: 'Please write a brief description of your project?'
        },    
        { 
            type: 'list',
            name: 'license',
            message: 'What kind of license should your project have?',
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None']
        },
        {
            type: 'input',
            name: 'instalations',
            message: 'What command should be run to install dependcies?'
        },     
        {
            type: 'input',
            name: 'test',
            message: 'What command should be run to run test?' 
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What does the user need to know about using the repo?'
        },
    ])
}


function generateMD(storedAnswer){
    if(storedAnswer.license == 'MI'){
        storedAnswer.license = '![github license](https://img.shield.io/github/license/Naereen/StrapDown.js.svg)'
    }else if (storedAnswer =='Apache 2.0'){
        storedAnswer.license = '![test](https://img.shield.io/badge/license-Apache%202.0-blue.svg)'
    }else if (storedAnswer =='GPL 3.0'){
        storedAnswer.license = '![license: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)'
    }else if (storedAnswer =='BSD 3'){
        storedAnswer.license = '![license: GPL v3](https://img.shields.io/badge/License-BSD%203--clause-blue.svg)'   
    }else{
        storedAnswer.license = 'None'
    }



// skipping a part//

return `# ${storedAnswer.license} 

$(response.description)

# Table of Contents 

* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [license](#License)
* [Contributing](#Contributing)
* [Test](#Test)
* [Questions](#Questions)

## Description
Challendge 9 README generator. Creats proper README files.

## Installation:
In order to install the neccesary dependencies, open the console and run the following:

\`\`\`${storedAnswer}\`\`\`

## Usage
${storedAnswer.usage}

## License
This project is licended under:

![2021][InaWise](https://choosealicense.com/licenses/mit/)${storedAnswer}
$


## Contributing:
${storedAnswer.contribute}

## Test
In order to test open the console and run the following:
\`\`\`${storedAnswer.test}\`\`\`

## Questions
If you have questions contact me on [Github](https://github.com/${storedAnswer.InaWise}) or contact
${storedAnswer.author} at ${storedAnswer.email}


`
} 

promptUser().then(function(storedAnswer){
    const markdown = generateMD(storedAnswer);
    return writeToFile("./generate/generateREADME.md", markdown);
}).then(function() {
    console.log("Generating README.md ...");
}).catch(function(err){
    console.log(err)
})


///code ends///