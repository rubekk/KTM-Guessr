const getScore=distance=>{
    if(distance<=0.3) return Math.floor(100-(distance*25));
    else if(distance<=0.6) return Math.floor(100-(distance*25));
    else if(distance<=0.9) return Math.floor(100-(distance*25));
    else if(distance<=1.2) return Math.floor(100-(distance*25));
    else if(distance<=1.5) return Math.floor(100-(distance*25));
    else if(distance<=1.8) return Math.floor(100-(distance*25));
    else if(distance<=2.1) return Math.floor(100-(distance*25));
    else if(distance<=2.4) return Math.floor(100-(distance*25));
    else if(distance<=3.0) return Math.floor(100-(distance*25));
    else if(distance<=3.3) return Math.floor(100-(distance*25));
    else return 0;
}

export default getScore;