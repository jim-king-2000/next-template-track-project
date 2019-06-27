import { VehicleSelector } from 'location-backbone-fe';

export default ({ store, ...props }) => 
  <VehicleSelector
    overflow='auto'
    vehicles={store.vehicles}
    onChange={store.pickVehicle}
    {...props} />
;
