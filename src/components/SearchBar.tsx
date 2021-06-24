import React from "react";

export const SearchBar = (props: {searchField: string, fieldLabel: string, value: string, onChange: any}) => {
    const { searchField, fieldLabel, value, onChange } = props;

    return (
        <>
            <label htmlFor={searchField}>{fieldLabel}: </label>
            <input 
                id={searchField}
                type="text"
                value={value}
                onChange={onChange}
            />
        </>
    )
}