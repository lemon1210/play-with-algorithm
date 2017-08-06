/*
    O(n^2)级别的排序算法并不是一无是处的
    像插入排序，因为它的第二层循环具有提前终止的能力，如果让它去处理近乎有序的
    数组，它的时间复杂度将是几乎接近O(n),所有它是具有实际意义的。
 */

/*
    插入排序的优化:
    取得第一层循环指定的元素的副本
    第二层循环与该副本比较，如果>该副本，那么往后移一位
*/ 

let arr = [10, 9, 8, 7, 6, 5, 3, 4, 2, 1];

function advanceInsertionSort1(arr){
    for(let i = 1, len = arr.length; i < len; i++){
        let e = arr[i],        //副本
            j;                 //保存元素e应该插入的位置
        for(j = i; j > 0; j--){
            if(arr[j - 1] > e){
                arr[j] = arr[j - 1];
            }else{
                break;
            }
        }
        arr[j] = e;
    }
    return arr;
}

function advanceInsertionSort2(arr){
    for(let i = 1, len = arr.length; i < len; i++){
        let e = arr[i],       
            j = i;                 
        while(j > 0 && arr[j - 1] > e){
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = e;
    }
    return arr;
}

console.log(advanceInsertionSort2(arr));