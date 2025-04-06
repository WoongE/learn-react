import useInput from "./useInput.jsx";
import {useState} from "react";

export default function useEmailInput() {
    const [id, idRef, onChangeId] = useInput('');
    const [domain, setDomain] = useState('naver.com');

    const onChangeDomain = (e) => {
        setDomain(e.target.value);
    }

    return [id, domain, idRef, onChangeId, onChangeDomain];
}
