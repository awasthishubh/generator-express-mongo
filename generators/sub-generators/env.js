const Generator = require('yeoman-generator');
const path=require('path')

askEnv=(i)=>[
    {
        type: 'input',
        name: 'key',
        message: `Key_${i}?`,
    },
    {
        type: 'input',
        name: 'value',
        message: `value_${i}?`,
    }
]

module.exports = class extends Generator {
    path(){
        this.sourceRoot(path.join(__dirname,'..','templates'))
    }
    prompting() {
        const prompts = [
            {
              type: 'input',
              name: 'numEnv',
              message: 'Enter number of env varaibles',
              default: '0'
            }
        ];
        
        return this.prompt(prompts).then(async res=>{
            let env={}
            for(let i=0;i<parseInt(res.numEnv);i++){
                let res2=await this.prompt(askEnv(i))
                env[res2.key]=res2.value
            }
            this.props={env}
        })
    }
    writing() {
        this.fs.copyTpl(
            this.templatePath('.env'),
            this.destinationPath('.env'),
            { env: this.props.env } // user answer `title` used
        );
    }
}