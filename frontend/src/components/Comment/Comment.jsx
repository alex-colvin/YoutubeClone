import React, { useState, useEffect } from 'react';
import ReplyList from '../ReplyList/ReplyList';
import ReplyForm from '../ReplyForm/ReplyForm';
import axios from 'axios'
import LikeDislike from '../LikeDislike/LikeDislike';

const Comment = (props) =>{
    const [comment, setComment] = useState(props.comment)

    useEffect(()=>{
        setComment(props.comment)
    },[props.videoId])

    return(
        <div className='comment-box shadow'>
            <h5 className='comment-heading'>{props.comment.user.username}</h5>
            <div className='comment-body'>{props.comment.text}</div>
            <span className='likes'>Likes:{props.comment.likes} Dislikes:{props.comment.dislikes}</span>
            <LikeDislike comment={comment} getVideoComments={props.getVideoComments} videoId={props.videoId} />
            <ReplyList commentId={comment.id}/>
        </div>
    )

}

export default Comment