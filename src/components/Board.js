import React, { useState } from "react";
import Square from "./Square";
import Kpng from "../assets/K.png"
import Qpng from "../assets/Q.png"
import Bpng from "../assets/B.png"
import Npng from "../assets/N.png"
import Rpng from "../assets/R.png"
import Ppng from "../assets/P.png"
import kpng from "../assets/Bk.png"
import qpng from "../assets/Bq.png"
import bpng from "../assets/Bb.png"
import npng from "../assets/Bn.png"
import rpng from "../assets/Br.png"
import ppng from "../assets/Bp.png"
import transparent from "../assets/transparent.png"
//const lodash = require('lodash');

export default function Board(props) {
    let row = [];
    const pngMap = {
        "K": Kpng,
        "Q": Qpng,
        "B": Bpng,
        "N": Npng,
        "R": Rpng,
        "P": Ppng,
        "k": kpng,
        "q": qpng,
        "b": bpng,
        "n": npng,
        "r": rpng,
        "p": ppng,
        " ": transparent
    };

    const [selectedSquare, setSelectedSquare] = useState(0); // 0 for none selected, otherwise 1-64 for id
    
    const strToPng = (s) => {
        return pngMap[s];
    }

    // function squareClicked(id) {
    //     console.log("hai " + selectedSquare);
    //     if (selectedSquare === 0) {
    //         setSelectedSquare(id);
    //     } else if (selectedSquare === id) {
    //         setSelectedSquare(0);
    //     }
    // }

    function squareClicked(id) {
        setSelectedSquare(prevSelectedSquare => {
            console.log("prev selected: " + prevSelectedSquare);
            if (prevSelectedSquare === 0) {
                return id;
            } else if (prevSelectedSquare === id) {
                return 0;
            } else {
                return id;
            }
        });
    }

    const startingBoardStateStrings = ["r", "n", "b", "q", "k", "b", "n", "r",
                                       "p", "p", "p", "p", "p", "p", "p", "p",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       "P", "P", "P", "P", "P", "P", "P", "P",
                                       "R", "N", "B", "Q", "K", "B", "N", "R"];
    let startingBoardState = [];

    
    for (let i = 0; i < 64; i++) {
        let rownum = Math.floor(i/8);
        row.push(<Square id = {i + 1} 
            bgcolor = {((i + rownum) % 2 !== 0)? "#B58863" : "#F0D9B5" } 
            selectedcolor = {((i + rownum) % 2 !== 0)? "#DAC431" : "#F8EC5A" } 
            dark = {((i + rownum) % 2 !== 0)}
            piece = {strToPng(startingBoardStateStrings[i])}
            handleClick = {squareClicked}
            selected = {(id) => {return id === selectedSquare}}
            key = {(i + 1) + " square"}/>);
        if (row.length === 8) {
            startingBoardState.push(<div key = {i + " row"} style={{display: 'flex'}}>{row}</div>);
            row = [];
        }
    }

    const [boardState, setBoardState] = useState(startingBoardState);

    console.log("new selected: " + selectedSquare);
    return (
        <div>
            <div>{boardState}</div>
        </div>
    );
}