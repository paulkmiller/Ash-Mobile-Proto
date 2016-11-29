$(function() {
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

  map.on('click', function (e, target) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['listings'] });
    if (!features.length) { return; };
    feature = features[0].properties;

    clicked_listing_id = feature.listing_id;
    card_id = $('.listings li').map(function(){ return $(this).attr('id') });


    $.each(card_id, function(index, value){
        if (value == clicked_listing_id){
            console.log(value);
            console.log("hey")
            // throws card back into deck on icon click;
            stack.getCard(document.getElementById(value)).throwIn(1,1);
            // TODO: figure out how to put card on top of deck-- currently places card in-deck based on original DOM order
            // TODO: flyTo(clickedlocation).after(cardHasBeenInserted);
        } else {
          return;
        }
    });
  });


  stack.on('throwout', function (e) {
    var target = e.target;
    target.classList.remove('in-deck');
    target.classList.remove('top');
    target.classList.add('out-of-deck');
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


  // TODO: Turn Anonymous function into named function for performance boost
  $(document).on('click', '.listings li .info', function(e) {
    $listings     = $('.listings');
    $listingsCard = $('.listings li.top');
    $table        = $('.listings li.top table');
    $footer       = $('.listings li.top footer');

    // condition ? value-if-true : value-if-fale

    // if ($('.viewport .listings').has('.listings-full')) { keep '.expanded' from being removed } else { keep keeping '.expanded' from being removed }

    $listings.toggleClass('listings-full');
    $listingsCard.toggleClass('full expanded');
    $table.toggleClass('show');
    $footer.toggleClass('show');

    if ($listings.hasClass('listings-full')) {
      $listings.addClass('listings-full');
      $listingsCard.addClass('full expanded');
      $table.addClass('show');
      $footer.addClass('show');
    } else {
      $listings.removeClass('listings-full');
      $listingsCard.removeClass('full');
      $table.removeClass('show');
      $footer.removeClass('show');
    }
    return false
  });

  $(document).on('click', '.listings li.top', function(target, e) {
    $this   = $(this);
    $table  = $('.top table');
    $footer = $('.top footer');

    $this.toggleClass('expanded');
    $table.toggleClass('show');
    $footer.toggleClass('show');


    if ($this.hasClass('expanded')) {
      $this.addClass('expanded');
      $table.addClass('show');
      $footer.addClass('show');
    } else {
      $this.removeClass('expanded');
      $table.removeClass('show');
      $footer.removeClass('show');
    }
  });
});
