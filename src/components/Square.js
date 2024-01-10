import React, { useState } from "react";

export default function Square(props) {
    let id = props.id;
    const [selected, setSelected] = useState(false);

    return (
        <button className="square" 
        onClick = {() => {props.handleClick(id);
                        setSelected(true)}}
        style={{
        backgroundColor: (selected ? props.selectedcolor : props.bgcolor),  
        height: '64px', 
        width: '64px', 
        outline: 'none', 
        border: 'none'}}>
            {(props.piece == null ? <div></div> :
            <img src={props.piece} alt="" style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '58px',
            width: '58px',
            border: '0',
            outline: '0'
            }}/>)}
        </button>
    );
}