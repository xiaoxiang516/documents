# 页面加载过程

三次握手 四次挥手

HTTP是应用层协议，是建立在传输层TCP基础之上的。在通信过程中，TCP每一次连接的建立和拆除都会经历三次握手和四次挥手，
性能和效率是比较低的。HTTP一个显著的特点是无状态的，并且最初的设计初衷是用于短连接场景，请求时建连接、请求完释放连接，
以尽快将释放服务资源供其他客户端使用。这就导致每一次原始HTTP协议的传输都需要进行连接的建立和拆除，从而导致性能比较低。


<style>
  .red {
    color: red;
  }
</style>
<code class="red">
- http
- tcp
- Ajax
- Axios
- Promise
- Html
- CSS
- windows
- postman
</code>