export type Payload = { type: string, payload: any};
export const ALL_STD_GATES = ['X', 'Y', 'Z', 'RX', 'RY', 'RZ', 'CNOT'];
export type StandardGateTypes = typeof ALL_STD_GATES;
export type GateTypes = StandardGateTypes[number];
export type GateExtTypes = 'CNOT_TARGET' | 'None';
export type ModalType = 'LoginModal' | 'ConnectionModal' | 'RunCircuitModal';
export type ModalState = 'StartConnection' | 'Connecting' | 'Connected'
| 'StartRunCircuit' | 'RunningCircuit' | 'CompletedRunCircuit';
