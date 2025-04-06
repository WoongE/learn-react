import './App.css'
import {useRef, useState} from "react";

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
 * # 6강 ~ 7강. useState 사용법 및 심화
 * 1. JSX 에서 중괄호는 자바스크립트를 표현하는 자리라는 의미이다.
 * 2. 자바스크립트와의 예약어 충돌을 피하기 위해, for -> htmlFor, class -> className 으로 사용한다.
 * 3. CSX 에서 style 속성은 자바스크립트 객체로 표현된다. 그리고 이름은 camelCase 로 사용한다.
 * 4. setErrors 파라미터에 넣는 객체는 기존 errors 객체와 === 로 비교했을 때 달라야한다. 그래서
 * ```javascript
 * errors.idError = '';
 * setErrors(errors); // errors(기존) === errors(파라미터) 가 true 라서 아무 일도 일어나지 않고 무시된다.
 * ```
 * 이렇게 호출하면 아무 일도 일어나지 않게 된다. 그래서 반드시 serErrors 파라미터에는 객체를 새로 만들어서 넣어야 한다. 즉,
 * ```javascript
 * setErrors({...errors, idError: '아이디를 입력하세요.'});
 * ```
 * 이렇게 넣어야 한다.
 * 5. setState 를 사용할 때, 주의할 점이 또 하나 있다.
 * ```javascript
 * // 현재 count -> 0 이라고 가정하자.
 * const onLogin = () => {
 *     setCount(count + 2); // setCount(0 + 2) 인 셈이다.
 *     setCount(count + 3); // 아직 리렌더링이 안 일어났기 때문에, count 는 여전히 0 이다. 그래서 setCount(0 + 3) 인 셈이다.
 *     setCount(count + 4); // 여전히 count 는 0 이다. 그래서 setCount(0 + 4) 인 셈이다.
 *     setCount(count + 1); // 여전히 count 는 0 이다. 그래서 setCount(0 + 1) 인 셈이다. 따라서 결국 count 는 1 이 된다.
 *     // ... 생략
 * }
 * ```
 * 이렇게 하면, 로그인 버튼을 클릭할 때마다 count 가 1씩만 올라간다. 즉, 마지막 호출만 유효해진다.
 * 당연한게, count 의 실제 값이 바뀌는 건 리렌더링이 일어날 때다. 근데 아직 리렌더링이 안 되었기 때문에 setCount 로 count 가 바뀌지 않아서 값이 누적되지 않는 것이다.
 * 대신 이렇게 하면 누적시킬 수 있다.
 * ```
 * // 현재 count -> 0 이라고 가정하자.
 * const onLogin = () => {
 *     setCount((prev) => prev + 2); // prev 는 0 이다. 그래서 0 + 2 이다.
 *     setCount((prev) => prev + 3); // prev 는 2 이다. 리렌더링이 안 되어도 이게 순차적으로 호출되면서 prev 에는 반영이 된다. 그래서 2 + 3 이다.
 *     setCount((prev) => prev + 4); // prev 는 5 이다. 그래서 5 + 4 이다.
 *     setCount((prev) => prev + 1); // prev 는 9 이다. 그래서 9 + 1 이다. 따라서 결국 count 는 10 이 된다.
 *     // ... 생략
 * }
 * ```
 * 이렇게 setState 에 람다함수를 넣는 방식을 이용하면 리렌더링 전에도 값을 누적시킬 수 있다.
 * 원리를 설명하면, 사실 이게 setState 를 여러번 호출하면 그 커맨드가 모두 리액트 내부에 누적이 된다. 예를 들어서,
 * ```
 * const onLogin = () => {
 *     setCount((prev) => prev + 2);
 *     setCount((prev) => prev + 3);
 *     setCount(1);
 *     // ... 생략
 * }
 * ```
 * 이렇다고 하면, 리액트 내부적으로는
 * `[(prev) => prev + 2, (prev) => prev + 3, (prev) => 1]` 이렇게 쌓인다.
 * 리액트는 이걸 리렌더링이 일어날 때(또는 함수가 끝났을 때 라고도 설명함. 근데 함수 끝나고 리렌더링이 바로 되니까 같은 얘기인 듯?), 순차적으로 실행한다.(배치처리) 그러니까 `prev` 를 이용하면 누적이 될 수 있는 것이다.
 * 이 경우에는 앞이 다 정상실행되고도 마지막에 있는 `(prev) => 1` 때문에 최종 값이 `1` 이 된다.
 * ---
 * # 8강 ~ useRef
 * 1. useRef 도 결국 데이터 저장장치이다. 근데 화면을 바꾸지 않는 데이터다. 값이 바뀌어도 화면이 리렌더링되지 않는다. 따라서, useState 와 useRef 중 뭘 쓸지는 화면을 바꿀지말지에 따라서 결정하면 된다.
 * 2. 근데 사람들이 대부분 jsx 태그를 담아두는 용도로 쓴다. 즉 DOM 요소를 담아두는 용도로 쓴다.
 * 3. 연결할 태그에 `ref={idRef}` 이렇게 속성을 넣어주면 된다. 이건 `ref={(node) => { idRef.current = node }}` 이렇게 해주는 것과 같다.
 * 4. ref 가 리렌더링을 발생시키지 않는 이유는 ref 에서 변경되는 건 내부의 current 필드값일 뿐 ref 변수 자체에 어사인된 객체 참조값은 변경되지 않기 때문이다. 즉, 초기 생성된 객체가 다른 객체로 절대 교체되지 않는다. 그래서 변경이 감지되지 않아 리렌더링도 일어나지 않는다.
 * 5. JSX 태그에 ref 속성을 넣을 때 함수를 넣으면 활용 방법이 무궁무진하다. `ref={(node) => { idRef.current = node }}` 여기서 함수에 다양한 로직을 넣어서 활용할 수 있다.
 * 6. ref 는 HTML DOM 만 넣는 게 아니라, 화면을 바꿀 필요 없는데 저장하고 싶은 값들을 보통 넣는다.(ex. 로깅용 상태값)
 */
