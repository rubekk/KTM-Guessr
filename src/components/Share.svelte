<script>
    import { canShowShare } from "$lib/stores/store";

    const link="https://ktmguessr.netlify.app/",
		fbLink=`https://facebook.com/share.php?u=${link}`,
		twitterLink=`https://twitter.com/share?url=${link}`,
		linkedinLink=`https://linkedin.com/sharing/share-offsite/?url=${link}`,
		redditLink=`https://reddit.com/submit?url=${link}`;

    const setShareToFalse=()=> canShowShare.set(false);
    const copyLink=()=>{
        navigator.clipboard.writeText(link);
    }
</script>

<div class="container">
    <i on:click={setShareToFalse} class="fa-solid fa-times"></i>
    <div class="icons">
        <a href={fbLink} target="_blank">
            <i class="fa-brands fa-square-facebook"></i>
        </a>
        <a href={twitterLink} target="_blank">
            <i class="fa-brands fa-square-twitter"></i>
        </a>
        <a href={linkedinLink} target="_blank">
            <i class="fa-brands fa-linkedin"></i>
        </a>
        <a href={redditLink} target="_blank">
            <i class="fa-brands fa-square-reddit"></i>
        </a>
        <i on:click={copyLink} class="fa-solid fa-copy"></i>
    </div>
</div>

<style>
    .container{
        padding: .5rem;
        background-color: #81adfd;
        border-radius: 3px;
        display: flex;
        align-items: center;
        animation: share-anim .2s linear;
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
        margin: 0 .25rem;
        color: #fff;
        font-size: 1.55rem;
        cursor: pointer;
    }
    .icons{
        margin-left: 1rem;
        display: flex;
        align-items: center;
    }
    i:hover{
        color: #e2e1e1;
        transition: .2s;
    }
    .fa-times{
        font-size: 1.2rem;
    }
    @media(max-width: 550px){
        .container{
            animation: none;
        }
    }
</style>