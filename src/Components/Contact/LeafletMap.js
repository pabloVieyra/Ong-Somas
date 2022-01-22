import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import s from '../../Styles/Contact/LeafletMap.module.css';

const LeafletMap = ({ address }) => {
  const formattedAddress = JSON.parse(address);

  return (
    <div className={s.container}>
      <h2 className={s.map_title}>Encontranos en:</h2>
      <MapContainer
        center={formattedAddress}
        className={s.map_container}
        scrollWheelZoom={false}
        zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={formattedAddress}>
          <Popup>Somos más</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
