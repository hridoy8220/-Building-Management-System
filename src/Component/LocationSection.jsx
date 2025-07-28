import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issues with Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationSection = () => {
  // Example coordinates for Dhaka, Bangladesh
  const position = [23.8103, 90.4125];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-xl shadow-lg my-12">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Apartment Location & How to Get There</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Text Info */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Our apartment is conveniently located in the heart of Dhaka, making commuting easy and hassle-free.
            The address is <span className="font-semibold">1234 Green Residency, Gulshan Avenue, Dhaka 1212</span>.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            You can reach us via:
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>Taxi or rideshare services (Uber, Pathao)</li>
              <li>Public bus routes stopping nearby</li>
              <li>Easy access from major highways</li>
              <li>Close to Gulshan metro station (5 minutes walk)</li>
            </ul>
          </p>
        </div>

        {/* Map */}
        <div className="md:w-1/2 h-72 md:h-96 rounded-lg overflow-hidden shadow-md">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="w-full h-full rounded-lg">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                OneBuilding Apartment<br />1234 Green Residency, Gulshan Avenue
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
