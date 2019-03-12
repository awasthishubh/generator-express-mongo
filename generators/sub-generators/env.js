const Generator = require('yeoman-generator');
const path=require('path')



module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        console.log(111,args, opts)
        this.props={env:opts.options}
    }

    path(){
        this.sourceRoot(path.join(__dirname,'..','templates'))
    }

    _askEnv(i){return [
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
    ]}
    
    prompting() {
        const prompts = [
            {
              type: 'input',
              name: 'numEnv',
              message: 'Enter number of env varaibles',
              default: '0'
            }
        ];
        
        if(this.props.env.ask)
            return this.prompt(prompts).then(async res=>{
                let env={}
                for(let i=0;i<parseInt(res.numEnv);i++){
                    let res2=await this.prompt(this._askEnv(i))
                    env[res2.key]=res2.value
                }
                this.props.env={...env,...this.props.env}
            })
        
        return true
    }

    setConfig(){
        this.config.set({env:this.props.env})
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('.env'),
            this.destinationPath('.env'),
            { env: this.props.env } // user answer `title` used
        );
    }
}