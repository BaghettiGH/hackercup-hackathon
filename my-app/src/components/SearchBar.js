import React from 'react';

import colors from 'config/colors';
import {radius, spacingX, spacingY} from 'config/spacing';

function SearchBar({onPress, value, onChangeText}) {
    return(
        <div>
        <Feather name="Search" size={24} color="black"/> 
        <input 
            placeholder='Search'
            value={value}
            onChangeText={onChangeText}
        />
        <button on press={onPress}>
            <Octicons name="filter" size={20} color="black"/>
        </button>
        </div>
    )
}