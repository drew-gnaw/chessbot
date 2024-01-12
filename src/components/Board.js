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
    const [validSelection, setValidSelection] = useState(false); // true if a piece of the player's color is selected
    const [moved, setMoved] = useState(false);
    
    const strToPng = (s) => {
        return pngMap[s];
    }

    // checks the case of the given char.
    const checkCase = (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return 'Uppercase';
        } else if (code >= 97 && code <= 122) {
            return 'Lowercase';
        } else {
            return 'Neither';
        }
    }

    // if white is true, returns true IFF the square at id contains a white piece. if white is false, checks for black piece.
    const containsColorPiece = (id, white) => {
        if (white) {
            return (checkCase(boardState[id - 1]) === 'Uppercase');
        } else {
            return (checkCase(boardState[id - 1]) === 'Lowercase');
        }
    }

    const squareClicked = (id) => {
        setSelectedSquare(prevSelectedSquare => {

            // if we select the selected square, deselect
            if (prevSelectedSquare === id) {
                console.log('1');
                setValidSelection(false);
                return 0;
            
            // if we select a white piece, we can get ready for a move
            } else if (containsColorPiece(id, true)) {
                console.log('2');
                setValidSelection(true);
                return id;

            } else {
                console.log('3');
                if (validSelection) {
                    console.log('4');
                    performMove(prevSelectedSquare, id);
                    setValidSelection(false);
                }
                return 0;
            }
        });
        setMoved(false);
    }

    const performMove = (sourceid, targetid) => {
        console.log("move from " + sourceid + " to " + targetid);
        boardState[targetid - 1] = boardState[sourceid - 1];
        boardState[sourceid - 1] = " ";
        setMoved(true);
        setValidSelection(false);
        console.log("selected: " + selectedSquare);
    }

    const startingBoardStateStrings = ["r", "n", "b", "q", "k", "b", "n", "r",
                                       "p", "p", "p", "p", "p", "p", "p", "p",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       "P", "P", "P", "P", "P", "P", "P", "P",
                                       "R", "N", "B", "Q", "K", "B", "N", "R"];

    const [boardState, setBoardState] = useState(startingBoardStateStrings);

    return (
        <div>
            {boardState.slice(0, 64).map((_, i) => (
                <div key={i} style={{display: 'flex'}}>
                    {boardState.slice(i*8, i*8+8).map((piece, j) => (
                       <Square id = {j + 1 + i*8} 
                           bgcolor = {((j + i) % 2 !== 0)? "#B58863" : "#F0D9B5" } 
                           selectedcolor = {((j + i) % 2 !== 0)? "#DAC431" : "#F8EC5A" } 
                           dark = {((j + i) % 2 !== 0)}
                           piece = {strToPng(piece)}
                           handleClick = {squareClicked}
                           selected = {(id) => {return id === selectedSquare && !moved}}
                           key = {(j + 1 + i*8) + " square"}/>
                    ))}
                </div>
            ))}
        </div>
      );
}