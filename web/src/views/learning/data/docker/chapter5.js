// Docker 第五章：网络管理
export default {
  id: 'docker-network',
  title: '第五章：网络管理',
  sections: [
    {
      title: '5.1 Docker 网络模式',
      content: `Docker 提供多种网络模式，适应不同的应用场景。

网络模式：
• bridge（桥接）：默认模式，容器通过虚拟网桥通信
• host（主机）：容器使用宿主机网络，性能最好但隔离性差
• none（无网络）：容器没有网络接口
• container（容器）：共享其他容器的网络命名空间
• 自定义网络：用户创建的网络，支持服务发现`,
      code: `# 查看网络列表
docker network ls

# 查看网络详细信息
docker network inspect bridge

# 使用默认 bridge 网络
docker run -d --name web1 nginx

# 使用 host 网络
docker run -d --network host nginx

# 使用 none 网络
docker run -d --network none nginx

# 共享其他容器的网络
docker run -d --name web1 nginx
docker run -d --network container:web1 busybox

# 查看容器网络配置
docker inspect -f '{{.NetworkSettings.Networks}}' web1`,
      language: 'bash'
    },
    {
      title: '5.2 自定义网络',
      content: `创建自定义网络，实现容器间的服务发现和隔离。

自定义网络优势：
• 自动 DNS 解析（容器名即主机名）
• 更好的隔离性
• 可以动态连接和断开
• 支持网络别名`,
      code: `# 创建自定义桥接网络
docker network create mynetwork

# 创建指定子网的网络
docker network create --subnet=172.18.0.0/16 mynetwork

# 创建指定网关的网络
docker network create \\
  --subnet=172.18.0.0/16 \\
  --gateway=172.18.0.1 \\
  mynetwork

# 创建指定驱动的网络
docker network create --driver bridge mynetwork

# 使用自定义网络启动容器
docker run -d --name web --network mynetwork nginx

# 将容器连接到网络
docker network connect mynetwork web

# 断开容器网络
docker network disconnect mynetwork web

# 删除网络
docker network rm mynetwork

# 删除所有未使用的网络
docker network prune`,
      language: 'bash'
    },
    {
      title: '5.3 容器互联与服务发现',
      content: `在同一自定义网络中的容器可以通过容器名互相访问。

服务发现：
• 自动 DNS 解析
• 容器名作为主机名
• 支持网络别名
• 负载均衡`,
      code: `# 创建自定义网络
docker network create app-network

# 启动数据库容器
docker run -d \\
  --name mysql \\
  --network app-network \\
  -e MYSQL_ROOT_PASSWORD=secret \\
  -e MYSQL_DATABASE=myapp \\
  mysql:8.0

# 启动应用容器（可通过 mysql 主机名访问数据库）
docker run -d \\
  --name webapp \\
  --network app-network \\
  -e DB_HOST=mysql \\
  -e DB_USER=root \\
  -e DB_PASSWORD=secret \\
  -e DB_NAME=myapp \\
  -p 3000:3000 \\
  myapp:1.0

# 测试连接
docker exec webapp ping mysql
docker exec webapp curl http://mysql:3306

# 使用网络别名
docker run -d \\
  --name db \\
  --network app-network \\
  --network-alias database \\
  mysql:8.0

# 现在可以通过 database 访问
docker exec webapp ping database`,
      language: 'bash'
    },
    {
      title: '5.4 端口映射详解',
      content: `将容器端口映射到宿主机，使外部可以访问容器服务。

映射方式：
• 指定端口映射
• 随机端口映射
• 指定 IP 映射
• 映射多个端口
• UDP 端口映射`,
      code: `# 映射单个端口（宿主机:容器）
docker run -d -p 8080:80 nginx

# 映射到随机端口
docker run -d -P nginx

# 指定 IP 地址映射
docker run -d -p 127.0.0.1:8080:80 nginx

# 映射多个端口
docker run -d -p 80:80 -p 443:443 nginx

# 映射 UDP 端口
docker run -d -p 53:53/udp dns-server

# 映射端口范围
docker run -d -p 8000-8010:8000-8010 myapp

# 查看端口映射
docker port mynginx

# 查看所有容器的端口映射
docker ps --format "table {{.Names}}\\t{{.Ports}}"

# 动态查看端口映射
docker inspect -f '{{range $p, $conf := .NetworkSettings.Ports}} {{$p}} -> {{(index $conf 0).HostPort}} {{end}}' mynginx`,
      language: 'bash'
    },
    {
      title: '5.5 跨主机网络（Overlay）',
      content: `Overlay 网络用于 Docker Swarm 集群，实现跨主机容器通信。

使用场景：
• Docker Swarm 集群
• 跨主机容器通信
• 微服务架构
• 分布式应用`,
      code: `# 初始化 Swarm（在管理节点）
docker swarm init --advertise-addr 192.168.1.100

# 创建 overlay 网络
docker network create \\
  --driver overlay \\
  --attachable \\
  my-overlay-network

# 查看 overlay 网络
docker network ls --filter driver=overlay

# 在 overlay 网络中运行服务
docker service create \\
  --name web \\
  --network my-overlay-network \\
  --replicas 3 \\
  -p 80:80 \\
  nginx

# 普通容器连接到 overlay 网络
docker run -d \\
  --name test \\
  --network my-overlay-network \\
  alpine sleep 3600

# 查看网络中的容器
docker network inspect my-overlay-network`,
      language: 'bash'
    },
    {
      title: '5.6 网络故障排查',
      content: `常见网络问题的排查方法和工具。

排查工具：
• ping：测试连通性
• curl：测试 HTTP 服务
• netstat：查看网络连接
• tcpdump：抓包分析
• docker network inspect：查看网络配置`,
      code: `# 测试容器网络连通性
docker exec mycontainer ping google.com
docker exec mycontainer ping other-container

# 测试 HTTP 服务
docker exec mycontainer curl http://localhost:80

# 查看容器网络接口
docker exec mycontainer ip addr
docker exec mycontainer ifconfig

# 查看容器路由表
docker exec mycontainer ip route

# 查看容器监听端口
docker exec mycontainer netstat -tuln
docker exec mycontainer ss -tuln

# 查看容器 DNS 配置
docker exec mycontainer cat /etc/resolv.conf

# 抓包分析
docker exec mycontainer tcpdump -i eth0 -w /tmp/capture.pcap

# 查看网络详细信息
docker network inspect bridge

# 查看容器网络统计
docker stats --format "table {{.Container}}\\t{{.NetIO}}"`,
      language: 'bash'
    }
  ]
};
