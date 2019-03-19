import '../../css/common.scss'
import './index.scss'

import {of} from "rxjs";

console.log('dev-server11');

// 第三方本地导入
// jQ('#header').addClass('one');


// 第三方npm导入
of(1,2,3).pipe(res => {
  console.log(res);
});

// 验证es6编译
let a = 10;
console.log(a);


// 主动接收模块热更
if(module.hot){
    module.hot.accept();
}
