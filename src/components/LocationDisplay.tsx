import { LocationData } from "@/types/form";

interface LocationDisplayProps {
  location: LocationData;
}

const LocationDisplay = ({ location }: LocationDisplayProps) => {
  if (!location.coordinates.latitude || !location.coordinates.longitude) {
    return null;
  }

  return (
    <div className="space-y-2 text-left">
      <div className="text-sm text-gray-600">
        <span className="font-medium">Coordinates: </span>
        {location.coordinates.latitude.toFixed(6)}, {location.coordinates.longitude.toFixed(6)}
      </div>
      {location.address && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Address: </span>
          {location.address}
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;