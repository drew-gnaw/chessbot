import React from "react";
import Square from "./Square";
import K from "../assets/K.png"

export default function Board(props) {
    let squares = [];
    let row = [];
    const startingBoardState = [["r", "n", "b", "q", "k", "b", "n", "r"],
                                ["p", "p", "p", "p", "p", "p", "p", "p"],
                                [" ", " ", " ", " ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " ", " ", " ", " "],
                                ["P", "P", "P", "P", "P", "P", "P", "P"],
                                ["R", "N", "B", "Q", "K", "B", "N", "R"]];
    const [boardState, setBoardState] = React.useState(startingBoardState);

    console.log(boardState);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            row.push(<Square id = {8*i + j + 1} 
                bgcolor = {((i + j) % 2 != 0)? "#B58863" : "#F0D9B5" } 
                piece = {K}/>);
        }
        squares.push(<div style={{margin: '0px', padding: '0px', border: '0px'}}>{row}</div>);
        row = [];
    }

    return (
        <div>{squares}</div>
    );
}