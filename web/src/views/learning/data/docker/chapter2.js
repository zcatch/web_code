// Docker 第二章：安装与配置
export default {
  id: 'docker-install',
  title: '第二章：安装与配置',
  sections: [
    {
      title: '2.1 Ubuntu 系统安装 Docker',
      content: `在 Ubuntu Linux 上安装 Docker Engine 的完整步骤。

系统要求：
• Ubuntu 20.04 LTS 或更高版本
• 64 位系统
• 内核版本 3.10 或更高

安装方式：
• 官方仓库安装（推荐）
• 脚本自动安装
• 离线安装包`,
      code: `# 1. 卸载旧版本（如果有）
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. 更新软件包索引
sudo apt-get update

# 3. 安装必要的依赖包
sudo apt-get install -y \\
    ca-certificates \\
    curl \\
    gnupg \\
    lsb-release

# 4. 添加 Docker 官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \\
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 5. 设置 Docker 稳定版仓库
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \\
  https://download.docker.com/linux/ubuntu \\
  $(lsb_release -cs) stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 6. 更新软件包索引
sudo apt-get update

# 7. 安装 Docker Engine、CLI 和 Containerd
sudo apt-get install -y \\
    docker-ce \\
    docker-ce-cli \\
    containerd.io \\
    docker-buildx-plugin \\
    docker-compose-plugin

# 8. 验证安装是否成功
sudo docker --version
sudo docker run hello-world`,
      language: 'bash'
    },
    {
      title: '2.2 配置 Docker 用户权限',
      content: `默认情况下，Docker 命令需要 root 权限。为了方便使用，可以将当前用户添加到 docker 组。

注意事项：
• docker 组的用户拥有 root 等效权限
• 仅在可信环境中使用
• 生产环境建议使用 sudo`,
      code: `# 1. 创建 docker 组（通常安装时已自动创建）
sudo groupadd docker

# 2. 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 3. 激活组更改（需要重新登录或执行）
newgrp docker

# 4. 验证无需 sudo 即可运行
docker run hello-world

# 5. 查看当前用户所属组
groups`,
      language: 'bash'
    },
    {
      title: '2.3 配置 Docker 镜像加速',
      content: `由于网络原因，从 Docker Hub 拉取镜像可能很慢。配置国内镜像加速器可以显著提升速度。

常用镜像加速器：
• 阿里云容器镜像服务
• 腾讯云容器镜像服务
• 网易云镜像中心
• Docker 中国官方镜像`,
      code: `# 1. 创建或编辑 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

# 2. 重新加载配置
sudo systemctl daemon-reload

# 3. 重启 Docker 服务
sudo systemctl restart docker

# 4. 验证配置是否生效
docker info | grep -A 5 "Registry Mirrors"`,
      language: 'bash'
    },
    {
      title: '2.4 Docker 服务管理',
      content: `使用 systemctl 管理 Docker 服务的启动、停止和状态查看。

服务管理命令：
• 启动服务
• 停止服务
• 重启服务
• 查看状态
• 开机自启`,
      code: `# 启动 Docker 服务
sudo systemctl start docker

# 停止 Docker 服务
sudo systemctl stop docker

# 重启 Docker 服务
sudo systemctl restart docker

# 查看 Docker 服务状态
sudo systemctl status docker

# 设置开机自启动
sudo systemctl enable docker

# 取消开机自启动
sudo systemctl disable docker

# 查看 Docker 服务日志
sudo journalctl -u docker.service

# 实时查看日志
sudo journalctl -u docker.service -f`,
      language: 'bash'
    },
    {
      title: '2.5 验证安装与基本信息',
      content: `安装完成后，验证 Docker 是否正常工作，并查看系统信息。

验证内容：
• Docker 版本信息
• 系统信息
• 运行测试容器`,
      code: `# 查看 Docker 版本
docker --version
docker version

# 查看详细系统信息
docker info

# 运行 hello-world 测试容器
docker run hello-world

# 查看 Docker 磁盘使用情况
docker system df

# 查看 Docker 事件
docker events

# 查看 Docker 系统范围的信息
docker system info`,
      language: 'bash'
    }
  ]
};
