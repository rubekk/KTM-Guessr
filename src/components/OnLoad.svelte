<script>
    import ktm from "$lib/imgs/ktm.png";
    import { fade } from "svelte/transition";

    let runAnimTitle=false;

    setTimeout(()=>{
        runAnimTitle=true
    },100)
</script>

{#if runAnimTitle}
<div transition:fade="{{ duration: 1000 }}" class="title">
    <span class="ktm">KTM</span><span class="guessr">GUESSR</span>
</div>
{/if}

<style>
    .title{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(#81adfd, rgb(253, 136, 136));
        overflow: hidden;
    }
    .ktm, .guessr{
        padding: 0 .25rem;
        font-size: 3rem;
        position: relative;
        bottom: 5rem;
        border: 2px solid #fff;
    }
    .ktm{
        color: rgb(255, 35, 35);
        background-color: #81adfd;
        border-right: none;
    }
    .guessr{
        color: #2a73fc;
        background-color: rgb(253, 136, 136);
    }
    img{
        width: 100%;
        background-position: center;
        background-size: cover;
        position: absolute;
        bottom: 0;
    }
</style>