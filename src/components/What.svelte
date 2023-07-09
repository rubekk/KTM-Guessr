<script>
    import { canShowWhat } from "$lib/stores/store";

    const setWhatToFalse=()=> canShowWhat.set(false);
</script>

<div class="container">
    <p>Guess places of Kathmandu valley with 360 view.</p>
    <p class="submit-txt"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdQOdmX5gfQDUbwy-6_bYT9Zlb27CGDvPPIRQThA_v-69XZBw/viewform?usp=sf_link" target="_blank">submit a place</a></p>
    <p class="created-info">made by <a href="https://rubekmaharjan.netlify.app" target="_blank">rubek</a></p>
    <i on:click={setWhatToFalse} class="fa-solid fa-times"></i>
</div>

<style>
    .container{
        padding: 2.5rem 1rem 1rem;
        color: #fff;
        background-color: rgba(0,0,0,.6);
        border-radius: 3px;
        text-align: center;
        animation: share-anim .2s linear;
        position: relative;
        z-index: 3100;
    }
    .submit-txt{
        margin: 1rem 0 1.5rem;
    }
    .submit-txt, a{
        color: #6da0ff;
        font-style: italic;
        text-decoration: underline;
    }
    @keyframes share-anim{
        from{
            transform: translateX(20px);
        }
        to{
            transform: translateX(0px);
        }
    }
    i{
        padding: 0 .25rem;
        color: #fff;
        font-size: 1.55rem;
        position: absolute;
        top: .5rem;
        right: .75rem;
    }
    .fa-times{
        font-size: 1.2rem;
    }
    @media(max-width: 425px){
        .container{
            animation: none;
        }
    }
</style>