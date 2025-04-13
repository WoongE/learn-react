import {memo} from "react";

function EmailInput({errors, id, domain, idRef, onChangeId, onChangeDomain}) {
    const domains = ['naver.com', 'gmail.com', 'daum.net'];
    return (
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
    )
}

export default memo(EmailInput);
