<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { totalScore, totalGuessed, data, currIframeURL } from '$lib/stores/store';
    import { findDistance } from '$lib/utils';
    import getScore from "$lib/getScore.js";
    import markerIcon from "$lib/imgs/marker-icon.png";

    let leaflet,
        mapElem,
        map, 
        placeData=[], 
        placeName,
        placeCoords=[],
        placeURL,
        shownPlaces=[],
        currPlace=[],
        coords=[27.700001, 85.333336],
        polyCoords=[],
        polyLine,
        mapSize='small',
        showGuess=false,
        guessed=false,
        showNext=false,
        markerOn=false,
        canMark=true,
        smallSize=false,
        mapMarker,
        distance,
        score=100,
        totScore,
        totGuessed=0;

    totalScore.subscribe(value => totScore=value);
    data.subscribe(value => placeData=value);

    const createMap=zoom=>{
        map = leaflet.map(mapElem, { zoomControl: zoom }).setView(coords, 13);

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        const myIcon = leaflet.icon({
            iconUrl: markerIcon,
            iconSize:     [27, 45], 
            iconAnchor:   [15, 45]
        });

        if(markerOn) mapMarker=leaflet.marker(coords, {icon: myIcon}).addTo(map);

        map.on('click', e=>{
            if(!canMark) return;
            if(mapSize=='small') { 
                changeMapSize('big');
                return;
            }
            if(mapMarker) map.removeLayer(mapMarker);
            markerOn=true;
            coords=[map.mouseEventToLatLng(e.originalEvent).lat, map.mouseEventToLatLng(e.originalEvent).lng];
            mapMarker=leaflet.marker(coords, {icon: myIcon}).addTo(map);
        })
    }
    const changeMapSize=size=>{
        mapSize=size;

        if(mapSize=='big'){
            map.remove();
            mapElem.style.width=smallSize?"90vw":"550px";
            mapElem.style.height="412px";
            createMap(true);
        }
        else if(mapSize=='small'){
            map.remove();
            mapElem.style.width="200px";
            mapElem.style.height="150px";
            createMap(false);
        }
    }
    const handleGuessClick=()=>{
        distance=findDistance(placeCoords[0], placeCoords[1], coords[0], coords[1]).toFixed(2);
        // score=distance>.75?Math.floor(100-((distance*10)*Math.floor(distance*2.5))):Math.floor(100-(distance*10));
        score=getScore(distance);

        totalScore.update(value => value+score);

        showGuess=false;
        guessed=true;
        showNext=true;
        canMark=false;

        const myIcon = leaflet.icon({
            iconUrl: markerIcon,
            iconSize:     [27, 45], 
            iconAnchor:   [15, 45]
        });

        mapMarker=leaflet.marker(placeCoords, {icon: myIcon}).addTo(map)
        // adding polyline
        polyCoords=[placeCoords,coords];
        polyLine=leaflet.polyline(polyCoords, {color: 'red'}).addTo(map);

        totGuessed++;
        if(totGuessed>shownPlaces.length) totGuessed=shownPlaces.length;
        
        totalGuessed.set(totGuessed);
    }
    const handleNextClick=()=>{
        coords=[27.700001, 85.333336]
        markerOn=false;
        showNext=false;
        guessed=false;
        canMark=true;

        // removing polyline
        if(polyLine) polyLine.remove(map);
        changeMapSize('small');
        getPlaceData();
    }
    const getPlaceData=()=>{
        if(placeData.length==shownPlaces.length) return;

        let indPlace=placeData[Math.floor(Math.random()*placeData.length)];

        if(shownPlaces.includes(indPlace)) {
            getPlaceData();
            return;
        }

        shownPlaces.push(indPlace);
        shownPlaces=[...shownPlaces];

        placeName=indPlace.name;
        placeCoords=indPlace.coords;
        placeURL=indPlace.iframeURL;  
        
        currIframeURL.set(indPlace.iframeURL);
        currPlace=indPlace;
    }
    getPlaceData();
    const handleResize=()=>{
        if(window.innerWidth>585) smallSize=false;
        else smallSize=true;

        if(map && mapSize=="big") changeMapSize(mapSize)
    }
    handleResize();

    onMount(async () => {
        if(browser) {
            leaflet = await import('leaflet');

            createMap();
        }
    })
    onDestroy(async ()=>{ 
        if(map) map.remove();
    })

    $:{
        if(mapSize=='big' && guessed){
            showNext=true;
        }
        else if(mapSize=='big' && markerOn && !guessed) {
            showGuess=true;
        }
        else {
            showGuess=false;
            showNext=false;
        }
    }
</script>

<svelte:window on:resize={handleResize}></svelte:window>

<div bind:this={mapElem} class="map-elem"></div>
{#if mapSize=='big'}
    <i on:click={()=>changeMapSize('small')} class="fa-solid fa-minimize min-max"></i>
{:else}
    <i on:click={()=>changeMapSize('big')} class="fa-solid fa-maximize min-max"></i>
{/if}
{#if showGuess}
    <button on:click={handleGuessClick} class="guess-btn">
        <i class="fa-solid fa-map-location-dot"></i>
        <span>guess</span>
    </button>
{:else if showNext || guessed}
    <button on:click={handleNextClick} class="next-btn">
        <i class="fa-solid fa-arrow-right"></i>
        <span>next</span>
    </button>
{/if}
{#if distance && showNext}
    <div class="distance-score-txt">
        {#if currPlace.name}
            <li>Place: <i><b>{currPlace.name}</b></i></li>
        {/if}
        <li>Distance difference: <i><b>{distance} km</b></i></li>
        <li>Points: <i><b>{score}</b></i>.</li>
    </div>
{/if}
    
<style>
    @import 'leaflet/dist/leaflet.css';
    .map-elem {
        width: 200px;
        height: 150px;
        border-radius: 3px;
        border: none;
        outline: none;
        position: relative;
    }
    .min-max{
        padding: .25rem;
        font-size: 1.5rem;
        color: #808080;
        z-index: 1000;
        cursor: pointer;
        position: absolute;
        top: .25rem;
        right: .25rem;
        transition: .3s;
    }
    i:hover{
        color: #4b4b4b;
    }
    .guess-btn, .next-btn{
        height: 40px;
        width: 125px;
        padding: .5rem 1rem;
        font-size: 1.1rem;
        background-color: rgb(253, 136, 136);
        color: #fff;
        border: 2px solid #81adfd;
        border-radius: 3px;
        outline: none;
        transition: .3s;
        z-index: 1000;
        position: absolute;
        right: .5rem;
        bottom: .5rem;
    }
    .guess-btn:hover, .next-btn:hover{
        border-color: #2a73fc;
    }
    .guess-btn i, .next-btn i{
        margin-right: .5rem;
    }
    .distance-score-txt{
        width: 350px;
        padding: .25rem .5rem;
        position: absolute;
        bottom: 3.5rem;
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 3px;
        z-index: 1000;
    }
</style>