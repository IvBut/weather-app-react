import React, {useEffect, useState} from "react";

const SearchComponent = ({dataArray, searchField}) => {
    const [array, setArray] = useState([]);

    const handleInputChange = (e)=> {
        let searchWord = e.target.value;
        if (!searchWord.trim() || searchWord.length < 3) {
            setArray([])
        } else {
            filterValues(searchWord);
        }
    };

    const filterValues = (searchWord) =>{
        if (!searchWord) return null;
       let filteredArray =  dataArray.filter(element => {
         return  String(element[searchField]).toLowerCase().indexOf(searchWord.toLowerCase()) > -1;
       });
        setArray(filteredArray)
    };

    return (
        <>
            <input type="text"  onChange={handleInputChange}/>
            <ul>
                {array.map((item, index) => (
                    <li key={createIndex({searchField,index})}>
                        {Object.keys(item).map(key => {
                            return (<p>{key !== 'id' && typeof(item[key]) !== 'object' ? item[key] : null}</p>)
                        })}
                    </li>
                ))}
            </ul>
        </>
    )
};

function createIndex(settings) {
    return `${settings.searchField}${settings.index}-${Math.random()}`
}

function isValidField() {

}

export default SearchComponent;
