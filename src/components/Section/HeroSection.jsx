import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    heading: "Secure Your Tomorrow Today",
    sub: "Trusted Life Insurance for Every Stage of Life",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    heading: "Protect What Matters Most",
    sub: "Plans Made Just For You and Your Family",
    image:
      "../../../young-family-with-their-sons-home-having-fun.jpg",
  },
  {
    heading: "Your Future, Our Priority",
    sub: "Affordable & Reliable Insurance Solutions",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=80",
  },
];

const HeroSection = () => {
  return (
    <div className="w-full h-[70vh] mb-8">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        showArrows={false}
        swipeable={true}
        emulateTouch={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[70vh]">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[70vh] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {slide.heading}
                </h2>
                <p className="text-white mb-6">{slide.sub}</p>
                <Link to="/policies">
                  <button className="bg-gradient-to-r from-sky-500 to-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300">
                    Get a Free Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
