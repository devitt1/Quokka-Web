import React, {useContext, useEffect, useState} from "react";
import useMousePosition from "../hooks/useMousePosition";
import styles from './Cursor.module.scss';
import {CursorContext} from "../Providers/CursorContextProvider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {updateDefaultStandardGate} from "../../redux/actions/circuitConfigAction";
import CursorAttachment from "./CursorAttachment/CursorAttachment";
import Gate from "../CircuitBuilder/Gate/Gate";

const Cursor : React.FC = () => {
    const {clientX, clientY } = useMousePosition();
    const {cursor, setCursor} = useContext(CursorContext);
    const {selectedStandardGate, circuitConfigMode} = useSelector((state: RootState) => state.circuitConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("selected standard gate changes, mode changes");
            if (circuitConfigMode === 'GateSelectionMode') {
                // console.log("make cursor attached because select mode is on");
                setCursor({attached: true});
            }
            else {
                // console.log("cursor can't be attached because select mode is off");
                setCursor({attached: false});
                dispatch(updateDefaultStandardGate());
            }
        },
        [selectedStandardGate, circuitConfigMode])


    return (
        <div
            className={styles.cursor}
        >
            {
                cursor.attached
                    ?
                    <CursorAttachment>
                        <Gate
                              id=""
                              x={clientX} y={clientY}
                              width={40} height={38}
                              type={selectedStandardGate}
                              rotAngle='pi/2'
                              isAttachment={true}/>
                    </CursorAttachment>
                    : null
            }
            {/*<p>{clientX}</p>*/}
            {/*<p>{clientY}</p>*/}
        </div>
    );
};

export default Cursor;
