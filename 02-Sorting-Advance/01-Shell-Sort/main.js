/*
    这一张讲的都是高级排序
    他们的时候复杂度都是O(nlogn)
*/
/*
    希尔排序
    希尔排序可以说是插入排序的衍生
    不同是希尔排序先比较距离较远的元素，而非相邻的元素
    第一层循环：循环“间隔序列数组”,取得间隔序列g
    第二层循环：选中第“g”个元素,这个元素为要插入的元素
    第三层循环：循环比较第g个之前的元素 与 第g个元素 
 */


var arr = [10,9,8,7,6,5,4,3,2,1,0];

var gaps = [5, 3, 1];

for(let g = 0; g < gaps.length; g++){ 
    for(let i = gaps[g]; i < arr.length; i++){
        let temp = arr[i],
            j;
        for(j = i; j >= gaps[g] && arr[j - gaps[g]] > temp; j -= gaps[g]){
            arr[j] = arr[j - gaps[g]];
        }
        arr[j] = temp;
    }
}

console.log(arr);