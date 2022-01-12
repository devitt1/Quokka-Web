import React, {useEffect, useRef, useState } from 'react';
import styles from './CircuitBuilder.module.scss';
// import * as d3 from 'd3';
import ReactDOM from 'react-dom';

interface SVGGridProps {

}


export const SVGGrid : React.FC<SVGGridProps> = (props : SVGGridProps) => {
    // const svgRef : any= React.useRef(null);
    // const gridRef : any = React.useRef();
    //
    // const svgD3El = d3.select(svgRef.current);
    // const gridD3El = d3.select(gridRef.current);
    //
    // const [gridDimension, setGridDimension] = useState();
    //
    // useEffect(() =>
    // {
    //     (async () => {
    //         //Need to delay to get the grid container dimension
    //         setTimeout(() => {
    //             setGridDimension(gridRef.current.getBoundingClientRect());
    //         }, 300)
    //     })();
    // },[]);
    //
    // useEffect(() =>
    // {
    //     (async () => {
    //         //Need to delay to get the grid container dimension
    //           renderD3Grid(gridRef.current.getBoundingClientRect());
    //     })();
    // },[gridDimension]);
    //
    // const renderD3Grid = (gridDimension : any) => {
    //     console.log(gridDimension);
    //     console.log(svgRef.current.getBoundingClientRect());
    //
    //     var width = gridDimension.width,
    //         height = gridDimension.height,
    //         gX : any = null,
    //         gY : any = null,
    //         currentTransform = null,
    //         svg = svgD3El,
    //         view = svg.append("g")
    //             .attr("class", "view");
    //
    //     if (currentTransform) view.attr('transform', currentTransform);
    //     var xScale = d3.scaleLinear()
    //         .domain([-width / 2, width / 2])
    //         .range([0, width]);
    //
    //     var yScale = d3.scaleLinear()
    //         .domain([-height / 2, height / 2])
    //         .range([height, 0]);
    //
    //     var xAxis = d3.axisBottom(xScale)
    //         .ticks((width + 2) / (height + 2) * 10)
    //         .tickSize(height)
    //         .tickPadding(8 - height);
    //
    //     var yAxis = d3.axisRight(yScale)
    //         .ticks(10)
    //         .tickSize(width)
    //         .tickPadding(8 - width);
    //
    //     gX = svg.append("g")
    //         .attr("class", "axis axis--x")
    //         .call(xAxis);
    //     gY = svg.append("g")
    //         .attr("class", "axis axis--y")
    //         .call(yAxis);
    //
    //
    //     // var zoom = d3.zoom()
    //     //     .scaleExtent([0.5, 5])
    //     //     .translateExtent([
    //     //         [-width * 2, -height * 2],
    //     //         [width * 2, height * 2]
    //     //     ])
    //     //     .on("zoom", zoomed);
    //     //
    //     //
    //     const zoomed = () => {
    //         // currentTransform = d3.event.transform;
    //         // view.attr("transform", currentTransform);
    //         // gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
    //         // gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
    //         // slider.property("value", d3.event.scale);
    //     }
    //
    // }

    return (
    //     <div ref={gridRef} className={styles.gridContainer}>
    //     {/*<svg ref={svgRef}></svg>*/}
    // </div>
    <div></div>
    )
}
