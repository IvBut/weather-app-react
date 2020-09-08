import React, {useEffect, useState} from "react";
import SearchOption from "./SearchOption";
import Button from "react-bootstrap/Button";
import './searchComponent.css';

const SearchComponent = ({dataArray, searchField, onSearch}) => {
    const [array, setArray] = useState([]);
    const [isValidSearch, setIsValidSearch] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);

    const inpRef = React.createRef();


    const handleInputChange = (e)=> {
        let searchWord = e.target.value.trim();

        if (!searchWord || searchWord.length < 3) {
            setArray([]);
            setSelectedOption(null)
        }
        else if(!isValidField(searchWord)){
          setIsValidSearch(false);
          setArray([]);
        } else{
            setIsValidSearch(true);
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

    const handleSearchOptionClick = (optionValue) => {
      setSelectedOption(optionValue);
      setArray([]);
      inpRef.current.value = optionValue[searchField]
    };

    // const handleOnBlur = (e) => {
    //     console.log(e.currentTarget)
    //     setArray([]);
    // };

    useEffect(()=>{
    },[selectedOption]);

    return (
        <div className="wrapper">

            <div className="search-element-container">
                <input type="text"  onChange={handleInputChange} ref={inpRef} className="search-element-input" placeholder="Search for city..."/>
                <Button variant="primary" disabled={!isValidSearch || !selectedOption} className="search-element-btn" onClick={() => onSearch(selectedOption)}>Search</Button>
            </div>
            {!isValidSearch && (<p style={{width:'100%', color:'red', textAlign:'center'}}>Only Latin characters are allowed!</p>)}
            <ul>
                {array.map((item, index) => (
                    <SearchOption key={createIndex({searchField,index })}
                                  value={item}
                                  label={item}
                                  displayFields={'name,country'}
                                  onSearchOptionClick={handleSearchOptionClick}
                    />
                ))}
            </ul>
        </div>
    )
};

function createIndex(settings) {
    return `${settings.searchField}${settings.index}-${Math.random()}`
}

function isValidField(word) {
    let expression = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\u002E\u002D\s]*)/g;
    let matchingResult = word.match(expression);
    return matchingResult.length > 0 && matchingResult[0]
}

export default SearchComponent;
