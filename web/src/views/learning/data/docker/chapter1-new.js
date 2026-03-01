// 第一阶段：Docker 基础概念（1-2天）
export default {
  id: 'docker-basics',
  title: '第一阶段：Docker 基础概念（1-2天）',
  sections: [
    {
      title: '1.1 理解核心概念',
      content: `在开始使用 Docker 之前，需要理解三个核心概念。

镜像（Image）：
• 相当于一个模板，比如 nginx:latest
• 包含了运行应用所需的一切（代码、运行时、库、配置）
• 只读的，不会被修改
• 可以从 Docker Hub 下载，也可以自己构建

容器（Container）：
• 镜像运行起来的实例
• 可以启动、停止、删除
• 每个容器都是相互隔离的
• 容器是临时的，删除后数据会丢失

仓库（Registry）：
• 存放镜像的地方，比如 Docker Hub
• 类似于 GitHub，但存储的是镜像
• 可以搭建私有仓库

类比理解：
• 镜像 = 类（Class）
• 容器 = 对象（Object）
• 仓库 = GitHub`,
      code: null
    },
    {
      title: '1.2 基础命令练习',
      content: `通过实际操作来熟悉 Docker 的基本命令。

练习目标：
• 查看镜像和容器
• 运行第一个容器
• 查看容器日志
• 进入容器内部
• 停止和删除容器`,
      code: `# 查看本地镜像列表
docker images

# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 运行一个 nginx 容器
# -d: 后台运行
# -p: 端口映射（宿主机端口:容器端口）
# --name: 给容器命名
docker run -d -p 8080:80 --name test-nginx nginx

# 访问 http://localhost:8080 看效果

# 查看容器日志
docker logs test-nginx

# 实时查看日志
docker logs -f test-nginx

# 进入容器内部（交互式）
docker exec -it test-nginx bash

# 在容器内执行命令
ls /usr/share/nginx/html
cat /etc/nginx/nginx.conf
exit

# 停止容器
docker stop test-nginx

# 启动已停止的容器
docker start test-nginx

# 重启容器
docker restart test-nginx

# 删除容器（需要先停止）
docker rm test-nginx

# 强制删除运行中的容器
docker rm -f test-nginx`,
      language: 'bash'
    },
    {
      title: '1.3 实战练习：运行多个 Nginx',
      content: `通过运行多个 Nginx 容器，理解端口映射和容器隔离。

练习要点：
• 同一个镜像可以运行多个容器
• 每个容器需要映射不同的端口
• 容器之间相互隔离`,
      code: `# 运行第一个 Nginx（端口 8080）
docker run -d -p 8080:80 --name nginx1 nginx

# 运行第二个 Nginx（端口 8081）
docker run -d -p 8081:80 --name nginx2 nginx

# 运行第三个 Nginx（端口 8082）
docker run -d -p 8082:80 --name nginx3 nginx

# 查看所有运行中的容器
docker ps

# 分别访问
# http://localhost:8080
# http://localhost:8081
# http://localhost:8082

# 停止并删除所有容器
docker stop nginx1 nginx2 nginx3
docker rm nginx1 nginx2 nginx3

# 或者一条命令强制删除
docker rm -f nginx1 nginx2 nginx3`,
      language: 'bash'
    },
    {
      title: '1.4 常用命令总结',
      content: `总结第一阶段需要掌握的所有命令。

镜像相关：
• docker images - 查看镜像
• docker pull - 拉取镜像
• docker rmi - 删除镜像

容器相关：
• docker run - 创建并运行容器
• docker ps - 查看容器
• docker start/stop/restart - 启动/停止/重启
• docker rm - 删除容器
• docker logs - 查看日志
• docker exec - 进入容器执行命令`,
      code: `# 镜像操作
docker images                    # 查看所有镜像
docker pull nginx:latest         # 拉取最新版 nginx
docker rmi nginx:latest          # 删除镜像

# 容器操作
docker run -d --name test nginx  # 后台运行
docker ps                        # 查看运行中的容器
docker ps -a                     # 查看所有容器
docker start test                # 启动容器
docker stop test                 # 停止容器
docker restart test              # 重启容器
docker rm test                   # 删除容器
docker rm -f test                # 强制删除

# 日志和调试
docker logs test                 # 查看日志
docker logs -f test              # 实时查看日志
docker logs --tail 100 test      # 查看最后100行
docker exec -it test bash        # 进入容器

# 清理命令
docker container prune           # 删除所有停止的容器
docker image prune               # 删除无用镜像
docker system prune -a           # 清理所有无用资源`,
      language: 'bash'
    }
  ]
};
