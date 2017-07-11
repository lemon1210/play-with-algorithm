/* 
    冒泡排序
    第一层循环控制总共需要多少轮冒泡(n - 1) 每轮都会冒出一个最大的数到数组的尾部
    第二层循环每次都从最左端v[0]开始，与它右边的元素做比较，大于则换
 */

let arr = [10, 9, 8, 7, 6, 5, 3, 4, 2, 1, 1, 3, 2, 3, 2];

function bubbleSort(arr){
    let temp;
    for(let i = 1, len = arr.length; i <= len - 1; i++){
        for(let j = 0; j < len - i; j++){
            if(arr[j] > arr[j + 1]){
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}




/* 
    冒泡排序的优化
    第一种优化方式是设置一个标记位来标记是否发生了交换，如果没有发生交换就提前结束；
    第二种优化方式是记录“最后发生交换”的位置，该位置后面的已经排序好了，作为下一趟比较结束的位置。
 */

function advanceBubbleSort1(arr){
    let flag;
    for(let i = 1, len = arr.length; i <= len - 1; i++){
        flag = false; //每轮一开始都必须重新设置标志
        for(let j = 0; j < len - i; j++){
            if(arr[j] > arr[j + 1]){
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true;
            }
        }
        if(flag === false){
            break;
        }
    }
    return arr;
}


function advanceBubbleSort2(arr){
    let k = 0;
    let n = arr.length;
    for(let i = 1, len = arr.length; i <= len - 1; i++){
        k = n;     //每一轮 都需重新设置到 上一轮冒泡结束的位置
        n = 0;      
        for(let j = 0; j < k - 1; j++){
            if(arr[j] > arr[j + 1]){
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                n = j + 1;
            }
        }
    }
    return arr;
}
console.log(advanceBubbleSort2(arr));