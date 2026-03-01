// Docker 第6-10章：数据管理、Docker Compose、实战部署等
export const chapter6 = {
  id: 'docker-volumes',
  title: '第六章：数据管理与持久化',
  sections: [
    {
      title: '6.1 数据持久化方案',
      content: `Docker 提供三种数据持久化方式。

Volumes（数据卷）：
• Docker 管理的存储，推荐方式
• 存储在 /var/lib/docker/volumes/
• 可以在容器间共享
• 支持远程存储驱动

Bind Mounts（绑定挂载）：
• 挂载宿主机目录
• 完全控制文件路径
• 适合开发环境

tmpfs：
• 临时文件系统，存储在内存中
• 容器停止后数据丢失
• 适合敏感数据`,
      code: `# 创建数据卷
docker volume create mydata

# 查看数据卷列表
docker volume ls

# 查看数据卷详情
docker volume inspect mydata

# 使用数据卷
docker run -d -v mydata:/var/lib/mysql mysql:8.0

# 绑定挂载宿主机目录
docker run -d -v /host/path:/container/path nginx

# 只读挂载
docker run -d -v /host/path:/container/path:ro nginx

# 使用 tmpfs
docker run -d --tmpfs /tmp nginx

# 删除数据卷
docker volume rm mydata

# 清理未使用的数据卷
docker volume prune`,
      language: 'bash'
    }
  ]
};

export const chapter7 = {
  id: 'docker-compose',
  title: '第七章：Docker Compose 编排',
  sections: [
    {
      title: '7.1 Docker Compose 简介',
      content: `Docker Compose 是用于定义和运行多容器 Docker 应用的工具。

核心概念：
• 使用 YAML 文件定义服务
• 一条命令启动所有服务
• 自动创建网络和数据卷
• 适合开发、测试和生产环境`,
      code: `# 安装 Docker Compose（Ubuntu）
sudo apt-get install docker-compose-plugin

# 验证安装
docker compose version

# 基本命令
docker compose up -d      # 启动服务
docker compose down       # 停止并删除服务
docker compose ps         # 查看服务状态
docker compose logs -f    # 查看日志
docker compose restart    # 重启服务`,
      language: 'bash'
    }
  ]
};

export const chapter8 = {
  id: 'docker-registry',
  title: '第八章：私有镜像仓库',
  sections: [
    {
      title: '8.1 搭建私有 Registry',
      content: `搭建企业内部的私有镜像仓库。

使用场景：
• 企业内部镜像管理
• 加速镜像分发
• 镜像安全控制
• 离线环境部署`,
      code: `# 运行 Registry 容器
docker run -d \\
  -p 5000:5000 \\
  --name registry \\
  -v /opt/registry:/var/lib/registry \\
  registry:2

# 推送镜像到私有仓库
docker tag nginx:latest localhost:5000/nginx:latest
docker push localhost:5000/nginx:latest

# 从私有仓库拉取
docker pull localhost:5000/nginx:latest

# 查看仓库中的镜像
curl http://localhost:5000/v2/_catalog`,
      language: 'bash'
    }
  ]
};

export const chapter9 = {
  id: 'docker-swarm',
  title: '第九章：Docker Swarm 集群',
  sections: [
    {
      title: '9.1 Swarm 集群搭建',
      content: `Docker Swarm 是 Docker 原生的集群管理和编排工具。

核心概念：
• Manager 节点：管理集群
• Worker 节点：运行任务
• Service：服务定义
• Task：服务实例
• Stack：应用栈`,
      code: `# 初始化 Swarm（管理节点）
docker swarm init --advertise-addr 192.168.1.100

# 查看加入命令
docker swarm join-token worker
docker swarm join-token manager

# 工作节点加入集群
docker swarm join --token TOKEN 192.168.1.100:2377

# 查看节点列表
docker node ls

# 创建服务
docker service create \\
  --name web \\
  --replicas 3 \\
  -p 80:80 \\
  nginx

# 查看服务列表
docker service ls

# 扩展服务
docker service scale web=5`,
      language: 'bash'
    }
  ]
};

export const chapter10 = {
  id: 'docker-practice',
  title: '第十章：Ubuntu 生产环境实战',
  sections: [
    {
      title: '10.1 完整项目部署架构',
      content: `在 Ubuntu Linux 上部署一个完整的 Web 应用。

项目架构：
• Nginx：反向代理和静态文件服务
• Node.js API：后端服务
• MySQL：数据库
• Redis：缓存
• Docker Compose：服务编排`,
      code: `# docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./frontend/dist:/usr/share/nginx/html
    depends_on:
      - api
    restart: always

  api:
    build: ./api
    environment:
      - NODE_ENV=production
      - DB_HOST=mysql
      - REDIS_HOST=redis
    depends_on:
      - mysql
      - redis
    restart: always

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=myapp
    volumes:
      - mysql-data:/var/lib/mysql
    restart: always

  redis:
    image: redis:alpine
    restart: always

volumes:
  mysql-data:`,
      language: 'yaml'
    },
    {
      title: '10.2 生产环境部署流程',
      content: `完整的生产环境部署步骤。

部署流程：
1. 准备服务器环境
2. 配置 Docker
3. 准备应用代码
4. 构建镜像
5. 启动服务
6. 配置监控
7. 备份策略`,
      code: `# 1. 克隆项目
git clone https://github.com/user/myproject.git
cd myproject

# 2. 配置环境变量
cat > .env << EOF
MYSQL_ROOT_PASSWORD=your_secure_password
NODE_ENV=production
EOF

# 3. 构建并启动服务
docker compose up -d --build

# 4. 查看服务状态
docker compose ps

# 5. 查看日志
docker compose logs -f

# 6. 健康检查
curl http://localhost/api/health

# 7. 备份数据库
docker compose exec mysql mysqldump -u root -p myapp > backup.sql

# 8. 更新应用
git pull
docker compose up -d --build

# 9. 清理旧镜像
docker image prune -a`,
      language: 'bash'
    }
  ]
};
