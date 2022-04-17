import React, {PropsWithChildren} from 'react';

interface FormLabelProps {
    label? : string;
}

const FormLabel : React.FC<FormLabelProps> = (props: PropsWithChildren<FormLabelProps>) => {
    const {label, children} = props;
    return <h2>{label}</h2>
}

export default FormLabel;
