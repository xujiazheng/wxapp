const exec = require('child_process').exec;
const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine({});
const DIFFFILE = 'git diff HEAD --name-only --cached';
exec(DIFFFILE, (error, stdout) => {
    if (error) {
        console.error(`exec error: ${error}`);
    }
    const diffFiles = stdout.split('\n').filter((diffFile) => (
        /(\.js)(\n|$)/gi.test(diffFile)
    ));
    if (diffFiles.length > 0) {
        console.warn('待检查的文件列表');
        console.warn(diffFiles);
        let errorCount = 0;
        let warningCount = 0;
        const eslintResults = cli.executeOnFiles(diffFiles).results;
        eslintResults.forEach((result) => {
            errorCount += result.errorCount;
            warningCount += result.warningCount;
        });
        if (errorCount >= 1) {
            console.warn('\x1b[31m', `ESLint error`);
            console.warn('\x1b[36m', `✖ ${errorCount + warningCount} problems(${errorCount} error, ${warningCount} warning)`);
            console.warn('\x1b[31m', `Please fix before you commit.`);
            process.exit(1);
        } else {
            console.warn('\x1b[32m', 'ESLint pass');
            process.exit(0);
        }
    }
});
