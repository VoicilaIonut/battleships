// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import React from 'react';

const Dashboard = () => {
  // const [searchParams, setSearchParams] = useSearchParams({ post: "" });
  // const param = searchParams.get("post");
  // const [posts, setPosts] = useState();

  // useEffect(() => {
  //   param &&
  //     fetch(`https://jsonplaceholder.typicode.com/posts/${param}`)
  //       .then((response) => {
  //         if (response.status === 404) {
  //           throw new Response("Not Found", { status: 404 });
  //         }
  //         return response.json();
  //       })
  //       .then((json) => setPosts(json))
  //       .catch((err) => console.log(err));
  // }, [param]);

  return (
    <>
      <h1 className="title">Dashboard</h1>
      {/* <input
        onChange={(event) => setSearchParams({ post: event.target.value })}
        placeholder="Input text here"
      /> */}
      <h2>Post overview</h2>
      {/* {JSON.stringify(posts)} */}
    </>
  );
};

export default Dashboard;
