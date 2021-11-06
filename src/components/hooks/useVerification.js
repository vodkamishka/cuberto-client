import { useState, useEffect } from "react";
import axios from 'axios';
import { acceptableText, failedText, checkText } from "../../constants";

const $api = axios.create({
    withCredentials: false,
    baseURL: 'http://localhost:5000',

})

export const useVerification = (value) => {

    const [verification, setVerification] = useState({
        textVerification: " ",
        disabledButton: false
    });

    const {textVerification, disabledButton} = verification;

    useEffect(() => {
        setVerification({...verification, textVerification: ''});
    }, [value])

    const handleClick = async (e) => {

        e.preventDefault();

        setVerification({"textVerification": checkText, "disabledButton": true});

        const res = await $api.post('/', {email: value});

        const text = res.data.reason === "accepted_email" ? acceptableText : failedText

        setVerification({"textVerification": text, "disabledButton": false});

    }

    return {textVerification, disabledButton, handleClick}

}