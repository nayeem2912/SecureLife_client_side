import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    message: "SecureLife made buying insurance easy and fast. Highly recommend!"
  },
  {
    name: "Michael Brown",
    image: "https://i.pravatar.cc/150?img=20",
    rating: 4,
    message: "The dashboard is user-friendly and support is great!"
  },
  {
    name: "Emily White",
    image: "https://i.pravatar.cc/150?img=30",
    rating: 5,
    message: "Quick quote calculation and smooth experience. Loved it!"
  },
  {
    name: "David Lee",
    image: "https://i.pravatar.cc/150?img=40",
    rating: 5,
    message: "I could track my claims in real-time. This platform rocks!"
  },
  {
    name: "Ava Smith",
    image: "https://i.pravatar.cc/150?img=50",
    rating: 4,
    message: "Very modern and easy-to-use platform. Recommended!"
  }
];

const CustomerReviews = () => {
  return (
    <section className="py-12  px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
        What Our Customers Say
      </h2>

      <div className="max-w-lg mx-auto">
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay
          infiniteLoop
          interval={5000}
          showArrows={true}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-6 rounded-xl border border-blue-100"
            >
              <div className="flex items-center justify-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-40 h-70 rounded border-4 border-blue-400"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center">{review.name}</h3>

              <div className="flex justify-center mt-2 mb-4 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="text-gray-600 text-center max-w-lg mx-auto italic">“{review.message}”</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CustomerReviews;
