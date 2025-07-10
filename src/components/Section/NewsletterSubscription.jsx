import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewsletterSubscription = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Newsletter data:", data);

    // 🔄 Backend fetch to save the data (adjust URL later)
    fetch("https://your-api.com/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.insertedId || result.success) {
        toast.success("Subscribed successfully!");
        reset();
      } else {
        toast.error("Failed to subscribe. Try again.");
      }
    })
    .catch(() => toast.error("Network error!"));
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-4">Stay Updated</h2>
        <p className=" mb-6">
          Subscribe to our newsletter for the latest updates, tips, and insurance news.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.name.message}</p>
            )}
          </div>
          <div className="md:col-span-1">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                }
              })}
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
            )}
          </div>
          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full h-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-md transition hover:opacity-90"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
