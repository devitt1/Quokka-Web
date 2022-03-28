import React, {useCallback, useContext} from 'react';
import styles from './CircuitArrangement.module.scss';
import Grid from "./Grid/Grid";
import Canvas from "./Canvas/Canvas";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import {CursorContext} from "../../../Providers/CursorContextProvider";
interface CircuitArrangementProps {
    viewOnly : boolean;
}

const CircuitArrangement : React.FC<CircuitArrangementProps> = (props) => {
    const {viewOnly} = props;
    const {circuitState} = useSelector((state : RootState) => (state.circuitConfig));
    const {cursor, setCursor } = useContext(CursorContext);
    const dispatch = useDispatch()

    const handleCursorEntered = useCallback(() =>{
        setCursor((cursorContextStates) => ({attached: true}));
    }, []);

    const handleCursorLeft = useCallback(() =>{
        setCursor((cursorContextStates) => ({attached: false}));
    }, []);

    return (
            <div className={styles.circuitArrangement}
                onMouseEnter={handleCursorEntered}
                onMouseLeave={handleCursorLeft}>
                <Canvas/>
                <Grid viewOnly={viewOnly} circuitState={circuitState}/>
            </div>
    )

}


export default CircuitArrangement;
