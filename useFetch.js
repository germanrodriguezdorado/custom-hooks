import { useState, useEffect, useRef } from "react";


export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {

        setState({
            data: null, loading: true, error: null
        });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log("Luego de la carga es " + isMounted.current)
                
                setTimeout(() => {
                    if (isMounted.current) {
                        setState({
                            loading: false,
                            error: null,
                            data: data
                        });
                        console.log("Componente montado. Se cambia state.")
                    } else {
                        console.log("Componente desmontado. No se cambia el state.")
                    }
                }, 1);
                
            })
            .catch( () => {
                setState({
                    data: null, 
                    loading: false, 
                    error: "No se pudo cargar la info"
                });
            } );


    }, [url]);

    return state;
}
