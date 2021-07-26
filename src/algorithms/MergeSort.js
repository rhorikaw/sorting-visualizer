function mergeToComparison(arr, start, end){
    var comparisons = [];
    for(let i = start; i <= end; i++){
        comparisons.push([i, arr[i], null]);
    }
    return comparisons;
}

function merge(arr, start, middle, end){
    var comparisons = [];
    var arr_cpy = arr.slice();
    var left_len = (middle-start) + 1;
    var right_len = end - middle;

    var left_side = new Array(left_len);
    var right_side = new Array(right_len);

    for(let i = 0; i < left_len; i++){
        left_side[i] = arr[start+i];
    }
    for(let i = 0; i < right_len; i++){
        right_side[i] = arr[i+middle+1];
    }

    var left_index = 0;
    var right_index = 0;
    var arr_index = start;

    while(left_index < left_len && right_index < right_len){
        if(left_side[left_index] < right_side[right_index]){
            arr[arr_index] = left_side[left_index];
            arr_cpy[arr_index] = left_side[left_index];
            comparisons.push([start+left_index, right_index+middle+1])
            left_index++;
        }else{
            arr[arr_index] = right_side[right_index];
            arr_cpy[arr_index] = right_side[right_index];
            comparisons.push([start+left_index, right_index+middle+1])
            right_index++;
        }
        arr_index++;
    }

    while(left_index < left_len){
        arr[arr_index] = left_side[left_index];
        arr_cpy[arr_index] = left_side[left_index];
        comparisons.push([start+left_index, right_index+middle])
        left_index++;
        arr_index++;
    }

    while(right_index < right_len){
        arr[arr_index] = right_side[right_index];
        arr_cpy[arr_index] = right_side[right_index];
        comparisons.push([start+left_index-1, right_index+middle+1]);
        right_index++;
        arr_index++;
    }

    comparisons = comparisons.concat(mergeToComparison(arr_cpy,start,end));
    return comparisons;
}

export default function mergeSort(arr, start, end){
    var comparisons = [];
    var middle;
    if(start < end){
        middle =  start + Math.floor((end - start) / 2);
        comparisons = comparisons.concat(mergeSort(arr, start, middle));
        comparisons = comparisons.concat(mergeSort(arr, middle+1, end));
        comparisons = comparisons.concat(merge(arr, start, middle, end));
    }
    return comparisons;
}