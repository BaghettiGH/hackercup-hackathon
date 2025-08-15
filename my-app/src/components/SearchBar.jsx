
import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({onPress, value, onChangeText}) {
    return(
        // <div>
        // <Feather name="Search" size={24} color="black"/> 
        // <input 
        //     placeholder='Search'
        //     value={value}
        //     onChangeText={onChangeText}
        // />
        // <button on press={onPress}>
        //     <Octicons name="filter" size={20} color="black"/>
        // </button>
        // </div>

        <div className="searchbar-container">
            <input 
                type="text" 
                placeholder="Search..." 
                className="searchbar-input"
            />
            <Search className="searchbar-icon" />
        </div>
    )
}

export default SearchBar;