"""
brew install nmap
pip install python-nmap
"""

import nmap

# 创建 Nmap 扫描对象
scanner = nmap.PortScanner()

# 执行扫描
result = scanner.scan(hosts='127.0.0.1', arguments='-p 22-80')

# 输出扫描结果
for host, scan_result in result['scan'].items():
    print(f"Host: {host}")
    print(scan_result)
    # for proto, ports in scan_result['tcp'].items():
    #     print(f"  Protocol: {proto}")
    #     for port, port_info in ports.items():
    #         print(f"    Port: {port} - {port_info['name']} - {port_info['state']}")
