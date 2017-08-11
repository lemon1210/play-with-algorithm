/*
    有权图
    表示:
        邻接矩阵
            0  1  2  3  
            0 0.1 0  0  0
           0.2 0  0  0  1
            0  0 0.5 0  2
           0.1 0  0  0  3
        邻接表
           0:   { to: 1, w: 0.5 }
           1：  {  to: 2, w: 1 }
           2：   { to: 0, w: 2 }
    最小生成树：
        v个点的图，找出v-1条边，这v-1条边连接了v个节点，总权值最小,即最小生成树
        最小生成树不能有环
        通常针对“带权无向图”，必须带权
        针对连通图，如果一个图有多个联通分量，则每个连同分量都有最小生成树
        应用：
            电缆布线设计
            网络设计
            电路设计
        实现：
            切分定理引申出来的两个求最小生成树的方法：
            切分：把图中的结点分为两部分，称为一个切分（ｃｕｔ），一个图有很多种切分方式
            横切边：如果一个边的两个端点，属于切分不同的两边，这个边称为横切边
            切分定理：给定任意切分，横切边中权值最小的边必然属于最小生成树
            １.lazy prim 


*/



// 有权的稀疏图-邻接表
//边类
function Edge(a, b, w){
    this.a = a;
    this.b = b;
    this.weight = w;
}

Edge.prototype.other = function(a){
    if(a === this.a || a === this.b){
        return a === this.a ? this.a : this.b;
    }
};

function SparseGraph(n, directed){
    this.vertices = n;
    this.directed = directed;
    this.edges = 0;
    this.adj = [];
    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
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

//最差O(n)
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
//遍历邻边
SparseGraph.prototype.iterator = function(v){
    if(v >= 0 && v < this.vertices){
        return this.adj[v];
    }
};
//输出
SparseGraph.prototype.show = function(){
    for(var i = 0; i < this.vertices; i++){
        console.log(this.adj[i]);
    }
};

var g = new SparseGraph(7, false);

g.addEdge(0, 1, 0.1);
g.addEdge(0, 2, 0.2);
g.addEdge(0, 5, 0.3);
g.addEdge(0, 6, 0.4);
g.addEdge(3, 4, 0.5);
g.addEdge(3, 5, 0.6);
g.addEdge(4, 5, 0.7);
g.addEdge(4, 6, 0.8);

g.show();
