const Generator = require('yeoman-generator');

askEnv=[
    {
        type: 'input',
        name: 'key',
        message: 'Key?',
    },
    {
        type: 'input',
        name: 'value',
        message: 'value?',
    }
]

module.exports = class extends Generator {
    prompting() {
        const prompts = [
            {
              type: 'input',
              name: 'numEnv',
              message: 'Enter number of env varaibles',
              default: '0'
            }
        ];
        
        return this.prompt(prompts).then(res=>{
            let env={}
            for(let i=0;i<parseInt(res.numEnv);i++){
                this.prompt(askEnv).then(res2=>{
                    env[res2.key]=res2.value
                })
            }
            this.props={env}
        })
    }
    writing() {
        console.log(this.props)
    }
}