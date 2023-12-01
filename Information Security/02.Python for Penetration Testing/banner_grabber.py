import socket


def banner_grabber(host, port):
    try:
        # 创建一个套接字对象
        s = socket.socket()

        # 连接到目标主机和端口
        s.connect((host, port))

        # 设置超时，以便在读取横幅时不会一直等待
        s.settimeout(2)

        # 发送一个简单的 HTTP 请求
        s.send(b'GET / HTTP/1.0\r\n\r\n')

        # 读取并打印横幅信息
        banner = s.recv(1024)
        print("[+] Banner Grabbed:", banner.decode('utf-8'))

    except Exception as e:
        print("[-] Error:", str(e))

    finally:
        # 关闭套接字连接
        s.close()


# 示例用法
target_host = "doubao.com"
target_port = 80

banner_grabber(target_host, target_port)
