import React, { Component } from "react";
import {
  Form,
  Card,
  Segment,
  TextArea,
  Button,
  Input,
  Icon,
  Label
} from "semantic-ui-react";

var backendserver = "http://localhost:8000";

export default class Dashboard extends Component {
  state = {
    posts: []
  };
  deletePost = postid => {
    fetch(backendserver + /posts/ + postid + "/", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("token")
      }
    })
      .then(response => {
        this.fetchPosts();
        return response;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };
  fetchPosts = () => {
    fetch(backendserver + "/posts/", {
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: "Token " + localStorage.getItem("token")
      }
    })
      .then(response => {
        response
          .json()
          .then(data => {
            this.setState({ posts: data });
            return data;
          })
          .catch(error => {
            console.log(error);
            return error;
          });
        return response;
      })
      .catch(error => {
        console.log("error fetching", error);
        return error;
      });
    this.setState({});
  };
  componentWillMount = () => {
    this.fetchPosts();
  };
  render() {
    return (
      <Segment basic>
        <Card.Group>
          <NewPostForm fetchPosts={this.fetchPosts} />
          {this.state.posts.map(post => (
            <Post
              deletePost={this.deletePost}
              id={post.id}
              key={post.id}
              title={post.title}
              author={post.owner}
              body={post.body}
            />
          ))}
        </Card.Group>
      </Segment>
    );
  }
}

class NewPostForm extends Component {
  state = {
    title: "",
    body: ""
  };
  submit = e => {
    e.preventDefault();
    // submit stuff to server
    fetch(backendserver + "/posts/", {
      method: "POST",
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("token")
      },
      body: JSON.stringify({ body: this.state.body, title: this.state.title })
    })
      .then(response => {
        this.props.fetchPosts();
        this.setState({ title: "", body: "" });
        return response;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };
  setTitle = (e, data) => {
    this.setState({
      title: data.value
    });
  };
  setBody = (e, data) => {
    this.setState({
      body: data.value
    });
  };
  render() {
    return (
      <Card>
        <Form>
          <Form.Field required>
            <label>title</label>
            <Input
              placeholder="title"
              onChange={this.setTitle}
              value={this.state.title}
            />
          </Form.Field>
          <Form.Field required>
            <label>body</label>
            <TextArea
              placeholder="body"
              onChange={this.setBody}
              value={this.state.body}
            />
          </Form.Field>
          <Button type="submit" onClick={this.submit}>Submit</Button>
        </Form>
      </Card>
    );
  }
}

class Post extends Component {
  delete = e => {
    console.log("foo");
    e.preventDefault();
    this.props.deletePost(this.props.id);
  };
  render() {
    return (
      <Card raised>
        <Card.Content>
          <Label as="a" corner="right" icon="close" onClick={this.delete} />
          <Card.Header content={this.props.title} />
          <Card.Meta content={this.props.author} />
          <Card.Description
            style={{ wordWrap: "break-word" }}
            content={this.props.body}
          />
        </Card.Content>
      </Card>
    );
  }
}
