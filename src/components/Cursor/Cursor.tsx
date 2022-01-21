import React, {useContext, useEffect, useState} from "react";
import useMousePosition from "../hooks/useMousePosition";
import styles from './Cursor.module.scss';
import x_gate from '../../assets/x_gate.svg';
import {CursorContext} from "../Providers/CursorContextProvider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {renderGate} from "../../utils/ConditonalRender";
import {updateDefaultStandardGate, updateSelectedStandardGate} from "../../redux/actions/circuitConfigAction";

const Cursor : React.FC = () => {
    const {clientX, clientY } = useMousePosition();
    const {cursor, setCursor} = useContext(CursorContext);
    const circuitConfig = useSelector((state: RootState) => state.circuitConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("selected standard gate changes, mode changes");
            if (circuitConfig.gateSelectMode) {
                console.log("make cursor attached because select mode is on");
                setCursor({attached: true});
            }
            else {
                console.log("cursor can't be attached because select mode is off");
                setCursor({attached: false});
                dispatch(updateDefaultStandardGate());
            }
        },
        [circuitConfig.selectedStandardGate, circuitConfig.gateSelectMode])


    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                pointerEvents: "none"
            }}
        >
            <svg
                width={50}
                height={50}
                viewBox="0 0 50 50"
                style={{
                    position: "absolute",
                    left: clientX,
                    top: clientY,
                    transform: `translate(-50%, -50%)`,
                    stroke: cursor.attached ? "black" : "white",
                    strokeWidth: 1,
                    transition: "transform .2s ease-in-out",
                    // TODO: extra check on clientX needed here
                }}
            >
                {
                    // cursor.attached ?  <rect width="40" height="38" fill="blue"/> : null
                    cursor.attached ?  renderGate(circuitConfig.selectedStandardGate) : null

                }
            </svg>
            {/*<p>{clientX}</p>*/}
            {/*<p>{clientY}</p>*/}
        </div>
    );
};

export default Cursor;
