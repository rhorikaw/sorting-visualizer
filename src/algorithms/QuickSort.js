function swapIndexVals(arr, f_index, s_index){
    var temp = arr[f_index];
    arr[f_index] = arr[s_index];
    arr[s_index] = temp;
}

function partition(arr, low, high){
    // Set pivot as last element
    var pivot, i, j;
    let comparisons = [];
    pivot = arr[high];
    i = low - 1;

    for(j = low; j < high ; j++){
        if(arr[j] < pivot){
            i++;
            swapIndexVals(arr, i, j);
            comparisons.push([i,j,high,1]);
        }else{
            comparisons.push([i,j,high,0])
        }
    }
    swapIndexVals(arr, i+1, high);
    comparisons.push([i+1,high,null,1])
    return [i+1,comparisons];
}

export default function quickSort(arr, low, high){
    var part, comparisons;
    if(low < high){
        [part, comparisons] = partition(arr,low,high);
        comparisons = comparisons.concat(quickSort(arr, low, part-1));
        comparisons = comparisons.concat(quickSort(arr, part+1, high));
    }else{
        comparisons = [];
    }
    return comparisons;
}