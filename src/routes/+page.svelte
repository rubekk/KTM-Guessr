<script>
    import "./../app.css";
    import Share from "./../components/Share.svelte";
    import OnLoad from "../components/OnLoad.svelte";
    import Map from "./../components/Map.svelte";
    import Audio from "../components/Audio.svelte";
    import What from "../components/What.svelte";
    import { canShowShare, canShowWhat, totalScore, totalGuessed, currIframeURL } from "$lib/stores/store";

    let showShare,
        showWhat,
        iframeURL,
        totScore,
        totGuessed,
        loaded=false;

    canShowShare.subscribe(value => showShare=value);
    canShowWhat.subscribe(value => showWhat=value);
    currIframeURL.subscribe(value => iframeURL=value);
    totalScore.subscribe(value => totScore=value);
    totalGuessed.subscribe(value => totGuessed=value);
        
    const setShareToTrue=()=> canShowShare.set(true);
    const setWhat=()=>{
        if(showWhat) canShowWhat.set(false);
        else canShowWhat.set(true);
    }

    setTimeout(()=>{
        loaded=true
    },2000);
</script>

<div class="main">
    {#if !loaded}
    <OnLoad />
    {:else}
    <div class="header">
        <div class="title">
            <span class="ktm-txt">KTM</span><span class="guessr-txt">GUESSR</span>
        </div>
        <div class="share">
            {#if !showShare}
                <div class="share-false">
                    <i class="fa-solid fa-share"></i>
                    <span on:click={setShareToTrue}>share</span>
                </div>
            {:else}
                <div class="share-true">
                    <Share />
                </div>
            {/if}
        </div>
    </div>
    <div class="container">
        <iframe src="{iframeURL}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="audio">
            <Audio />
        </div>
        <div class="score">
            <span class="score-txt">total score:</span><span class="score-num">{totScore} ({totGuessed})</span>
        </div>
        <div class="map">
            <Map />
        </div>
        <div class="info">
            <i on:click={setWhat} class="fa-solid fa-question"></i>
        </div>
        {#if showWhat}
            <div class="what-info">
                <What />
            </div>
        {/if}
    </div>
    {/if}
</div>

<style>
    .main{
        font-family: 'Poppins', sans-serif;
    }
    .header{
        padding: .5rem 2rem;
        height: 80px;
        background-color: rgb(88, 88, 88);
        color: #fff;
        border-bottom: 2px solid #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
    }
    .title{
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: .2rem;
    }
    .ktm-txt{
        padding: 0 .25rem;
        color: rgb(255, 35, 35);
        background-color: #81adfd;
    }
    .guessr-txt{
        padding: 0 .25rem;
        color: #2a73fc;
        background-color: rgb(253, 136, 136);
    }
    .share{
        display: flex;
        align-items: center;
    }
    .share i{
        margin-right: .75rem;
        font-size: 1.25rem;
    }
    .share span{
        font-size: 1.1rem;
    }
    .share span:hover{
        text-decoration: underline;
    }
    .container{
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: -1;
    }
    .audio{
        position: absolute;
        top: 6rem;
        left: 1rem;
    }
    .score{
        width: max-content;
        height: 40px;
        padding: .5rem 1rem;
        background-color: rgb(253, 136, 136);
        color: #fff;
        border: 2px solid #81adfd;
        border-radius: 3px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 6rem;
    }
    .score{
        right: 1rem;
    }
    .score-txt{
        margin-right: .5rem;
    }
    .map{
        position: absolute;
        bottom: 1rem;
        left: 1rem;
    }
    .info{
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    }
    .info i{
        padding: 0 .5rem;
        color: #fff;
        font-size: 1.5rem;
        background-color: rgba(0,0,0,.5);
        padding: .25rem .5rem;
        cursor: pointer;
    }
    .what-info{
        width: 400px;
        padding: 4rem .5rem .5rem;
        position: absolute;
        right: .5rem;
        bottom: 3rem;
    }
    .info i:hover{
        background-color: rgba(0,0,0,.6);
    }
    iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 110%;
        height: 105%;
    }
    @media(max-width: 550px){
        .share-true{
            position: absolute;
            z-index: 1000;
            right: 1rem;
            top: 1rem;
        }
        iframe{
            width: 115%;
        }
    }
    @media(max-width: 400px){
        .header{
            padding: .5rem 1rem;
        }
        .share i{
            margin-right: .5rem;
        }
        iframe{
            width: 120%;
        }
        .what-info{
            width: 350px;
        }
    }
    @media(max-width: 375px){
        .what-info{
            width: 325px;
        }
    }
    @media(max-width: 350px){
        .title{
            font-size: 1.3rem;
        }
        .what-info{
            width: 300px;
        }
    }
</style>