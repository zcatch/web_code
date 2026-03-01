export default {
  id: 'linux',
  name: 'Linux',
  icon: '🐧',
  status: 'planned',
  description: 'Linux 系统管理与运维实战',
  chapters: [
    {
      id: 'linux-basics',
      title: '第一章：Linux 基础入门',
      sections: [
        {
          title: '1.1 Linux 简介与发行版',
          content: `Linux 是一个开源的类 Unix 操作系统内核，广泛应用于服务器、嵌入式设备等领域。

主流发行版：
• Ubuntu：易用，适合新手和桌面用户
• CentOS/Rocky Linux：企业级，稳定可靠
• Debian：社区驱动，纯净稳定
• Arch Linux：滚动更新，高度定制
• Red Hat Enterprise Linux：商业支持

选择建议：
• 学习和开发：Ubuntu
• 生产服务器：CentOS/Rocky Linux
• 追求稳定：Debian
• 高级用户：Arch Linux`,
          code: null
        },
        {
          title: '1.2 Linux 文件系统结构',
          content: `Linux 采用树形目录结构，一切皆文件。

重要目录：
• /：根目录
• /bin：基本命令
• /etc：配置文件
• /home：用户主目录
• /var：可变数据（日志、缓存）
• /usr：用户程序
• /tmp：临时文件
• /opt：第三方软件`,
          code: null
        }
      ]
    }
  ]
};
