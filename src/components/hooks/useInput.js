import { useState } from 'react';
import { useValidation } from './useValidation';
import { useVerification } from './useVerification';
import { useAutocomplete } from './useAutocomplete';

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);

    const onChange = (e) => setValue(e.target.value);

    const onBlur = (e) => setIsDirty(true);

    const valid = useValidation(value, validations);

    const verification = useVerification(value);

    const autocomplete = useAutocomplete(value);

    return {
        value,
        onChange,
        onBlur,
        setValue,
        isDirty,
        ...valid,
        ...verification,
        ...autocomplete,
    }
}