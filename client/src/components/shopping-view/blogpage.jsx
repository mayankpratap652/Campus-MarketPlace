import { blogPosts } from "@/config";
import React from "react";



function ShoppingBlog() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Campuss Market Place Blog
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600">
      Campus Marketplace is a student-friendly platform where you can buy, sell, and exchange books, gadgets, notes, and essentials easily within your college community.
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                <button className="text-red-600 font-semibold hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShoppingBlog;
