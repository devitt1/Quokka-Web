import React from 'react';
import styles from './CircuitOutputs.module.scss';
import BuildOutput from "./BuildOutput/BuildOutput";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";

const CircuitOutputs : React.FC = () => {

    const {buildOutputs} = useSelector((state : RootState) => (state.circuitOutputs))


    var empty = false;
    return (<div className={styles.circuitOutputs}>
        <h2>Circuit Outputs</h2>
        {
            !empty ?
                <BuildOutput/>
                :
                <div className={styles.prompt}>
                    <p>Run a circuit in the Circuit Builder and visit this page again once complete to see the output.</p>
                    <p className={styles.warningMessage}>Circuit output will only be accessible until cookies are cleared. Login or create an account to save circuit output.</p>
                </div>
        }


    </div>)
}

export default CircuitOutputs;
