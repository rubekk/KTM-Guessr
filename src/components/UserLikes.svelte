<script>
    let openLikes, 
        likesData=[];
    
    $: openLikes, likesData=localStorage.getItem("liked")?localStorage.getItem("liked").split(","):[];
</script>

<div class="container">
    <div on:click={()=>openLikes=!openLikes} class="likes-txt">Likes</div>
    {#if openLikes}
        <div class="like-container">
            <div class="cross">
                <i on:click={()=>openLikes=false} class="fa-solid fa-times"></i>
            </div>
            {#if likesData.length>0}
                {#each likesData as data}
                    <div class="ind-like">{data}</div>
                {/each}
            {:else}
                <div class="no-data">You haven't liked any places yet.</div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        padding: .25rem .5rem;
        color: #fff;
        background-color: rgba(0,0,0,.6);
        text-align: center;
        animation: share-anim .2s linear;
    }
    .likes-txt {
        cursor: pointer;
    }
    .like-container{
        padding: 1rem;
        width: 250px;
        text-align: left;
        background-color: rgba(0,0,0,.6);
        animation: share-anim .2s linear;
        position: absolute;
        bottom: 2.5rem;
        right: 0;
        z-index: 3100;
    }
    @keyframes share-anim{
        from{
            transform: translateX(20px);
        }
        to{
            transform: translateX(0px);
        }
    }
    .cross{
        position: absolute;
        top: 1rem; 
        right: 1.5rem;
    }
    .ind-like:hover{
        color: #dcdcdc;
    }
</style>