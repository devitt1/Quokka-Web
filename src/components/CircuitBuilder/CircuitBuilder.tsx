import React from 'react';
import CircuitArrangement from './CircuitConfig/CircuitArrangement/CircuitArrangement';
import styles from './CircuitBuilder.module.scss';
import Toolbar from './Toolbar/Toolbar';
import CircuitConfig from "./CircuitConfig/CircuitConfig";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import CircuitProcessingInfo from "./CircuitProcessingInfo/CircuitProcessingInfo";
import Cursor from "../Cursor/Cursor";
import CursorContextProvider from '../Providers/CursorContextProvider';
import CompoundGateSelectionContextProvider from "../Providers/CompoundGateSelectionContextProvider";

const CircuitBuilder : React.FC = () => {
    const {status} = useSelector((state : RootState) => (state.circuitConfig));

    return (
            <div className={styles.circuitBuilder}>
                <CursorContextProvider>
                    <CompoundGateSelectionContextProvider>
                        <Cursor/>
                        {
                            status ? <CircuitProcessingInfo/> : <Toolbar/>
                        }

                    <CircuitConfig circuitBuilderStatus={status}/>
                    </CompoundGateSelectionContextProvider>
                </CursorContextProvider>
            </div>
       )
}

export default CircuitBuilder;
