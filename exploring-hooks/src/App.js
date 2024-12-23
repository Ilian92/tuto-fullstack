import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostsList from "./components/PostsList";
import NotFound from "./components/NotFound";
import PostPage from "./components/PostPage";
import { Routes, Route, useParams } from "react-router-dom";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(10);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  // const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios("https://jsonplaceholder.typicode.com/posts");

  //     setData(result.data);
  //   };
  //   setLoader(true);
  //   fetchData();
  //   setLoader(false);
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       "https://jsonplaceholder.typicode.com/comments"
  //     );

  //     setData2(result.data);
  //   };
  //   fetchData();
  // }, []);

  /* loader ? (
    <Loader />
  ) : */

  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
