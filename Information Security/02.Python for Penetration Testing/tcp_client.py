import socket

# 创建一个套接字对象，使用 socket.AF_INET 表示 IPv4 地址家族，socket.SOCK_STREAM 表示 TCP 套接字类型
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 获取服务器的主机名和端口号
host = socket.gethostname()
port = 12345

# 连接服务器
client_socket.connect((host, port))

# 接收服务器发送的欢迎消息
welcome_message = client_socket.recv(1024)
print(f"收到服务器消息：{welcome_message.decode('utf-8')}")

# 关闭连接
client_socket.close()
