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
import { set } from "lodash";
//const lodash = require('lodash');

export default function Board(props) {
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

    const startingBoardStateStrings = ["r", "n", "b", "q", "k", "b", "n", "r",
                                       "p", "p", "p", "p", "p", "p", "p", "p",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       " ", " ", " ", " ", " ", " ", " ", " ",
                                       "P", "P", "P", "P", "P", "P", "P", "P",
                                       "R", "N", "B", "Q", "K", "B", "N", "R"];

    const [boardState, setBoardState] = useState(startingBoardStateStrings);
    const [selectedSquare, setSelectedSquare] = useState(0); // 0 for none selected, otherwise 1-64 for id
    const [highlightedSquares, setHighlightedSquares] = useState([]); // contains all highlighted (moveable to) squares
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

    // returns the ids of squares that are valid pawn moves from the given id.
    const getPawnMoves = (id, white) => {
        let moves = [];
        if (white) {
            if (id - 8 > 0 && !containsColorPiece(id - 8, true) && !containsColorPiece(id - 8, false)) {
                moves.push(id - 8);
            }
            if ((id % 8 !== 1) && containsColorPiece(id - 9, false)) {
                moves.push(id - 9);
            }
            if ((id % 8 !== 0) && containsColorPiece(id - 7, false)) {
                moves.push(id - 7);
            }
        } else {
            // blacks moves go here
        }
        return moves;
    }

    const getRookMoves = (id, white) => {
        let rmoves = [-8, -1, 1, 8]
        let moves = [];
        for (let i = 0; i < rmoves.length; i++) {

        }
    }


    const getKnightMoves = (id, white) => {
        const knmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
        let moves = [];
        for (let i = 0; i < knmoves.length; i++) {
            const target = id + knmoves[i];
            const didntCross = Math.abs((((id % 8) === 0) ? 8 : (id % 8)) - (((target % 8) === 0) ? 8 : (target % 8))) <= 2;
            if (target > 0 && target <= 64 && !containsColorPiece(target, white) && didntCross) {
                moves.push(target);
            }
        }
        return moves;
        
    }

    

    // returns the ids of squares that a piece on id of given color could move to.
    const getMoves = (piece, id, white) => {
        switch (piece) {
            case 'p':
                return getPawnMoves(id, white);
            case 'n':
                return getKnightMoves(id, white);
            default:
                return [4, 6];
        }
    }

    const squareClicked = (id) => {
        setSelectedSquare(prevSelectedSquare => {

            // if we select the selected square, deselect
            if (prevSelectedSquare === id) {
                setValidSelection(false);
                setHighlightedSquares([]);
                return 0;
            
            // if we select a white piece, we can get ready for a move
            } else if (containsColorPiece(id, true)) {
                setValidSelection(true);
                console.log(boardState[id - 1].toString().toLowerCase());
                setHighlightedSquares(getMoves(boardState[id - 1].toString().toLowerCase(), id, true));
                return id;

            } else {
                if (validSelection && highlightedSquares.includes(id)) {
                    performMove(prevSelectedSquare, id);
                    setValidSelection(false);
                }
                setHighlightedSquares([]);
                return 0;
            }
        });
        setMoved(false);
    }

    const performMove = (sourceid, targetid) => {
        setBoardState(prevBoardState => {
            const newBoardState = [...prevBoardState];
            newBoardState[targetid - 1] = newBoardState[sourceid - 1];
            newBoardState[sourceid - 1] = " ";
            return newBoardState;
        });
        setMoved(true);
        setValidSelection(false);
    }

    return (
        <div>
            {boardState.slice(0, 64).map((_, i) => (
                <div key={i} style={{display: 'flex'}}>
                    {boardState.slice(i*8, i*8+8).map((piece, j) => (
                       <Square id = {j + 1 + i*8} 
                           bgcolor = {((j + i) % 2 !== 0)? "#B58863" : "#F0D9B5" } 
                           highlightedcolor = {((j + i) % 2 !== 0)? "#DAC431" : "#F8EC5A" } 
                           dark = {((j + i) % 2 !== 0)}
                           piece = {strToPng(piece)}
                           handleClick = {squareClicked}
                           highlighted = {(id) => {return (id === selectedSquare || highlightedSquares.includes(id)) && !moved}}
                           key = {(j + 1 + i*8) + " square"}/>
                    ))}
                </div>
            ))}
        </div>
      );
}