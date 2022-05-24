import React, { useEffect } from "react";
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import CommentForm from "../../components/CommentForm/CommentForm";
import VideoPlayer from "../../components/VideoPlayer/VIdeoPlayer";
import CommentList from "../../components/CommentList/CommentList";
import RelatedVideos from "../../components/RelatedVideos/RelatedVideos"
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../components/VideoPlayer/VideoPlayer.css"


const VideoPage = (props) => {

    const videoId = useParams();

    useEffect(()=>{
        console.log('whole object:',props.selectedVideo)
    },[])

    useEffect(() => {
        props.getVideoComments(videoId)
        props.getRelatedVideos(videoId)
    },[props.selectedVideo])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [videoId])

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-sm-9">

                        <VideoPlayer videoId={props.selectedVideo.id.videoId} />

                    <div className="description">{props.selectedVideo.snippet.description}</div>
                    <div>
                        <CommentList videoId={props.selectedVideo.id.videoId} comments={props.comments} getVideoComments={props.getVideoComments}></CommentList>
                    </div>
                </div>
                <div className="col-sm-3">
                    <RelatedVideos relatedVideos={props.searchedVideos} getRelatedVideos={props.getRelatedVideos} pickVideo={props.pickVideo} submitVideoInfo={props.submitVideoInfo} ></RelatedVideos>
                </div>
            </div>

        </div>
     );
}
 
export default VideoPage;