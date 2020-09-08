import React, {useState} from "react";

const SearchOption = ({label, value, displayFields, onSearchOptionClick}) => {

    const [optValue] = useState(value);

    let checkType = typeof(label);
    let view = null;

    const handleClick = (e) => {
        onSearchOptionClick(optValue)
    };

    if (checkType !== 'object' && !displayFields){
        view = label;
    } else {
        view = Object.keys(label).filter((objKey) => {
            return displayFields.split(',').includes(objKey) && typeof(label[objKey] !== 'object')
        }).map((element,idx) => {
            return (<p key={`option-${idx}`} style={{margin:0}}>{label[element]}</p>)
        })
    }

    return (
        <li onClick={handleClick}>
            {view}
        </li>
    )
};

export default SearchOption;