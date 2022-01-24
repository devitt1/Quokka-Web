import React from 'react';
import styles from './Gate.module.scss';

interface GateProps {
    x: number,
    y: number,
    width : number,
    height : number,
    type : 'X' | 'Y' | 'Z' | 'C'
}

const Gate : React.FC <GateProps> = (children) => {
    const {x, y, width, height, type} = children;


    const renderGate = (x : number, y : number, width : number, height: number, gateType : string) => {
        const relativePosition = `translate(${x},${y})`
        switch (gateType) {
            case 'X':
                return <g transform={relativePosition}>
                    <rect
                        width={width} height={height}
                        rx="4" fill="url(#paint0_linear_349_5172)"/>
                    <path d="M26.426 27H24.2125C24.0605 27 23.937 26.9588 23.842 26.8765C23.747 26.7942 23.671 26.7023 23.614 26.601L20.213 21.1195C20.1877 21.1955 20.1592 21.2683 20.1275 21.338C20.1022 21.4077 20.0705 21.4742 20.0325 21.5375L16.7455 26.601C16.6758 26.7023 16.5967 26.7942 16.508 26.8765C16.4257 26.9588 16.3148 27 16.1755 27H14.1045L18.7215 19.97L14.2945 13.32H16.4985C16.6568 13.32 16.7708 13.3453 16.8405 13.396C16.9165 13.4403 16.983 13.51 17.04 13.605L20.365 18.83C20.3967 18.754 20.4283 18.678 20.46 18.602C20.4917 18.526 20.5328 18.4468 20.5835 18.3645L23.6805 13.643C23.7438 13.5353 23.8135 13.4562 23.8895 13.4055C23.9655 13.3485 24.0573 13.32 24.165 13.32H26.2835L21.8185 19.875L26.426 27Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5172" x1={0} y1={0} x2={20} y2={40} gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1F2E4D"/>
                            <stop offset="1" stop-color="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>

            case 'Y':
                return <g transform={relativePosition}>
                    <rect
                        width={width} height={height}
                        rx="4" fill="url(#paint0_linear_349_5192)"/>
                    <path d="M21.1535 21.642V27H18.94V21.642L13.943 13.32H15.8905C16.0868 13.32 16.242 13.3675 16.356 13.4625C16.47 13.5575 16.565 13.6778 16.641 13.8235L19.4435 18.7255C19.5702 18.9725 19.6842 19.2068 19.7855 19.4285C19.8932 19.6502 19.9882 19.8687 20.0705 20.084C20.1402 19.8623 20.2257 19.6438 20.327 19.4285C20.4283 19.2068 20.5423 18.9725 20.669 18.7255L23.4525 13.8235C23.5158 13.6968 23.6077 13.5828 23.728 13.4815C23.8483 13.3738 24.0035 13.32 24.1935 13.32H26.1505L21.1535 21.642Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5192" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1F2E4D"/>
                            <stop offset="1" stop-color="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>
            case 'Z':
                return <g transform={relativePosition}>
                    <rect
                        width={width} height={height}
                        rx="4" fill="url(#paint0_linear_349_5195)"/>
                    <path d="M24.9155 14.1465C24.9155 14.2732 24.8933 14.3967 24.849 14.517C24.811 14.6373 24.7572 14.7513 24.6875 14.859L17.344 25.2045H24.773V27H14.437V26.126C14.437 26.0057 14.456 25.8948 14.494 25.7935C14.532 25.6858 14.5827 25.5845 14.646 25.4895L22.018 15.1155H14.8455V13.32H24.9155V14.1465Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5195" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1F2E4D"/>
                            <stop offset="1" stop-color="#63718B"/>
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
