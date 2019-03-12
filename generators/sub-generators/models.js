const Generator = require('yeoman-generator');
const path=require('path')

module.exports = class extends Generator {
    path(){
        this.sourceRoot(path.join(__dirname,'..','templates'))
    }
    _askEnv(i){return [
        {
            type: 'input',
            name: 'model',
            message: `Model_${i} name?`,
        }
    ]}
    prompting() {
        const prompts = [
            {
              type: 'input',
              name: 'numEnv',
              message: 'Enter number of models you want to have',
              default: '0'
            }
        ];
        
        return this.prompt(prompts).then(async res=>{
            let models=[]
            for(let i=0;i<parseInt(res.numEnv);i++){
                let res2=await this.prompt(this._askEnv(i))
                models.push(res2.model)
            }
            this.props={models}
        })
    }
    
    setConfig(){
        this.config.set({models:this.props.models})
    }

    writing() {
        this.props.models.forEach(r=>{
            this.fs.copyTpl(
                this.templatePath('models/modelSchema.ejs'),
                this.destinationPath(`models/${r}Schema.js`),
                { model: r }
            );
        })
        this.fs.copyTpl(
            this.templatePath('models/index.ejs'),
            this.destinationPath(`models/index.js`),
            { models: this.props.models }
        )
    }
}