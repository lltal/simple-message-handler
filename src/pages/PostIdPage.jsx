import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>
            {isLoading
                ?  <Loader/>
                :  <div>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(com =>
                    <div key={com.id} style={{marginTop: 15}}>
                        <h5>{com.email}</h5>
                        <div>{com.body}</div>
                    </div>)}
                </div>

            }
        </div>
    );
};

export default PostIdPage;