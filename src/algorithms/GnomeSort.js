function swapIndexVals(arr, f_index, s_index){
    var temp = arr[f_index];
    arr[f_index] = arr[s_index];
    arr[s_index] = temp;
}

export default function gnomeSort(arr){
    var comparisons = [];
    var index = 0;
    while(index < arr.length){
        if(index === 0){
            index++;
        }

        if(arr[index-1] > arr[index]){
            comparisons.push([index-1, index, 1])
            swapIndexVals(arr, index, index-1);
            index--;
        }else{
            comparisons.push([index-1, index, 0]);
            index++;
        }
    }
    console.log(arr);
    return comparisons;
}