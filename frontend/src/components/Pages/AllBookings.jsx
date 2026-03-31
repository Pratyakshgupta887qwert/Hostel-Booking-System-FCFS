import BackendLimitedNotice from "../BackendLimitedNotice";

const AllBookings = () => (
  <BackendLimitedNotice
    title="All Bookings"
    description="The booking table is disabled because the backend does not expose any booking-list endpoint."
    points={[
      "Hardcoded booking records were removed so the frontend reflects real backend capabilities.",
      "The admin dashboard and room management pages still use live backend data.",
      "Once a booking list API exists, this page can be connected through the shared API layer.",
    ]}
  />
);

export default AllBookings;
