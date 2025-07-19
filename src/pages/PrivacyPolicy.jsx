const PrivacyPolicy = () => {
  return (
    <div className=" py-16 px-4 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            1. Introduction
          </h2>
          <p className="">
            At <strong>SecureLife</strong>, we are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            2. Information We Collect
          </h2>
          <p className="">
            We may collect personal information including your name, email address, phone number, payment details, and insurance preferences. We also gather usage data like IP address, browser type, and device info.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            3. How We Use Your Data
          </h2>
          <p className="">
            Your data is used to:
            <ul className="list-disc pl-6 mt-2">
              <li>Process insurance applications and claims</li>
              <li>Provide account access and support</li>
              <li>Send important updates and policy notifications</li>
              <li>Improve the functionality and security of our platform</li>
            </ul>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            4. Data Sharing
          </h2>
          <p className="">
            We do not sell your data to third parties. However, we may share information with:
            <ul className="list-disc pl-6 mt-2">
              <li>Insurance agents for policy processing</li>
              <li>Third-party payment processors (e.g., Stripe)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            5. Data Protection
          </h2>
          <p className="">
            We implement security measures such as encryption, secure login, and access control to protect your data from unauthorized access, alteration, or loss.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            6. Cookies & Tracking
          </h2>
          <p className="">
            We use cookies and similar tracking technologies to enhance your experience, analyze traffic, and deliver personalized content. You can disable cookies in your browser settings.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            7. Your Rights
          </h2>
          <p className="">
            You have the right to access, correct, or delete your data. You may also request to stop receiving emails or deactivate your account at any time by contacting our support.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            8. Policy Updates
          </h2>
          <p className="">
            We may update this policy periodically. The most recent version will always be available on this page with the updated date shown below.
          </p>
          <p className="text-sm  mt-2">Last updated: July 16, 2025</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            9. Contact Us
          </h2>
          <p className="">
            If you have any questions or concerns about our privacy policy, feel free to contact us at:
            <br />
            <span className="text-sky-600">privacy@securelife.com</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
