import React, { Component } from 'react';
import axios from "../../../axios";

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.splice(0, 4);
                const updatedPost = posts.map(post => {
                    return { ...post, author: "Tien"}
                });
                this.setState({ posts: updatedPost });
                console.log(response);
            })
            .catch(err => {
                console.log(err);
                // this.setState({ error: true })
            });

    }

    postSelectedHandler = (postId) => {
        this.setState({ selectedPostId: postId })
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!!!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return  <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={this.postSelectedHandler.bind(this, post.id)} />
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;