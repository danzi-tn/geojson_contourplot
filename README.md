## Geojson Contour Plot Example

An example of geojson displayed as contour plot

![Screenshot](images/screenshot.png)

### The background is using GeoJSON with Leaflet

Use L.geoJSON(geojsondata) as explaind in  [Leaflet documentation](https://github.com/Leaflet/Leaflet/blob/master/docs/examples/geojson/index.md)

For example:

```
        L.geoJSON(geojsondata, {
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.label) {
                    // Edit here for an improved popup
                    var popupContent = "label = " + feature.properties.label;
                    layer.bindPopup(popupContent);
                }
            }
        }).addTo(mymap);
```

### Using GeoJSON with Leaflet
