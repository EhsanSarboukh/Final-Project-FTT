function lastTrimesterPi(Mlt,Llt ){// this function return last Trimester Pi that is the input for the function fetalGrowthIndication
    return (Mlt/Math.pow(Llt, 3))*100;
}

function firstTrimesterPi(Mft, Lft){// this function return first Trimester Pi that is the input for the function fetalGrowthIndication
    return (Mft/Math.pow(Lft, 3))*100;

}



function fetalGrowthIndication(PIft,PIlt ){
    let ft = true, lt = true;
    let result = 'ok';
    if (PIft<2.32 || PIft>2.85) {
    ft = false;
    }
    if (PIlt<2.32 || PIlt>2.85) {
    lt = false;
    }
    if (!ft) {
    result = 'mother dependent';
    if (!lt) {
    result = 'mother and child dependent';
    }
    } else if (!lt) {
    result = 'child dependent';
    }
    return result;
}



function fetalBirthWeightIndication(bw){
    if (bw < 2.500) {
        return 'low';
        } else {
        return 'ok';
        }
}

function main (bw, week16Mass, week16Length, week32Mass, week32Length){
    let perintalResult = [];
    let PIfirt =  firstTrimesterPi(week16Mass, week16Length);
    let PIlast = lastTrimesterPi(week32Mass, week32Length);
    perintalResult.push(fetalGrowthIndication(PIfirt,PIlast));
    perintalResult.push(fetalBirthWeightIndication(bw));
    return perintalResult;

}
module.exports = {
   main
};