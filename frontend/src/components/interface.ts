// Interface for Address details
export interface IAddress {
  city: string;
  pincode: number;
  street: string;
  state: string
}

// Interface for User details
export interface IUser {
  _id: string;
  name: string;
  password: string;
  email: string;
  phno: string;
  address: IAddress,
  role: string,
  empsapid: number,
  rmsapid: number
}

// Interface for Booking details
export interface IBooking {
  isCancelled: boolean;
  _id: string;
  approver: string;
  booking_id: string;
  status: string;
  cabType: string;
  date: string;
  dropLocation: string;
  endTime: string;
  frequency: string;
  mobileNumber: string;
  pickupLocation: string;
  projectCode: string;
  reason: string;
  startTime: string;
}

export interface ICredentials{
  email: string;
  password: string
}

// Interface for form field details
export interface IField {
  name: string;
  type: string;
  label: string;
  options?: { value: string; label: string }[];
}

// Interface for application state
export interface AppState {
  data: [];
  isDataLoaded: boolean;
  error: string;
}

// Interface for Cab Request details
export interface CabRequest {
  pickupLocation: string;
  dropLocation: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  mobileNumber: string;
  cabType: string;
  frequency: 'single' | 'recurring';
  projectCode: string;
  approver: string;
  rmsapid: number;
  empsapid: number
}