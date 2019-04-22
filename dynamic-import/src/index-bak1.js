import {TinaI18n} from "./i18n/TinaI18n";

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
];

arr.map(item => {
  console.log(item);
});

function initI18n() {
  console.log(1)
  new TinaI18n({
    currentLang: 'zh-SG',
    useFileName: 'addWallet'
  }).setInnerHtml()
}
initI18n();
