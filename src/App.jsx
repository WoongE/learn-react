import './App.css'
import {useState} from "react";

/**
 * # 1강 ~ 5강
 * 1. 삼항연산자 많이 쓴다.
 * 2. 반복문은 맵을 사용한다. 맵 사용시 리턴 최상단 태그에 반드시 key 속성을 고유값으로 붙여야 한다.
 * 3. useState 를 사용하여 상태를 관리한다.
 * 4. setId 를 호출하면 바로 값이 바뀌는 게 아니라, 다음에 App 이 다시 실행되면서 렌더링될 때 바뀐다.
 * 5. 파생상태의 실수: 파생상태(다른 상태에 종속되어 만들어진 상태)를 useState 로 만들지마라.
 * 6. useState 파라미터에 들어가는 값은 초기값이다. 이 값은 최초 렌더링시에만 유효하다. 리렌더링시에 useState 파라미터는 무시된다.
 *    따라서 useState 파라미터에 복잡한 함수를 넣으면 두 번째부터는 유효하지도 않은데 쓸데없이 실행만 되고 있게 된다.
 *    그러니 useState 에 파라미터 넣을 때 주의해라.
 *    만약 useState 초기값으로 함수 리턴값을 넣어야하면, 아예 그 함수 객체 또는 람다를 집어넣어라!!!
 *    이걸 함수 초기화 or '지연초기화'라고 한다.
 * 참고: 크롬의 React Developer Tools 확장 프로그램 꼭 써라!
 * https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
 * ---
 * # 6강 ~
 */
function App() {
    const [id, setId] = useState(() => Math.random()); // 파라미터에 초기값이 처음 들어갈 때만 ㅇ
    const [domain, setDomain] = useState('naver.com');
    const [password, setPassword] = useState('');

    // const [fullEmail, setFullEmail] = useState(''); // 이건 파생상태의 실수다.
    const fullEmail = `${id}@${domain}`; // 이건 파생상태를 사용하지 않은 것이다. 그래도 id 와 domain 이 바뀔 때마다 자동으로 바뀐다.

    const domains = ['naver.com', 'gmail.com', 'daum.net'];

    const onChangeId = (e) => {
        setId(e.target.value); // 이거 호출하자마자 id 가 바뀌는 게 아니다.
        // setFullEmail(e.target.value + '@' + domain);
    }

    const onChangeDomain = (e) => {
        setDomain(e.target.value);
        // setFullEmail(id + '@' + e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onLogin = () => {
        console.log('Login ID:', fullEmail, ', PW:', password);
        // 요걸 이제 서버로 보내면 된다.
    }

    return (
        <>
            <div>
                <div>
                    <input type="text" value={id} onChange={onChangeId}/>
                    {domain === '' ? null : <span>@</span>}
                    <select value={domain} onChange={onChangeDomain}>
                        {/* 맵 사용시 리턴 최상단 태그에 반드시 key 속성을 고유값으로 붙여야 한다.*/}
                        {domains.map((d) => {
                            return <option key={d} value={d}>{d}</option>
                        })}
                        <option value="">직접입력</option>
                    </select>
                </div>
                <div>
                    {fullEmail}<br/>
                </div>
                <input type="password" value={password} onChange={onChangePassword}/>
                <button onClick={onLogin}>로그인</button>
            </div>
            <div>회원가입</div>
        </>
    )
}

export default App
