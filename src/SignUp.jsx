import './App.css'
import {useRef, useState} from "react";
import EmailInput from "./components/EmailInput.jsx";
import Input from "./components/Input.jsx";
import useInput from "./hooks/useInput.jsx";
import useEmailInput from "./hooks/useEmailInput.js";

/**
 * # 9강. 회원가입 폼 만들기
 * 1. 부모자식관계에서 State 는 부모에 만들고 자식한테 props 로 넘겨줘야 한다.
 * 2. 부모자식관계에서 서로 공유하는 값이 있다면 항상 부모에 만들고 자식한테 넘겨줘라.
 * 3. 공통되는 부분을 컴포넌트화해서 같이 쓰고, 다른 부분은 props 로 넘겨줘라.
 * 4. 파라미터에서 default 값을 설정할 수 있다.
 * ```javascript
 * // 이렇게 파라미터에서 default 값(type = 'text')을 설정할 수 있다.
 * export default function Input({type = 'text', text, id, ref, value, onChange, error}) {
 *     // ... 생략
 * }
 * ```
 * ---
 * # 10강. 커스텀 훅
 * 1. 훅은 use 로 시작해야 한다.
 * 2. 선언이 함수 컴포넌트의 최상단에 위치해야 한다.
 * 3. 훅은 커스텀훅 안에서 쓸 수 있다.
 * 4. 리액트는 처음 렌더링할 때 훅을 순서대로 기억해둔다. 그리고 다음 렌더링시 훅은 순서와 갯수가 완전히 일치해야한다. 안 그러면 에러가 난다. (리액트 공식문서의 Rules of Hooks 를 참고해라.)
 *    따라서, 훅을 프라이빗 함수 내에서 넣거나 조건문 내에 넣거나 하지 마라, 반드시 최상단에 선언해라.
 * 5. 훅은 컴포넌트 최상단에 넣을 수도 있지만, 커스텀훅에도 넣을 수 있다.
 * 6. 훅을 부모와 자식이 같이 쓰는 경우, 항상 부모에서 선언해서 자식한테 props 로 물려주는 방식이어야 한다. 그래야만 공유가 가능하다. 자식에서 선언된 걸 부모가 접근할 방법이 없다. 리액트는 단방향이기 때문이다.
 */
function SignUp() {
    const [id, domain, idRef, onChangeId, onChangeDomain] = useEmailInput();
    const [password, passwordRef, onChangePassword] = useInput('');
    const [nickname, nicknameRef, onChangeNickname] = useInput('');
    const [phone, phoneRef, onChangePhone] = useInput('');

    const counterRef = useRef(0);

    const [errors, setErrors] = useState({});

    const onLogin = () => {
        counterRef.current += 1;
        console.log('counterRef:', counterRef)
        if (!id?.trim()) {
            setErrors({idError: '아이디를 입력하세요.'});
            idRef.current?.focus(); // idRef.current 는 HTMLInputElement 이다. 이걸 focus() 하면 포커스가 간다.
            return;
        }
        if (!password?.trim()) {
            setErrors({passwordError: '비밀번호를 입력하세요.'});
            passwordRef.current?.focus(); // passwordRef.current 는 HTMLInputElement 이다. 이걸 focus() 하면 포커스가 간다.
            return;
        }
        if (!nickname?.trim()) {
            setErrors({nicknameError: '닉네임을 입력하세요.'});
            nicknameRef.current?.focus(); // nicknameRef.current 는 HTMLInputElement 이다. 이걸 focus() 하면 포커스가 간다.
            return;
        }
        if (!phone?.trim()) {
            setErrors({phoneError: '전화번호를 입력하세요.'});
            phoneRef.current?.focus(); // phoneRef.current 는 HTMLInputElement 이다. 이걸 focus() 하면 포커스가 간다.
            return;
        }
        setErrors({}); // 에러 없애기
    }

    // const [fullEmail, setFullEmail] = useState(''); // 이건 파생상태의 실수다.
    const fullEmail = `${id}@${domain}`; // 이건 파생상태를 사용하지 않은 것이다. 그래도 id 와 domain 이 바뀔 때마다 자동으로 바뀐다.

    return (
        <>
            <div style={{textAlign: 'left'}} className="login-form">
                <EmailInput errors={errors} id={id} domain={domain} idRef={idRef} onChangeId={onChangeId}
                            onChangeDomain={onChangeDomain}/>
                <Input type="password" id="password" ref={passwordRef} value={password} onChange={onChangePassword}
                       error={errors.passwordError} text={"비밀번호"}/>
                <Input id="nickname" ref={nicknameRef} value={nickname} onChange={onChangeNickname}
                       error={errors.nicknameError} text={"닉네임"}/>
                <Input type="tel" id="phone" ref={phoneRef} value={phone} onChange={onChangePhone}
                       error={errors.phoneError} text={"전화번호"}/>
                <button onClick={onLogin}>회원가입</button>
            </div>
            <div>로그인</div>
            {fullEmail}
        </>
    )
}

export default SignUp
