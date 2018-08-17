## Geojson Contour Plot Example

An example of geojson displayed as contour plot

![Screenshot](images/screenshot.png)

This HTML/JS example renders on a Leaflet Map four (4) different geojson files exported from existing vector layers (QGIS). 

The geojson data are the result of a Building Risk Assessment based on a digital model describing Tunneling-induced Ground Settlements.

### The background is using GeoJSON with Leaflet

Use L.geoJSON(geojsondata) as explained in  [Leaflet documentation](https://github.com/Leaflet/Leaflet/blob/master/docs/examples/geojson/index.md)

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

### The Example

The code is plain HTML and Javascript, you can see the result here [index.html](https://danzi-tn.github.io/geojson_contourplot/)

Clone this repository

```
git clone https://github.com/danzi-tn/geojson_contourplot.git
```

If you have python installed on your linux box you can run the page on a local webserver (in run_python_http.sh you can change port 8888 as you prefer), othewise you have to upload the content of geojson_contourplot to your public_html Apache/Nginx directory

```
cd geojson_contourplot
./run_python_http.sh
```

and visit [http://localhost:8888/](http://localhost:8888/)

### The Code

#### Geojson files
Each file contains a single FeatureCollection, i.e. groups of related features combined together.

The alignment's file contains a collection of LineString representing the tunnel track.
```
data/alignments.geojson
```

The profile's file contains a collection of Point representing the sequence of tunnel's chainages (PKs).
```
data/profile_D1.geojson
```

The contour's file contains a collection of MultiLineString representing ground settlements calculated along the tunnel's track.
```
data/D1_contour.geojson
```

The buildings' file contains a collection of MultiPolygon representing the buildings located near the tunnel's track.
```
data/buildings_data.geojson
```

#### index.html and related js

First of all load the ```css``` and ```js``` required for using Leaflet and JQuery 

```
  <!-- Leaflet's CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
        crossorigin="" />

    <!-- Leaflet's javascript, make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
        crossorigin=""></script>

    <!-- jquery  -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
```

```service.js``` contains some js functions I prefer to keep separate from ```index.html```

```
    <!-- provides local service and functions  -->
    <script src="js/service.js" type="text/javascript"></script>
```


Put an element inside the html body as map's placeholder

```
    <div id="mapid" style="width: 1920px; height: 1080px;"></div>
```

Inside the ```<script>``` tag, instantiate the Leaflet Map and define a Mapbox tileLayer (remember to use your token)

```
        var mymap = L.map('mapid').setView( getMyCenter(), 16);

        // Mapbox (mapbox.dark, other options are: mapbox.light, mapbox.satellite  ) tileLayer with accessToken ( you must request an access token )
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.dark',
            accessToken: '<PUT YOUR MAPBOX TOKEN HERE>'
        }).addTo(mymap);
```

For each geojson file you can load the data inside the map and process (```onEachFeature```) each related feature, for example binding a popup with the feature's properties. In this example ```getServiceData``` is a simple wrapper for JQuery's ```$.getJSON```.

```
      getServiceData("alignments",function(data) {
            // Adding the alignments (LineString) geojson
            L.geoJSON(data, {
                style: function (feature) {
                    return { color: "#c1272d", opacity: 1, weight: 0.8 };
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.code) {
                        // TODO edit here for an improved popup
                        var popupContent = "<p>"+feature.properties.code+"</p>";
                        layer.bindPopup(popupContent);
                    }
                }
            }).addTo(mymap);
        });
```