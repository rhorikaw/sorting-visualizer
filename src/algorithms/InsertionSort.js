export default function insertionSort(arr){
    var comparisons = [];
    var i,j,i_val;
    for(i=1; i<arr.length; i++){
        i_val = arr[i];
        j = i-1;
        
        while(j >= 0 && arr[j] > i_val){
            comparisons.push([j,j+1,null,i])
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = i_val
        comparisons.push([j+1,i,i_val])
    }
    return comparisons;
}