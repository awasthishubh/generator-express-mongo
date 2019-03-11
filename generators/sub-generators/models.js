const Generator = require('yeoman-generator');
const path=require('path')

askEnv=(i)=>[
    {
        type: 'input',
        name: 'collection',
        message: `Collection_${i} name?`,
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
              message: 'Enter number of collections you want to have',
              default: '0'
            }
        ];
        
        return this.prompt(prompts).then(async res=>{
            let models=[]
            for(let i=0;i<parseInt(res.numEnv);i++){
                let res2=await this.prompt(askEnv(i))
                models.push(res2.collection)
            }
            this.props={models}
        })
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