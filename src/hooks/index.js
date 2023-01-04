import {
    useEffect,
    useRef
} from "react";

export const useBeforeUnload = fn => {

    const cb = useRef(fn); // init with fn, so that type checkers won't assume that current might be undefined

    useEffect(() => {
        cb.current = fn;
    }, [fn]);

    useEffect(() => {
        const onUnload = (...args) => cb.current?.(...args);

        window.addEventListener("beforeunload", onUnload);

        return () => {
            window.removeEventListener("beforeunload", onUnload)

        };

    }, []);
};
