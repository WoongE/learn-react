import {memo} from 'react';

function Input({type = 'text', text, id, ref, value, onChange, error}) {
    return (
        <div>
            <label htmlFor={id} style={{display: 'inline-block', width: '80px'}}>{text}</label>
            <input ref={ref} type={type} id={id} value={value} onChange={onChange}/>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    )
}

export default memo(Input);
