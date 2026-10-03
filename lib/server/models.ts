import type { Destination, TravelPackage } from "@/types";

export type EnquiryStatus = "new" | "contacted" | "quoted" | "won" | "closed";
export type BookingStatus = "pending" | "approved" | "paid" | "completed" | "cancelled";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  startPoint: string;
  finishPoint: string;
  travelDate: string;
  guests: number;
  notes: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

export type SiteSettings = {
  bookingApprovalThresholdUsd: number;
  hideDraftPackages: boolean;
  requireContentReview: boolean;
};

export type Database = {
  destinations: Destination[];
  packages: TravelPackage[];
  enquiries: Enquiry[];
  bookings: Booking[];
  settings: SiteSettings;
};
