mapboxgl.accessToken = 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag';

var listingData = [{
    listing_id: "welcome",
    long: -77.356746,
    lat: 38.957575,
    description: "<h1>Welcome Test</h1> <p>"
}, {
    listing_id: "home",
    long: -77.321264,
    lat: 38.943057,
    description: "<h1>Home Popup</h1> <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>"
}, {
    listing_id: "listing1",
    long: -77.321264,
    lat: 38.941288,
    description: "<h1>Listing 1</h1> <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>"
}, {
    listing_id: "listing2",
    long: -77.356746,
    lat: 38.957575,
    description: "<h1>Listing 2</h1><p>Capitalise on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>"
}, {
    listing_id: "listing3",
    long: -77.358875,
    lat: 38.960888,
    description: "<H1>Listing 3</h1><p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>"
}, {
    listing_id: "listing4",
    long: -77.346688,
    lat: 38.939768,
    description: "<h1>Listing 4</h1><p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.</p>"
}, {
    listing_id: "listing5",
    long: -77.353314,
    lat: 38.930015,
    description: "<h1>Listing 5</h1><p>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.</p>"
}, {
    listing_id: "listing6",
    long: -77.372076,
    lat: 38.973816,
    description: "<h1>Listing 6</h1><p>Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.</p>"
}, {
    listing_id: "listing7",
    long: -77.345066,
    lat: 38.974635,
    description: "<h1>Listing 7</h1><p>Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.</p>"
}, {
    listing_id: "listing8",
    long: -77.399277,
    lat: 38.946185,
    description: "<h1>Listing 8</h1><p>Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. Holistically pontificate installed base portals after maintainable products.</p>"
}, {
    listing_id: "listing9",
    long: -77.396404,
    lat: 38.986175,
    description: '<h1>Listing 9</h1><p>Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking. Completely pursue scalable customer service through sustainable potentialities.</p>'
}]

var listings = {
    'welcome': {
        // bearing: 0,
        duration: 4000,
        center: [listingData[0].long, listingData[0].lat],
        zoom: 12
    },
    'home': {
        // bearing: 27,
        duration: 8000,
        center: [listingData[1].long, listingData[1].lat],
        zoom: 15
    },
    'listing1': {
        duration: 6000,
        center: [listingData[2].long, listingData[2].lat],
        // bearing: 150,
        zoom: 15
    },
    'listing2': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[3].long, listingData[3].lat],
        zoom: 15,
    },
    'listing3': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[4].long, listingData[4].lat],
        zoom: 15
    },
    'listing4': {
        duration: 6000,
        // bearing: 45,
        center: [listingData[5].long, listingData[5].lat],
        zoom: 15,
    },
    'listing5': {
        duration: 6000,
        // bearing: 180,
        center: [listingData[6].long, listingData[6].lat],
        zoom: 15
    },
    'listing6': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[7].long, listingData[7].lat],
        zoom: 15
    },
    'listing7': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[8].long, listingData[8].lat],
        zoom: 15
    },
    'listing8': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[9].long, listingData[9].lat],
        zoom: 15
    },
    'listing9': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[10].long, listingData[10].lat],
        zoom: 15
    }
};
