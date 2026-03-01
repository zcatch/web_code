export default {
  id: 'redis',
  name: 'Redis',
  icon: '🔴',
  status: 'planned',
  description: 'Redis 缓存与数据结构深度应用',
  chapters: [
    {
      id: 'redis-basics',
      title: '第一章：Redis 入门',
      sections: [
        {
          title: '1.1 Redis 简介',
          content: `Redis 是一个开源的内存数据结构存储系统，可用作数据库、缓存和消息代理。

核心特性：
• 高性能：内存存储，读写速度极快（10万+ QPS）
• 丰富的数据类型：String、Hash、List、Set、Sorted Set、Bitmap、HyperLogLog、Geo
• 持久化：RDB 快照和 AOF 日志两种方式
• 主从复制：支持读写分离
• 集群支持：Redis Cluster 分布式方案
• 发布订阅：消息队列功能
• 事务支持：MULTI/EXEC 命令

应用场景：
• 缓存：减轻数据库压力
• 会话存储：分布式 Session
• 排行榜：Sorted Set 实现
• 计数器：原子操作
• 消息队列：List 或 Stream
• 分布式锁：SETNX 实现`,
          code: null
        },
        {
          title: '1.2 Redis 安装与配置',
          content: `在 Ubuntu 上安装 Redis 服务器。

安装方式：
• APT 包管理器（推荐）
• 源码编译
• Docker 容器`,
          code: `# 使用 APT 安装
sudo apt-get update
sudo apt-get install redis-server

# 启动 Redis 服务
sudo systemctl start redis-server

# 设置开机自启
sudo systemctl enable redis-server

# 查看状态
sudo systemctl status redis-server

# 连接 Redis
redis-cli

# 测试连接
redis-cli ping
# 输出：PONG

# 查看 Redis 信息
redis-cli info`,
          language: 'bash'
        }
      ]
    }
  ]
};
