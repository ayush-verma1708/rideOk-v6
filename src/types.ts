export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Route {
  startLocation: Location;
  endLocation: Location;
  distance: number;
}

export interface Vehicle {
  averageMileage: number;
  fuelPrice: number;
}

export interface Passenger {
  id: string;
  name: string;
  pickupLocation: Location;
  dropLocation: Location;
  distance: number;
  cost: number;
}
export interface PassengerFormProps {
  mainRoute: Route;
  vehicle: Vehicle;
  onAddPassenger: (passenger: Passenger) => void;
  existingPassengers: Passenger[];
}

