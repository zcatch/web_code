// 第二阶段：数据持久化和端口映射（2-3天）
export default {
  id: 'docker-volumes',
  title: '第二阶段：数据持久化和端口映射（2-3天）',
  sections: [
    {
      title: '2.1 端口映射详解',
      content: `端口映射是让外部访问容器服务的关键。

映射格式：
• -p 宿主机端口:容器端口
• 可以映射多个端口
• 可以指定 IP 地址

使用场景：
• Web 服务：80、443
• 数据库：3306、5432
• Redis：6379
• 开发服务器：3000、8080`,
      code: `# 基本端口映射
docker run -d -p 8080:80 nginx
# 访问 localhost:8080

# 映射到不同端口
docker run -d -p 9090:80 --name nginx2 nginx
# 访问 localhost:9090

# 映射多个端口
docker run -d \\
  -p 80:80 \\
  -p 443:443 \\
  --name web nginx

# 指定 IP 地址映射（只允许本机访问）
docker run -d -p 127.0.0.1:8080:80 nginx

# 随机端口映射
docker run -d -P nginx

# 查看端口映射
docker port nginx`,
      language: 'bash'
    },
    {
      title: '2.2 数据卷挂载（重要！）',
      content: `数据卷是实现代码热更新的关键，修改本地文件立即生效。

为什么需要数据卷：
• 容器删除后数据会丢失
• 需要在宿主机和容器间共享文件
• 实现代码热更新（开发必备）
• 数据持久化

挂载方式：
• -v 宿主机路径:容器路径
• 宿主机路径必须是绝对路径
• 容器路径由镜像决定`,
      code: `# 创建测试目录和文件
mkdir -p ~/docker-test/html
echo "<h1>Hello Docker</h1>" > ~/docker-test/html/index.html

# 挂载本地目录到容器
docker run -d -p 8080:80 \\
  -v ~/docker-test/html:/usr/share/nginx/html \\
  --name my-nginx nginx

# 访问 localhost:8080 看到 "Hello Docker"

# 修改本地文件
echo "<h1>Hello World</h1>" > ~/docker-test/html/index.html

# 刷新浏览器，立即看到变化！

# 查看挂载信息
docker inspect my-nginx | grep Mounts -A 10`,
      language: 'bash'
    },
    {
      title: '2.3 实战：搭建静态网站',
      content: `使用数据卷挂载，搭建一个可以实时修改的静态网站。

项目结构：
~/docker-test/
├── html/
│   ├── index.html
│   ├── about.html
│   └── css/
│       └── style.css`,
      code: `# 创建项目结构
mkdir -p ~/docker-test/html/css
mkdir -p ~/docker-test/html/js

# 创建 index.html
cat > ~/docker-test/html/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>我的网站</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>欢迎来到我的网站</h1>
    <p>这是一个使用 Docker 部署的静态网站</p>
</body>
</html>
EOF

# 创建 CSS 文件
cat > ~/docker-test/html/css/style.css << 'EOF'
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
}
h1 {
    color: #333;
}
EOF

# 运行容器
docker run -d -p 8080:80 \\
  -v ~/docker-test/html:/usr/share/nginx/html \\
  --name my-website nginx

# 访问 localhost:8080
# 修改 HTML 或 CSS，刷新浏览器立即生效！`,
      language: 'bash'
    },
    {
      title: '2.4 只读挂载',
      content: `有时候我们希望容器只能读取文件，不能修改。

使用场景：
• 配置文件（防止容器修改）
• 静态资源（只读即可）
• 安全考虑`,
      code: `# 只读挂载（添加 :ro）
docker run -d -p 8080:80 \\
  -v ~/docker-test/html:/usr/share/nginx/html:ro \\
  --name readonly-nginx nginx

# 尝试在容器内修改文件
docker exec readonly-nginx sh -c "echo 'test' > /usr/share/nginx/html/test.txt"
# 会提示：Read-only file system

# 对比：可写挂载
docker run -d -p 8081:80 \\
  -v ~/docker-test/html:/usr/share/nginx/html \\
  --name writable-nginx nginx

docker exec writable-nginx sh -c "echo 'test' > /usr/share/nginx/html/test.txt"
# 成功创建文件`,
      language: 'bash'
    },
    {
      title: '2.5 数据卷 vs 绑定挂载',
      content: `Docker 提供两种数据持久化方式。

绑定挂载（Bind Mount）：
• 直接挂载宿主机目录
• 路径由用户指定
• 适合开发环境
• 我们一直在用的方式

数据卷（Volume）：
• Docker 管理的存储
• 路径由 Docker 管理
• 适合生产环境
• 更安全、更易管理`,
      code: `# 绑定挂载（我们一直在用的）
docker run -d \\
  -v ~/docker-test/html:/usr/share/nginx/html \\
  nginx

# 数据卷方式
# 创建数据卷
docker volume create my-data

# 使用数据卷
docker run -d \\
  -v my-data:/usr/share/nginx/html \\
  nginx

# 查看数据卷
docker volume ls

# 查看数据卷详情
docker volume inspect my-data

# 数据卷实际存储位置
# /var/lib/docker/volumes/my-data/_data

# 删除数据卷
docker volume rm my-data

# 清理未使用的数据卷
docker volume prune`,
      language: 'bash'
    },
    {
      title: '2.6 实战总结',
      content: `第二阶段重点掌握的技能。

必须掌握：
• 端口映射：-p 宿主机端口:容器端口
• 数据卷挂载：-v 宿主机路径:容器路径
• 实现代码热更新

常见问题：
• 端口被占用：换一个端口
• 挂载路径错误：使用绝对路径
• 权限问题：检查目录权限

下一阶段：
• 运行 PHP 项目
• Nginx + PHP-FPM 联动
• 搭建完整的开发环境`,
      code: `# 完整示例：运行一个网站
docker run -d \\
  --name my-website \\
  -p 8080:80 \\
  -v ~/my-project/html:/usr/share/nginx/html:ro \\
  --restart always \\
  nginx

# 参数说明：
# -d: 后台运行
# --name: 容器名称
# -p: 端口映射
# -v: 数据卷挂载（只读）
# --restart always: 自动重启

# 查看运行状态
docker ps

# 查看日志
docker logs -f my-website

# 停止并删除
docker rm -f my-website`,
      language: 'bash'
    }
  ]
};
