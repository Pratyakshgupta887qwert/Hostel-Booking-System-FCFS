import BackendLimitedNotice from "../BackendLimitedNotice";

const ManualBooking = () => (
  <BackendLimitedNotice
    title="Manual Booking"
    description="The frontend no longer simulates manual allocation because the backend has no matching booking endpoint."
    points={[
      "Current admin APIs support login, hostel management, allowed years, and room upload only.",
      "Showing a fake successful booking here would drift away from the database.",
      "This screen can be wired later once the backend exposes a booking creation route.",
    ]}
  />
);

export default ManualBooking;
