// CustomerReviews.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CustomerReviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["customerReviews"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/reviews");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Reviews</h2>
      <Carousel
        showArrows
        infiniteLoop
        autoPlay
        interval={4000}
        showThumbs={false}
        centerMode
        centerSlidePercentage={35}
        showStatus={false}
        className="center-slide"
      >
        {reviews.map((review) => (
          <div key={review._id} className="review-card bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src={review.photo || "/default-avatar.png"}
              alt={review.name}
              className="w-50 h-60 mx-auto rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">{review.name}</h3>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.262 3.89a1 1 0 00.95.69h4.104c.969 0 1.371 1.24.588 1.81l-3.32 2.412a1 1 0 00-.364 1.118l1.262 3.89c.3.921-.755 1.688-1.54 1.118l-3.32-2.413a1 1 0 00-1.175 0l-3.32 2.413c-.784.57-1.838-.197-1.539-1.118l1.261-3.89a1 1 0 00-.364-1.118L2.097 9.317c-.783-.57-.38-1.81.588-1.81h4.105a1 1 0 00.95-.69l1.262-3.89z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600">{review.feedback}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomerReviews;
