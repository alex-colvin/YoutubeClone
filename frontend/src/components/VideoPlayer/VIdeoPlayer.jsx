import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./VideoPlayer.css"

const VideoPlayer = (props)=>{

    return(
    <div className='video-player'>
        <iframe style={{height:"60vh", width:"60vw"}} classname="iframe" src={`https://www.youtube.com/embed/${props.videoId}`} frameBorder="0"></iframe>
    </div>
    
        )
}
export default VideoPlayer

