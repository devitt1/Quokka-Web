import React from 'react';
import styles from './CircuitConfig.module.scss';
import CircuitArrangement from "./CircuitArrangement/CircuitArrangement";
import ViewOptions from "./ViewOptions/ViewOptions";

interface CircuitConfigProps {
    circuitBuilderStatus : boolean
}


const CircuitConfig : React.FC <CircuitConfigProps> = (props) => {
    const {circuitBuilderStatus} = props;
    var circuitConfigStyle = styles.circuitConfig;
    if (circuitBuilderStatus) {
        circuitConfigStyle = styles.circuitConfig + ' ' + styles.disabled;
    }

    return <div className={circuitConfigStyle}>
        <CircuitArrangement/>
        <ViewOptions/>
    </div>
}

export default CircuitConfig;
