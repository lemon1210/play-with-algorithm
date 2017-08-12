// 最小索引堆 

function IndexMinHeap(){
    this.data = [];
    this.indexes = [];// 索引数组里的元素为‘节点’在this.data里的位置
    this.count = 0;
}

IndexMinHeap.prototype.swap = function(arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

IndexMinHeap.prototype.size = function(){
    return this.count;
};

IndexMinHeap.prototype.isEmpty = function(){
    return this.count === 0;
};

IndexMinHeap.prototype.shiftUp = function(k){
    if(this.count > 0){
        while(k > 1 && this.data[this.indexes[k]] < this.data[this.indexes[Math.floor(k / 2)]]){
            this.swap(this.indexes, k, Math.floor(k / 2));
            k = Math.floor(k / 2);
        }
    }
};

IndexMinHeap.prototype.shiftDown = function(k){
    if(this.count > 0){
        while(2 * k <= this.count){
            var j = 2 * k
            if(j + 1 <= this.count && this.data[this.indexes[j + 1]] < this.data[this.indexes[j]]){
                j += 1;
            }
            if(this.data[this.indexes[k]] <= this.data[this.indexes[j]]){
                break;
            }
            this.swap(this.indexes, k, j);
            k = j;
        }
    }
};

IndexMinHeap.prototype.insert = function(i, item){
    i += 1;
    this.data[i] = item;
    this.indexes[this.count + 1] = i;
    this.count++;
    this.shiftUp(this.count);
};

IndexMinHeap.prototype.extractMax = function(){
    if(this.count > 0){
        var res = this.data[this.indexes[1]];
        this.swap(this.indexes, 1, this.count);
        this.count--;
        this.shiftDown(1);
        return res;
    }
};

IndexMinHeap.prototype.extractMaxIndex = function(){
    if(this.count > 0){
        var res = this.indexes[1] - 1;
        this.swap(this.indexes, 1, this.count);
        this.count--;
        this.shiftDown(1);
        console.log(res);
        //return res;
    }
};

IndexMinHeap.prototype.getItem = function(i){
    return this.data[i + 1];
};

IndexMinHeap.prototype.change = function(i, item){
    i += 1;
    this.data[i] = item;
    for(var j = 0; j < this.count; j++){
        if(this.indexes[j] === i){
            this.shiftDown(j);
            this.shiftUp(j);
            return;
        }
    }
};

let maxHeap = new IndexMinHeap();

for(let i = 0; i < 15; i++){
    maxHeap.insert(i, i);
}

while(!maxHeap.isEmpty()){
    console.log(maxHeap.extractMax());
};