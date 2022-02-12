import React, {useContext} from 'react';
import styles from './CursorAttachment.module.scss';
import {CursorContext} from "../../Providers/CursorContextProvider";
import useMousePosition from "../../hooks/useMousePosition";

interface CursorAttachmentProps {
}

const CursorAttachment : React.FC<CursorAttachmentProps> = (props) => {
    const {children} = props;
    const {clientX, clientY } = useMousePosition();

    return <svg
        width={50}
        height={64}
        className={styles.cursorAttachment}
        style={{
            left: clientX,
            top: clientY,
            // TODO: extra check on clientX needed here
        }}
    >
        {
            children
        }
    </svg>
}

export default CursorAttachment;
