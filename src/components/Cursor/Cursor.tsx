import React, {useContext, useEffect, useState} from "react";
import useMousePosition from "../hooks/useMousePosition";
import styles from './Cursor.module.scss';
import {CursorContext} from "../Providers/CursorContextProvider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {updateDefaultStandardGate} from "../../redux/actions/circuitConfigAction";
import CursorAttachment from "./CursorAttachment/CursorAttachment";
import Gate from "../CircuitBuilder/Gate/Gate";
import {IGate} from "../../common/interfaces";
import {DIMENSIONS} from "../../common/constants";

const Cursor : React.FC = () => {
    const {clientX, clientY } = useMousePosition();
    const {cursor, setCursor} = useContext(CursorContext);
    const {
        selectedGate,
        circuitConfigMode,
        selectedCompoundGate,
    } = useSelector((state: RootState) => state.circuitConfig);
    const dispatch = useDispatch();

    useEffect(() => {
            if (circuitConfigMode === 'GateSelectionMode') {
                setCursor({attached: true});
            }
            else {
                setCursor({attached: false});
                dispatch(updateDefaultStandardGate());
            }
        },
        [selectedCompoundGate, selectedGate, circuitConfigMode])

    const attachmentWidth = selectedGate === "Compound Gate" ? selectedCompoundGate.width : DIMENSIONS.STD_GATE.WIDTH;
    const attachmentHeight = selectedGate === "Compound Gate" ? selectedCompoundGate.height : DIMENSIONS.STD_GATE.HEIGHT;



    return (
        <div
            className={styles.cursor}
        >
            {
                cursor.attached
                    ?
                    <CursorAttachment
                        width={attachmentWidth}
                        height={attachmentHeight}
                    >
                        <Gate
                              id=""
                              x={clientX}
                              y={clientY}
                              width={attachmentWidth}
                              height={attachmentHeight}
                              type={selectedGate === "Compound Gate" ? selectedCompoundGate.type : selectedGate}
                              rotAngle='pi/2'
                              isAttachment={true}
                              name={selectedGate === "Compound Gate" ? selectedCompoundGate.name : selectedGate}
                        />
                    </CursorAttachment>
                    : null
            }
        </div>
    );
};

export default Cursor;
