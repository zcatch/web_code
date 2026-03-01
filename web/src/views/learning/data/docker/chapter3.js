// Docker 第三章：镜像管理
export default {
  id: 'docker-images',
  title: '第三章：镜像管理',
  sections: [
    {
      title: '3.1 镜像基本操作',
      content: `Docker 镜像是容器的基础，掌握镜像操作是使用 Docker 的关键。

镜像命名规范：
• 格式：[registry]/[namespace]/[repository]:[tag]
• 示例：docker.io/library/nginx:latest
• 默认 registry：docker.io
• 默认 namespace：library
• 默认 tag：latest`,
      code: `# 搜索镜像
docker search nginx
docker search --filter stars=100 nginx

# 拉取镜像
docker pull nginx
docker pull nginx:1.24
docker pull nginx:alpine

# 查看本地镜像列表
docker images
docker image ls

# 查看镜像详细信息
docker inspect nginx:latest
docker image inspect nginx:latest

# 查看镜像历史（构建层）
docker history nginx:latest

# 给镜像打标签
docker tag nginx:latest myregistry.com/nginx:v1.0

# 删除镜像
docker rmi nginx:latest
docker image rm nginx:latest

# 强制删除镜像（即使有容器在使用）
docker rmi -f nginx:latest

# 删除所有未使用的镜像
docker image prune

# 删除所有镜像
docker rmi $(docker images -q)`,
      language: 'bash'
    },
    {
      title: '3.2 镜像的导入导出',
      content: `在没有网络或需要离线部署时，可以导出和导入镜像。

使用场景：
• 离线环境部署
• 镜像备份
• 跨环境迁移
• 版本归档

save vs export：
• save：保存镜像（包含历史和元数据）
• export：导出容器（不包含历史）`,
      code: `# 导出镜像到 tar 文件
docker save -o nginx.tar nginx:latest
docker save nginx:latest > nginx.tar

# 导出多个镜像
docker save -o images.tar nginx:latest mysql:8.0 redis:alpine

# 导入镜像
docker load -i nginx.tar
docker load < nginx.tar

# 查看 tar 文件内容（不导入）
tar -tvf nginx.tar

# 从容器创建镜像并导出
docker export container_name > container.tar

# 导入容器快照为镜像
docker import container.tar myimage:v1.0

# 压缩导出（节省空间）
docker save nginx:latest | gzip > nginx.tar.gz

# 导入压缩文件
gunzip -c nginx.tar.gz | docker load`,
      language: 'bash'
    },
    {
      title: '3.3 Dockerfile 基础',
      content: `Dockerfile 是用于构建 Docker 镜像的文本文件，包含一系列指令。

常用指令：
• FROM：指定基础镜像
• RUN：执行命令
• COPY：复制文件
• ADD：复制文件（支持 URL 和自动解压）
• WORKDIR：设置工作目录
• ENV：设置环境变量
• EXPOSE：声明端口
• CMD：容器启动命令
• ENTRYPOINT：入口点
• VOLUME：声明数据卷
• USER：指定用户
• ARG：构建参数`,
      code: `# 基础 Dockerfile 示例
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 启动命令
CMD ["node", "server.js"]`,
      language: 'dockerfile'
    },
    {
      title: '3.4 构建镜像',
      content: `使用 docker build 命令根据 Dockerfile 构建镜像。

构建过程：
1. 读取 Dockerfile
2. 逐行执行指令
3. 每条指令创建一个新层
4. 生成最终镜像

构建上下文：
• 构建时发送给 Docker daemon 的文件集合
• 默认为当前目录
• 使用 .dockerignore 排除不需要的文件`,
      code: `# 基本构建（当前目录）
docker build -t myapp:1.0 .

# 指定 Dockerfile 路径
docker build -f /path/to/Dockerfile -t myapp:1.0 .

# 使用构建参数
docker build --build-arg NODE_ENV=production -t myapp:1.0 .

# 不使用缓存构建
docker build --no-cache -t myapp:1.0 .

# 指定构建平台
docker build --platform linux/amd64 -t myapp:1.0 .

# 多标签构建
docker build -t myapp:1.0 -t myapp:latest .

# 查看构建历史
docker history myapp:1.0

# 查看镜像层详情
docker inspect myapp:1.0

# 构建时显示详细输出
docker build --progress=plain -t myapp:1.0 .`,
      language: 'bash'
    },
    {
      title: '3.5 多阶段构建',
      content: `多阶段构建可以显著减小最终镜像的大小，分离构建环境和运行环境。

优势：
• 减小镜像体积（只包含运行时需要的文件）
• 提高安全性（不包含构建工具）
• 简化 Dockerfile
• 提高构建效率`,
      code: `# 多阶段构建示例
# 第一阶段：构建阶段
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 第二阶段：运行阶段
FROM node:18-alpine

WORKDIR /app

# 只复制构建产物和运行时依赖
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]`,
      language: 'dockerfile'
    },
    {
      title: '3.6 镜像优化技巧',
      content: `优化 Docker 镜像可以减小体积、提升构建速度和安全性。

优化策略：
• 使用轻量级基础镜像（alpine）
• 合并 RUN 指令减少层数
• 利用构建缓存
• 使用 .dockerignore
• 多阶段构建
• 清理缓存和临时文件`,
      code: `# 优化前（体积大）
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/server.js"]

# 优化后（体积小）
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
CMD ["node", "dist/server.js"]

# .dockerignore 文件内容
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
*.md`,
      language: 'dockerfile'
    },
    {
      title: '3.7 镜像安全扫描',
      content: `定期扫描镜像漏洞，确保应用安全。

扫描工具：
• Docker Scout（官方）
• Trivy（开源）
• Clair（开源）
• Snyk（商业）`,
      code: `# 使用 Docker Scout 扫描
docker scout cves myapp:1.0

# 使用 Trivy 扫描
# 安装 Trivy
sudo apt-get install wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy

# 扫描镜像
trivy image myapp:1.0

# 只显示高危和严重漏洞
trivy image --severity HIGH,CRITICAL myapp:1.0

# 输出为 JSON 格式
trivy image -f json -o results.json myapp:1.0`,
      language: 'bash'
    }
  ]
};
