import { useEffect, useState } from 'react';
import { domains, additionDomains } from "../../constants";

export const useAutocomplete = value => {

    const [autocomplete, setAutocomplete] = useState({
        showAutocomplete: false,
        options: domains
    });

    const index = value.indexOf("@");
    const firstLetter = value[index + 1]; // first letter after dog;
    const secondLetter = value[index + 2]; // second letter after dog;

    const newValue = value.slice(0, index + 1);

    useEffect(() => {

        if (firstLetter && !secondLetter) {

            setAutocomplete({
                showAutocomplete: true,
                options: additionDomains.filter(domain => domain[0] === firstLetter)
            })
        }

        if (value.includes("@") && value === newValue) {

            setAutocomplete({
                showAutocomplete: true,
                options: domains
            })
        }

    }, [value])


    return { ...autocomplete, setAutocomplete }
}