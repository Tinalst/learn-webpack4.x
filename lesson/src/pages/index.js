import {Sidebar} from "./sidebar";
import {Content} from "./content";
import {Header} from "./header";
import avatar from '../images/avatar.jpeg';

import style from './index.scss';


console.log(avatar);
let img = new Image();
img.src = avatar;
img.classList.add(style.avatar);
img.classList.add(style["glyphicons-halflings-regular"]);

let root = document.getElementById('root');
root.append(img);

new Header();
new Sidebar();
new Content();