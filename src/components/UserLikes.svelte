<script>
    let openLikes, 
        likesData=[];
    
    $: openLikes, likesData=localStorage.getItem("liked")?localStorage.getItem("liked").split(","):[];
</script>

<div class={!openLikes?"container":"container no-padding"}>
    {#if !openLikes}
        <div on:click={()=>openLikes=true} class="likes-txt">Likes</div>
    {:else}
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
        position: relative;
        z-index: 2000;
    }
    .no-padding{
        padding: 0;
    }
    .likes-txt {
        cursor: pointer;
    }
    .like-container{
        padding: 1rem;
        width: 250px;
        text-align: left;
        background-color: rgba(0,0,0,.6);
        position: absolute;
        bottom: 1rem;
        right: 0;
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