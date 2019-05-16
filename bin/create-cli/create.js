const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const createFile = (templatePath, outputPath) => {
    const templateContent = fs.readFileSync(templatePath);
    fs.writeFileSync(outputPath, templateContent);
};

const outputPrefixMap = {
    page: 'pages',
    component: 'components',
};
const templatePrefixMap = {
    page: 'pageTemplate',
    component: 'componentTemplate',
};

const insertAppJson = (name) => {
    let appJsonPath = path.join(__dirname, '../../source/app.json');
    let data = fs.readFileSync(appJsonPath);
    data = JSON.parse(data);
    data.pages.push(name);
    fs.writeFileSync(appJsonPath, JSON.stringify(data, null, 4));
};
const task = ({name, type}) => {
    const outputType = outputPrefixMap[type];
    const templateDir = path.join(__dirname, `./${templatePrefixMap[type]}/`);
    const outputDir = path.join(__dirname, `../../source/${outputType}/`,name);
    let isExists = fs.existsSync(outputDir);
    if (isExists) {
        return console.warn('\x1b[31m', `${outputType}已经存在${name}目录`);
    }
    fs.mkdirSync(outputDir);
    console.warn('\x1b[32m', `正在创建${type}: ${name}`);
    ['js', 'less', 'json', 'wxml'].forEach((ext) => {
        let templateFile = path.join(templateDir, `index.${ext}`);
        let outputFile = path.join(outputDir, `index.${ext}`);
        createFile(templateFile, outputFile);
    });
    if (type === 'page') {
        insertAppJson(`pages/${name}/index`);
    }
    console.warn('\x1b[32m', `${name}创建完毕`);
};

inquirer.prompt([{ 
    type: 'list', 
    name: 'type', 
    message: '请选择创建的模板类型：', 
    default: 0,
    choices: ['page', 'component']
}]).then(({type}) => {
    inquirer.prompt([{ 
        type: 'input', 
        name: 'name', 
        message: `请输入${type === 'page' ? '页面' : '组件'}名称：`, 
    }]).then(({name}) => {
        const inputers = {
            type,
            name,
        };
        task(inputers);
    });
});
