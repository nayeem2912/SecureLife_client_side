// PayPolicy.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_payment_key); 

const PayPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: application, isLoading } = useQuery({
    queryKey: ["singleApplication", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/applications/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 my-10 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4 text-center">Complete Your Payment</h2>
      <div className="mb-6 text-center">
        <p><strong>Policy:</strong> {application.policyName}</p>
        <p><strong>Premium:</strong> {application.premium} BDT</p>
        <p><strong>Email:</strong> {application.email}</p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm application={application} navigate={navigate} />
      </Elements>
    </div>
  );
};

export default PayPolicy;


