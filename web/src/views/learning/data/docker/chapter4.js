// Docker 第四章：容器操作
export default {
  id: 'docker-containers',
  title: '第四章：容器操作',
  sections: [
    {
      title: '4.1 容器生命周期管理',
      content: `理解容器的完整生命周期：创建、启动、运行、停止、删除。

容器状态：
• created：已创建但未启动
• running：正在运行
• paused：已暂停
• stopped：已停止
• exited：已退出
• dead：死亡状态`,
      code: `# 创建并启动容器
docker run -d --name mynginx nginx

# 创建容器但不启动
docker create --name mynginx nginx

# 启动已创建的容器
docker start mynginx

# 停止运行中的容器
docker stop mynginx

# 强制停止容器
docker kill mynginx

# 重启容器
docker restart mynginx

# 暂停容器
docker pause mynginx

# 恢复暂停的容器
docker unpause mynginx

# 删除容器
docker rm mynginx

# 强制删除运行中的容器
docker rm -f mynginx

# 删除所有已停止的容器
docker container prune

# 停止所有运行中的容器
docker stop $(docker ps -q)

# 删除所有容器
docker rm -f $(docker ps -aq)`,
      language: 'bash'
    },
    {
      title: '4.2 容器运行参数详解',
      content: `docker run 命令有大量参数，掌握常用参数是关键。

常用参数分类：
• 基本参数：名称、后台运行
• 端口映射：-p, -P
• 数据卷：-v, --mount
• 网络：--network
• 环境变量：-e, --env-file
• 资源限制：--memory, --cpus
• 重启策略：--restart`,
      code: `# 基本运行
docker run nginx

# 后台运行并命名
docker run -d --name web nginx

# 端口映射
docker run -d -p 8080:80 nginx
docker run -d -p 127.0.0.1:8080:80 nginx

# 随机端口映射
docker run -d -P nginx

# 挂载数据卷
docker run -d -v /host/path:/container/path nginx
docker run -d -v myvolume:/data nginx

# 只读挂载
docker run -d -v /host/path:/container/path:ro nginx

# 设置环境变量
docker run -d -e NODE_ENV=production myapp
docker run -d --env-file .env myapp

# 指定网络
docker run -d --network mynetwork nginx

# 资源限制
docker run -d --memory="512m" --cpus="1.5" nginx

# 重启策略
docker run -d --restart=always nginx
docker run -d --restart=on-failure:3 nginx

# 交互式运行
docker run -it ubuntu bash

# 自动删除容器
docker run --rm nginx

# 设置主机名
docker run -d --hostname myhost nginx

# 添加 hosts 记录
docker run -d --add-host myhost:192.168.1.100 nginx`,
      language: 'bash'
    },
    {
      title: '4.3 容器交互与调试',
      content: `与运行中的容器进行交互，执行命令和查看日志。

交互方式：
• 进入容器终端
• 执行单条命令
• 查看日志
• 复制文件
• 查看进程`,
      code: `# 进入容器（交互式）
docker exec -it mynginx bash
docker exec -it mynginx sh

# 在容器中执行命令
docker exec mynginx ls -la /usr/share/nginx/html
docker exec mynginx nginx -t

# 以 root 用户执行
docker exec -u root mynginx whoami

# 查看容器日志
docker logs mynginx

# 实时查看日志
docker logs -f mynginx

# 查看最近 100 行日志
docker logs --tail 100 mynginx

# 查看带时间戳的日志
docker logs -t mynginx

# 查看指定时间后的日志
docker logs --since 2024-01-01 mynginx
docker logs --since 10m mynginx

# 复制文件到容器
docker cp index.html mynginx:/usr/share/nginx/html/

# 从容器复制文件
docker cp mynginx:/etc/nginx/nginx.conf ./

# 查看容器内进程
docker top mynginx

# 查看容器详细信息
docker inspect mynginx

# 查看容器端口映射
docker port mynginx

# 查看容器文件系统变化
docker diff mynginx`,
      language: 'bash'
    },
    {
      title: '4.4 容器资源限制',
      content: `限制容器使用的 CPU、内存等资源，防止单个容器占用过多资源。

资源类型：
• 内存限制
• CPU 限制
• 磁盘 I/O 限制
• 网络带宽限制`,
      code: `# 限制内存
docker run -d --name myapp --memory="512m" myapp:1.0
docker run -d --memory="1g" --memory-swap="2g" myapp:1.0

# 内存预留
docker run -d --memory-reservation="256m" myapp:1.0

# OOM 时不杀死容器
docker run -d --oom-kill-disable myapp:1.0

# 限制 CPU
docker run -d --cpus="1.5" myapp:1.0
docker run -d --cpu-shares=512 myapp:1.0

# 指定 CPU 核心
docker run -d --cpuset-cpus="0,1" myapp:1.0

# 限制磁盘 I/O
docker run -d --device-read-bps /dev/sda:1mb myapp:1.0
docker run -d --device-write-bps /dev/sda:1mb myapp:1.0

# 限制 IOPS
docker run -d --device-read-iops /dev/sda:1000 myapp:1.0

# 查看容器资源使用情况
docker stats myapp

# 实时监控所有容器
docker stats

# 只显示一次
docker stats --no-stream

# 更新运行中容器的资源限制
docker update --memory="1g" --cpus="2" myapp`,
      language: 'bash'
    },
    {
      title: '4.5 容器重启策略',
      content: `配置容器的自动重启行为，提高服务可用性。

重启策略：
• no：不自动重启（默认）
• on-failure：失败时重启
• always：总是重启
• unless-stopped：除非手动停止`,
      code: `# 不自动重启
docker run -d --restart=no nginx

# 失败时重启（最多重启 3 次）
docker run -d --restart=on-failure:3 nginx

# 总是重启
docker run -d --restart=always nginx

# 除非手动停止
docker run -d --restart=unless-stopped nginx

# 更新已存在容器的重启策略
docker update --restart=always mynginx

# 查看容器重启次数
docker inspect -f "{{ .RestartCount }}" mynginx

# 查看容器重启策略
docker inspect -f "{{ .HostConfig.RestartPolicy }}" mynginx`,
      language: 'bash'
    },
    {
      title: '4.6 容器健康检查',
      content: `配置健康检查，自动检测容器是否正常运行。

健康状态：
• starting：启动中
• healthy：健康
• unhealthy：不健康

检查方式：
• CMD：执行命令
• HTTP：HTTP 请求
• TCP：TCP 连接`,
      code: `# Dockerfile 中配置健康检查
FROM nginx:alpine

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost/ || exit 1

# 运行时配置健康检查
docker run -d \\
  --name web \\
  --health-cmd="curl -f http://localhost/ || exit 1" \\
  --health-interval=30s \\
  --health-timeout=3s \\
  --health-retries=3 \\
  nginx

# 查看容器健康状态
docker inspect --format='{{.State.Health.Status}}' web

# 查看健康检查日志
docker inspect --format='{{json .State.Health}}' web | jq

# 禁用健康检查
docker run -d --no-healthcheck nginx`,
      language: 'bash'
    },
    {
      title: '4.7 容器日志管理',
      content: `配置容器日志驱动和日志轮转，避免日志文件过大。

日志驱动：
• json-file：默认，JSON 格式
• syslog：系统日志
• journald：systemd 日志
• none：不记录日志`,
      code: `# 配置日志驱动和大小限制
docker run -d \\
  --name web \\
  --log-driver json-file \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
  nginx

# 使用 syslog
docker run -d \\
  --log-driver syslog \\
  --log-opt syslog-address=tcp://192.168.1.100:514 \\
  nginx

# 不记录日志
docker run -d --log-driver none nginx

# 全局配置（/etc/docker/daemon.json）
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3",
    "labels": "production_status",
    "env": "os,customer"
  }
}

# 查看容器日志配置
docker inspect -f '{{.HostConfig.LogConfig}}' web`,
      language: 'bash'
    }
  ]
};
