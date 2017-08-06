/* 
        O(n^2)的排序算法是最基础的（像选择排序，插入排序这些都是）
        当然，排序算法最优的是O(nlgn)这样的级别的
*/

//下面写到算法都有个特点:两层循环，第二层循环必然用到第一层循环的i值

/*
选择排序: 选择选择，即选择最小的出来先
使用嵌套循环
第一层循环指定从0开始指定元素v[i]
第二层循环从i+1开始，让v[i+1],v[i+2]....与第一层循环选中的元素v[i]进行比较
小于v[i]则替换
为避免每次都得替换，这里使用minIndex保存最小值的索引
*/

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function swap(array, t1, t2){
    let temp = array[t1];
    array[t1] = array[t2];
    array[t2] = temp;
}

function selectionSort(arr){
    let minIndex;
    for(let i = 0, len = arr.length; i < len; i++){
        minIndex = i;
        for(let j = i + 1; j < len; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
    return arr;
}

console.log(selectionSort(arr));

