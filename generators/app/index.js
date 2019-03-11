'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path=require('path')

module.exports = class extends Generator {
  path(){
    this.sourceRoot(path.join(__dirname,'..','templates'))
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the super-duper ${chalk.red('generator-express-mongo')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // // To access props later use this.props.someAnswer;
      // this.props = props;
      if(props.someAnswer)
        this.composeWith(require.resolve('../sub-generators/routes'), {preprocessor: 'sass'});
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
