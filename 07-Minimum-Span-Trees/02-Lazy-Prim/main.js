
/*
    第一个最小生成树的算法 Lazy Prim
    视频中直接将Edge对象插入最小堆，是因为利用C++对Edge对象的比较，如'> < ='进行了重载
    在js种最小堆（优先队列）,直接用数组来实现即可m
 */


// O(ElogE)

var Q = require('./Queue.js');

// 有权的稀疏图-邻接表
//边类
function Edge(a, b, w){
    this.a = a;
    this.b = b;
    this.weight = w;
}

Edge.prototype.other = function(a){
    if(a === this.a || a === this.b){
        return a === this.a ? this.b : this.a;
    }
};

Edge.prototype.v = function(){
    return this.a;
}

Edge.prototype.w = function(){
    return this.b;
};

function SparseGraph(n, directed){
    this.vertices = n;
    this.directed = directed;
    this.edges = 0;
    this.q = new Q(); //优先队列
    this.marked = []; //this.marked[1] = true,说明结点是“红”结点，根据视频里的图来看 
    this.adj = [];
    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
        this.marked[i] = false;
    }
}

SparseGraph.prototype.getVertices = function(){
    return this.vertices;
};
SparseGraph.prototype.getEdges = function(){
    return this.edges;
};
SparseGraph.prototype.addEdge = function(v, m, w){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        this.adj[v].push(new Edge(v, m, w));
        if(v !== m && !this.directed){ //防止自环边再push一次
            this.adj[m].push(new Edge(m, v, w));
        }
        this.edges++;
    }
};
SparseGraph.prototype.hasEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        for(var i = 0; i < this.adj[v].length; i++){
            if(this.adj[v][i].other(v) === m){
                return true;
            }
        }
        return false;
    }
};
SparseGraph.prototype.iterator = function(v){
    if(v >= 0 && v < this.vertices){
        return this.adj[v];
    }
};
//为求最小生成树，整个图划分为红蓝结点
//红色结点刚开始为0个，然后逐个增加
//将v结点变为“红结点”
SparseGraph.prototype.visit = function(v){
    if(v >= 0 && v < this.vertices){
        this.marked[v] = true;  //标记v成为红结点
        var arr = this.iterator(v); //找出邻边
        // 将和节点v相连接的所有未访问的边放入最小堆中
        for(var i = 0, len = arr.length; i < len; i++){
            if(!this.marked[arr[i].other(v)]){  // arr[i].other(v)===连接v结点的另一个结点w
                this.q.enqueue(arr[i]);        // 入队
            }
        }
    }
};

//获得最小生成树
SparseGraph.prototype.mst = function(){
    if(this.vertices >= 0){
        var res = [];
        this.visit(0);
        while(!this.q.isEmpty()){         //如果队列不为空
            var smallestEdge = this.q.dequeue();      //出队：拿出权值最小的边
            if(this.marked[smallestEdge.v()] === this.marked[smallestEdge.w()]){ // 如果这条边的两端都已经访问过了, 则扔掉这条边
                continue;
            }
            res.push(smallestEdge);          //该边便是横切边了
            if(!this.marked[smallestEdge.v()]){  //判断哪个点没加入红结点
                this.visit(smallestEdge.v());
            }else{
                this.visit(smallestEdge.w());
            }
        }
        return res;
    }
};

//输出
SparseGraph.prototype.show = function(){
    for(var i = 0; i < this.vertices; i++){
        console.log(this.adj[i]);
    }
};

var str = `
4 5 0.35
4 7 0.37
5 7 0.28
0 7 0.16
1 5 0.32
0 4 0.38
2 3 0.17
1 7 0.19
0 2 0.26
1 2 0.36
1 3 0.29
2 7 0.34
6 2 0.40
3 6 0.52
6 0 0.58
6 4 0.93
`;

var arr = str.split('\n');

var g = new SparseGraph(8, false);

for(var i = 1; i < arr.length; i++){
    var v = arr[i].split(' ');
    g.addEdge(v[0], v[1], v[2]);
}
console.log(g.mst());




