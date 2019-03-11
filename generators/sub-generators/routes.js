const Generator = require('yeoman-generator');
const path=require('path')

askEnv=(i)=>[
    {
        type: 'input',
        name: 'route',
        message: `Route_${i} name?`,
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
            let route=[]
            for(let i=0;i<parseInt(res.numEnv);i++){
                let res2=await this.prompt(askEnv(i))
                route.push(res2.route)
            }
            this.props={route}
        })
    }
    writing() {
        this.props.route.forEach(r=>{
            this.fs.copyTpl(
                this.templatePath('models/modelSchema.ejs'),
                this.destinationPath(`models/${r}Schema.js`),
                { route: r }
            );
        })
        this.fs.copyTpl(
            this.templatePath('models/index.ejs'),
            this.destinationPath(`models/index.js`),
            { routes: this.props.route }
        )
    }
}