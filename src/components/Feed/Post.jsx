import React from 'react'

function Post({ post }) {
    console.log('Post:', post);
    return (
        <div className="post">

            <p>{post.content}</p>

        </div>
    );
}

export default Post;
