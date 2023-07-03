<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { totalScore, totalGuessed, data, currIframeURL } from '$lib/stores/store';
    import { findDistance } from '$lib/utils';

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

        let markerIcon=leaflet.icon({
            iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII='
        });


        if(markerOn) mapMarker=leaflet.marker(coords, {icon: markerIcon}).addTo(map);

        map.on('click', e=>{
            if(!canMark) return;
            if(mapSize=='small') { 
                changeMapSize('big');
                return;
            }
            if(mapMarker) map.removeLayer(mapMarker);
            markerOn=true;
            coords=[map.mouseEventToLatLng(e.originalEvent).lat, map.mouseEventToLatLng(e.originalEvent).lng];
            mapMarker=leaflet.marker(coords, {icon: markerIcon}).addTo(map);
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
        score=distance>.75?Math.floor(100-((distance*10)*Math.floor(distance*2.5))):Math.floor(100-(distance*10));
        score=score>0?score:0;

        totalScore.update(value => value+score);

        showGuess=false;
        guessed=true;
        showNext=true;
        canMark=false;

        mapMarker=leaflet.marker(placeCoords).addTo(map)
        // adding polyline
        polyCoords=[placeCoords,coords];
        polyLine=leaflet.polyline(polyCoords, {color: 'red'}).addTo(map);

        totGuessed++;
        if(totGuessed>shownPlaces.length) totGuessed=shownPlaces.length;
        
        totalGuessed.set(totGuessed);

        // console.log(placeData)
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
        let l=placeData.length;
        let indPlace=placeData[Math.floor(Math.random()*l)];
        let includes=false;

        shownPlaces.forEach(elem=>{
            if(elem.name==indPlace.name) includes=true;
        })
        if(includes) getPlaceData();
        else{
            shownPlaces.push(indPlace);
            shownPlaces=[...shownPlaces];

            placeName=indPlace.name;
            placeCoords=indPlace.coords;
            placeURL=indPlace.iframeURL;  
            
            currIframeURL.set(indPlace.iframeURL);
        }

        currPlace=indPlace;

        console.log("p: ",placeData,"s: ",shownPlaces);
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

        // totGuessed=shownPlaces.length-1;
        // totalGuessed.set(totGuessed);
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