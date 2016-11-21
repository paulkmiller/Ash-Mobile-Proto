(function() {
  if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
    return;
  }

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-77.356746, 38.957575],
      zoom: 12
  });


  //////////////////////////////////////////////////////////
  ///// GeoJSON for Listing Placement + Tooltip Info ///////
  //////////////////////////////////////////////////////////

  var markerPoints = [];
  function coordinateToMarkerPoint(description, long, lat, listing_id) {
      return {
          "type": "Feature",
          "properties": {
              "listing_id":  listing_id,
              "description": description,
              "iconSize":    [20, 20],
              "icon":        "circle"
          },
          "geometry": {
              "type":        "Point",
              "coordinates": [long, lat]
          }
      };
  }

  $.each(listingData, function(index, listing_hash) {
      var marker = coordinateToMarkerPoint(listing_hash.description, listing_hash.long, listing_hash.lat, listing_hash.listing_id);
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

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['listings'] });
    if (!features.length) { return; }
    var feature = features[0];

    clicked_listing_id = feature.listing_id;
    console.log(clicked_listing_id);
  });

  // establish Swing variables and initialize card functionality
  var listingsArray     = [];
  var ul                = $('.listings');
  var activeListingName = 'welcome';

  var config = {
    minThrowOutDistance: 500,
    maxThrowOutDistance: 500,
    maxRotation: 0,
    throwOutConfidence: function(offset, element) {
      return Math.min(Math.abs(offset) / (element.offsetWidth / ((1+5*.65)/2)), 1); // Fix dropout distance by dividing by 2
    }
  };

  var stack = gajus.Swing.Stack(config);


  // revert the ul li order since Swing displays them last to first
  ul.children().each(function(i,li) {
    ul.prepend(li);
  });

  listingsArray.forEach.call($('.listings li'), function (targetElement) {
      stack.createCard(targetElement);
      targetElement.classList.add('in-deck');
  });


  stack.on('throwout', function (e) {
    var target = e.target;
    target.classList.remove('in-deck');
    target.classList.remove('top');
    nextCard(target);

  });

  stack.on('throwin', function (e) {
      e.target.classList.add('in-deck');
  });


  function nextCard(target) {
    var $topCard = $('.listings').find('li.in-deck').not($(target)).last();
    $topCard.addClass('top');
    map.flyTo(listings[$topCard.attr("id")]);
  }

  $(document).on('click', '.listings li.top', function(target, e) {
    $this   = $(this);
    $info   = $('table');
    $footer = $('footer');

    $this.toggleClass('expanded');
    $info.toggleClass('show');
    $footer.toggleClass('show');

    if ($this.hasClass('expanded')) {
      $this.addClass('expanded');
      $info.addClass('show');
      $footer.addClass('show');
    } else {
      $this.removeClass('expanded');
      $info.removeClass('show');
      $footer.removeClass('show');
    }
  });
})();
