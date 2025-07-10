import {
  FaCalculator, FaUserTie, FaGlobe, FaLock,
  FaChartLine, FaTachometerAlt, FaFileSignature, FaHeadset
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaCalculator className="text-3xl text-sky-600" />,
    title: "Instant Quote Calculation",
    desc: "Get personalized quotes instantly with our smart calculator."
  },
  {
    icon: <FaUserTie className="text-3xl text-sky-600" />,
    title: "Expert Agent Support",
    desc: "Talk to our licensed agents for free consultation."
  },
  {
    icon: <FaGlobe className="text-3xl text-sky-600" />,
    title: "100% Online Application",
    desc: "Complete your application fully online without paperwork."
  },
  {
    icon: <FaLock className="text-3xl text-sky-600" />,
    title: "Secure Online Payments",
    desc: "We ensure all your payments are encrypted and safe."
  },
  {
    icon: <FaChartLine className="text-3xl text-sky-600" />,
    title: "Real-Time Claim Tracking",
    desc: "Track your claim status in real-time, 24/7."
  },
  {
    icon: <FaTachometerAlt className="text-3xl text-sky-600" />,
    title: "Personalized Dashboard",
    desc: "All your policies, claims, and quotes in one dashboard."
  },
  {
    icon: <FaFileSignature className="text-3xl text-sky-600" />,
    title: "Paperless Signing",
    desc: "Sign documents digitally and save time with zero hassle."
  },
  {
    icon: <FaHeadset className="text-3xl text-sky-600" />,
    title: "24/7 Customer Support",
    desc: "We’re here for you anytime through chat or call."
  }
];

const Benefits = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 ">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
        Benefits of LifeSure
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
