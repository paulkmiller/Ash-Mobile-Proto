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


  map.on('load', function() {
      // Add a GeoJSON source containing place coordinates and information.
      map.addSource("listings", {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": createMarkers(listingData)
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

  function getLocationByListingId(listingId) {
    return listings[listingId];
  }

  function createMarkers(listingData) {
    var markers = []
    $.each(listingData, function(index, listingHash) {
        markers.push({
            "type": "Feature",
            "properties": {
                "listingId":  listingHash.listingId,
                "description": listingHash.description,
                "iconSize":    [20, 20],
                "icon":        "circle",
            },
            "geometry": {
                "type":        "Point",
                "coordinates": [listingHash.long, listingHash.lat]
            }
        });
    });

    return markers;
  }


  //////////////////////////////////////////////////////////
  ///// Cards //////////////////////////////////////////////
  //////////////////////////////////////////////////////////


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


  reverseCardsInDeck();
  addAllCardsToDeck();


  map.on('click', function (e, target) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['listings'] });
    if (!features.length) { return; };

    var clickedListingId = features[0].properties.listingId;
    var cardId = $('.listings li').map(function(){ return $(this).attr('id') });

    $.each(cardId, function(index, value){
        if (value == clickedListingId){
            // throws card back into deck on icon click;
            stack.getCard(document.getElementById(value)).throwIn(1,1);

            // TODO: figure out how to put card on top of deck-- currently places card in-deck based on original DOM order
            // TODO: flyTo(clickedlocation).after(cardHasBeenInserted);

            console.log("Flying to " + value);
            map.flyTo(getLocationByListingId(clickedListingId));
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
    updateTopCard(target);
  });

  stack.on('throwin', function (e) {
    e.target.classList.add('in-deck');
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

  // TODO: Turn Anonymous function into named function for performance boost
  $(document).on('click', '.listings li .info', function(e) {
    $listings     = $('.listings');
    $listingsCard = $('.listings li.top');
    $header       = $('.listings li.top .card-header');
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
      $header.unbind('click');
    } else {
      $listings.removeClass('listings-full');
      $listingsCard.removeClass('full');
      $table.removeClass('show');
      $footer.removeClass('show');
    }
    return false
  });

  function addAllCardsToDeck() {
    listingsArray.forEach.call($('.listings li'), function (targetElement) {
      createCardAndAddToDeck(targetElement)
    });
  }

  function createCardAndAddToDeck(targetElement) {
    stack.createCard(targetElement);
    targetElement.classList.add('in-deck');
  }

  function reverseCardsInDeck() {
    ul.children().each(function(i,li) {
      ul.prepend(li);
    });
  }

  function updateTopCard(target) {
    var $topCard = $('.listings').find('li.in-deck').not($(target)).last();
    $topCard.addClass('top');
    map.flyTo(listings[$topCard.attr("id")]);
  }

});
