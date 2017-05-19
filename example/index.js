/**
 *
 */
(function main() {
  const map = L.map('map', {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 1
  });

  L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const url = '/{z}/{x}/{y}';

  const vtLayer = new L.VectorTiles(url, {
    map,
    getFeatureId: f => f.id,
    style: {}
  }).addTo(map);

  map.on('click', e => {
    const buf = .00001;
    const { lat, lng } = e.latlng;
    vtLayer.search(
      L.latLng({ lat: lat - buf, lng: lng - buf }),
      L.latLng({ lat: lat + buf, lng: lng + buf })
    ).forEach(id => vtLayer.setFeatureStyle(id, { color: 'red' }));
  });
})();