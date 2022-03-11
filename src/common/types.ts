export type Payload = { type: string, payload: any};
export const ALL_STD_GATES = ['X', 'Y', 'Z', 'RX', 'RY', 'RZ', 'CNOT', 'Measurement Gate'];







export const ALL_COMPOUND_GATES = ['Compound Gate'];
export type StandardGateTypes = typeof ALL_STD_GATES;
export type CompoundGateTypes = typeof ALL_COMPOUND_GATES;
export type GateTypes = StandardGateTypes[number] | CompoundGateTypes[number];
export type GateExtTypes = 'CNOT_TARGET' | 'None';

export type CircuitConfigMode =
    | 'NoSelectionMode'
    | 'GateSelectionMode'
    | 'CompoundGateCreationMode';

export type ModalType =
    | 'LoginModal'
    | 'ConnectionModal'
    | 'RunCircuitModal'
    | 'EditGateInputModal'
    | 'ForgotPasswordModal'
    | 'SaveCircuitModal'
    | 'SaveCompoundGateModal';

export type ModalState =
    |'StartConnection'
    | 'Connecting'
    | 'Connected'
    | 'StartRunCircuit'
    | 'RunningCircuit'
    | 'CompletedRunCircuit'
    | 'StartEnterInput'
    | 'EmailPasswordEntry'
    | 'EmailPasswordSent'
    | 'SaveCircuitNameEntry'
    | 'SaveCompoundGateEntry';

export type ButtonTypes =
    | 'loginBtn'
    | 'standardBtn'
    | 'selectGateBtn'
    | 'circuitBtn'
    | 'circuitRunBtn'
    | 'circuitSaveBtn'
    | 'circuitInstructionBtn'
    | 'circuitCancelBtn'
    | 'dropdownBtn'
    | 'dropdownBtnRoundedRightCorners'
    | 'imageBtn'
    | 'accountMenuBtn';

export type DropdownTypes =
    | 'dropdownList'
    | 'accountMenuDropdown'
    | 'standardGateDropdown'
    | 'compoundGateDropdown'

