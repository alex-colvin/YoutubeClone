import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {DATA} from '../../localData'
import SearchBar from '../../components/SearchBar/SearchBar';
import './SearchPage.css'
import VideoCard from '../../components/VideoCard/VideoCard';


const SearchPage = (props) => {
    // const [videoId, setVideoId] = useState('')

    function handleSubmit(videoId){
        let newVideoId = videoId
        props.submitVideoInfo(newVideoId)
    }

    console.log('search page vids', props.videos)
    return(
        <div className='container'>
                <div className='row'>
                    {props.videos.map((video) => (                        
                            <div className='col-sm-3 top-buffer' key={video.id.videoId} onClick={()=>{handleSubmit(video.id.videoId)}}>
                                <VideoCard video={video} />
                            </div>                      
                    ))}
                </div>

        </div>
    )
}
export default SearchPage