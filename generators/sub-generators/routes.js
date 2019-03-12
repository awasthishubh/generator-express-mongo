const Generator = require('yeoman-generator');
const path=require('path')



module.exports = class extends Generator {
    path(){
        this.sourceRoot(path.join(__dirname,'..','templates'))
    }
    _askEnv(i){return [
        {
            type: 'input',
            name: 'route',
            message: `Route_${i} name?`,
        }
    ]}
    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'numEnv',
                message: 'Enter number of routes',
                default: '0'
            }
        ];
        
        return this.prompt(prompts).then(async res=>{
            let routes=[]
            for(let i=0;i<parseInt(res.numEnv);i++){
                let res2=await this.prompt(this._askEnv(i))
                routes.push(res2.route)
            }
            this.props={routes}
        })
    }

    setConfig(){
        this.config.set({routes:this.props.routes})
    }

    writing() {
        this.props.routes.forEach(r=>{
            this.fs.copyTpl(
                this.templatePath('routes/route.ejs'),
                this.destinationPath(`routes/${r}.js`),
                { 
                    route: r,
                    models: this.config.get("models"),
                    policies:this.config.get("policies")
                }
            );
        })
        this.fs.copyTpl(
            this.templatePath('routes/index.ejs'),
            this.destinationPath(`routes/index.js`),
            { 
                routes: this.props.routes
            }
        )
    }
}