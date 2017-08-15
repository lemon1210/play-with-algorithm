/*
    最短路径问题Shortest Path: 从一个结点到另外一个结点耗费最小的路径

    之前我们学习过无权图的最短路径，通过广度优先遍历，求出的是从一个结
    点开始到其他所有结点的最短路径。最短路径树（单源最短路径）
    无权图的最短路径 ：计算边的个数
    有权图的最短路径：计算边的权值（松弛操作是最短路径求解的核心）
  
    应用：
        路径规划问题
*/



// dijkstra 单源最短路径算法
// 叫“单源”的原因，它是从一个固定结点开始，找到它与图中其他所有结点的最短路径
// 局限性：改算法处理的图是不能有负权边的
// O（Elog(V)）


// 有权的稀疏图-邻接表

//最小索引堆
var H = require('./IndexMinHeap');

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

//图类
function SparseGraph(n, directed){
    this.vertices = n;
    this.directed = directed;
    this.edges = 0;
    this.adj = [];

    this.distTo = []; // distTo[i]存储从起始点s到i的最短路径长度
    this.h = new H();
    this.marked = []; // 标记数组, 在算法运行过程中标记节点i是否被访问
    this.from = [];   // from[i]记录最短路径中, 到达i点的边是哪一条

    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
        this.marked[i] = false;
        this.distTo[i] = 0;
        this.from[i] = null;
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

//s为源点, s->d的最短路径
SparseGraph.prototype.dijkstra = function(s, d){
    this.distTo[s] = 0;
    this.marked[s] = true;
    this.h.insert(s, this.distTo[s]);
    while(!this.h.isEmpty()){
        var v = this.h.extractMinIndex(); //取出最小索引堆中离源点最近的结点
        //此时this.distTo[v]就是s到v的最短距离
        this.marked[v] = true;
        var arr = this.iterator(v);
        for(var i = 0, len = arr.length; i < len; i++){
            var e = arr[i];
            var w = arr[i].other(v);
            if(!this.marked[w]){
                // 如果w点以前没有访问过,
                // 或者访问过, 但是通过当前的v点到w点距离更短, 则进行更新
                if(this.from[w] === null || this.distTo[v] + e.weight < this.distTo[w]){
                    this.distTo[w] = this.distTo[v] + e.weight;
                    this.from[w] = e;
                    if(this.h.contain(w)){
                        this.h.insert(w, this.distTo[w]);
                    }else{
                        this.h.insert(w, this.distTo[w]);
                    }
                }
            }
        }
    }
    // 通过from数组逆向查找到从s到d的路径, 存放到栈中
    var stack = [];
    while(this.from[d] !== null){
        stack.unshift(this.from[d]);
        d = this.from[w].v();
    }
    return stack;
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
    g.addEdge(parseInt(v[0]), parseInt(v[1]), parseFloat(v[2]));
}
console.log(g.dijkstra(0, 3));