import { useState } from 'react'

export const useForm = ( initialValues = {} ) => {
    
    const [values, setValues] = useState(initialValues);

    const checkEmail = (email) => { // Temporal, deberia ser algo que realmente chequee el mail
        return email !== "pepe" ? false : true;
    }

    const reset = () => {
        setValues( initialValues );
    };
    
    const handleInputChange = ({ target }) => {

        let errors = false;


        if (target.name === "email" && target.value !== ""){
            if (!checkEmail(target.value)){
                errors = true;
                setValues({
                    ...values,
                    [target.name]: target.value,
                    "errors": 1
                });
            }else{
                setValues({
                    ...values,
                    [target.name]: target.value,
                    "errors": 0
                });
            }
        }

        if(!errors){
            setValues({
                ...values,
                [target.name]: target.value,
                "errors": 0
            });
        }

        //console.log(values)

    };

    return [values, handleInputChange, reset];
}
