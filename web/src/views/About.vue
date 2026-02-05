<template>
  <div class="about-page">
    <!-- Ambient Background -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>

    <div class="container about-content">
      <!-- Profile Header -->
      <section class="profile-header anim-fade-up">
        <div class="glass-panel profile-card">
          <div class="profile-layout">
            <div class="profile-avatar">
              <span>N</span>
            </div>
            <div class="profile-info">
              <h1 class="gradient-text main-name">Nexus Creator</h1>
              <p class="role-title">全栈开发工程师 & UI 设计师</p>
              <p class="bio-text">
                热衷于构建卓越的数字体验。将复杂的逻辑转化为简洁、优雅的界面。
                专注于 Vue.js 生态系统与高性能 WebGL 渲染技术。
              </p>
              <div class="social-links">
                <a href="#" class="social-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" class="social-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                </a>
                <a href="#" class="social-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="grid-layout">
        <!-- Skills Matrix -->
        <section class="skills-section anim-fade-up anim-delay-1">
          <h2 class="section-title">技术栈</h2>
          <div class="skills-grid">
            <div class="glass-panel skill-card">
              <div class="skill-icon frontend">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3>Frontend</h3>
              <div class="tags">
                <span>Vue 3</span>
                <span>Vite</span>
                <span>Tailwind</span>
                <span>TypeScript</span>
              </div>
            </div>
            
            <div class="glass-panel skill-card">
              <div class="skill-icon creative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
              </div>
              <h3>Creative</h3>
              <div class="tags">
                <span>WebGL</span>
                <span>Three.js</span>
                <span>GSAP</span>
                <span>Canvas</span>
              </div>
            </div>

            <div class="glass-panel skill-card">
              <div class="skill-icon backend">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/><line x1="3.27" y1="16.96" x2="12" y2="12.01"/><line x1="20.73" y1="16.96" x2="12" y2="12.01"/></svg>
              </div>
              <h3>Backend</h3>
              <div class="tags">
                <span>Node.js</span>
                <span>Python</span>
                <span>SQL</span>
                <span>Docker</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Timeline -->
        <section class="timeline-section anim-fade-up anim-delay-2">
           <h2 class="section-title">里程碑</h2>
           <div class="glass-panel timeline-container">
             <div class="timeline-item">
               <div class="timeline-dot current"></div>
               <div class="timeline-content">
                 <span class="timeline-date">2026 - 现在</span>
                 <h4>高级前端工程师</h4>
                 <p>主导企业级 SaaS 平台重构，引入微前端架构。</p>
               </div>
             </div>
             <div class="timeline-item">
               <div class="timeline-dot"></div>
               <div class="timeline-content">
                 <span class="timeline-date">2024 - 2025</span>
                 <h4>独立开发者</h4>
                 <p>发布多款创意 WebGL 交互作品，获得 Awwwards 提名。</p>
               </div>
             </div>
             <div class="timeline-item">
               <div class="timeline-dot"></div>
               <div class="timeline-content">
                 <span class="timeline-date">2022 - 2024</span>
                 <h4>全栈开发</h4>
                 <p>负责电商小程序核心业务模块，优化首屏加载性能 40%。</p>
               </div>
             </div>
           </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background-color: #fafbfc;
}

/* Ambient Orbs (Reused from Home/Blog for consistency) */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  z-index: 0;
}

.orb-1 {
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(255,255,255,0) 70%);
}

.orb-2 {
  bottom: 0px;
  left: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(255,255,255,0) 70%);
}

.about-content {
  position: relative;
  z-index: 10;
  padding-top: 100px;
  padding-bottom: 60px;
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* Profile Section */
.profile-header {
  margin-bottom: 50px;
}

.profile-card {
  padding: 40px;
  border: 1px solid rgba(255,255,255,0.8);
}

.profile-layout {
  display: flex;
  align-items: center;
  gap: 40px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--gradient-main);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
}

.profile-info {
  flex: 1;
}

.main-name {
  font-size: 2.5rem;
  margin-bottom: 8px;
  display: inline-block;
}

.role-title {
  font-size: 1.1rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 16px;
}

.bio-text {
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 24px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0,0,0,0.03);
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}
.social-icon svg { width: 20px; height: 20px; }

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--color-text-main);
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: var(--gradient-main);
  border-radius: 2px;
}

/* Skills */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-card {
  padding: 20px 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
}

.skill-card:hover {
  transform: translateX(5px);
}

.skill-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.skill-icon svg { width: 24px; height: 24px; }

.skill-icon.frontend { background: rgba(79, 70, 229, 0.1); color: #4f46e5; }
.skill-icon.creative { background: rgba(236, 72, 153, 0.1); color: #db2777; }
.skill-icon.backend { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

.skill-card h3 {
  font-size: 1.1rem;
  min-width: 80px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tags span {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: rgba(0,0,0,0.03);
  border-radius: 4px;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* Timeline */
.timeline-container {
  padding: 30px;
  height: 100%;
}

.timeline-item {
  position: relative;
  padding-left: 30px;
  padding-bottom: 30px;
  border-left: 2px solid rgba(0,0,0,0.05);
}

.timeline-item:last-child {
  border-left-color: transparent;
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -6px;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cbd5e1;
  transition: all 0.3s ease;
}

.timeline-dot.current {
  background: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
}

.timeline-date {
  font-size: 0.85rem;
  color: var(--color-primary);
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

.timeline-content h4 {
  font-size: 1.05rem;
  margin-bottom: 6px;
}

.timeline-content p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-layout {
    flex-direction: column;
    text-align: center;
  }
  .bio-text { margin: 0 auto 24px; }
  .social-links { justify-content: center; }
  
  .grid-layout {
    grid-template-columns: 1fr;
    gap: 50px;
  }
}
</style>
