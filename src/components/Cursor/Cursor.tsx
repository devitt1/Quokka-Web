import React, {useContext, useEffect, useState} from "react";
import useMousePosition from "../hooks/useMousePosition";
import styles from './Cursor.module.scss';
import x_gate from '../../assets/x_gate.svg';
import {CursorContext} from "../Providers/CursorContextProvider";

const Cursor : React.FC = () => {
    const {clientX, clientY } = useMousePosition();
    const {cursor, setCursor} = useContext(CursorContext);
    const [isVisible, setIsVisible] = useState(false);

    // useEffect(() => {
    //     const handleMouseEnter = () => setIsVisible(true);
    //     const handleMouseLeave = () => setIsVisible(false);
    //     document.body.addEventListener("mouseenter", handleMouseEnter);
    //     document.body.addEventListener("mouseleave", handleMouseLeave);
    //     return () => {
    //         document.body.removeEventListener("mouseenter",   handleMouseEnter);
    //         document.body.removeEventListener("mouseleave", handleMouseLeave);
    //     };
    // }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                pointerEvents: "none"
            }}
        >
            <svg
                width={50}
                height={50}
                viewBox="0 0 50 50"
                style={{
                    position: "absolute",
                    left: clientX,
                    top: clientY,
                    // transform: `translate(-50%, -50%) scale(${cursor.active ? 2.5 : 1})`,
                    transform: `translate(-50%, -50%)`,
                    stroke: cursor.active ? "black" : "white",
                    strokeWidth: 1,
                    // fill: cursor.active ? "rgba(255,255,255,.5)" : "black",
                    transition: "transform .2s ease-in-out",
                    // TODO: extra check on clientX needed here
                    // because mouseleave event not always firing
                    // when slowly exiting left side of browser
                    // opacity: isVisible && clientX > 1 ? 1 : 0,
                }}
            >
                {
                    // cursor.active ?  <rect width="40" height="38" fill="blue"/> : null
                    cursor.active ?  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="4" fill="url(#paint0_linear_349_5172)"/>
                        <path d="M26.426 27H24.2125C24.0605 27 23.937 26.9588 23.842 26.8765C23.747 26.7942 23.671 26.7023 23.614 26.601L20.213 21.1195C20.1877 21.1955 20.1592 21.2683 20.1275 21.338C20.1022 21.4077 20.0705 21.4742 20.0325 21.5375L16.7455 26.601C16.6758 26.7023 16.5967 26.7942 16.508 26.8765C16.4257 26.9588 16.3148 27 16.1755 27H14.1045L18.7215 19.97L14.2945 13.32H16.4985C16.6568 13.32 16.7708 13.3453 16.8405 13.396C16.9165 13.4403 16.983 13.51 17.04 13.605L20.365 18.83C20.3967 18.754 20.4283 18.678 20.46 18.602C20.4917 18.526 20.5328 18.4468 20.5835 18.3645L23.6805 13.643C23.7438 13.5353 23.8135 13.4562 23.8895 13.4055C23.9655 13.3485 24.0573 13.32 24.165 13.32H26.2835L21.8185 19.875L26.426 27Z" fill="white"/>
                        <defs>
                            <linearGradient id="paint0_linear_349_5172" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#1F2E4D"/>
                                <stop offset="1" stop-color="#63718B"/>
                            </linearGradient>
                        </defs>
                    </svg> : null

                }
            </svg>
            {/*<p>{clientX}</p>*/}
            {/*<p>{clientY}</p>*/}
        </div>
    );
};

export default Cursor;
