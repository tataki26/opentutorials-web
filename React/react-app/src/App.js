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

function Create(props) {
  return <article>
    <h2>Create</h2>
    {/* onSubmit: submit 버튼을 클릭했을 때, form tag에서 발생하는 이벤트 */}
    <form onSubmit={event => {
      event.preventDefault();
      // form tag에 소속되어 있는 value 값 가져오기
      // event.target: 이벤트가 발생한 태그 (form tag)
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      {/* title: 사용자가 입력한 data의 이름 */}
      <p><input type="text" name="title" placeholder="title"/></p>
      {/* textarea: 여러 줄 표시 */}
      <p><textarea name="body" placeholder="body"></textarea></p>
      {/* submit: 전송 버튼 */}
      <p><input type="submit" value="Create"></input></p>
    </form>
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
  // 3까지는 이미 완성되어 있으니 4부터 시작
  const [nextId, setNextId] = useState(4);
  // topics 값 변경할 수 있도록 상태(state)로 승격
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ]);
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
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id: nextId, title:_title, body: _body}
      // topics의 복제본 생성
      const newTopics = [...topics]
      newTopics.push(newTopic);
      // 기존 객체와 새로운 객체를 비교하여 그 값이 다르면 컴포넌트 재실행
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
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
      <a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
      </div>
  );
}

export default App;
