import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

// component - 사용자 정의 태그
// 반드시 대문자로 정의
// prop - 컴포넌트의 속성, 입력값(ex:) img 태그의 src)
// 컴포넌트의 파라미터로 prop을 넘김(변수 같이 사용 가능)
function Header(props) { // props: 객체(title: "WEB")
  return <header>
    {/* header 태그에 onClick 이벤트 걸기 
        a 태그를 클릭했을 때, 함수 호출
        함수가 호출될 때, REACT는 event 객체를 첫번째 파라미터로 주입해준다 */}
    <h1><a href="/" onClick={(event)=>{
      // a 태그의 기본 동작 방지 --> 클릭해도 리로드 되지 않음
      event.preventDefault();
      // 아래 onChangeMode 함수 호출
      props.onChangeMode();
      // 중괄호 안은 표현식으로 취급(변수 접근 방법)
      // 값 할당은 컴포넌트 호출 시에 이루어진다
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = []
  /*
  const lis = [
    <li><a href="/read/1">html</a></li>,
    <li><a href="/read/2">css</a></li>,
    <li><a href="/read/3">js</a></li>
  ]
  */

  // lis를 하드코딩하지 않고 동적으로 설정하기
  // <nav> 컴포넌트로 받은 topics 파라미터를 활용하여 순회
  for (let i=0; i<props.topics.length; i++) {
    let t = props.topics[i]; // 단일 topic 객체 {id, title, body}
    // 원래 코드
    /*
    // 동적으로 t.id와 t.title 할당(ex:) 1. html 2. css ...)
    lis.push(<li><a href={'/read/'+t.id}>{t.title}</a></li>)
    ==> unique "key" prop error : 자동으로 생성한 태그(li)에 key prop을 추가해야 한다
    (반복문 안에서 고유한 값)
    */
    lis.push(<li key={t.id}> {/* id 고유한 값 */}
      {/* a 태그를 클릭하면 onClick의 함수가 실행 */}
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        // 아래에서 정의된 onChangeMode ---> id를 파라미터로 받는다
        // target: 이벤트를 유발시킨 태그(a) --> 이벤트 함수 안에서 a 태그의 id 속성을 가져온다 
        // a 태그 옆 id는 파라미터로 사용될 변수명을 의미한다
        // **태그의 속성으로 넘길 때 문자열로 바뀌므로 다시 숫자로 변경**
        // ---> 그래야 state id와 topics의 id를 비교할 수 있다
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }

  return <nav>
    <ol>
      {lis}
      {/* lis 배열로 변경
        <li><a href="/read/1">html</a></li>,
        <li><a href="/read/2">css</a></li>,
        <li><a href="/read/3">js</a></li> 
      */}
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

/*
컴포넌트의 입력은 prop, 출력은 처리된 데이터로 만들어지는 UI
prop은 컴포넌트를 사용하는 외부자를 위한 data
state는 컴포넌트를 만드는 내부자를 위한 data
*/

function App() {
  // 상태 생성
  // 상태를 리턴하는 함수 useState
  // 상태의 0번째 원소: 상태의 값, 인자('WELCOME')
  // 상태의 1번째 원소: 상태의 값을 변경할 때 사용하는 함수
  // const _mode = useState('WELCOME'); // 초기값 - 'WELCOME'
  // const mode = _mode[0];
  // const setMode = _mode[1]; ---> setMode로 mode의 값을 바꿀 수 있다
  // [같은 코드]: 지역 변수(mode)를 상태로 업그레이드
  const [mode, setMode] = useState('WELCOME');
  // 새로운 id 값 지정
  // READ를 그대로 출력하지 않고 선택한 topic이 동적으로 나오도록 변경
  // 선택한 topic의 상태를 관리
  const [id, setId] = useState(null);
  // 3까지는 이미 완성되어 있으니 4부터 시작
  const [nextId, setNextId] = useState(4);
  // 함수 내에서는 topics 값을 바꿀 수 없다
  /* const topics = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ]*/
  // topics 값 변경할 수 있도록 상태(state)로 승격
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ]);
  // const mode = 'WELCOME';
  let content = null; // ---> 본문
  // mode에 따라 본문(content)이 달라짐
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article> // welcome page
  } else if (mode === 'READ') {
    // content = <Article title="Read" body="Hello, Read"></Article> // read page
    // title과 body를 동적으로 변경
    let title, body = null;
    // id state와 일치하는 topic 찾기
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id) { // topics의 id와 id state가 일치하면,
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    // 순회한 결과를 태그에 추가
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
      {/* props.title = WEB */}
      {/* onChangeMode - prop, 인자는 함수
          Header 컴포넌트 안에서 링크를 클릭하면 인자로 넘긴 함수를 호출한다 */}
      <Header title="WEB" onChangeMode={()=>{
        // 변수의 값을 바꿔도 상태는 변하지 않는다
        // mode = 'WELCOME';
        // 상태 함수를 통해 값을 바꿔야 한다(setter)
        // App 컴포넌트를 다시 실행해서 값이 갱신되는 원리이다
        setMode('WELCOME');
      }}></Header>
      {/* 중괄호 안 topics는 위에서 정의한 topics 변수 */}
      <Nav topics={topics} onChangeMode={(_id)=>{
        // mode = 'READ'; --> App 함수가 다시 실행되지 않아 UI에 변화가 생기지 않는다
        // useState가 mode의 값을 'READ'로 세팅
        setMode('READ');
        // Nav 컴포넌트의 링크를 클릭할 때, id도 바뀜
        setId(_id); // _id는 Nav 내부에서 정의된다
      }}></Nav>
      {/* <Article title="Welcome" body="Hello, WEB"></Article>을
          content 변수로 대체함
          HTML 내부이므로 중괄호로 변수 사용 */}
      {content}
      <a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
      </div>
  );
}

export default App;
