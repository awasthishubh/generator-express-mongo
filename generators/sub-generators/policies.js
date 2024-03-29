const Generator = require('yeoman-generator');
const path=require('path')

askEnv=(i)=>[
    {
        type: 'input',
        name: 'policy',
        message: `Policy_${i} name?`,
    }
]

module.exports = class extends Generator {
    path(){
        this.sourceRoot(path.join(__dirname,'..','templates'))
    }
    _askEnv(i){return [
        {
            type: 'input',
            name: 'policy',
            message: `Policy_${i} name?`,
        }
    ]}
    
    prompting() {
        const prompts = [
            {
              type: 'input',
              name: 'numEnv',
              message: 'Enter number of Policies you want to have',
              default: 0
            }
        ];
        
        return this.prompt(prompts).then(async res=>{
            let policies=[]
            for(let i=0;i<parseInt(res.numEnv);i++){
                let res2=await this.prompt(this._askEnv(i))
                policies.push(res2.policy)
            }
            this.props={policies}
        })
    }

    setConfig(){
        this.config.set({policies:this.props.policies})
    }

    writing() {
        this.props.policies.forEach(p=>{
            this.fs.copyTpl(
                this.templatePath('policies/policy.ejs'),
                this.destinationPath(`policies/${p}.js`),
                { policy: p }
            );
        })
        this.fs.copyTpl(
            this.templatePath('policies/index.ejs'),
            this.destinationPath(`policies/index.js`),
            { policies: this.props.policies }
        )
    }
}