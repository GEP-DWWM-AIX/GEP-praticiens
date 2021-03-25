let mymap = '';
const getMap = async (arrayOfAddress, vueMode) => { 
    var promiseArray = [];
    arrayOfAddress.forEach(address => {
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw`;
        promiseArray.push(fetch(url).then(response => response.json()))
    });
    let res = await Promise.all(promiseArray);
 
    if(mymap !== ''){
        mymap.remove();
    }
    // initialize the map on the "map" div with a given center and zoom
    mymap = L.map('mapid').setView([43.336451, 5.367485], 13);
    var group = new L.featureGroup();
    res.forEach((coord) => {
        L.marker([coord.features[0].center[1], coord.features[0].center[0]]).addTo(group).addTo(mymap);
    });
    mymap.fitBounds(group.getBounds());

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: `mapbox/${vueMode}`,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw'
    }).addTo(mymap);

    
}
