import React from "react";

export default function Square(props) {
    let id = props.id;

    return (
        <button className="square" style={{
        backgroundColor: props.bgcolor,  
        height: '64px', 
        width: '64px', 
        outline: 'none', 
        border: 'none'}}>
            <img src={props.piece} alt="" style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '58px',
            width: '58px',
            }}/>
        </button>
    );
}