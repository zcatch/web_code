<template>
  <div class="about-page">
    <!-- Ambient Background -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>

    <div class="container about-content">
      <!-- Profile Header -->
      <section class="profile-header about-reveal">
        <div class="glass-panel profile-card">
          <div class="profile-layout">
            <div class="profile-avatar-wrapper">
               <div class="profile-avatar">
                 <span>A</span>
               </div>
            </div>
            <div class="profile-info">
              <h1 class="gradient-text main-name">AIZO | 个人技术空间</h1>
              <p class="role-title">专注于 Web 技术栈的工程化实践与效率提升</p>
              <div class="bio-container">
                <p class="bio-text">
                  你好，我是一名专注于全栈开发的个人开发者。我习惯于通过博客记录技术探索的过程，内容涵盖从前端框架深度解析到后端高并发架构实践。
                </p>
                <p class="bio-text">
                  在技术选型上，我主张“工具服务于业务”的理念。我日常使用 Vue 3 组合式 API 处理复杂的交互逻辑，利用 Node.js 和 Go 支撑后端服务，并配合 Docker 和 Nginx 优化交付链路。相比于虚华的设计，我更关注系统在高并发下的表现（如 Redis 分布式锁、内存管理）以及团队协作中的代码鲁棒性。
                </p>
              </div>
              <div class="social-links">
                <a href="#" class="social-icon" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                </a>
                <a href="#" class="social-icon" title="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="grid-layout">
        <!-- Skills Matrix -->
        <section class="skills-section about-reveal">
          <h2 class="section-title">核心技术栈</h2>
          <div class="skills-grid">
            <div class="glass-panel skill-card">
              <div class="skill-icon frontend">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div class="skill-info">
                <h3>现代前端</h3>
                <div class="tags">
                  <span>Vue 3 / Composition API</span>
                  <span>TypeScript 高级类型</span>
                  <span>Grid / Flexbox 布局</span>
                  <span>Three.js 交互</span>
                </div>
              </div>
            </div>
            
            <div class="glass-panel skill-card">
              <div class="skill-icon creative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div class="skill-info">
                <h3>后端与存储</h3>
                <div class="tags">
                  <span>Node.js 优化</span>
                  <span>Go 并发模式</span>
                  <span>Redis 分布式锁</span>
                  <span>V8 内存分析</span>
                </div>
              </div>
            </div>

            <div class="glass-panel skill-card">
              <div class="skill-icon backend">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              </div>
              <div class="skill-info">
                <h3>运维与交付</h3>
                <div class="tags">
                  <span>Docker 容器化</span>
                  <span>Nginx 高级配置</span>
                  <span>Shell 自动化备份</span>
                  <span>Linux 系统分析</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Timeline -->
        <section class="timeline-section about-reveal">
           <h2 class="section-title">技术沉淀</h2>
           <div class="glass-panel timeline-container">
             <div class="timeline-item">
               <div class="timeline-dot current"></div>
               <div class="timeline-content">
                 <span class="timeline-date">当前重点</span>
                 <h4>架构设计与性能优化</h4>
                 <p>研究 Go 语言并发哲学及其在百万级 QPS 场景下的应用，通过分布式锁等方案保障系统一致性。</p>
               </div>
             </div>
             <div class="timeline-item">
               <div class="timeline-dot"></div>
               <div class="timeline-content">
                 <span class="timeline-date">持续探索</span>
                 <h4>容器化与自动化运维</h4>
                 <p>基于 Docker 彻底解决环境一致性难题，编写 Shell 脚本实现数据库异地备份与 Nginx 流量精准调控。</p>
               </div>
             </div>
             <div class="timeline-item">
               <div class="timeline-dot"></div>
               <div class="timeline-content">
                 <span class="timeline-date">核心里程碑</span>
                 <h4>TypeScript 与 Vue 3 深度实践</h4>
                 <p>利用 TS 高级类型体操构建类型安全的库接口，并通过 Composition API 解决复杂业务逻辑的组织问题。</p>
               </div>
             </div>
             <div class="timeline-item">
               <div class="timeline-dot"></div>
               <div class="timeline-content">
                 <span class="timeline-date">技术起点</span>
                 <h4>基础 Web 技术研磨</h4>
                 <p>从 CSS Grid 布局到 WebGL 三维探索，建立了对现代浏览器渲染与交付的底层认知。</p>
               </div>
             </div>
           </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
});
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background-color: #f7f9fc;
}

/* Ambient Orbs */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.25;
  z-index: 0;
  pointer-events: none;
}

.orb-1 {
  top: -150px;
  right: -5%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
}

.orb-2 {
  bottom: 0px;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #818cf8 0%, transparent 70%);
}

.about-content {
  position: relative;
  z-index: 10;
  padding-top: 120px;
  padding-bottom: 120px;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
}

/* Profile Section */
.profile-header {
  margin-bottom: 80px;
}

.profile-card {
  padding: 60px 70px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 30px 60px -15px rgba(0,0,0,0.05);
}

.profile-layout {
  display: flex;
  align-items: center;
  gap: 60px;
}

