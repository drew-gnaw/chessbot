import React from "react";
import Square from "./Square";

export default function Board(props) {
    let squares = [];
    let row = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            row.push(<Square id = {8*i + j + 1} bgcolor = {((i + j) % 2 == 0)? "#B58863" : "#F0D9B5" }/>);
        }
        squares.push(<div>{row}</div>);
        row = [];
    }

    return (
        <div>{squares}</div>
    );
}