export type Payload = { type: string, payload: any};
export type GateType = 'X' | 'Y' | 'Z' | 'C';
export type ModalType = 'LoginModal' | 'ConnectionModal' | 'RunCircuitModal';
export type ModalState = 'StartConnection' | 'Connecting' | 'Connected'
| 'StartRunCircuit' | 'RunningCircuit' | 'CompletedRunCircuit';
