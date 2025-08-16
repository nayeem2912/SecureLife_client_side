import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, FileText, Smile } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FileText className="w-10 h-10 text-sky-500 " />,
      title: "Choose Your Policy",
      description:
        "Browse our wide range of insurance policies and pick the one that suits your needs.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-10 h-10 text-sky-500" />,
      title: "Apply Securely",
      description:
        "Fill out the online application with your details. All your data is safe with us.",
    },
    {
      id: 3,
      icon: <CheckCircle className="w-10 h-10 text-sky-500" />,
      title: "Get Approved",
      description:
        "Our certified agents review your application and confirm eligibility.",
    },
    {
      id: 4,
      icon: <Smile className="w-10 h-10 text-sky-500" />,
      title: "Enjoy Peace of Mind",
      description:
        "Once approved, you get full coverage and dedicated 24/7 support.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-2 ">
            Simple steps to get started with SecureLife
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
