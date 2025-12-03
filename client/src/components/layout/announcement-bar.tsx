import React from "react";

export const AnnouncementBar: React.FC = () => (
  <div
    role="status"
    aria-live="polite"
    className="w-full bg-gray-50 text-center text-xs py-2 text-gray-700 border-b border-gray-200"
    style={{ letterSpacing: "0.02em" }}
  >
    Now open to front-end roles and collaborations for 2025 (remote & hybrid, NJ/NYC).
  </div>
);

export default AnnouncementBar;
