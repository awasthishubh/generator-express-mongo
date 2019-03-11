'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path')

var npmPrompt = (defaultDest) => [
  {
    type: 'input',
    name: 'name',
    message: 'What\'s the name of Project',
    default: defaultDest
  },
  {
    type: 'input',
    name: 'description',
    message: 'Little discription?',
  },
  {
    type: 'input',
    name: 'author',
    message: 'Who\'s the author?',
  },
  {
    type: 'input',
    name: 'homepage',
    message: 'Url of homepage?',
  }
]

var ConfigPrompt = [
  {
    type: 'input',
    name: 'port',
    message: 'At what Port you want to run?',
    default: 3000
  },
  {
    type: 'confirm',
    name: 'mongo',
    message: 'Want to  use mongo?',
    default: true
  },
  {
    type: 'input',
    when: function (response) {
      return response.mongo;
    },
    name: 'mongoDB',
    message: 'Enter full mongoDB URL?',
  },
  {
    type: 'confirm',
    name: 'cors',
    message: 'Do you want to enable cores?',
    default: false
  }

]

module.exports = class extends Generator {
  path() {
    this.sourceRoot(path.join(__dirname, '..', 'templates'))
  }
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the super-duper ${chalk.red('generator-express-mongo')} generator!`)
    );
    this.log(chalk.yellow("\n\nLet's configure NPM Package\n"))
    var npm = await this.prompt(npmPrompt.bind(this)(this.destinationRoot().split('/').pop()))
    this.log(chalk.yellow("\n\nLet's now configure project settings\n"))
    var config = await this.prompt(ConfigPrompt)

    return this.props={...npm,...config}
    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      if (props.someAnswer) {
        // this.composeWith(require.resolve('../sub-generators/env'), {preprocessor: 'sass'})
        // this.composeWith(require.resolve('../sub-generators/models'), {preprocessor: 'sass'});
        // this.composeWith(require.resolve('../sub-generators/routes'), {preprocessor: 'sass'});
        // this.composeWith(require.resolve('../sub-generators/policies'), {preprocessor: 'sass'});

      }
    });
  }


  writing() {
    console.log(this.config.get("models"))
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
}; 
