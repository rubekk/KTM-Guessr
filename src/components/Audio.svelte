<script>
    import musicURL from "$lib/wake-up.mp3";

    let audio,
        playMusic=false,
        currVolumeLevel=5;

    const handleMusic=()=>{
        playMusic=!playMusic;

        if(playMusic) {
            audio.play();
            audio.loop=true;
        }
        else audio.pause();
    }
    const handleVolume=i=>{
        currVolumeLevel=i;

        audio.volume=currVolumeLevel*0.2;
    }
</script>

<div class="container">
    <audio bind:this={audio} src={musicURL}></audio>
    <div class={playMusic?"audio-btn anim":"audio-btn"}>
        <i on:click={handleMusic} class={playMusic?"fa-solid fa-volume-high":"fa-solid fa-volume-xmark"}></i>
    </div>
    {#if playMusic}
    <div class="volume">
        {#each [5,4,3,2,1] as item}
        <div on:click={()=>handleVolume(item)} class={item<=currVolumeLevel?"line level":"line"}></div>
        {/each}
    </div>
    {/if}
</div>

<style>
    .container{
        display: flex;
        align-items: center;
    }
    .container:hover .volume{
        display: flex;
    }
    .audio-btn{
        width: max-content;
        height: 40px;
        margin-right: .5rem;
        padding: .5rem 1rem;
        background: rgb(253,136,136);
        color: #fff;
        border: 2px solid #81adfd;
        border-radius: 3px;
        display: flex;
        align-items: center;
    }
    .anim{
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #81adfd, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 7s ease infinite;
    }
    @keyframes gradient{
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    .volume{
        padding: .1rem .25rem;
        background-color: rgb(253,136,136);
        border: 2px solid #81adfd;
        border-radius: 3px;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .line{
        width: 20px;
        height: 3px; 
        margin: 1px;
        background-color: #fff;
        border-radius: 3px;
        cursor: pointer;
    }
    .line:nth-child(5){
        width: 4px;
    }
    .line:nth-child(4){
        width: 8px;
    }
    .line:nth-child(3){
        width: 12px;
    }
    .line:nth-child(2){
        width: 16px;
    }
    .line:nth-child(1){
        width: 20px;
    }
    .level{
        background-color: #a0c0fd;
    }
</style>