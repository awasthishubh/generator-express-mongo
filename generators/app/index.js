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
    name: 'version',
    message: 'Version of application?',
    default:'1.0.0'
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

var configSubGen=[
  {
    type:'checkbox',
    name: 'generators',
    message: 'Choose the generators you want to use.',
    choices: [ "env","policies","models","controllers",],
    default: [ "env","models","controllers"]
  }
]

module.exports = class extends Generator {
  path() {
    this.sourceRoot(path.join(__dirname, '..', 'templates'))
  }
  async prompting() {
    this.log(
      yosay(`Welcome to the super-duper ${chalk.red('generator-express-mongo')} generator!`)
    );
    this.log(chalk.yellow("\n\nLet's configure NPM Package\n"))
    var npm = await this.prompt(npmPrompt.bind(this)(this.destinationRoot().split('/').pop()))
    
    this.log(chalk.yellow("\n\nLet's now configure project settings\n"))
    var config = await this.prompt(ConfigPrompt)

    var subGen = await this.prompt(configSubGen)
    if(subGen.generators.includes('env'))
      this.composeWith(require.resolve('../sub-generators/env'), {preprocessor: 'sass'})
    if(subGen.generators.includes('policies'))
      this.composeWith(require.resolve('../sub-generators/policies'), {preprocessor: 'sass'})
    if(subGen.generators.includes('models'))
      this.composeWith(require.resolve('../sub-generators/models'), {preprocessor: 'sass'})
    if(subGen.generators.includes('controllers'))
      this.composeWith(require.resolve('../sub-generators/routes'), {preprocessor: 'sass'})
    
      console.log(config)
      console.log({...npm,...config})
    return this.props={...npm,...config,subGen:subGen.generators}
  }

  writing() {
    console.log(this.props,this.props.cors)
    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath('index.js'),
      {
        cors:this.props.cors,
        routes:this.config.get("routes"),
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.ejs'),
      this.destinationPath('package.json'),
      {
        name:this.props.name,
        description:this.props.description,
        author:this.props.author,
        homepage:this.props.homepage,
        version:this.props.version
      }
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
}; 
