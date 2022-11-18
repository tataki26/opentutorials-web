import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

// component - 사용자 정의 태그
// 반드시 대문자로 정의
function Header(props) {
  return <header>
    <h1><a href="/" onClick={(event)=>{
      // 기본 동작 방지
      // 클릭해도 리로드 되지 않음
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = []
  /*
    <li><a href="/read/1">html</a></li>,
    <li><a href="/read/2">css</a></li>,
    <li><a href="/read/3">js</a></li>
  */

  for (let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        // target: 이벤트를 유발시킨 태그(a)
        // a 태그 옆 id는 파라미터로 사용될 변수명
        // 태그의 속성으로 넘길 때 문자열로 바뀌므로 다시 숫자로 변경
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // 상태 생성
  // 상태를 리턴하는 함수 useState
  // 상태의 0번째 원소: 상태의 값, 인자('WELCOME')
  // 상태의 1번째 원소: 상태의 값을 변경할 때 사용하는 함수
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  // [같은 코드]
  const [mode, setMode] = useState('WELCOME');
  // 새로운 id 값 지정
  const [id, setId] = useState(null);
  const topics = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ]
  let content = null;
  // mode에 따라 내용이 달라짐
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    // id가 같은 것 찾기
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        // 변수의 값을 바꿔도 상태는 변하지 않는다
        // mode = 'WELCOME'
        // 상태 함수를 통해 값을 바꿔야 한다
        // App 컴포넌트를 다시 실행해서 값이 갱신되는 원리이다
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      </div>
  );
}

export default App;
