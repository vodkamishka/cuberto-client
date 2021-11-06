export const debounce = (fn, time, setEmailError) => {
    let timeout;
    return (e) => {
        setEmailError(false);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => fn(e), time);
    }
}