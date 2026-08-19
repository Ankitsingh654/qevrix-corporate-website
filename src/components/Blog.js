import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const blogData = [
  {
    id: 1,
    category: "Development",
    title: "How Industrial Training Builds Real Developers",
    excerpt:
      "Discover how structured sprint-based training prepares students for real-world software engineering roles.",
    author: "Qevrix Team",
    date: "Feb 12, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Startups",
    title: "Why Startups Need Scalable Backend Architecture",
    excerpt:
      "Early architecture decisions impact scalability, performance, and investor confidence.",
    author: "Engineering Lead",
    date: "Feb 10, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    category: "Internship",
    title: "From Student to Industry Ready Engineer",
    excerpt:
      "The transformation journey inside a professional sprint-driven internship model.",
    author: "Mentor Panel",
    date: "Feb 5, 2026",
    readTime: "6 min read",
  },
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0B1220] to-black text-white py-24 px-6">

      <div className="max-w-6xl mx-auto">

        {/* ===== HERO ===== */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-6">
            QEVRIX <span className="text-qx-primary">Insights</span>
          </h1>
          <p className="text-qx-textSecondary max-w-2xl mx-auto">
            Engineering insights, startup growth strategies, and
            industry-level internship guidance from our experts.
          </p>
        </div>

        {/* ===== FEATURED BLOG ===== */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-qx-surface border border-qx-border rounded-3xl p-10 mb-20 shadow-xl"
        >
          <span className="text-xs uppercase tracking-wide text-qx-primary">
            Featured Article
          </span>

          <h2 className="text-3xl font-bold mt-4 mb-4">
            Building Industry-Ready Engineers Through Sprint Culture
          </h2>

          <p className="text-qx-textSecondary mb-6">
            Real-world development isn't about tutorials — it's about
            deadlines, reviews, and collaboration. Here's how sprint culture
            shapes real engineers.
          </p>

          <button
            onClick={() => navigate("/blog/featured")}
            className="px-6 py-3 bg-qx-primary text-white rounded-xl font-semibold hover:bg-qx-primaryDark transition"
          >
            Read Full Article
          </button>
        </motion.div>

        {/* ===== BLOG GRID ===== */}
        <div className="grid md:grid-cols-3 gap-10">
          {blogData.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -5 }}
              className="bg-qx-surface border border-qx-border rounded-2xl p-6 transition hover:border-qx-primary/50"
            >
              <span className="text-xs text-qx-primary uppercase">
                {blog.category}
              </span>

              <h3 className="text-xl font-semibold mt-3 mb-3">
                {blog.title}
              </h3>

              <p className="text-qx-textSecondary text-sm mb-5">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-qx-textMuted">
                <span className="flex items-center gap-1">
                  <User size={14} /> {blog.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {blog.date}
                </span>
              </div>

              <div className="mt-3 text-xs text-qx-textMuted flex items-center gap-1">
                <Clock size={14} /> {blog.readTime}
              </div>

              <button
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="mt-5 text-qx-primary text-sm font-medium hover:underline"
              >
                Read More →
              </button>
            </motion.div>
          ))}
        </div>

        {/* ===== NEWSLETTER ===== */}
        <div className="mt-24 text-center bg-qx-surface border border-qx-border rounded-3xl p-12">
          <h3 className="text-2xl font-bold mb-4">
            Stay Updated with Engineering Insights
          </h3>
          <p className="text-qx-textSecondary mb-6">
            Get startup tips, development trends, and internship updates.
          </p>

          <div className="flex justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-qx-surface border border-qx-border rounded-lg px-4 py-3 text-white"
            />
            <button className="bg-qx-primary px-6 py-3 rounded-lg font-semibold hover:bg-qx-primaryDark transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
