export interface Address {
    fullName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    addressType: 'home' | 'work';
  }