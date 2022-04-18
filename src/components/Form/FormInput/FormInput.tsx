import React, {PropsWithChildren} from "react";
import styles from './FormInput.module.scss';
interface  FormInputProps {
    label : string;
    inputType : string;
}


const FormInput : React.FC<FormInputProps> = (props : PropsWithChildren<FormInputProps>) =>
{
    const { inputType, label, children } = props;

    return (
        <input className={styles.formInput}
            defaultValue={label}
            type={inputType}
        />
    );
}

export default FormInput;
