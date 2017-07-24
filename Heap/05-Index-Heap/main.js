/*
    索引堆 Index Heap
        新增索引数组，索引数组才是真正在构建堆的
        data数组只用于存数据
        优点：交换效率高 索引效率高
    普通堆：构建堆前后，数组的元素位置发生了改变
        缺点：1.元素交换消耗性能 2.元素交换后不利于查找之前的元素
*/


function IndexMaxHeap(){
    this.data = [];
    this.indexes = []; //用来存储索引
    this.count = 0; 
}

IndexMaxHeap.prototype.swap = function(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

IndexMaxHeap.prototype.size = function(){
    return this.count;
};

IndexMaxHeap.prototype.isEmpty = function(){
    return this.count === 0;
};

//对于外部用户而已，是从索引0开始的。而内部实现还是从1开始
//索引堆，插入一个元素也要指定其在data数组里面的索引
IndexMaxHeap.prototype.insert = function(i, item){
    i += 1;
    this.data[i] = item;
    this.indexes[this.count + 1] = i;
    this.count++;
    this.shiftUp(this.count);
};

//尝试将新加入的元素 this.indexes[this.count]对应的元素向上移动
IndexMaxHeap.prototype.shiftUp = function(k){
    while(k > 1 && this.data[this.indexes[Math.floor(k / 2)]] < this.data[this.indexes[k]]){
        this.swap(this.indexes, k, Math.floor(k / 2));
        k = Math.floor(k / 2);
    };
};

IndexMaxHeap.prototype.shiftDown = function(k){
    while(2 * k <= this.count){ //2 * k < this.count说明该结点存在孩子
        let j = 2 * k;
        if(j + 1 <= this.count && this.data[this.indexes[j + 1]] > this.data[this.indexes[j]]){
            j += 1;
        }
        if(this.data[this.indexes[k]] >= this.data[this.indexes[j]]){
            break;
        }
        this.swap(this.indexes, k, j);
        k = j;
    }
};


IndexMaxHeap.prototype.extractMax = function(){
    if(this.count > 0){
        let res = this.data[this.indexes[1]];
        this.swap(this.indexes, 1, this.count);
        this.count--;
        this.shiftDown(1);
        return res;
    }else{
        throw new Error('堆为空!');
    }
};

//返回最大元素的索引
IndexMaxHeap.prototype.extractMaxIndex = function(){
    if(this.count > 0){
        let res = this.indexes[1] - 1;
        this.swap(this.indexes, 1, this.count);
        this.count--;
        this.shiftDown(1);
        return res;
    }else{
        throw new Error('堆为空!');
    }
};

IndexMaxHeap.prototype.getItem = function(i){
    return this.data[i + 1];
};

//将索引i修改为新的item
IndexMaxHeap.prototype.change = function(i, item){
    i += 1;
    this.data[i] = item;
    // 找到indexes[j] = i, j表示data[i]在堆中的位置
    // 之后shiftUp(j), 再shiftDown(j)
    for(let j = 1; j <= this.count; j++){ //可优化
        if(this.indexes[j] === i){
            this.shiftDown(j);
            this.shiftUp(j);
            return;
        }
    }
};

let maxHeap = new IndexMaxHeap();

for(let i = 1; i <= 15; i++){
    maxHeap.insert(i, i);
}

while(!maxHeap.isEmpty()){
    console.log(maxHeap.extractMax());
};
