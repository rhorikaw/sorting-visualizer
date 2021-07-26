function swapIndexVals(arr, f_index, s_index){
    var temp = arr[f_index];
    arr[f_index] = arr[s_index];
    arr[s_index] = temp;
}

export default function selectionSort(arr){
    var comparisons = [];
    var len = arr.length;
    var i,j, min;
    for(i = 0; i < len-1; i++){
        min = i;
        for(j = i+1; j< len; j++){
            if(arr[j] < arr[min]){
                min = j;
            }
            comparisons.push([i,j,0]);
        }
        swapIndexVals(arr, min, i);
        comparisons.push([min, i, 1])
        
    }
    return comparisons;
}