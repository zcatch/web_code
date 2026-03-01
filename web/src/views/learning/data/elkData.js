export default {
  id: 'elk',
  name: 'ELK Stack',
  icon: '📊',
  status: 'planned',
  description: 'Elasticsearch + Logstash + Kibana 日志分析完整方案',
  chapters: [
    {
      id: 'elk-basics',
      title: '第一章：ELK Stack 简介',
      sections: [
        {
          title: '1.1 ELK Stack 是什么',
          content: `ELK Stack 是三个开源项目的首字母缩写：Elasticsearch、Logstash 和 Kibana。

组件功能：
• Elasticsearch：分布式搜索和分析引擎，存储和检索数据
• Logstash：数据收集和处理管道，收集、转换、发送数据
• Kibana：数据可视化平台，创建图表和仪表板
• Beats：轻量级数据采集器（Filebeat、Metricbeat 等）

工作流程：
1. Beats/Logstash 收集日志数据
2. Logstash 处理和转换数据
3. Elasticsearch 存储和索引数据
4. Kibana 可视化展示数据

应用场景：
• 日志分析：应用日志、系统日志、访问日志
• 应用监控：性能指标、错误追踪
• 安全分析：安全事件、威胁检测
• 业务分析：用户行为、业务指标`,
          code: null
        },
        {
          title: '1.2 ELK Stack 架构',
          content: `ELK Stack 的典型架构和数据流。

架构层次：
• 数据源层：应用服务器、数据库、网络设备
• 采集层：Beats、Logstash
• 存储层：Elasticsearch 集群
• 展示层：Kibana

数据流：
数据源 → Beats → Logstash → Elasticsearch → Kibana

高可用架构：
• Elasticsearch 集群（3+ 节点）
• Logstash 多实例
• Kibana 负载均衡
• Redis/Kafka 作为缓冲队列`,
          code: null
        }
      ]
    }
  ]
};
