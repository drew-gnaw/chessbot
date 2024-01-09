import React from "react";
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

export default function Board(props) {
    let squares = [];
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
    
    const startingBoardStateStrings =  [["r", "n", "b", "q", "k", "b", "n", "r"],
                                        ["p", "p", "p", "p", "p", "p", "p", "p"],
                                        [" ", " ", " ", " ", " ", " ", " ", " "],
                                        [" ", " ", " ", " ", " ", " ", " ", " "],
                                        [" ", " ", " ", " ", " ", " ", " ", " "],
                                        [" ", " ", " ", " ", " ", " ", " ", " "],
                                        ["P", "P", "P", "P", "P", "P", "P", "P"],
                                        ["R", "N", "B", "Q", "K", "B", "N", "R"]];
    let startingBoardState = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            row.push(<Square id = {8*i + j + 1} 
                bgcolor = {((i + j) % 2 !== 0)? "#B58863" : "#F0D9B5" } 
                piece = {strToPng(startingBoardStateStrings[i][j])}/>);
        }
        startingBoardState.push(<div style={{margin: '0px', padding: '0px', border: '0px'}}>{row}</div>);
        row = [];
    }

    const [boardState, setBoardState] = React.useState(startingBoardState);

    return (
        <div>{boardState}</div>
    );
}