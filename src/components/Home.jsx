import React from "react";

const Home = () => {
    return (
        <div >
          <h1 className="centreHeader">Welcome to Real Fake News</h1>
          <iframe className="homeVideo" width="560" height="315" src="https://www.youtube.com/embed/k1BneeJTDcU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      );
}

export default Home