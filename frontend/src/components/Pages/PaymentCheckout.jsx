import BackendLimitedNotice from "../BackendLimitedNotice";

const PaymentCheckout = () => (
  <BackendLimitedNotice
    title="Checkout Status"
    description="Payment checkout is not connected because the backend does not expose room locking, booking creation, or payment endpoints."
    points={[
      "The previous frontend simulated a successful payment, which was not backed by the server.",
      "Student login and hostel eligibility are live; checkout remains intentionally disabled.",
      "This prevents fake confirmations and keeps the frontend aligned with backend reality.",
    ]}
  />
);

export default PaymentCheckout;
