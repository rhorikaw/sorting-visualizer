var comparisons;

function swapIndexVals(arr, f_index, s_index){
    var temp = arr[f_index];
    arr[f_index] = arr[s_index];
    arr[s_index] = temp;
}

function heapify(arr, n, i){
    var largest, left_child, right_child;
    largest = i;
    left_child = 2*i + 1;
    right_child = 2*i + 2;

    if(left_child < n){
        if(arr[left_child] > arr[largest]){
            largest = left_child;
        }else{
            comparisons.push([left_child, largest, 0]);
        }
    } 
    if(right_child < n){
        if(arr[right_child] > arr[largest]){
            largest = right_child;
        }else{
            comparisons.push([right_child, largest, 0]);
        }
    } 
    if(largest !== i){
        swapIndexVals(arr, i, largest);
        comparisons.push([i, largest, 1]);
        heapify(arr, n, largest);
    }
}


export default function heapSort(arr, arr_len){
    comparisons = [];
    var i;
    for(i = Math.floor(arr_len/2) - 1; i >= 0; i--){
        heapify(arr,arr_len,i);
    }

    for(i=arr_len-1; i > 0; i--){
        swapIndexVals(arr, 0, i);
        comparisons.push([0,i,-1]);
        heapify(arr, i, 0);
    }
    return comparisons;
};