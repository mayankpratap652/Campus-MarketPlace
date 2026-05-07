import React from "react";

function ShoppinBlog3() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Blog Header */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Men’s Essentials 2025
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Minimal, timeless, and versatile pieces for everyday wear.  
          Build your capsule wardrobe with essentials that never go out of style.
        </p>

        {/* Blog Image */}
        <div className="mb-12">
          <img
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=80"
            alt="Men’s Essentials"
            className="rounded-2xl shadow-md w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-4xl mx-auto text-gray-700">
          <h2>The Capsule Wardrobe Concept</h2>
          <p>
            A capsule wardrobe focuses on simplicity, versatility, and timeless fashion. 
            Every man should have a collection of essentials that can be styled for 
            multiple occasions without going out of trend.
          </p>

          <h2>Must-Have Essentials</h2>
          <ul>
            <li>
              <strong>White Oxford Shirt</strong> – Crisp, clean, and perfect for both casual and formal looks.
            </li>
            <li>
              <strong>Dark Denim Jeans</strong> – A staple that works with nearly anything in your wardrobe.
            </li>
            <li>
              <strong>Neutral Chinos</strong> – Comfortable and stylish for everyday wear.
            </li>
            <li>
              <strong>Classic Leather Jacket</strong> – Timeless outerwear that elevates any outfit.
            </li>
            <li>
              <strong>Minimal Sneakers</strong> – Simple, versatile, and great for daily use.
            </li>
          </ul>

          <h2>Style Guide</h2>
          <p>
            Stick to neutral tones like black, white, navy, and beige. These colors make layering easier 
            and ensure your outfits remain timeless. Accessories such as a classic watch or leather belt 
            add subtle sophistication.
          </p>

          <blockquote className="border-l-4 pl-4 italic text-gray-600 my-6">
            “Fashion fades, but style is eternal.” – Yves Saint Laurent
          </blockquote>

          <p>
            By focusing on quality over quantity, you’ll build a wardrobe that saves time, reduces stress, 
            and always keeps you looking sharp.
          </p>
        </article>
      </div>
    </section>
  );
}

export default ShoppinBlog3;
