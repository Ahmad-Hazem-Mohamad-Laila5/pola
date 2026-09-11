"use client";

import blog1 from "@/public/blog-1.jpg";
import blog2 from "@/public/blog-2.jpg";
import blog3 from "@/public/blog-3.jpg";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const Blogs = () => {
  const BlogsData = [
    {
      id: 1,
      img: blog1,
      date: "Sep 26, 2024",
      category: "Fitness",
      title: "Yoga at home. Feel the transformation in only several weeks",
      excerpt:
        "Discover how home yoga can transform your body and mind in just a few weeks.",
      author: "Sarah Johnson",
    },
    {
      id: 2,
      img: blog2,
      date: "Sep 28, 2024",
      category: "Equipment",
      title: "Sports equipments to make your workout more fun",
      excerpt:
        "Explore the best sports equipment that will make your workouts more enjoyable.",
      author: "Mike Thompson",
    },
    {
      id: 3,
      img: blog3,
      date: "Sep 30, 2024",
      category: "Nutrition",
      title: "Several prescription for a healthier meal – keto food",
      excerpt:
        "Learn about keto diet prescriptions for healthier and delicious meals.",
      author: "Emma Davis",
    },
  ];

  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-10 lg:py-20">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-5 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl uppercase font-bold text-gray-900 tracking-tight">
              Rey's Journal
            </h2>
            <p className="text-gray-500 font-medium mt-2">We write stuff too</p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-300"
          >
            Read More Articles
            <Icon
              icon="solar:arrow-right-linear"
              width={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {BlogsData.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <Link
                href={`/blog/${item.id}`}
                className="block relative aspect-[4/3] overflow-hidden bg-gray-100"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {item.category}
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Icon icon="solar:calendar-linear" width={16} />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon icon="solar:user-linear" width={16} />
                    {item.author}
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${item.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-black transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                  {item.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/${item.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-700 transition-colors"
                >
                  Read Article
                  <Icon
                    icon="solar:arrow-right-linear"
                    width={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
