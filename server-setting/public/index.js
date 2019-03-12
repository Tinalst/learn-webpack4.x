import './css/index.css';
import './css/index.less';
import './css/index.scss';
import {of, map} from "rxjs";

console.log('dev-server11');

jQ('#header').addClass('one');


of(1,2,3).pipe(res => {
  console.log(res);
});
