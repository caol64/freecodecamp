import socket


host = input("Please enter the IP you want to scan: ")
port = int(input("Please enter the port you want to scan: "))


def portScanner(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(5)
    if s.connect_ex((host, port)):
        print("The port is closed")
    else:
        print("The port is open")
    s.close()


portScanner(port)
