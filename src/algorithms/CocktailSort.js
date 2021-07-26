function swapIndexVals(arr, f_index, s_index){
    var temp = arr[f_index];
    arr[f_index] = arr[s_index];
    arr[s_index] = temp;
}

export default function cocktailSort(arr){
    var comparisons = [];
    var start = 0;
    var end = arr.length;
    var did_swap = true;
    while(did_swap){
        did_swap = false;
        for(let i = start; i < end - 1; i++){
            if(arr[i] > arr[i+1]){
                swapIndexVals(arr, i, i+1);
                comparisons.push([i, i+1, 1,true])
                did_swap = true;
            }else{
                comparisons.push([i, i+1, 0, true]);
            }
        }
        
        if(!did_swap){
            return comparisons;
        }
        end = end-1;

        did_swap = false;
        for(let i = end - 1; i >= start; i--){
            if(arr[i] > arr[i+1]){
                swapIndexVals(arr, i, i+1);
                comparisons.push([i, i+1, 1, false]);
                did_swap = true;
            }else{
                comparisons.push([i, i+1, 0, false]);
            }
        }
        start = start+1;
    }
    console.log(arr);
    return comparisons;
}