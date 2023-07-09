<script>
    import { initializeApp } from "firebase/app";
	import { getFirestore, collection, onSnapshot, doc, addDoc, updateDoc } from "firebase/firestore";
    import { firebaseConfig } from "$lib/firebaseConfig";
    import { currentPlace } from '$lib/stores/store';

    let liked=false,
        dataLoaded=false,
        likeData=[], 
        currPlace={},
        currId="",
        currLikes=0;
    
    let localStorageLiked=localStorage.getItem("liked")?localStorage.getItem("liked").split(','):[];

    const firebaseApp=initializeApp(firebaseConfig);
	const db=getFirestore();
    const colRef=collection(db, "hearts");

    currentPlace.subscribe(value=> currPlace=value);

    // get likes data from firestore
    const unsubscribe = onSnapshot(colRef, querySnapshot => {
		querySnapshot.forEach(doc => {
			let data={...doc.data(),id:doc.id};
			likeData=[data,...likeData];
		})

        dataLoaded=true;
	});

    // functions
    const checkData=()=>{
        if(!dataLoaded) return;

        let matchingData=[...likeData.filter(elem=>elem.pname==currPlace.name)];

        if(matchingData.length>0) currLikes=matchingData[0].likes;
        else addNewDoc();

        getCurrId();
    }

    const handleLike=()=>{
        liked=!liked;

        if(liked) {
            incrementLike();
            if(!localStorageLiked.includes(currPlace.name)) localStorageLiked.push(currPlace.name);
            localStorageLiked=[...localStorageLiked];
            localStorage.setItem("liked", localStorageLiked);
        }
        else {
            decrementLike();
            if(localStorageLiked.includes(currPlace.name)) localStorageLiked=[...localStorageLiked.filter(elem=> elem!=currPlace.name)];
            localStorage.setItem("liked", localStorageLiked);
        }
    }

    const updateLike=()=>{
        liked=localStorageLiked.includes(currPlace.name)?true:false;
    }

    const addNewDoc=async ()=>{
        await addDoc(colRef, {
            pname: currPlace.name,
            likes: 0
        })
        checkData();
    }

    const incrementLike=async ()=>{
        await updateDoc(doc(db, "hearts", currId), {
            likes: currLikes+1
        })
    }

    const decrementLike=async ()=>{
        await updateDoc(doc(db, "hearts", currId), {
            likes: currLikes==0?0:currLikes-1
        })
    }

    const getCurrId=()=>{
        likeData.forEach(async data=>{
            if(data.pname==currPlace.name) currId=data.id;
        })
    }

    $: likeData, currPlace, checkData(), updateLike();
</script>

<div class="container">
    <i on:click={handleLike} class={liked?"fa-solid fa-heart liked":"fa-regular fa-heart"}></i>
    <div class="like-count">{currLikes}</div>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    i{
        font-size: 1.25rem;
        color: #fff;
        transition: .3s;
    }
    i:hover, .liked{
        color: crimson;
    }
    .like-count{
        font-size: .8rem;
    }
</style>