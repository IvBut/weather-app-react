import React, {useEffect, useState} from "react";

const SearchComponent = ({dataArray, searchField}) => {
    const [inpValue, setInpValue] = useState('');
    const [array, setArray] = useState([...dataArray]);

    const handleInputChange = (e)=> {
        setInpValue(e.target.value);
    };

    const filterValues = (searchWord) =>{
        if (!searchWord) return null;
        console.log(searchWord)
        console.log(dataArray)
       let filteredArray =  array.filter(element => {
         return  String(element[searchField]).toLowerCase().includes(searchWord.toLowerCase())
       });
        setArray(filteredArray)
    };

    useEffect(()=> {
        console.log('user effect')
        filterValues(inpValue);
    },[])

    return (
        <>
            <input type="text" value={inpValue} onChange={handleInputChange}/>
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