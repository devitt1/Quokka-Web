import React from 'react';
import styles from './BuildOutputChart.module.scss';
import {BarChart as CustomBarChart} from "../../../BarChart/BarChart";
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Label} from "recharts";


export const mockedData = [
    {
        key : "000",
        value: 0
    },
    {
        key : "001",
        value: 50
    },
    {
        key : "010",
        value: 100
    },
    {
        key : "011",
        value: 200
    },
    {
        key: "100",
        value : 700
    },
    {
        key : "110",
        value: 150
    },
    {
        key : "111",
        value: 25
    }
]

const BuildOutputChart : React.FC = () => {

    const VerticalLabel = (props : any) => {
        const values = props.value.split(" ");
        const cx = props.viewBox.width - 60;
        const cy = props.viewBox.height/2;
        const rot = `rotate(270 ${cx} ${cy})`;

        return (
            <text
                y={cy}
                transform={rot}
            >

                {
                    values.map((value :any) => {
                        return value === values[0] ?
                            <tspan x={cx} dy='1.6em'>{value}</tspan> :
                            <tspan x={cx} dy='1.6em'>{value}</tspan>
                    })
                }
            </text>
        );
    };


    const formatTick = (tickItem : any) => {
        return `|${tickItem.toLocaleString()}⟩`
    }

    return <div className={styles.buildOutputChart}>
        <ResponsiveContainer width="95%" height="90%" aspect={2.4}>
            <BarChart
                width={500}
                height={435}
                data={mockedData}>
                <XAxis
                    tickLine={false}
                    stroke="#D3DCED"
                    tickFormatter={formatTick}
                    strokeWidth={2}
                    tick={{ fill: 'black' }}

                    dataKey="key"/>
                <YAxis
                    tickLine={false}
                    stroke="#D3DCED"
                    tick={{ fill: 'black' }}
                    strokeWidth={2}>
                    <Label
                        content={VerticalLabel}
                        value="Measurement"
                        position="left">

                    </Label>

                </YAxis>
                <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip/>} />
                <Bar dataKey="value" >
                    {
                       mockedData.map((entry, index) => (<Cell key={`cell-${index}`} fill="#576C95"/>))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
}

const CustomTooltip = ({active, payload, label} : any) => {
    if (active) {
        return (<div className={styles.customTooltip}>
            <p className={styles.label}>|{label}⟩</p>
            <p className={styles.value}>{payload[0].value}</p>
        </div>);
    }
    return null;

}

export default BuildOutputChart;
