import React, {PropsWithChildren} from "react";
interface FormButtonProps {
    label? : string
}

const FormButton : React.FC<FormButtonProps> = (props: PropsWithChildren<FormButtonProps>) => {
    const {label, children} = props;
    return <button>
        {label}
    </button>
}
export default FormButton;
