import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './GateExtension.module.scss'
import {DIMENSIONS} from "../../../common/constants";
import {CursorContext} from "../../Providers/CursorContextProvider";
import {updateDraggingGatePosition} from "../../../redux/actions/circuitConfigAction";
import {getSnapToGridPosition} from "../Gate/DraggingGate/DraggingGate";

interface GateExtensionProps {
    xOffset: number
    yOffset: number;
}

export const GateExtension: React.FC<GateExtensionProps>= (props) => {

    const {yOffset, xOffset} = props;

    const {cursor, setCursor} = useContext(CursorContext);
    const gateExtRef : any = useRef(null);
    const [gateExtPos, setGateExtPos] = useState({x: 0, y:0});

    const relativePos = `translate(${gateExtPos.x}, ${gateExtPos.y})`
    const [headPosition, setHeadPosition] = useState({
        x: DIMENSIONS.GRID.WIDTH + DIMENSIONS.STD_GATE.WIDTH/2,
        y: DIMENSIONS.GRID.PADDING.TOP + DIMENSIONS.STD_GATE.HEIGHT/2 + DIMENSIONS.GRID.HEIGHT,
    })

    const [targetY, setTargetY] = useState(DIMENSIONS.GRID.PADDING.TOP + DIMENSIONS.GRID.HEIGHT + DIMENSIONS.STD_GATE.HEIGHT/2);
    const handleHeadMouseDown = () => {
        console.log('handle head clicked!');
        document.addEventListener('mousemove', handleTargetMouseMove.current);

    }

    const handleTargetMouseMove = useRef((e : any) => {
        console.log(`Head moves: x: ${e.clientX}, y:${e.clientY}`);
        const newY = e.clientY - yOffset;

        setTargetY(newY);

    });

    const handleHeadMouseUp = (e : any) => {
        console.log(`Mouse up at: x: ${e.clientX}, y:${e.clientY}`);
        document.removeEventListener('mousemove', handleTargetMouseMove.current);
        const gateExtElem = gateExtRef.current;
        const bBox = gateExtElem.getBBox();

        const newY = Math.floor(e.clientY / 64) * 64 - yOffset + DIMENSIONS.STD_GATE.HEIGHT/2;
        setTargetY(newY)
    }


    const handleTrunkMouseDown = (e: any) => {
        document.addEventListener('mousemove', handleTrunkMouseMove.current);

        console.log("mouse down on trunk")
    }

    const handleTrunkMouseMove = useRef((e: any)=> {
        // console.log(`Trunk moves: x: ${e.clientX}, y:${e.clientY}`);
        // const newX = e.clientX - 67;
        // const newY = e.clientY - 280;
        // setGateExtPos({x: newX, y: newY})

    });

    const handleTrunkMouseUp = (e: any) => {
        // document.removeEventListener('mousemove', handleTrunkMouseMove.current);
        // const newX = Math.floor(e.clientX / 48) * 48 - 70
        // const newY = Math.floor(e.clientY / 64) * 64 - 270
        //
        // setGateExtPos({x: newX, y: newY})

    }


    return <g
        transform={relativePos}
        className={styles.gateExtension}
        ref={gateExtRef}
    >
        <line
            className={styles.trunk}
            stroke="#5E6C87"  strokeWidth="4"
            x1={headPosition.x}
            x2={headPosition.x}
            y1={headPosition.y}
            y2={targetY}
            onMouseDown={handleTrunkMouseDown}
            onMouseUp={handleTrunkMouseUp}
        >

        </line>
        <circle
            className={styles.target}
            onMouseDown={handleHeadMouseDown}
            onMouseUp={handleHeadMouseUp}
            cx={DIMENSIONS.GRID.WIDTH + DIMENSIONS.STD_GATE.WIDTH/2}
            cy={targetY} r="13" fill="url(#paint1_linear_387_5131)"/>
        <defs>
            <linearGradient id="paint0_linear_387_5131" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1F2E4D"/>
                <stop offset="1" stopColor="#63718B"/>
            </linearGradient>
            <linearGradient id="paint1_linear_387_5131" x1="20" y1="57" x2="20" y2="83" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1F2E4D"/>
                <stop offset="1" stopColor="#63718B"/>
            </linearGradient>
        </defs>
    </g>
}

export default GateExtension;
