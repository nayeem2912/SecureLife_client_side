import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown, FaThumbsUp } from "react-icons/fa";

const FAQs = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const [faqData, setFaqData] = useState([
    {
      id: 1,
      question: "What is LifeSure and how does it work?",
      answer:
        "LifeSure is a digital insurance platform that helps you get instant quotes, apply for policies online, and track your claims in real-time.",
      helpfulCount: 12,
      open: false,
    },
    {
      id: 2,
      question: "How can I apply for a life insurance policy?",
      answer:
        "You can apply through our 100% online application process. Choose a policy, fill in your details, and submit documents securely.",
      helpfulCount: 8,
      open: false,
    },
    {
      id: 3,
      question: "Can I modify or cancel my policy later?",
      answer:
        "Yes, based on the policy terms. You can contact our support agents or view options in your personalized dashboard.",
      helpfulCount: 5,
      open: false,
    },
    {
    id: 4,
    question: "Is my personal data secure on LifeSure?",
    answer:
      "Yes, we use advanced encryption and secure authentication to protect all user data, including documents and payment information.",
    helpfulCount: 14,
    open: false,
  },
  {
    id: 5,
    question: "How do I contact an insurance agent for help?",
    answer:
      "You can use the 'Meet Our Agents' section or the live chat to connect with an available certified agent instantly.",
    helpfulCount: 6,
    open: false,
  },
  {
    id: 6,
    question: "How long does it take to approve a policy?",
    answer:
      "Most policies are approved within 24 to 48 hours after document verification. You'll receive an email once it’s active.",
    helpfulCount: 9,
    open: false,
  },
  {
    id: 7,
    question: "Can I track my claim status online?",
    answer:
      "Absolutely! Once your claim is submitted, you can log in to your dashboard and track the status in real-time.",
    helpfulCount: 11,
    open: false,
  },
  ]);

  const toggleFAQ = (id) => {
    setFaqData((prev) =>
      prev.map((faq) =>
        faq.id === id ? { ...faq, open: !faq.open } : { ...faq, open: false }
      )
    );
  };

  const handleHelpfulVote = (id) => {
    setFaqData((prev) =>
      prev.map((faq) =>
        faq.id === id
          ? { ...faq, helpfulCount: faq.helpfulCount + 1 }
          : faq
      )
    );
  };

  return (
    <section className="px-4 lg:px-20 py-12">
      <h2
        data-aos="fade-up"
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-b from-sky-400 to-blue-600 text-transparent bg-clip-text"
      >
        FAQs & Forum
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="border border-blue-100 rounded-lg shadow p-4 transition duration-300 bg-white"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full text-left flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <FaChevronDown
                className={`transform transition duration-300 ${
                  faq.open ? "rotate-180" : ""
                }`}
              />
            </button>

            {faq.open && (
              <div className="mt-3 text-sm text-gray-600">
                <p>{faq.answer}</p>
                <button
                  onClick={() => handleHelpfulVote(faq.id)}
                  className="flex items-center mt-3 text-blue-500 hover:text-blue-700 text-sm"
                >
                  <FaThumbsUp className="mr-1" />
                  Helpful ({faq.helpfulCount})
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
