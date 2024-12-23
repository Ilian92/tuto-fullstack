import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import axios from "axios";
import React from "react";
import Loader from "./Loader";
import "../Pagination.css";
import mapping from "../mapping.json";

const PostsList = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const pages = Array.from(Array(10), (_, index) => index + 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [poste1, setPoste1] = useState([]);
  const baseURL = `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=6`;
  const baseURL2 = `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=1`;

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await axios
        .get(baseURL)
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => setError("error"));
      setLoader(false);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await axios
        .get(baseURL2)
        .then((response) => {
          setPoste1(response.data);
        })
        .catch((e) => setError1("error"));
      setLoader(false);
    };

    fetchData();
  }, []);

  if (error && error1)
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );

  if (loader && !data) return <Loader />;

  return (
    <div>
      <h1 className="titrePagePoste">Liste des postes:</h1>
      <div className="autourCartePoste1">
        {poste1.map((item) => {
          const image = mapping.filter(({ postId }) => postId === item.id);
          return (
            <div className="cartePoste1" key={item.id}>
              <a href={`/post/${item.id}`}>
                <div>
                  {image.length > 0 ? (
                    <img className="img1" src={image[0].image} />
                  ) : null}
                </div>
                <p className="titre1">{item.title}</p>
              </a>
            </div>
          );
        })}
      </div>
      <div className="autourCartePoste">
        {data
          .filter((id1) => id1.id !== 1)
          .map((item) => {
            const image = mapping.filter(({ postId }) => postId === item.id);
            return (
              <div className="cartePoste" key={item.id}>
                <a className="dansCartePoste" href={`/post/${item.id}`}>
                  <div>
                    {image.length > 0 ? (
                      <img className="img" src={image[0].image} />
                    ) : null}
                  </div>
                  <p className="titre">{item.title}</p>
                </a>
              </div>
            );
          })}
      </div>
      <nav aria-label="pagination">
        <ul className="pagination">
          {pages.map((page) => (
            <div key={page}>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage(page);
                  }}
                >
                  <span className="visuallyhidden">page </span>
                  {page}
                </button>
              </li>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PostsList;
