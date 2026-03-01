# Linux 系统问答

---

## 📌 Ubuntu 登录信息解读

**分类**: Linux 系统 > WSL2  
**日期**: 2026-03-01  
**难度**: ⭐ 基础  
**标签**: `ubuntu` `wsl2` `system-info`

### ❓ 问题
Ubuntu 登录时显示的系统信息（System load、Memory usage 等）分别是什么意思？

### ✅ 解答

**系统版本信息**
```
Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 6.6.87.2-microsoft-standard-WSL2 x86_64)
```
- Ubuntu 22.04.5 LTS（长期支持版本）
- 运行在 WSL2（Windows Subsystem for Linux 2）上
- 内核版本 6.6.87.2

**系统状态指标**

| 指标 | 含义 | 示例值 |
|------|------|--------|
| System load | CPU 平均负载（1分钟） | 1.16 |
| Usage of / | 根目录磁盘使用率 | 0.4% of 1006.85GB |
| Memory usage | 内存使用率 | 5% |
| Swap usage | 交换空间使用率 | 0% |
| Processes | 当前运行进程数 | 34 |
| Users logged in | 登录用户数 | 0 |
| IPv4 address | 网络接口 IP 地址 | 172.24.72.60 |

**💡 小贴士**
- 可以创建 `~/.hushlogin` 文件来隐藏每日提示信息
- System load 小于 CPU 核心数表示系统负载正常

---
