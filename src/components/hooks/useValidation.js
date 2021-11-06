import { useState, useEffect } from 'react';

export const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch(validation) {
                case 'isEmpty':
                    value ? setEmpty(false): setEmpty(true)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    break;
            }
        }

    }, [value])

    return {
        isEmpty,
        emailError,
        setEmailError
    }

}