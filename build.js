import { compile } from 'nexe';

compile({
    input: './index.js',
    build: true,
    output: './build',
    verbose: true


}).then(() => {
    console.log('success')
})