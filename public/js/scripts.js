(function() {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-77.356746, 38.957575],
        zoom: 12
    });

    function add_point_to_map(center) {
        var el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
            .setLngLat(center)
            .addTo(map);
    }

    //////////////////////////////////////////////////////////
    ///// GeoJSON for Listing Placement + Tooltip Info ///////
    //////////////////////////////////////////////////////////

    var markerPoints = []
    function coordinateToMarkerPoint(description, long, lat) {
        return {
            "type": "Feature",
            "properties": {
                "description": description,
                "iconSize": [20, 20],
                "icon": "circle"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [long, lat]
            }
        }
    }

    $.each(listingData, function(index, listing_hash) {
        var marker = coordinateToMarkerPoint(listing_hash.description, listing_hash.long, listing_hash.lat);
        markerPoints.push(marker);
    });

    map.on('load', function() {
        // Add a GeoJSON source containing place coordinates and information.
        map.addSource("listings", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": markerPoints
            }
        });
        // Add a layer showing the places.
        map.addLayer({
            "id": "listings",
            "type": "symbol",
            "source": "listings",
            "layout": {
                "icon-image": "{icon}-15",
                "icon-allow-overlap": true
            }
        });
    });


    // establish Swing variables and intialize card functionality
    var stack = gajus.Swing.Stack();
    var listingsArray = []
    var ul = $('.listings');
    var activeListingName = 'welcome';


    // revert the ul li order since Swing displays them last to first
    ul.children().each(function(i,li){ul.prepend(li)})

    listingsArray.forEach.call($('.listings li'), function (targetElement) {
        stack.createCard(targetElement);
        targetElement.classList.add('in-deck');
    });


    stack.on('throwout', function (e) {
      var target = e.target
      target.classList.remove('in-deck');
      nextCard(target);
    });

    stack.on('throwin', function (e) {
        e.target.classList.add('in-deck');
    });

    function nextCard(target) {
      var $topCard = $('.listings').find('li.in-deck').not($(target)).last()
      $topCard.css("background-color", "red");
      map.flyTo(listings[$topCard.attr("id")]);
    }

})();
