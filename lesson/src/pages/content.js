import './content.scss';

export function Content() {
  let dom = document.getElementById('root');
  let content = document.createElement('div');
  content.innerText = 'content';
  dom.append(content);
  let girl = document.createElement('div');
  girl.classList.add('girl');
  dom.append(girl);
}