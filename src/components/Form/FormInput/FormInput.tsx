import React, {PropsWithChildren} from "react";
import {useFormContext} from "../FormContext";

interface  FormInputProps {
    label : string;
}


const FormInput : React.FC<FormInputProps> = (props : PropsWithChildren<FormInputProps>) =>
{
    const {label} = props;

    return (
        <input
            defaultValue={label}
            type="text"
        />
    );
}

export default FormInput;
