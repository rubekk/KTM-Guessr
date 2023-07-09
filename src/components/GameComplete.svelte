<script>
    import { isGameCompleted } from "$lib/stores/store";
</script>

<div class="container">
    <div class="congratulations">
        Congratulations on guessing all the places!!
    </div>
    <div on:click={()=>location.reload()} class="start-again">
        Start guessing again?
    </div>
</div>

<style>
    .container{
        padding: 1rem;
        /* background-color: rgba(0,0,0,.5); */
        background-color: rgb(8, 95, 95);
        color: #fff;
    }
    .start-again{
        text-decoration: underline;
        cursor: pointer;
    }
</style>