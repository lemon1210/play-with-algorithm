/*
    快速排序：
    需要一个基准值,把arr分成两个子序列,基准值即在正确的位置上了
    然后左右两个子序列继续把第一个元素当成基准值
    递归下去

 */

var arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function quickSort(arr){
    if(!arr.length){
        return [];
    }
    let leftArr = [];
    let rightArr = [];
    let p = arr[0]; //基准值
    for(let i = 1, len = arr.length; i < len; i++){
        if(p > arr[i]){
            leftArr.push(arr[i]);
        }else{
            rightArr.push(arr[i]);
        }
    }
    return quickSort(leftArr).concat(p, quickSort(rightArr));
}

console.log(quickSort(arr));

