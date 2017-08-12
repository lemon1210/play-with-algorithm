
// 实现一个针对Edge对象的优先队列

function Queue(){
    this.data = [];
    this.count = 0;
}

//出队
Queue.prototype.dequeue = function(){
    if(this.count > 0){
        var entry = 0;
        for(var i = 0, len = this.data.length; i < len; i++){
            if(this.data[i].weight < this.data[entry].weight){
                entry = i;
            }
        }
        this.count--;
        // this.splice返回的是被数组元素组成的数组，所以这里要加[0]
        return this.data.splice(entry, 1)[0];
    }
};

//入队
Queue.prototype.enqueue = function(edgeObj){
    this.data.push(edgeObj);
    this.count++;
};

Queue.prototype.isEmpty = function(){
    return this.count === 0;
};

module.exports = Queue;