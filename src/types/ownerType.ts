export interface Location2 {
  lat: number;
  lon: number;
  address: string;
}


export interface mainRoute {
  startLocation: Location2;
  endLocation: Location2;
  distance: number;
}

