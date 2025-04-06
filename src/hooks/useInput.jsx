import {useRef, useState} from "react";

/**
 * 1. 훅은 컴포넌트 최상단에 넣을 수도 있지만, 커스텀훅에도 넣을 수 있다.
 */
export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const ref = useRef(null);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return [value, ref, onChange];
};
