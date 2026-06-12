import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductImgOne from "../assets/images/mens/five.jpg";
import ProductImgTwo from "../assets/images/mens/seven.jpg";
import ProductImgThree from "../assets/images/mens/twelve.jpg";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { adminToken, apiUrl } from "./common/Http";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);

  const params = useParams();

  const fetchProduct = async () => {
    const res = await fetch(`${apiUrl}get-product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch product.");
    }
    const result = await res.json();
    setProduct(result.data);
    setProductImages(result.data.product_images);
    setProductSizes(result.data.product_sizes);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="">{product.title}</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                {productImages && productImages.length > 0 && (
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#000",
                      "--swiper-pagination-color": "#000",
                    }}
                    onSwiper={setThumbsSwiper}
                    loop={false}
                    direction={`vertical`}
                    spaceBetween={10}
                    slidesPerView={6}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper mt-2"
                  >
                    {productImages.map((image) => {
                      return (
                        <SwiperSlide key={image.id}>
                          <div className="content">
                            <img
                              src={image.image_url}
                              alt=""
                              height={100}
                              className="w-100"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </div>

              <div className="col-10">
                {productImages && productImages.length > 0 ? (
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#000",
                      "--swiper-pagination-color": "#000",
                    }}
                    loop={productImages.length > 1}
                    spaceBetween={0}
                    navigation={true}
                    thumbs={
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? { swiper: thumbsSwiper }
                        : undefined
                    }
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {productImages.map((image) => {
                      return (
                        <SwiperSlide key={image.id}>
                          <div className="content">
                            <img
                              src={image.image_url}
                              alt=""
                              className="w-100"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                ) : (
                  <div className="no-image-placeholder text-center p-5 border">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div className="d-flex">
              <Rating size={20} readonly initialValue={rating} />
              <span className="pt-1 ps-2">1022 reviews</span>
            </div>
            <div className="price h3 py-3">
              ${product.price} &nbsp;
              {product.compare_price && (
                <span className="text-decoration-line-through">
                  ${product.compare_price}
                </span>
              )}
            </div>
            <div>{product.short_description}</div>
            <div className="pt-3">
              <strong>Select Size</strong>
              <div className="sizes p-2">
                {productSizes &&
                  productSizes.map((sizes, index) => {
                    return (
                      <button
                        key={sizes.id || index}
                        className="btn btn-size my-1 me-2"
                      >
                        {sizes.size.name}
                      </button>
                    );
                  })}
              </div>
              <div className="add-to-cart mt-4">
                <button className="btn btn-primary text-uppercase">
                  Add to cart
                </button>
              </div>
              <hr />
              <div>
                <strong>SKU:</strong>
                {product.sku}
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-6">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="Description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="Description" title="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </Tab>
              <Tab eventKey="profile" title="Reviews (11)">
                Reviews Area
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
