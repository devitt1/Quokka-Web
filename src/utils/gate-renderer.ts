import {IGate} from "../common/interfaces";
import {countQubitSpan, locateGatesInSelectionBox} from "../common/helpers";
import {DIMENSIONS} from "../common/constants";
import {Gate, GateExtension} from "../common/classes";
import {calculateCompoundGateHeight, calculateQubitGap} from "./formula";
import droppedGates from "../components/CircuitBuilder/Gate/DroppedGates/DroppedGates";

export const renderCompoundGate  = (
    gatesInSelection : IGate[],
    gateName: string
) : IGate => {

    const compoundGatePosition = findFurthestTopLeftGateInArray(gatesInSelection);
    const qubitSpan = countQubitSpan(gatesInSelection);
    const qubitGap = calculateQubitGap(DIMENSIONS.GRID.HEIGHT, DIMENSIONS.STD_GATE.HEIGHT);
    let compoundGateDimension: { width: number, height: number };
    compoundGateDimension = {
        width: DIMENSIONS.STD_GATE.WIDTH,
        height: calculateCompoundGateHeight(
            qubitSpan,
            DIMENSIONS.STD_GATE.HEIGHT,
            qubitGap)
    };
    return new Gate(
        compoundGatePosition.x,
        compoundGatePosition.y,
        compoundGateDimension.width,
        compoundGateDimension.height,
        [''],
        'Compound Gate',
        new GateExtension(0, '', 'None'),
        false,
        null,
        gateName,
        gatesInSelection
        );
}

/**
 * Find the furthest top left gate in an array of gates
 * Condition:
 * #1 priority: gate is furthest to the left
 * #2 priority: gate is furthest to the top
 * @param droppedGates
 */
export const findFurthestTopLeftGateInArray = (droppedGates : IGate[]) : {x: number, y: number} => {
    var furthestLeft = droppedGates[0].x;
    var furthestTop = droppedGates[0].y;

    droppedGates.forEach((gate, index) => {
        if (gate.x < furthestLeft) {
            furthestLeft = gate.x;
        }
        if (gate.y < furthestTop) {
            furthestTop = gate.y;
        }
    });
    console.log(`furthest left: ${furthestLeft}, furthest top: ${furthestTop}`);
    return {x: furthestLeft, y: furthestTop};
}
