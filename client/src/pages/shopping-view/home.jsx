import { Button } from "@/components/ui/button";

import home from "../../assets/newhomer.png"
import page from "../../assets/neon.png"
import bannnerTwo from "../../assets/bannner.avif";
import accountt from "../../assets/accountt.jpg";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import non from "../../assets/newer.png"

import React, { useEffect, useState } from "react";
import {
  Airplay,
  BabyIcon,
  BellElectricIcon,
  BookIcon,
  BrickWallIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Facebook,
  Headphones,
  Heater,
  HousePlugIcon,
  Images,
  Instagram,
  Mail,
  Quote,
  RefreshCcw,
  ShieldCheck,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  Truck,
  Twitter,
  UmbrellaIcon,
  User2Icon,
  WarehouseIcon,
  WashingMachine,
  WatchIcon,
  Youtube,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
  setProductDetails,

} from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping-view/products-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";



function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { review } = useSelector((state) => state.shopReview)

  let slides = [ home,accountt,page,non];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Category & Brand Icons
  const categoriesWithIcon = [
    { id: "books", label: "Textbooks", icon: BookIcon },
    { id: "electronics", label: "Electronics", icon: BellElectricIcon },
    { id: "furniture", label: "Furniture", icon: HousePlugIcon },
    { id: "accessories", label: "Accessories", icon:  WarehouseIcon },
    { id: "sports", label: "Sports", icon: BrickWallIcon },
  ];

  const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
  ];

  // Auto slider
  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Fetch products on mount
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  // Open product dialog if productDetails is set
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Handle dialog close → clear Redux state
  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(setProductDetails()); // important fix
  };

  // Navigate with filters
  let handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");

    let currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  // Product details
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // Add to cart
  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative w-full h-[600px] overflow-hidden shadow-lg">
        {slides.map((slide, index) => (
          <img
            src={slide}
            alt=""
            key={index}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        {/* Dark Overlay with CTA */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 flex flex-col items-center justify-center text-center text-white px-6">

  <h1 className="text-5xl md:text-6xl lg:text-5xl font-extrabold leading-tight drop-shadow-2xl">
    Welcome to{" "}
    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
      Campus Marketplace
    </span>
  </h1>

  <p className="mt-6 text-xl md:text-2xl font-semibold max-w-3xl">
    <TypeAnimation
      sequence={[
        "Buy and Sell Within Your Campus Community",
        2000,
        "Find Affordable Textbooks and Electronics Easily",
        2000,
        "Trade Securely With Verified College Students",
        2000,
        "Smart Deals Made for Modern Students",
        2000,
      ]}
      speed={50}
      repeat={Infinity}
      cursor={true}
    />
  </p>

  <Button
    size="lg"
    className="mt-8 px-8 py-6 text-lg bg-gradient-to-r from-yellow-500 to-orange-600 hover:scale-105 transition-all duration-300 text-white rounded-full shadow-2xl"
    onClick={() => navigate("/shop/listing")}
  >
    Explore Marketplace
  </Button>

</div>
        {/* Carousel Controls */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 rounded-full shadow-md"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 rounded-full shadow-md"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>

      {/* Categories */}
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
  
  {/* Heading */}
  <div className="text-center mb-14 px-6">
    <h2 className="text-4xl font-extrabold tracking-tight">
      Shop by Category
    </h2>
    <p className="text-gray-500 mt-3 text-sm md:text-base">
      Discover products tailored for your campus lifestyle
    </p>
  </div>

  {/* Grid */}
  <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">

    {categoriesWithIcon.map((categoryItem, index) => (
      <Card
        key={categoryItem.id}
        onClick={() =>
          handleNavigateToListingPage(categoryItem, "category")
        }
        className="group cursor-pointer relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      >
        <CardContent className="flex flex-col items-center justify-center p-6">

          {/* Icon Circle */}
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg mb-4 group-hover:scale-110 transition">
            <categoryItem.icon className="w-8 h-8" />
          </div>

          {/* Label */}
          <span className="font-semibold text-lg text-gray-800 group-hover:text-black transition">
            {categoryItem.label}
          </span>

          {/* Hover underline */}
          <div className="w-0 h-[2px] bg-yellow-500 mt-2 group-hover:w-10 transition-all duration-300"></div>

        </CardContent>

        {/* Glow Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

      </Card>
    ))}
  </div>
</section>

      {/* Brands */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-10">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:scale-105 transition-transform shadow-md rounded-full"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-3 text-primary" />
                  <span className="font-bold text-sm">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button
            variant="ghost"
            className="text-primary font-semibold"
            onClick={() => navigate("/shop/listing")}
          >
            View All →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8  ">
          {productList && productList.length > 0 ? (
            productList.slice(0, 4).map((productItem) => (
              <div
                key={productItem._id}
                className="hover:shadow-lg hover:-translate-y-1 transition-transform rounded-2xl "
              >
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddToCart={handleAddtoCart}
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No featured products available
            </p>
          )}
        </div>
      </section>

      {/* --- Blog / Inspiration Section --- */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-10">From Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-md bg-white">
              <Link to="/shop/blog">
               <img  src={accountt} alt="Blog" className="w-full h-48 object-cover" />
              </Link>
             
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">College Tips 2026</h3>
                <p className="text-gray-600 text-sm">Discover the latest trends and college tips for this season.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md bg-white">
              <Link to="/shop/blog2">
               <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGV4dGJvb2tzfGVufDB8fDB8fHww" alt="Blog" className="w-full h-48 object-cover" />
              </Link>
             
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Top Books Pics</h3>
                <p className="text-gray-600 text-sm">Our editors’ favorite sneakers you need in your wardrobe.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md bg-white">
              <Link to="/shop/blog3">
               <img src="https://wallpaperaccess.com/full/1448061.jpg" alt="Blog" className="w-full h-48 object-cover" />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Student’s Essentials</h3>
                <p className="text-gray-600 text-sm">Minimal, timeless and versatile pieces for everyday wear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Amazing products!", "Fast delivery & great quality.", "Love shopping here!"]
              .map((quote, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-md">
                  <User2Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <p className="text-gray-700 italic">“{quote}”</p>
                  <p className="mt-3 font-bold">- Student {i + 1}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Static Image Section */}


      {/* Scrolling Banner Section */}
      <section

        className="relative h-[500px] w-full bg-center  bg-cover flex items-center justify-center"

      >

        <img
          src={bannnerTwo}
          className="w-full h-full object-cover overflow-scroll object-center"
          alt="Account Banner"
        />



        {/* Overlay */}
        <div className=" absolute inset-0 bg-gradient-to-t from-black/70 to-transparent  bg-opacity-10">


          <motion.div
            className="relative z-10 text-center text-white px-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-4xl font-extrabold drop-shadow-lg text-white mt-50">
              ✨ "Simplifying Student-to-Student Commerce"
            </h2>
            <p className="mt-4 text-lg md:text-1xl text-white font-light max-w-2xl mx-auto">
              "Campus Marketplace is a trusted platform where students can easily buy, sell, and exchange books, gadgets, notes, and other essentials within their college community".
            </p>
          </motion.div>
        </div>


        {/* Animated Text */}

      </section>


      {/* Service Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

          {/* Fast Shipping */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
            <Truck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Fast Shipping</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Optional secondary info block text
            </p>
          </div>

          {/* Secure Shopping */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Secure Accessing</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Optional secondary info block text
            </p>
          </div>

          {/* Easy Return */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
            <RefreshCcw className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Easy Return</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Optional secondary info block text
            </p>
          </div>

          {/* 24h Service */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
            <Headphones className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">24h Service</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Optional secondary info block text
            </p>
          </div>

        </div>
      </section>



 <footer className="relative bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 text-white pt-20 pb-10 overflow-hidden">

  {/* Glow Effect */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

    {/* Brand */}
    <div>
      <h2 className="text-3xl font-extrabold tracking-wide">
        Campuss Market
      </h2>
      <p className="mt-4 text-sm text-yellow-100 leading-relaxed">
        Simplifying campus shopping with premium products, fast delivery,
        and a seamless experience you’ll love.
      </p>

      {/* Mini Tagline */}
      <p className="mt-4 text-xs bg-white/10 inline-block px-3 py-1 rounded-full">
        🚀 Trusted by Students
      </p>
    </div>

    {/* Links */}
    <div>
      <h3 className="text-lg font-semibold mb-5 border-b border-white/20 pb-2">
        Explore
      </h3>
      <ul className="space-y-3 text-yellow-100">
        {["Home", "Shop", "About", "Contact"].map((item, i) => (
          <li key={i}>
            <a
              href="#"
              className="hover:text-white transition duration-300 hover:pl-2 inline-block"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-lg font-semibold mb-5 border-b border-white/20 pb-2">
        Support
      </h3>
      <ul className="space-y-3 text-yellow-100">
        {["FAQs", "Returns", "Shipping", "Privacy Policy"].map((item, i) => (
          <li key={i}>
            <a
              href="#"
              className="hover:text-white transition duration-300 hover:pl-2 inline-block"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-lg font-semibold mb-5 border-b border-white/20 pb-2">
        Newsletter
      </h3>
      <p className="text-sm text-yellow-100 mb-4">
        Get exclusive deals & updates.
      </p>

      <form className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-yellow-200 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white/20 hover:bg-white/30 transition"
        >
          <Mail size={18} />
        </button>
      </form>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="relative mt-16 border-t border-white/20 pt-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

    {/* Copyright */}
    <p className="text-sm text-yellow-100 text-center md:text-left">
      © {new Date().getFullYear()} Campuss Market. All rights reserved.
    </p>

    {/* Social Icons */}
    <div className="flex gap-4">
      {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
        <div
          key={i}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer"
        >
          <Icon size={18} />
        </div>
      ))}
    </div>

    {/* Payments */}
    <div className="flex gap-3 text-xs text-yellow-200">
      {["Visa", "Mastercard", "PayPal"].map((item, i) => (
        <span
          key={i}
          className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition"
        >
          {item}
        </span>
      ))}
    </div>

  </div>
</footer>





      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={handleCloseDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;    