import React, { useState } from "react"

import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import axios from 'axios'


let initialValues = {
    user_id: '2',
    text: '',
    comment_id: '2'
}

const ReplyForm = (props) => {
    const [user, token] = useAuth();
    const [commentId] = useState(props.commentId)
    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        initialValues,
        postNewReply
    );
    async function postNewReply(){
        try {
            formData.comment_id = commentId
            let response = await axios.post(`http://127.0.0.1:8000/api/replies/post/${commentId}/`, formData, {
                headers: {
                    Authorization: 'Bearer '+ token
                }
            })
            if (response.status === 201){
                await props.getCommentReplies(commentId)
            }
        } catch (error){
            console.log(error.message);
        }
    }
    return(
            <form className="form-group row" onSubmit={handleSubmit}>
                <input className="col-sm-8" type="text" name="text" value={formData.text} placeholder={`Reply as ${user.username}`} onChange={handleInputChange} />
                <button className="col-sm-2 btn btn-primary btn-sm" type="submit">Reply</button>
            </form>
    )
}

export default ReplyForm