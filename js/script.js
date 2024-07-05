getGeoJSON()

async function getGeoJSON() {
    const url = " https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const dataPromise = await fetch(url)
    const data = await dataPromise.json()
    initMap(data)
}


function initMap(data) {
    let map = L.map("map" ,{
        minZoom: -3,
        
    })
    console.log(data);
    let geojason = L.geoJSON(data, {
        weight: 2,
        onEachFeature: getFeature
    }).addTo(map)
    console.log(geojason);
    map.fitBounds(geojason.getBounds())

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map);

}

function getFeature(feature, layer) {
    layer.bindTooltip(feature.properties.nimi)
}
