import React, { Component } from 'react';
import axios from "../../../axios";
import { Route } from 'react-router-dom';

import FullPost from '../FullPost/FullPost';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log(this.props);
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
        // this.props.history.push({ pathName: '/posts/', postId });
        this.props.history.push('/posts/'+ postId);
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!!!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return  (
                    // Way 1 <Link to={'/post/'+ post.id} key={post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={this.postSelectedHandler.bind(this, post.id)} />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} /> 
            </div>
        );
    }
}

export default Posts;