import axios from "axios";
import React from "react";

const client = axios.create ({
  baseURL: "https://jsonplaceholder.typicode.com/posts/"
})

export default function App() {
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getPost() {
      const response = await client.get("/1");
      setPost(response.data);
    }
    getPost().catch(error => {
      setError(error);
    });
  }, []);

  function createPost() {
    client
    .post("", {
      title: "Olá mundo! Xablau trouxas",
      body: "Esse é um post novo."
    })
    .then((response) => {
      setPost(response.data);
    });
  }

  function updatePost() {
    client
    .put("/1", {
      title: "A vida do ser humano",
      body: "Isto foi uma alteração de post!"
    })
    .then((response) => {
      setPost(response.data);
    });
  }

  async function deletePost() {
  await client.delete("/1");
  alert("Post delet!");
  setPost(null);
  }

  if (error) return `Error: ${error.message}`;
  if (!post) return "No post";

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}