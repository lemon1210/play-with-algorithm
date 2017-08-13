

//第二个版本（常规实现思路）：改善第一个版本连接操作效率底下的问题
/*
    将每一个元素，看作是一个节点
    每个节点有一个指针，可指向它的父节点或它本身（根节点）
    已知3->2，1如果想跟2或3连接，那么直接2就可以，不连接3是一种优化，树的层数不会太高
    两个节点要连接，即找它们的父节点来连接即可
      parent数组的索引 ：0 1 2 3 4 5 6 7 8 9
parent数组的元素（指针）：0 1 2 3 4 5 6 7 8 9 =父节点的索引
             初始化时每个元素的指针都先指向自己
*/


//传入的n表示该并查集要表示多少个元素
function UnionFind(n){
    this.parent = []; // parent[i]表示第i个元素所指向的父节点
    this.count = n;
    for(var i = 0; i < n; i++){
        this.parent.push(i); //初始化时每个元素的指针都先指向自己
    }
}

// 查找过程, 查找元素p所对应的集合编号
// O(h)复杂度, h为树的高度
//find查找的是“传入元素p”的根节点 可能是它自己 也可以经一层一层回溯得来的
UnionFind.prototype.find = function(p){
    if(p >= 0 && p < this.count){
        while(p !== this.parent[p]){ //能满足该条件说明p不是根结点
            p = this.parent[p];
        }
        return p;
    }
};

// 查看元素p和元素q是否所属一个集合
// O(h)复杂度, h为树的高度
//判断是否有连接，判断的是它们的根节点是否相同
UnionFind.prototype.isConnected = function(p, q){
    return this.find(p) === this.find(q);
};

// 合并元素p和元素q所属的集合,找到它们的根节点来连接
// O(h)复杂度, h为树的高度
UnionFind.prototype.union = function(p, q){
    var pRoot = this.find(p),
        qRoot = this.find(q);
    if(pRoot === qRoot){
        return;
    }
    this.parent[pRoot] = qRoot;
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
