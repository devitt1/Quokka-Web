import React from 'react';
import styles from './AdaptiveTextbox.module.scss';


interface AdaptiveTextboxProps {
    width : number;
    height : number;
    text: string;
}
const AdaptiveTextBox : React.FC<AdaptiveTextboxProps> = (props) => {
    const {width, height, text} = props;
    var orientation = {type: "horizontal", value: `rotate(0)`}
    var padding = {
        left: 0.1 * width,
        top: 0.6 * height,
        right: 0.1 * width,
        bottom: 0.1 * height}
    var textWidth = width - padding.left - padding.right;
    var textFontSize = 0.1 * width;
    var offset = {dx: 0, dy: padding.top}
    if (width < height) {
        orientation = {type: "vertical", value: `rotate(90)`}
        padding = {
            left: - 0.4 * width,
            top: 0.1 * height,
            right: 0.5 * width,
            bottom: 0.1 * height}
        textWidth = height - padding.bottom - padding.top;
        textFontSize = 0.1 * height;
    }

    return <g className={styles.adaptiveTextbox} fill="transparent">
        <rect className={styles.textBoxRect} width={width} height={height} rx="4"/>
        <text transform={orientation.value}
              className={styles.text}
              fontSize={textFontSize}
              x={orientation.type === 'horizontal' ? padding.left : padding.top}
              y={orientation.type === 'horizontal' ? padding.top : padding.left}
              textAnchor="start"
              letterSpacing="1"
              textLength={textWidth}>{text}

        </text>
    </g>
}

export default AdaptiveTextBox;
