import React, { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import axios from 'axios'
import { useParams } from "react-router-dom";

let initialValues = {
        user: "2",
        video_id:'',
        text: "",
        likes: "0",
        dislikes: "0"
};

const CommentForm = (props) =>{
    const [user, token] = useAuth();
    const [videoId, setvideoId] = useState(props.videoId)
    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        initialValues,
        postNewComment
        );

    async function postNewComment(){
        try {
            formData.video_id=props.videoId
            let response = await axios.post('http://127.0.0.1:8000/api/comments/post/', formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 201){
                await props.getVideoComments(props.videoId)
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="container">
            <form className="form-group row" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        placeholder={`Commenting as ${user.username}`}
                        className="col-sm-10"
                    />
                <button type="submit" className="col-sm-2 btn btn-primary">POST</button>
            </form>
        </div>
    )
}
export default CommentForm