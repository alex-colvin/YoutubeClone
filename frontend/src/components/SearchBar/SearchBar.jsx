import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './SearchBar.css'

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        let newSearchTem = searchTerm
        console.log(newSearchTem)
        props.searchVideos(newSearchTem)
        navigate('/results')
        setSearchTerm('')
    }

    return(
        <div className="container">
            <form className="row g-2" onSubmit={handleSubmit}>
                <div className='col-auto'><input type="text" className='form-control' placeholder="Search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></div>
                <div className='col-auto'><button className='btn btn-outline-primary btn-sm' type='submit'>Submit</button></div>
            </form>
        </div>
    )
}
export default SearchBar