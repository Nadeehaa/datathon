import React from 'react';
import { BookOpen, GraduationCap, Users, Search } from 'lucide-react';

const LearnSection = () => {
  return (
    <section id="learn" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
          Educational Resources
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {resources.map((resource) => (
            <div key={resource.title} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                {resource.icon}
                <h3 className="text-xl font-semibold text-green-800 ml-3">{resource.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-green-900">Featured Articles</h3>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="grid gap-6">
            {articles.map((article) => (
              <div key={article.title} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <h4 className="text-lg font-semibold text-green-800 mb-2">{article.title}</h4>
                <p className="text-gray-600 mb-2">{article.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const resources = [
  {
    icon: <BookOpen className="w-6 h-6 text-green-600" />,
    title: "Ayurvedic Guides",
    description: "Comprehensive guides about traditional Ayurvedic farming practices and crop benefits."
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-green-600" />,
    title: "Online Courses",
    description: "Learn from experts through structured courses on sustainable farming and Ayurveda."
  },
  {
    icon: <Users className="w-6 h-6 text-green-600" />,
    title: "Community Forum",
    description: "Connect with other farmers and practitioners to share knowledge and experiences."
  }
];

const articles = [
  {
    title: "Understanding Ayurvedic Crop Rotation",
    excerpt: "Learn how traditional crop rotation techniques can improve soil health and yield.",
    author: "Dr. Sharma",
    readTime: 5
  },
  {
    title: "Seasonal Planting Guide",
    excerpt: "Discover the best times to plant different Ayurvedic crops based on seasonal changes.",
    author: "Maya Patel",
    readTime: 7
  },
  {
    title: "Natural Pest Control Methods",
    excerpt: "Traditional and effective ways to protect your crops without harmful chemicals.",
    author: "Raj Kumar",
    readTime: 6
  }
];

export default LearnSection;