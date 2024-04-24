import React from 'react'

function Post({ post }) {
    console.log('Post:', post);
    return (
        <div className="post">
            <h3>{post.author}</h3>
            <p>{post.content}</p>

        </div>
    );
}

export default Post;
