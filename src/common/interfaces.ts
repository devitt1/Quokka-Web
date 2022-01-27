import {GateType} from "./types";

export interface IGate {
    id : string,
    x : number,
    y : number,
    width : number,
    height : number,
    rowIndex : number,
    colIndex : number,
    type: GateType
}
