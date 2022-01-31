import React from 'react';

interface AddQubitActionBtnProps {
    x: number
    y: number
    onClick : any
}

const AddQubitActionBtn : React.FC<AddQubitActionBtnProps> = (children) => {
    const {x, y, onClick} = children;
    const relativePosition = `translate(${x},${y})`

    return (<g onClick={onClick} transform={relativePosition}>
        <g filter="url(#filter0_d_367_4271)">
            <circle cx="15.5" cy="13.5" r="11.5" fill="url(#paint0_linear_367_4271)"/>
        </g>
        <g filter="url(#filter1_d_367_4271)">
            <path d="M16.4994 9.568V12.736H19.4594V14.512H16.4994V17.696H14.4834V14.512H11.5394V12.736H14.4834V9.568H16.4994Z" fill="white"/>
        </g>
        <defs>
            <filter id="filter0_d_367_4271" x="0" y="0" width="31" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_367_4271"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_367_4271" result="shape"/>
            </filter>
            <filter id="filter1_d_367_4271" x="7.53931" y="5.56799" width="15.9202" height="16.128" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_367_4271"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_367_4271" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_367_4271" x1="8.2521" y1="2" x2="23.312" y2="2.77514" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6091F1"/>
                <stop offset="1" stopColor="#5E77AA"/>
            </linearGradient>
        </defs>
    </g>)
}

export default AddQubitActionBtn;