function App() {
    const [id, setId] = useState(''); // 파라미터에 초기값이 처음 들어갈 때만 ㅇ
    const idRef = useRef(null); // 초기값 { current: null } -> 담긴 후엔 { current: HTMLInputElement } 이다.
    const passwordRef = useRef(null);
    const counterRef = useRef(0);
    const [errors, setErrors] = useState({});
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
        counterRef.current += 1;
        console.log('counterRef:', counterRef)
        if (!id?.trim()) {
            setErrors({ idError: '아이디를 입력하세요.'});
            idRef.current?.focus(); // idRef.current 는 HTMLInputElement 이다. 이걸 focus() 하면 포커스가 간다.
            return;
        }
        if (!password?.trim()) {
            setErrors({passwordError: '비밀번호를 입력하세요.'});
            passwordRef.current?.focus(); // passwordRef.current 는 HTMLInputElement 이다. 이걸 focus() 하면 포커스가 간다.
            return;
        }
        setErrors({}); // 에러 없애기
        console.log('Login ID:', fullEmail, ', PW:', password);
    }

    return (
        <>
            <div style={{textAlign: 'left'}} className="login-form">
                <div>
                    <label htmlFor="id" style={{display: 'inline-block', width: '80px'}}>아이디</label>
                    <input ref={idRef} type="text" value={id} onChange={onChangeId}/>
                    {domain === '' ? null : <span>@</span>}
                    <select value={domain} onChange={onChangeDomain}>
                        {/* 맵 사용시 리턴 최상단 태그에 반드시 key 속성을 고유값으로 붙여야 한다.*/}
                        {domains.map((d) => {
                            return <option key={d} value={d}>{d}</option>
                        })}
                        <option value="">직접입력</option>
                    </select>
                    {errors.idError && <div style={{color: 'red'}}>{errors.idError}</div>}
                </div>
                <div>
                    <label htmlFor="password" style={{display: 'inline-block', width: '80px'}}>비밀번호</label>
                    <input ref={passwordRef} type="password" id="password" value={password} onChange={onChangePassword}/>
                    {errors.passwordError && <div style={{color: 'red'}}>{errors.passwordError}</div>}
                </div>
                <button onClick={onLogin}>로그인</button>
            </div>
            <div>회원가입</div>
        </>
    )
}

export default App
