/*
    随机生成算法测试用例
    生成有n个元素的随机数组，每个元素的范围为[L,R]。
    注意是前闭后闭的区间范围  
*/
module.exports = function randomArray(n, rangeL, rangeR){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL;
    }
    return arr;
}