#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const workUrl = process.cwd(); // 当前工作目录
const param = process.argv[2] || `demo`; // 第一个参数
console.log(path.join(__dirname, '/template'))
let templateUrl = path.join(__dirname, '/template');

fs.mkdir(`${workUrl}/${param}`, () => {
  copyDir(templateUrl, `${workUrl}/${param}`);
});
/**
 *
 *@param
 * description: read dir
 *
 */
function copyDir(path1, path2){
  fs.readdir(path1, {
    withFileTypes: true
  },(err, files) => {
    if(Array.isArray(files)){
      files.forEach( val => {
        const Outpath1 = `${path1}/${val.name}`;
        const Outpath2 = `${path2}/${val.name}`;
        if(val.isFile()){
          //console.log(path1, path2)
          fs.copyFile(`${Outpath1}`, `${Outpath2}`, () => {})
        }else if(val.isDirectory()){
          fs.mkdir(`${Outpath2}`, () => {
            copyDir(Outpath1, Outpath2);
          });
        }
      });
    }
  });
} 
