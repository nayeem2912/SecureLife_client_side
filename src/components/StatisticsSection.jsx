import { motion } from "framer-motion";

const StatisticsSection = () => {
  const stats = [
    { id: 1, value: "50,000+", label: "Policies Issued" },
    { id: 2, value: "15+", label: "Certified Agents" },
    { id: 3, value: "95%", label: "Claim Success Rate" },
    { id: 4, value: "24/7", label: "Customer Support" },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Our Impact in Numbers
          </h2>
          <p className="mt-2 ">
            Trusted by thousands of customers across the country
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
            >
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="mt-2 text-gray-700 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
