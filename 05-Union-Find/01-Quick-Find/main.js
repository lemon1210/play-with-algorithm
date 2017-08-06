/* 
    并查集---->辅助图
    并：连接
    查：查看两个元素是否连接
    它是一种树形结构
    解决问题： 连接问题(如网络中节点间的连接状态，数学中的集合类实现)

    对于一组数据，主要支持两个动作：
        union(p, q)
        find(p)
    用来回答一个问题
        isConnected(p, q)
    
    0 1 2 3 4 5 6 7 8 9 并查集的元素，直接用同一个数组的索引来表示，可以节省一个数组              
    0 1 0 1 0 1 0 1 0 1 id数组：连接在一起的组都有相同的id号
*/



//第一个版本：查很快，并(连接)很慢



//传入的n表示该并查集要表示多少个元素
function UnionFind(n){
    this.id = [];
    this.count = n;
    //初始时，每个元素自己就是一个独立的组
    for(var i = 0; i < n; i++){
        this.id.push(i); //每个元素都有截然不同的id
    }
}

//O(1) quickFind
UnionFind.prototype.find = function(p){
    if(p >= 0 && p < this.count){
        return this.id[p];
    }
};

UnionFind.prototype.isConnected = function(p, q){
    return this.find(p) === this.find(q);
};

//Qucik Find 下的Union时间复杂度为O(n)级别
//连接操作
UnionFind.prototype.union = function(p, q){
    var pId = this.find(p),
        qId = this.find(q);
    if(pId === qId){
        return;
    }
    for(var i = 0; i < this.count; i++){
        if(this.id[i] === pId){ //连接的时候，同组的所有元素都得改id
            this.id[i] = qId;
        }
    }
};


var  n = 100000,
    uf = new UnionFind(n),
    start = Date.now();
for(var i = 0; i < n; i++){
    var a = Math.floor(Math.random() * n);
    var b = Math.floor(Math.random() * n);
    uf.union(a, b);
}

for(var i = 0; i < n; i++){
    var a = Math.floor(Math.random() * n);
    var b = Math.floor(Math.random() * n);
    uf.isConnected(a, b);
}
var end = Date.now();

console.log(end - start);

