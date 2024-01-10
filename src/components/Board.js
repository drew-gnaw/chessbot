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
const lodash = require('lodash');

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
    
    const strToPng = (s) => {
        return pngMap[s];
    }

    const squareClicked = (id) => {
        console.log(id);
        if (selectedSquare === id) {
            setSelectedSquare(0);
        } else {
            setSelectedSquare(id);
            highlightSquare(id);
        }
    }

    // highlights the square given by id
    const highlightSquare = (id) => {
        const toSet = lodash.cloneDeep(boardState);
        //toSet[Math.floor((id - 1)/8)].props.children[(id % 8) - 1].setSelected(true);
        setBoardState(toSet);
        console.log(boardState);
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

    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < 8; j++) {
    //         row.push(<Square id = {8*i + j + 1} 
    //             bgcolor = {((i + j) % 2 !== 0)? "#B58863" : "#F0D9B5" } 
    //             selectedcolor = {((i + j) % 2 !== 0)? "#DAC431" : "##F8EC5A" } 
    //             dark = {((i + j) % 2 !== 0)}
    //             piece = {strToPng(startingBoardStateStrings[i][j])}
    //             handleClick = {squareClicked}
    //             key = {(8*i + j + 1) + " square"}/>);
    //     }
    //     startingBoardState.push(<div style={{margin: '0px', padding: '0px', border: '0px'}}>{row}</div>);
    //     row = [];
    // }
    
    for (let i = 0; i < 64; i++) {
        let rownum = Math.floor(i/8);
        row.push(<Square id = {i + 1} 
            bgcolor = {((i + rownum) % 2 !== 0)? "#B58863" : "#F0D9B5" } 
            selectedcolor = {((i + rownum) % 2 !== 0)? "#DAC431" : "##F8EC5A" } 
            dark = {((i + rownum) % 2 !== 0)}
            piece = {strToPng(startingBoardStateStrings[i])}
            handleClick = {squareClicked}
            key = {(i + 1) + " square"}/>);
        if (row.length === 8) {
            startingBoardState.push(<div style={{display: 'flex'}}>{row}</div>);
            row = [];
        }
    }

    const [boardState, setBoardState] = useState(startingBoardState);
    const [selectedSquare, setSelectedSquare] = useState(0); // 0 for none selected, otherwise 1-64 for id
    
    return (
        <div>
            <div>{boardState}</div>
        </div>
    );
}