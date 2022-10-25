
*****(数据结构与算法系列 目录)[https://www.cnblogs.com/skywang12345/p/3603935.html]
# 非I/O的异步API
## setTimeout()单次定时执行任务

## setInterval()多次定时执行任务

> 比较：不需要I/O线程池
# 红黑树的应用
红黑树的应用比较广泛，主要是用它来存储有序的数据，它的时间复杂度是O(lgn)，效率非常之高。
例如，Java集合中的TreeSet和TreeMap，C++ STL中的set、map，以及Linux虚拟内存的管理，都是通过红黑树去实现的。
- 调用setTimeout()或者setInterval()创建的定时器会被插入到定时器观察者内部的一个红黑树中
(红黑树的系列文章)[https://blog.csdn.net/u014183456/article/details/120253295]
最近看到一篇写的很详细的红黑树的系列文章：
红黑树(一)之 原理和算法详细介绍
红黑树(二)之 C语言的实现
红黑树(三)之 Linux内核中红黑树的经典实现
红黑树(四)之 C++的实现

(定时器系列1-红黑树)[https://blog.csdn.net/u014183456/article/details/120277324]

