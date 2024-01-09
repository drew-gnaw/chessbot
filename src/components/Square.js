import React from "react";

export default function Square(props) {
    let id = props.id;

    return (
        <button className="square" style={{backgroundColor: props.bgcolor,  height: '100px', width: '100px'}}>
            {id}
        </button>
    );
}