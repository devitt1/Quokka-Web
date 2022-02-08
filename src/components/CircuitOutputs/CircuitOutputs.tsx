import React from 'react';
import styles from './CircuitOutputs.module.scss';
import BuildOutput from "./BuildOutput/BuildOutput";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {IBuildOutput} from "../../common/interfaces";

const CircuitOutputs : React.FC = () => {

    const {buildOutputs} = useSelector((state : RootState) => (state.circuitOutputs))

    const arr = [1, 2, 3];
    var empty = false;
    return (<div className={styles.circuitOutputs}>
        <h2>Circuit Outputs</h2>
        {
            !empty ?
                // <BuildOutput/>
                    buildOutputs.map((buildOutput : IBuildOutput, index : number) => {
                        return <BuildOutput
                            key={buildOutput.id}
                            id={buildOutput.id}
                            name={buildOutput.name}
                            output={buildOutput.name}
                            runDuration={buildOutput.runDuration}
                        />
                    })
                :
                <div className={styles.prompt}>
                    <p>Run a circuit in the Circuit Builder and visit this page again once complete to see the output.</p>
                    <p className={styles.warningMessage}>Circuit output will only be accessible until cookies are cleared. Login or create an account to save circuit output.</p>
                </div>
        }


    </div>)
}

export default CircuitOutputs;
