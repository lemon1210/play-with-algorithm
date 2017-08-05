/*
    二分搜索树 BST
        二叉树
        不一定是完全二叉树(可以是不平衡的，左右孩子可有可无)，用数组表示不方便，
        每个节点的键值大于左孩子
        每个节点的键值小于右孩子
    查找问题是计算机中非常重要的基础问题
    查找，插入，删除都是O(logn)级别，高效！

    插入：先跟根节点的键值做比较
         特殊情况：键值相同则替代

    查找：contain和search同质

    二叉搜索树的四种遍历:O(n)
        遍历：前中后序-命名根据的是遍历当前节点的顺序
            后序：释放二叉树
            中序：从小到大排序
        前中后序遍历都是一种深度优先遍历，它遍历的过程是从浅到深的一个过程
        广度优先遍历（二叉树的层序遍历）：一层一层遍历下来，将每一层的节点遍历完毕。 通常要实现一个广度优先遍历，需要
        引入队列

    删除节点：最难 O（logn）
        删除最小，最大值
        删除只有左（右）孩子的节点,直接替代
        删除拥有左右孩子的节点，用右子树中的最小值来替换要删除的节点（右子树的所有节点大于左子树的所有节点）
                            或用左子树中的最小值来替换要删除的节点
    最小值：从当前根节点开始，不停地从它的左孩子方向找，直到某个左孩子节点没有左孩子了，该节点就是最小的

    二分搜索树具有顺序性： minimum maximum
                         successor, predecessor 前驱 后继 
                         floor, ceil
                         rank, select 给node节点添加一个记录有多少个子节点的属性
                         支持重复元素的BST, 给node节点添加count的属性

    BST的局限性：同样的数据，可以对应不同的二分搜索树。可能退化成链表(树左右孩子不平衡)，导致所有关于树的操作都退化成O(n)
                解决：
                    平横二叉树：无法退化成链表，它有左右两个子树，并且左右子树的高度不会超过1
                    平衡二叉树有诸多的实现，其中最为著名的实现叫红黑树。其他实现，2-3tree,AVL tree,Splay tree(伸展树)
                    红黑树：将结点分为红色结点和黑色结点
                    树有非常多的变种    

                    红黑树无需知道怎么实现，但要知道其实现原理以及解决了什么问题？            
*/


function Node(key, left, right){
    this.key = key;
    this.left = left;
    this.right = right;
}

//返回结点的键值
Node.prototype.show = function(){
    return this.key;
};

function BST(){
    this.root = null; //BST的根节点
    this.count = 0;
}

BST.prototype.size = function(){
    return this.count;
};

BST.prototype.isEmpty = function(){
    return this.count === 0;
};

BST.prototype.insert = function(key){
    var newNode = new Node(key, null, null);   //创建一个空结点
    if(!this.root){                  //不存在根节点，说明是一颗新树
        this.root = newNode;
        this.count++;
    }else{
        var current = this.root,
            parent;
        while(true){
            parent = current;        //保留current的一份副本
            if(key < current.key){
                current = current.left;            //当前节点 更改为 左子节点
                if(current === null){
                    parent.left = newNode;
                    this.count++;
                    break;
                }
            }else if(key > current.key){
                current = current.right;
                if(current === null){
                    parent.right = newNode;
                    this.count++;
                    break;
                }
            }
        }
    }
};

BST.prototype.contain = function(key){
    var current = this.root;
    while(true){
        if(key < current.key){
            current = current.left;
            if(current === null){
                break;
            }
        }else if(key > current.key){
            current = current.right;
            if(current === null){
                break;
            }
        }else{
            return true;
        }
    }
    return false;
};

//查找给定值
BST.prototype.search = function(key){
    var current = this.root;
    while(true){
        if(key < current.key){
            current = current.left;
            if(current === null){
                break;
            }
        }else if(key > current.key){
            current = current.right;
            if(current === null){
                break;
            }
        }else{
            return current;
        }
    }
    return null;
};
//前序遍历
BST.prototype.preOrder = function(){
    (function(node){
        if(node !== null){
            console.log(node.show());
            arguments.callee(node.left);
            arguments.callee(node.right);
        }
    })(this.root);
};
//中序遍历
BST.prototype.inOrder = function(){
    (function(node){
        if(node !== null){
            arguments.callee(node.left);
            console.log(node.show());
            arguments.callee(node.right);
        }
    })(this.root);
};
//后序遍历
BST.prototype.postOrder = function(){
    (function(node){
        if(node !== null){
            arguments.callee(node.left);
            arguments.callee(node.right);
            console.log(node.show());
        }
    })(this.root);
};
//层序遍历(需要利用队列)--广度优先搜索
BST.prototype.levelOrder = function(){
    var q = [];
    q.push(this.root)
    while(q.length !== 0){
        var res = q.shift();

        console.log(res.show());
        
        if(res.left !== null){
            q.push(res.left);
        }
        if(res.right !== null){
            q.push(res.right);
        }
    }
};
//查找最小值
BST.prototype.getMin = function(){
    if(this.root){
        var current = this.root;
        while(current.left){     //从this.root根节点不断地left,left,left...下去
            current = current.left;
        }
        return current.key;
    }else{
        return null;
    }
};

BST.prototype.getMax = function(){
    if(this.root){
        var current = this.root;
        while(current.right){
            current = current.right;
        }
        return current.key;
    }else{
        return null;
    }
};
//删除节点
BST.prototype.remove = function(key){
    this.root = this.removeNode(this.root, key);
};
// 删除掉以node为根的二分搜索树中键值为key的节点, 递归算法
// 返回删除节点后新的二分搜索树的根
BST.prototype.removeNode = function(node, key){
    if(node === null){
        return null;
    }
    if(key < node.key){
        node.left = this.removeNode(node.left, key);
        return node;
    }else if(key > node.key){
        node.right = this.removeNode(node.right, key);
        return node;
    }else{
        //没有左右子节点
        if(node.left === null && node.right === null){
            this.count--;
            return null;
        }
        //没有左子节点
        if(node.left === null){
            this.count--;
            return node.right;
        }
        //没有右子节点
        if(node.right === null){
            return node.left;
        }
        //有两个子节点的节点
        //找到待删除节点右子树中的最小节点，将它的key值复制给待删除节点，再删除该最小节点
        var minNode = this.__getSmallest(node.right);
        node.key = minNode.key;
        node.right = this.removeNode(node.right, minNode.key);
        //this.count--;
        return node;
    }
};

//查找以node为根节点的二叉树的最小值
BST.prototype.__getSmallest = function(node){
    var current = node;
    while(current.left){
        current = currnet.left;
    }
    return current;
};

var bst = new BST();
var arr = [9, 7, 10, 11, 8, 4, 3, 1, 2];

for(var i = 0; i < arr.length; i++){
    bst.insert(arr[i]);
}
console.log(bst.root);
bst.levelOrder();