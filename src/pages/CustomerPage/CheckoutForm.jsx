// CheckoutForm.jsx
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CheckoutForm = ({ application, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const res = await axios.post("https://life-insurance-management-server.vercel.app/create-payment-intent", {
      amount: parseInt(application.premium) * 100,
    });

    const clientSecret = res.data.clientSecret;

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: application.email,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      await axios.patch(`https://life-insurance-management-server.vercel.app/applications/${application._id}/pay`, {
        transactionId: paymentIntent.id,
      });
      toast.success("Payment successful!");
      navigate("/dashboard/payment/:email");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn bg-gradient-to-b from-sky-400 to-blue-600
 text-white w-full"
      >
        {processing ? "Processing..." : `Pay ${application.premium} BDT`}
      </button>
    </form>
  );
};

export default CheckoutForm;