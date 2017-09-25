import React from 'react';
import './button.css';

function Button(props) {
    let className = 'neutral';
    if(props.selected) {
        className = 'selected';
    }
    return <button onClick={props.onClick}
                   className={"gameButton " + className} />
}

export default Button;