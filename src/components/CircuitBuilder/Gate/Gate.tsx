import React from 'react';
import styles from './Gate.module.scss';
import {GateTypes} from "../../../common/types";
import {DIMENSIONS} from "../../../common/constants";

interface GateProps {
    x: number;
    y: number;
    width : number;
    height : number;
    type : GateTypes;
    rotAngle : string;
    isAttachment : boolean;
}

const Gate : React.FC <GateProps> = (children) => {
    const {x, y, width, height, type, rotAngle, isAttachment} = children;

    const handleTextboxClicked = () => {
        console.log("Text box clicked!");
    }
    const renderGate = (x : number, y : number, width : number, height: number, gateType : string) => {
        const relativePosition = isAttachment ? 'translate(0,0)' : `translate(${x},${y})`;
        switch (gateType) {
            case 'X':
                return <g transform={relativePosition}>
                    <rect
                        width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT}
                        rx="4" fill="url(#paint0_linear_349_5172)"/>
                    <path d="M26.426 27H24.2125C24.0605 27 23.937 26.9588 23.842 26.8765C23.747 26.7942 23.671 26.7023 23.614 26.601L20.213 21.1195C20.1877 21.1955 20.1592 21.2683 20.1275 21.338C20.1022 21.4077 20.0705 21.4742 20.0325 21.5375L16.7455 26.601C16.6758 26.7023 16.5967 26.7942 16.508 26.8765C16.4257 26.9588 16.3148 27 16.1755 27H14.1045L18.7215 19.97L14.2945 13.32H16.4985C16.6568 13.32 16.7708 13.3453 16.8405 13.396C16.9165 13.4403 16.983 13.51 17.04 13.605L20.365 18.83C20.3967 18.754 20.4283 18.678 20.46 18.602C20.4917 18.526 20.5328 18.4468 20.5835 18.3645L23.6805 13.643C23.7438 13.5353 23.8135 13.4562 23.8895 13.4055C23.9655 13.3485 24.0573 13.32 24.165 13.32H26.2835L21.8185 19.875L26.426 27Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5172" x1={0} y1={0} x2={20} y2={40} gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>

            case 'Y':
                return <g transform={relativePosition}>
                    <rect
                        width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT}
                        rx="4" fill="url(#paint0_linear_349_5192)"/>
                    <path d="M21.1535 21.642V27H18.94V21.642L13.943 13.32H15.8905C16.0868 13.32 16.242 13.3675 16.356 13.4625C16.47 13.5575 16.565 13.6778 16.641 13.8235L19.4435 18.7255C19.5702 18.9725 19.6842 19.2068 19.7855 19.4285C19.8932 19.6502 19.9882 19.8687 20.0705 20.084C20.1402 19.8623 20.2257 19.6438 20.327 19.4285C20.4283 19.2068 20.5423 18.9725 20.669 18.7255L23.4525 13.8235C23.5158 13.6968 23.6077 13.5828 23.728 13.4815C23.8483 13.3738 24.0035 13.32 24.1935 13.32H26.1505L21.1535 21.642Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5192" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>
            case 'Z':
                return <g transform={relativePosition}>
                    <rect
                        width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT}
                        rx="4" fill="url(#paint0_linear_349_5195)"/>
                    <path d="M24.9155 14.1465C24.9155 14.2732 24.8933 14.3967 24.849 14.517C24.811 14.6373 24.7572 14.7513 24.6875 14.859L17.344 25.2045H24.773V27H14.437V26.126C14.437 26.0057 14.456 25.8948 14.494 25.7935C14.532 25.6858 14.5827 25.5845 14.646 25.4895L22.018 15.1155H14.8455V13.32H24.9155V14.1465Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5195" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>
            case 'RX':
                return <g transform={relativePosition}>
                    <rect width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT} rx="4" fill="url(#paint0_linear_349_5172)"/>
                    <path d="M26.426 27H24.2125C24.0605 27 23.937 26.9588 23.842 26.8765C23.747 26.7942 23.671 26.7023 23.614 26.601L20.213 21.1195C20.1877 21.1955 20.1592 21.2683 20.1275 21.338C20.1022 21.4077 20.0705 21.4742 20.0325 21.5375L16.7455 26.601C16.6758 26.7023 16.5967 26.7942 16.508 26.8765C16.4257 26.9588 16.3148 27 16.1755 27H14.1045L18.7215 19.97L14.2945 13.32H16.4985C16.6568 13.32 16.7708 13.3453 16.8405 13.396C16.9165 13.4403 16.983 13.51 17.04 13.605L20.365 18.83C20.3967 18.754 20.4283 18.678 20.46 18.602C20.4917 18.526 20.5328 18.4468 20.5835 18.3645L23.6805 13.643C23.7438 13.5353 23.8135 13.4562 23.8895 13.4055C23.9655 13.3485 24.0573 13.32 24.165 13.32H26.2835L21.8185 19.875L26.426 27Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5172" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                    <g onClick={handleTextboxClicked} cursor="text">
                        <rect
                            x={DIMENSIONS.GATE_INPUT.WIDTH/2 - DIMENSIONS.GATE_INPUT.MARGIN.LEFT} y={DIMENSIONS.STD_GATE.HEIGHT + DIMENSIONS.GATE_INPUT.MARGIN.TOP}
                            width={DIMENSIONS.GATE_INPUT.WIDTH}
                            height={DIMENSIONS.GATE_INPUT.HEIGHT}
                            fill='transparent' strokeWidth={1} stroke="#C5C5C5" rx="2"/>
                        <text x={DIMENSIONS.GATE_INPUT.WIDTH/2 - DIMENSIONS.GATE_INPUT.PADDING.LEFT}
                              y={DIMENSIONS.STD_GATE.HEIGHT +
                                DIMENSIONS.GATE_INPUT.TEXT.MARGIN.TOP +
                                DIMENSIONS.GATE_INPUT.MARGIN.TOP +
                              DIMENSIONS.GATE_INPUT.PADDING.TOP}
                              fontSize="10" fill="black" textAnchor='start'>{rotAngle}</text>
                    </g>
                </g>
            case 'CNOT':
                return <g transform={relativePosition}>
                        <rect width="40" height="40" rx="4" fill="url(#paint0_linear_387_5131)"/>
                        <path d="M24.1245 23.9505C24.2448 23.9505 24.3493
                    23.998 24.438 24.093L25.3215 25.0525C24.7642 25.7238 24.0802
                    26.2432 23.2695 26.6105C22.4588 26.9715 21.4898 27.152 20.3625 27.152C19.3618
                    27.152 18.4562 26.981 17.6455 26.639C16.8412 26.2907 16.154 25.8093 15.584
                    25.195C15.014 24.5743 14.5738 23.8365 14.2635 22.9815C13.9595 22.1265 13.8075 21.186 13.8075
                    20.16C13.8075 19.134 13.969 18.1935 14.292 17.3385C14.6213 16.4772 15.0805 15.7393 15.6695
                    15.125C16.2648 14.5043 16.9742 14.023 17.7975 13.681C18.6272 13.339 19.5392 13.168 20.5335
                    13.168C21.5215 13.168 22.3923 13.3295 23.146 13.6525C23.906 13.9692 24.5647 14.3935 25.122
                    14.9255L24.3905 15.961C24.3398 16.0307 24.2797 16.0908 24.21 16.1415C24.1403 16.1922 24.0453
                    16.2175 23.925 16.2175C23.7983 16.2175 23.6527 16.1605 23.488 16.0465C23.3297 15.9262 23.1238
                    15.7963 22.8705 15.657C22.6235 15.5113 22.31 15.3815 21.93 15.2675C21.5563 15.1472 21.0877
                    15.087 20.524 15.087C19.8717 15.087 19.2732 15.201 18.7285 15.429C18.1838 15.657 17.7152 15.9895
                    17.3225 16.4265C16.9298 16.8635 16.6227 17.3955 16.401 18.0225C16.1857 18.6495 16.078 19.362
                    16.078 20.16C16.078 20.9643 16.192 21.6832 16.42 22.3165C16.648 22.9435 16.9615 23.4755 17.3605
                    23.9125C17.7595 24.3432 18.2282 24.6725 18.7665 24.9005C19.3048 25.1285 19.8843 25.2425 20.505
                    25.2425C20.885 25.2425 21.2238 25.2235 21.5215 25.1855C21.8255 25.1412 22.1042 25.0747 22.3575
                    24.986C22.6108 24.891 22.8483 24.7738 23.07 24.6345C23.298 24.4952 23.5228 24.3242 23.7445
                        24.1215C23.8712 24.0075 23.9978 23.9505 24.1245 23.9505Z" fill="white"/>
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
            default:
                return 'None'
        }
    }

    return <g className={styles.gate}>
        {renderGate(x, y, width, height, type)}
    </g>
}

export default Gate;
