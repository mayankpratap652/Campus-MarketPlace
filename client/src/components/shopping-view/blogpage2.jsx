import React from "react";

function ShoppingBlog2() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Blog Header */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Top Sneakers Picks 2025
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our editors’ favorite sneakers you need in your wardrobe.  
          From everyday casuals to high-fashion kicks, here are the styles that define 2025.
        </p>

        {/* Blog Image */}
        <div className="mb-12">
          <img
            src="https://wallpaperaccess.com/full/1252129.jpg"
            alt="Sneaker Picks"
            className="rounded-2xl shadow-md w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-4xl mx-auto text-gray-700">
          <h2>Why Sneakers Matter in 2025</h2>
          <p>
            Sneakers are no longer just footwear; they are a statement piece. In 2025, sneakers
            dominate both streetwear and high-end fashion, blending comfort with bold design.
          </p>

          <h2>Our Top Picks</h2>
          <ul>
            <li>
              <strong>Classic White Sneakers</strong> – A timeless must-have that works with any outfit.
            </li>
            <li>
              <strong>Chunky Dad Sneakers</strong> – Retro vibes with a modern twist, perfect for streetwear.
            </li>
            <li>
              <strong>Luxury Designer Sneakers</strong> – Elevate your wardrobe with high-fashion kicks.
            </li>
            <li>
              <strong>Performance Running Sneakers</strong> – Style meets function for everyday wear.
            </li>
          </ul>

          <h2>Styling Tips</h2>
          <p>
            Pair chunky sneakers with oversized jeans, or keep it minimal with slim-fit chinos
            and a crisp white tee. For women, sneakers look great with dresses, skirts, and
            athleisure fits.
          </p>

          <blockquote className="border-l-4 pl-4 italic text-gray-600 my-6">
            “Sneakers are the ultimate balance of comfort and self-expression.”
          </blockquote>

          <p>
            No matter your style, the right sneakers will instantly upgrade your look. Make sure
            you invest in a versatile collection that can keep up with every occasion.
          </p>
        </article>
      </div>
    </section>
  );
}

export default ShoppingBlog2;