.profile-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar {
  width: 140px;
  height: 140px;
  border-radius: 30px;
  background: var(--gradient-main);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3.5rem;
  font-weight: 800;
  position: relative;
  z-index: 1;
}

.profile-info {
  flex: 1;
}

.main-name {
  font-size: 2.8rem;
  margin-bottom: 10px;
  display: inline-block;
  letter-spacing: -1px;
  font-weight: 800;
}

.role-title {
  font-size: 1.15rem;
  color: #64748b;
  font-weight: 700;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
}
.role-title::after { content: ''; height: 2px; width: 30px; background: var(--color-primary); }

.bio-container { margin-bottom: 30px; }
.bio-text {
  color: #475569;
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 15px;
  max-width: 750px;
}
.bio-text:last-child { margin-bottom: 0; }

.social-links {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #ffffff;
  color: #64748b;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid #f1f5f9;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  transition: 0.5s;
}

.social-icon:hover::before {
  left: 100%;
}

.social-icon:hover {
  transform: translateY(-8px) scale(1.05);
  background: #ffffff;
  color: var(--color-primary);
  border-color: var(--color-primary-3);
  box-shadow: 0 20px 40px rgba(244, 114, 182, 0.15);
}

.social-icon svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.social-icon:hover svg {
  transform: scale(1.1);
}

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 60px;
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 35px;
  color: #0f172a;
  font-weight: 800;
}

/* Skills Grid */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-card {
  padding: 32px 35px;
  display: flex;
  align-items: flex-start;
  gap: 25px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
}

.skill-card:hover {
  background: #ffffff;
  box-shadow: 0 20px 40px -12px rgba(244, 114, 182, 0.1);
  border-color: #ffffff;
}

.skill-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}

.skill-card:hover .skill-icon {
  box-shadow: 0 0 25px rgba(244, 114, 182, 0.2);
}

.skill-icon.frontend { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); color: #3b82f6; }
.skill-icon.creative { background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); color: #ef4444; }
.skill-icon.backend { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); color: #22c55e; }

.skill-info h3 { 
  font-size: 1.3rem; 
  font-weight: 800; 
  margin-bottom: 12px; 
  color: #0f172a;
  letter-spacing: -0.5px;
}

.tags { display: flex; gap: 10px; flex-wrap: wrap; }
.tags span {
  font-size: 0.8rem; 
  padding: 6px 14px; 
  background: rgba(241, 245, 249, 0.5);
  border: 1px solid transparent; 
  border-radius: 10px; 
  color: #475569; 
  font-weight: 600;
  transition: all 0.3s ease;
}

.skill-card:hover .tags span {
  background: #ffffff;
  border-color: #f1f5f9;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

/* Timeline */
.timeline-container { 
  padding: 50px; 
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.timeline-container:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(226, 232, 240, 1);
  box-shadow: 0 20px 40px -12px rgba(244, 114, 182, 0.1);
}

.timeline-item {
  position: relative;
  padding: 20px 40px 20px 50px;
  border-left: 2px solid #f1f5f9;
  transition: all 0.4s ease;
  border-radius: 0 20px 20px 0;
}

.timeline-item:hover {
  background: rgba(244, 114, 182, 0.08);
  border-left-color: var(--color-primary);
  box-shadow: 0 10px 30px -5px rgba(244, 114, 182, 0.1);
}

.timeline-item:last-child { border-left-color: #f1f5f9; }

.timeline-dot {
  position: absolute; 
  left: -11px; 
  top: 23px; 
  width: 20px; 
  height: 20px;
  border-radius: 50%; 
  background: #ffffff; 
  border: 4px solid #e2e8f0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;
}

.timeline-item:hover .timeline-dot {
  background: var(--color-primary);
  border-color: var(--color-primary-2);
  box-shadow: 0 0 20px rgba(244, 114, 182, 0.4);
}

.timeline-dot.current { 
  background: var(--color-primary); 
  border-color: #fff;
  box-shadow: 0 0 15px rgba(244, 114, 182, 0.3);
}

.timeline-date {
  font-size: 0.95rem; 
  color: var(--color-primary); 
  font-weight: 800;
  display: inline-block; 
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.timeline-content {
  transition: all 0.3s ease;
}

.timeline-content h4 { 
  font-size: 1.25rem; 
  font-weight: 800; 
  margin-bottom: 10px; 
  color: #0f172a; 
  letter-spacing: -0.3px;
}

.timeline-content p { 
  font-size: 1.05rem; 
  color: #64748b; 
  line-height: 1.6;
  margin-bottom: 0;
}

.timeline-item:hover .timeline-content h4 {
  color: var(--color-primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .grid-layout { grid-template-columns: 1fr; gap: 60px; }
  .profile-layout { flex-direction: column; text-align: center; }
  .bio-text { margin-left: auto; margin-right: auto; }
  .role-title { justify-content: center; }
  .social-links { justify-content: center; }
}

@media (max-width: 768px) {
  .about-content { padding-top: 100px; }
  .profile-card { padding: 40px 25px; }
  .main-name { font-size: 2.22rem; }
  .section-title { font-size: 1.5rem; }
}

.about-reveal {
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
