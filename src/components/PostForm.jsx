import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        create({...post, id: Date.now()})
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput
                value={post.title}
                type="text"
                placeholder="Название поста"
                onChange={e => setPost({...post, title: e.target.value})}
            />
            <MyInput
                value={post.body}
                type="text"
                placeholder="Описание поста"
                onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;