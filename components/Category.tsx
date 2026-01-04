"use client";

import { HeadphonesIcon, Shield, Truck } from "lucide-react";

interface Book {
  _id: string;
  category: string;
}

interface CategoryProps {
  allBooks: Book[];
}

const Category = ({ allBooks }: CategoryProps) => {
  const categories = [
    { name: "Fiction", icon: "📚", color: "from-blue-500 to-cyan-500" },
    { name: "Self-Help", icon: "🌟", color: "from-purple-500 to-pink-500" },
    { name: "Business", icon: "💼", color: "from-orange-500 to-red-500" },
    { name: "Biography", icon: "👤", color: "from-green-500 to-teal-500" },
    { name: "Science", icon: "🔬", color: "from-indigo-500 to-blue-500" },
    { name: "History", icon: "🏛️", color: "from-yellow-500 to-orange-500" },
    { name: "Technology", icon: "💻", color: "from-cyan-500 to-blue-500" },
    { name: "Philosophy", icon: "🧠", color: "from-purple-500 to-indigo-500" },
  ];

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders above ₹499" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      desc: "Dedicated customer service",
    },
  ];

  const getCategoryCount = (categoryName: string) =>
    allBooks.filter((book) => book.category === categoryName).length;

  return (
    <>
       
      <div className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="bg-linear-to-br from-indigo-500 to-purple-500 p-4 rounded-2xl">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Explore by{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Find your perfect read from our diverse collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer transform hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-10 transition`}
              />
              <div className="p-8 text-center relative">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 font-medium">
                  {getCategoryCount(category.name)} books
                </p>
              </div>
              <div className={`h-1 bg-linear-to-r ${category.color}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
