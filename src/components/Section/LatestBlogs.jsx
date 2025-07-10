import { Link } from 'react-router';

const blogData = [
  {
    id: 1,
    title: "Why Life Insurance is Essential in 2025",
    summary: "Discover the critical reasons why having a life insurance plan in 2025 is more important than ever before.",
    slug: "/blogs/life-insurance-2025"
  },
  {
    id: 2,
    title: "How to Choose the Right Policy for Your Family",
    summary: "Get expert insights on selecting the best insurance coverage tailored for your family's future needs.",
    slug: "/blogs/choose-right-policy"
  },
  {
    id: 3,
    title: "Top 5 Benefits of Term Life Insurance",
    summary: "Explore the most important benefits of choosing a term life policy and how it can save you money.",
    slug: "/blogs/benefits-of-term-policy"
  },
  {
    id: 4,
    title: "SecureLife Dashboard Tour",
    summary: "A walkthrough of how you can manage your policies, track claims, and more from our user dashboard.",
    slug: "/blogs/dashboard-tour"
  },
];

const LatestBlogs = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 ">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
        Latest Blogs & Articles
      </h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {blogData.map((blog) => (
          <div key={blog.id} className="bg-gray-50 border border-blue-100 p-6 rounded-xl shadow hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{blog.summary}</p>
            <Link
              to={blog.slug}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;
