import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (moved) {
            makeBlackMove();
            setMoved(false);
        }
        // eslint-disable-next-line
    }, [boardState]);

    const getFEN = () => {
        let fen = "";
        let emptyCount = 0;
        for (let i = 0; i < boardState.length; i++) {
            if (i % 8 === 0 && i !== 0) {
                if (emptyCount !== 0) {
                    fen += emptyCount.toString();
                    emptyCount = 0;
                }
                fen += "/";
            }
            if (boardState[i] === " ") {
                emptyCount++;
            } else {
                if (emptyCount !== 0) {
                    fen += emptyCount.toString();
                    emptyCount = 0;
                }
                fen += boardState[i];
            }
        }
        return fen;
    }
    
    const strToPng = (s) => {
        return pngMap[s];
    }

    // checks the case of the given char.
    const checkCase = (char) => {
        if (char == null) {
            return 'Neither'
        }
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

    // returns true if the square is light
    const isLightSquare = (id) => {
        return ((Math.floor((id - 1) / 8)) + (id % 8)) % 2 !== 0;
    }

    // returns true if white/black is in check, false otherwise. bdstate is an array of length 64
    const inCheck = (bdState, white) => {
        let possibleMoves = [];
        let oppSquares = [];
        for (let i = 1; i <= 64; i++) {
            if (containsColorPiece(i, !white)) oppSquares.push(i);
        }
        for (let i = 0; i < oppSquares.length; i++) {
            possibleMoves = possibleMoves.concat(getMoves(oppSquares[i], !white, true));
        }
        console.log(possibleMoves);
        for (let i = 0; i < possibleMoves.length; i++) {
            if (bdState[possibleMoves[i] - 1] === (white? 'K' : 'k')) return true;
        }
        return false;
    }

    // returns the ids of squares that are valid pawn moves from the given id. 
    const getPawnMoves = (id, white, checking) => {
        let moves = [];
        if (white) {
            if (!checking && id - 8 > 0 && !containsColorPiece(id - 8, true) && !containsColorPiece(id - 8, false)) {
                moves.push(id - 8);
            }
            if ((id % 8 !== 1) && (containsColorPiece(id - 9, false) || checking)) {
                moves.push(id - 9);
            }
            if ((id % 8 !== 0) && (containsColorPiece(id - 7, false) || checking)) {
                moves.push(id - 7);
            }
            if (!checking && 49 <= id && id <= 56 && !containsColorPiece(id - 16, true) && !containsColorPiece(id - 16, false) && moves.includes(id - 8)) {
                moves.push(id - 16);
            }
        } else {
            if (!checking && id + 8 <= 64 && !containsColorPiece(id + 8, true) && !containsColorPiece(id + 8, false)) {
                moves.push(id + 8);
            }
            if ((id % 8 !== 1) && (containsColorPiece(id + 7, true) || checking)) {
                moves.push(id + 7);
            }
            if ((id % 8 !== 0) && (containsColorPiece(id + 9, true) || checking)) {
                moves.push(id + 9);
            }
            if (!checking && 9 <= id && id <= 16 && !containsColorPiece(id + 16, true) && !containsColorPiece(id + 16, false) && moves.includes(id + 8)) {
                moves.push(id + 16);
            }
        }
        return moves;
    }

    const getRookMoves = (id, white, checking) => {
        let rmoves = [-8, -1, 1, 8]
        let moves = [];
        const originalRank = Math.floor((id - 1) / 8);
        for (let i = 0; i < rmoves.length; i++) {
            let hitPiece = false;
            let dist = 0;
            while (!hitPiece) {
                dist++;
                const target = id + dist * rmoves[i];
                if (target < 1 || target > 64 || (Math.abs(rmoves[i]) === 1 ? Math.floor((target - 1) / 8) !== originalRank : false)) {
                    break;
                }
                if (containsColorPiece(target, white) || containsColorPiece(target, !white)) {
                    if (containsColorPiece(target, !white) || checking) {
                        moves.push(target);
                    }
                    hitPiece = true;
                } else {
                    moves.push(target);
                }
            }
        }
        return moves;
    }


    const getKnightMoves = (id, white, checking) => {
        const knmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
        let moves = [];
        for (let i = 0; i < knmoves.length; i++) {
            const target = id + knmoves[i];
            const didntCross = Math.abs((((id % 8) === 0) ? 8 : (id % 8)) - (((target % 8) === 0) ? 8 : (target % 8))) <= 2;
            if (target > 0 && target <= 64 && (!containsColorPiece(target, white) || checking) && didntCross) {
                moves.push(target);
            }
        }
        return moves;
        
    }

    const getBishopMoves = (id, white, checking) => {
        let bmoves = [-9, -7, 7, 9]
        let moves = [];
        for (let i = 0; i < bmoves.length; i++) {
            let hitPiece = false;
            let dist = 0;
            while (!hitPiece) {
                dist++;
                const target = id + dist * bmoves[i];
                if (target < 1 || target > 64 || (isLightSquare(target) !== isLightSquare(id))) {
                    break;
                }
                if (containsColorPiece(target, white) || containsColorPiece(target, !white)) {
                    if (containsColorPiece(target, !white) || checking) {
                        moves.push(target);
                    }
                    hitPiece = true;
                } else {
                    moves.push(target);
                }
            }
        }
        return moves;
    }

    const getQueenMoves = (id, white, checking) => {
        return getRookMoves(id, white, checking).concat(getBishopMoves(id, white, checking));
    }

    const getKingMoves = (id, white, checking) => {
        const kmoves = [-9, -8, -7, -1, 1, 7, 8, 9];
        let moves = [];
        for (let i = 0; i < kmoves.length; i++) {
            const target = id + kmoves[i];
            const didntCross = Math.abs((((id % 8) === 0) ? 8 : (id % 8)) - (((target % 8) === 0) ? 8 : (target % 8))) <= 1;
            if (target > 0 && target <= 64 && (!containsColorPiece(target, white) || checking) && didntCross) {
                moves.push(target);
            }
        }
        return moves;
        
    }

    // returns the ids of squares that a piece on id of given color could move to. checking is true if we are checking for check
    const getMoves = (id, white, checking) => {
        const piece = boardState[id - 1].toLowerCase();
        switch (piece) {
            case 'p':
                return getPawnMoves(id, white, checking);
            case 'r':
                return getRookMoves(id, white, checking);
            case 'n':
                return getKnightMoves(id, white, checking);
            case 'b':
                return getBishopMoves(id, white, checking);
            case 'q':
                return getQueenMoves(id, white, checking);
            case 'k':
                return getKingMoves(id, white, checking);
            default:
                return [];
        }
    }

    //random as of now
    const makeBlackMove = () => {
        let madeMove = false;
        let checkedPieces = [];
        while (!madeMove) {
            let blkSquares = [];
            for (let i = 1; i <= 64; i++) {
                if (containsColorPiece(i, false) && !checkedPieces.includes(i)) blkSquares.push(i);
            }
            let origin = blkSquares[Math.floor(Math.random() * blkSquares.length)];
            let moves = getMoves(origin, false);
            if (moves.length > 0) {
                let target = moves[Math.floor(Math.random() * moves.length)];
                blackPerformMove(origin, target);
                madeMove = true;
            } else {
                checkedPieces.push(origin);
                if (checkedPieces.length >= blkSquares.length) {
                    console.log("I give up!");
                    madeMove = true;
                }
            }
        }
    }

    const squareClicked = (id) => {
        setMoved(false);
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
                let moves = getMoves(id, true, false);
                for (let i = 0; i < moves.length; i++) {
                    let newBoardState = [...boardState];
                    newBoardState[moves[i] - 1] = newBoardState[id - 1];
                    newBoardState[id - 1] = " ";
                    if (inCheck(newBoardState, true)) {
                        moves.splice(i, 1);
                        i--;
                    }
                }
                setHighlightedSquares(moves);
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
    }

    const blackPerformMove = (sourceid, targetid) => {
        setBoardState(prevBoardState => {
            const newBoardState = [...prevBoardState];
            newBoardState[targetid - 1] = newBoardState[sourceid - 1];
            newBoardState[sourceid - 1] = " ";
            return newBoardState;
        });
    }

    const performMove = (sourceid, targetid) => {
        blackPerformMove(sourceid, targetid);
        setMoved(true);
        setValidSelection(false);
    }

    console.log(getFEN());

    return (
        <div>
            {boardState.map((_, i) => (
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