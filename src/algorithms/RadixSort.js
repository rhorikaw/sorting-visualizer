

function countSort(arr, exp){
    var comparisons = [];
    var arr_len = arr.length;
    var output = new Array(arr_len);
    var index_arr = new Array(10);   
    index_arr.fill(0);

    var i;
    for(i=0; i < arr_len; i++){
        comparisons.push([i,null])
        index_arr[ (Math.floor(arr[i] / exp ) % 10) ]++;
    }

    for(i=1; i < 10; i++){
        index_arr[i] += index_arr[i-1]
    }

    for(i=arr_len-1; i>=0; i--){
        output[index_arr[Math.floor(arr[i] / exp ) % 10] -1] = arr[i];
        index_arr[Math.floor(arr[i] / exp ) % 10]--;
    }

    for(i=0; i < arr_len; i++){
        comparisons.push([i,output[i]])
        arr[i] = output[i];
    }

    return comparisons;
}


export default function radixSort(arr){
    var comparisons = [];
    var max = Math.max(...arr);


    for(let exp = 1; Math.floor(max / exp) > 0; exp *= 10){
        comparisons = comparisons.concat(countSort(arr, exp));
    }

    return comparisons;
}