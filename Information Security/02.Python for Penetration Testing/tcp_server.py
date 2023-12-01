import socket

# 创建一个套接字对象，使用 socket.AF_INET 表示 IPv4 地址家族，socket.SOCK_STREAM 表示 TCP 套接字类型
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 获取本地主机名
host = socket.gethostname()
port = 12345  # 使用非特权端口号

# 绑定地址和端口
server_socket.bind((host, port))

# 设置最大连接数
server_socket.listen(5)

print("等待客户端连接...")

while True:
    # 建立客户端连接
    client_socket, addr = server_socket.accept()
    print(f"收到来自 {addr} 的连接")

    # 发送欢迎消息给连接上的客户端
    message = "欢迎访问服务器！"
    client_socket.send(message.encode('utf-8'))

    # 关闭连接
    client_socket.close()
