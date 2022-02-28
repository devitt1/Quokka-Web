import React, {createContext, Dispatch, SetStateAction, useState} from "react";

interface ICompoundGateSelectionContext {

}

type CompoundGateSelectionContextState = {
    coordinate : {x: number, y: number},
    dimension : {width : number, height : number}
}

type CompoundGateSelectionContextValue = {
    selectionBox : CompoundGateSelectionContextState,
    setSelectionBox : Dispatch<SetStateAction<CompoundGateSelectionContextState>>

}

const defaultCompoundGateSelectionContextValue : CompoundGateSelectionContextValue = {
    selectionBox : { coordinate: {x : 0, y: 0}, dimension : {width : 0, height: 0}},
    setSelectionBox: (selectionBox: ICompoundGateSelectionContext) => {}
}
export const CompoundGateSelectionContext = createContext(defaultCompoundGateSelectionContextValue);

interface CompoundGateSelectionContextProviderProps {

}
export const CompoundGateSelectionContextProvider: React.FC<CompoundGateSelectionContextProviderProps> = (props) =>{
    const {children} = props;
    const [selectionBox, setSelectionBox] = useState(defaultCompoundGateSelectionContextValue.selectionBox);

    const context = {selectionBox, setSelectionBox}
    return (
        <CompoundGateSelectionContext.Provider value={context}>
            {children}
        </CompoundGateSelectionContext.Provider>
    )
}
export default CompoundGateSelectionContextProvider;
