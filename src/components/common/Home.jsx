import React from "react";

import "swiper/css";
import LatestProducts from "./LatestProducts";
import FeaturedProducts from "./FeaturedProducts";
import Layout from "./Layout";
import Hero from "./Hero";
const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <LatestProducts />
        <FeaturedProducts />
      </Layout>
    </>
  );
};

export default Home;
