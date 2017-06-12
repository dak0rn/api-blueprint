module.exports = plop => {
    plop.setGenerator('Service', {
        description: 'Create a new service',
        prompts: [
            {
                message: 'Service Name',
                type: 'input',
                name: 'name'
            },
            {
                message: 'Create getAll function',
                type: 'confirm',
                name: 'getAll',
                default: 'y'
            },
            {
                message: 'Create get function',
                type: 'confirm',
                name: 'get',
                default: 'y'
            },
            {
                message: 'Create create function',
                type: 'confirm',
                name: 'create',
                default: 'y'
            },
            {
                message: 'Create update function',
                type: 'confirm',
                name: 'update',
                default: 'y'
            },
            {
                message: 'Create delete function',
                type: 'confirm',
                name: 'delete',
                default: 'y'
            }
        ],
        actions() {
            return [
                {
                    type: 'add',
                    path: './src/services/{{name}}.js',
                    templateFile: './_templates/service.js.hbs'
                }
            ]
        }
    })
}
