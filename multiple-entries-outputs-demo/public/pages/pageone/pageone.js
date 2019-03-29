import '../../css/base.scss';
import '../../css/common.scss';
import './pageone.scss';
import {of} from "rxjs";

console.log('pageone');

// 第三方本地导入
// jQ('#header').addClass('one');

// 第三方npm导入
of(5,6,7).pipe(res => {
  console.log(res);
});

// 主动接收模块热更
if(module.hot){
    module.hot.accept();
}
