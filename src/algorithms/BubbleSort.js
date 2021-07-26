function swapIndexVals(arr, f_index, s_index){
    var temp = arr[f_index];
    arr[f_index] = arr[s_index];
    arr[s_index] = temp;
}

export default function bubbleSort(arr){
    var comparisons = [];
    var len = arr.length;
    var i,j;
    for(i = 0; i < len-1; i++){
        for(j = 0; j< len-i-1; j++){
            if(arr[j] > arr[j+1]){
                swapIndexVals(arr,j,j+1);
                if(j+1 === len-i-1){
                    comparisons.push([j,j+1,-1]);
                }else{
                    comparisons.push([j,j+1,1]);

                }
            }else{
                if(j+1 === len-i-1){
                    comparisons.push([j,j+1,null]);
                }else{
                    comparisons.push([j,j+1,0]);
                }
            }
        }
    }
    return comparisons;
}