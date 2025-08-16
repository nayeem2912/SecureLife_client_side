import { FaShieldAlt, FaUsers, FaHandshake, FaRegSmile } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="  py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-4">About SecureLife</h2>
        <p className="text-lg">
          At <span className="font-semibold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">SecureLife</span>, we believe insurance should be simple, secure, and serve people with care.
          We're here to protect what matters most your future.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <FaShieldAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-semibold mb-2">Trusted Protection</h3>
          <p className="text-sm text-gray-600">
            We provide reliable and flexible insurance policies that give you peace of mind for every stage of life.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <FaUsers className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-semibold mb-2">People-Centered</h3>
          <p className="text-sm text-gray-600">
            Our agents and staff work tirelessly to deliver a personal and supportive experience  because you're not just a number.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <FaHandshake className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-semibold mb-2">Commitment & Trust</h3>
          <p className="text-sm text-gray-600">
            With SecureLife, you're entering into a partnership built on integrity, transparency, and lasting relationships.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <FaRegSmile className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-semibold mb-2">Customer Satisfaction</h3>
          <p className="text-sm text-gray-600">
            Your happiness and financial security are our mission. That’s why 97% of our customers stay with SecureLife.
          </p>
        </div>
      </div>

      <div className="mt-20 max-w-4xl mx-auto text-center">
        <h4 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Our Vision</h4>
        <p className="">
          We envision a world where every family, business, and individual can thrive knowing their future is protected.
          Through digital innovation and human connection, <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-medium">SecureLife</span> is building the future of insurance.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
