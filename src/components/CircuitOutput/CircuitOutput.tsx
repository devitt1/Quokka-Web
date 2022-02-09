import React from 'react';
import styles from './CircuitOutput.module.scss';
import BuildOutput from "./BuildOutput/BuildOutput";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {IBuildOutput} from "../../common/interfaces";
import BuildOutputChart from "./BuildOutputView/BuildOutputChart/BuildOutputChart";

const CircuitOutput : React.FC = () => {

    const {buildOutputs} = useSelector((state : RootState) => (state.circuitOutputs))
    return (<div className={styles.circuitOutput}>
        <h2>Circuit Output</h2>
        {
            buildOutputs.length !== 0 ?
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

export default CircuitOutput;
