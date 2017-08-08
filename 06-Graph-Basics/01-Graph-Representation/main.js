/**
    图: 节点+边
    分类：
        有向图
        无向图
        有权图
        无权图
    连通性：
    简单图：没有自环边和平行边
    (有向/无向)图的表示：
        邻接矩阵：  适合表示稠密图（边相对比较多），有一种完全图
            0 1 2 3
            0 0 0 0  0
            0 0 0 0  1
            0 0 0 0  2
            0 0 0 0  3
        邻接表：  适合表示系数图
            0 [1, 2] 
            1 [0]
            2 [3, 1]
            3 [0]
 */

// 稠密图-邻接矩阵
function DenseGraph(n, directed){
    this.vertices = n;  //顶点个数
    this.edges = 0; //边个数
    this.directed = directed;  //boolean 有向或无向
    this.matrix = [];
    for(var i = 0; i < n; i++){
        var arr = [];
        for(var j = 0; j < n; j++){
           arr[j] = false;
        }
        this.matrix[i] = arr;
    }
}
DenseGraph.prototype.getEdges = function(){
    return this.edges;
};
DenseGraph.prototype.getVertices = function(){
    return this.vertices;
};
// 这里把“平行边”的概念去掉了
DenseGraph.prototype.addEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        if(this.hasEdge(v, m)){  //如果该边已经存在
            return;
        }
        this.matrix[v][m] = true;
        if(!this.directed){     //不是有向图的话
            this.matrix[m][v] = true;
        }
        this.edges++;
        
    }
};
//O(1)
DenseGraph.prototype.hasEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        if(this.matrix[v][m]){
            return true;
        }
        return false;
    }
};
//遍历邻边
DenseGraph.prototype.iterator = function(v){
    if(v >= 0 && v < this.vertices){
        var arr = [];
        for(var i = 0; i < this.matrix[v].length; i++){
            if(this.matrix[v][i] === true){
                arr.push(i);
            }
        }
        return arr;
    }
};

var g= new DenseGraph(10, false);
g.addEdge(0, 1);
g.addEdge(0, 8);
console.log(g.iterator(0));
