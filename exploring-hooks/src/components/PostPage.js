import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import NotFound from "./NotFound";
import Loader from "./Loader";
import mapping from "../mapping.json";

const PostPage = () => {
  const { id } = useParams();
  const [data2, setData2] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const baseURL = `https://jsonplaceholder.typicode.com/posts/${id}`;

  const baseURL2 = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

  const [post, setPost] = React.useState([]);

  const [comments, setComments] = React.useState([]);

  const image = mapping.filter(({ postId }) => postId === post.id);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await axios
        .get(baseURL)
        .then((response) => {
          setPost(response.data);
        })
        .catch((e) => setError("error"));
      setLoader(false);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchComments = async () => {
      setLoader(true);
      await axios
        .get(baseURL2)
        .then((response) => {
          setComments(response.data);
        })
        .catch((e) => setError("error"));
      setLoader(false);
    };

    if (post) {
      fetchComments();
    }
  }, [post]);

  if (error)
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );

  if (!post) return null;

  return loader ? (
    <Loader />
  ) : (
    <div className="postPage">
      <h1 className="titrePostPage">{post.title}</h1>
      <div className="autourImgPostPage">
        {image.length > 0 ? (
          <img className="imgPostPage" src={image[0].image} />
        ) : null}
      </div>
      <p className="bodyPostPage">{post.body}</p>
      <div>
        <div>
          {comments
            ? comments.map((item) => (
                <div className="carteComment" key={item.name}>
                  <div className="strip"></div>
                  <div className="titreEtBodyComment">
                    <h2 className="titreComment">{item.name}</h2>
                    <p className="bodyComment">{item.body}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
