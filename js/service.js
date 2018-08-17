var getServiceData = function(resource, callback){
    /* see https://api.jquery.com/jquery.getjson/

    equivalent to:

        $.ajax({
            dataType: "json",
            url: url,
            data: data,
            success: success
        });
        
    ***/
    $.getJSON('data/'+resource+'.geojson', callback);
};

var getMyCenter = function() {
    return [43.784551525138681, 11.264225889245179];
};

//  the "index" property is used for the colormap (RdYlGn)
var mapContourColors = function (feature) {
    switch (feature.properties.index) {
        case 0: return { color: "#1a9641", opacity: 1, weight: 0.8 };
        case 1: return { color: "#42a94d", opacity: 1, weight: 0.8 };
        case 2: return { color: "#6abd58", opacity: 1, weight: 0.8 };
        case 3: return { color: "#92d064", opacity: 1, weight: 0.8 };
        case 4: return { color: "#b3df76", opacity: 1, weight: 0.8 };
        case 5: return { color: "#ccea8f", opacity: 1, weight: 0.8 };
        case 6: return { color: "#e6f5a8", opacity: 1, weight: 0.8 };
        case 7: return { color: "#ffffc0", opacity: 1, weight: 0.8 };
        case 8: return { color: "#ffe8a5", opacity: 1, weight: 0.8 };
        case 9: return { color: "#fed18a", opacity: 1, weight: 0.8 };
        case 10: return { color: "#feba6f", opacity: 1, weight: 0.8 };
        case 11: return { color: "#f89957", opacity: 1, weight: 0.8 };
        case 12: return { color: "#ed6e43", opacity: 1, weight: 0.8 };
        case 13: return { color: "#e2432f", opacity: 1, weight: 0.8 };
        case 14: return { color: "#d7191", opacity: 1, weight: 0.8 };
    }
};

//  the "vul_max" property is used for the colormap (RdYlGn)
var mapBuildingsColors =  function (feature) {
    switch (feature.properties.vul_max) {
        case 0: return { fillColor: "#1a9641", color: "#1a9641", opacity: 1, fillOpacity: 0.8 };
        case 1: return { fillColor: "#c4e687", color: "#c4e687", opacity: 1, fillOpacity: 0.8 };
        case 2: return { fillColor: "#fec981", color: "#fec981", opacity: 1, fillOpacity: 0.8 };
        case 3: return { fillColor: "#d7191c", color: "#d7191c", opacity: 1, fillOpacity: 0.8 };
    }
};