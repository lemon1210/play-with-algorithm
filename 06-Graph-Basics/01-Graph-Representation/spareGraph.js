// 稀疏图-邻接表

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

SparseGraph.prototype.addEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        // if(this.hasEdge(v, m)){  允许有平行边, 加上这个if判断,addEdge的时间复杂度退化到O(n)
        //     return;
        // }
        this.adj[v].push(m);
        if(v !== m && !this.directed){ //防止自环边再push一次
            this.adj[m].push(v);
        }
        this.edges++;
    }
};

//最差O(n)
SparseGraph.prototype.hasEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        for(var i = 0; i < this.adj[v].length; i++){
            if(this.adj[v][i] === m){
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

var g = new SparseGraph(10, false);
g.addEdge(0, 1);
g.addEdge(0, 8);
console.log(g.iterator(0));
