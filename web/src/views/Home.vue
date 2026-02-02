<template>
  <div class="home-container">
    <div ref="canvasContainer" class="webgl-bg"></div>
    
    <!-- 右侧屏幕导航 -->
    <div class="screen-nav">
      <div 
        v-for="(screen, index) in screens" 
        :key="index"
        class="nav-dot"
        :class="{ active: currentScreen === index + 1 }"
        @click="scrollToScreen(index + 1)"
        @mouseenter="hoveredNav = index + 1"
        @mouseleave="hoveredNav = null"
      >
        <span class="dot-inner"></span>
        <transition name="fade-slide">
          <div v-if="hoveredNav === index + 1" class="nav-label">
            {{ screen.title }}
          </div>
        </transition>
      </div>
    </div>
    
    <div class="snap-container" ref="scroller">
      
      <!-- SCREEN 1: 数字艺术画廊 -->
      <section class="screen screen-1" data-screen="1">
         <div class="screen-decoration decoration-1"></div>
         <div class="glass-shapes">
            <div class="shape shape-triangle"></div>
            <div class="shape shape-cube"></div>
            <div class="shape shape-cylinder"></div>
            <div class="shape shape-sphere"></div>
         </div>
         <div class="content-1">
            <div class="badge">创意编程 · 视觉艺术</div>
            <h1 class="main-title">代码即艺术</h1>
            <p class="main-desc">
              用代码编织视觉奇迹，以技术诠释美学理念<br>
              每一行代码都是创作，每一次交互都是体验<br>
              在数字世界中，探索无限可能
            </p>
            <div class="tech-stack">
              <span>Vue.js</span>
              <span>Three.js</span>
              <span>WebGL</span>
              <span>GSAP</span>
              <span>微信小程序</span>
              <span>Uni-app</span>
            </div>
         </div>
      </section>

      <!-- SCREEN 2: 视觉实验室 -->
      <section class="screen screen-2" data-screen="2">
         <div class="screen-decoration decoration-2"></div>
         <div class="split-layout">
            <div class="left-visual">
               <div class="visual-gallery">
                  <div 
                     class="gallery-item item-1" 
                     :class="{'active': hoveredExperiment === 1}"
                     @mouseenter="hoveredExperiment = 1"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="item-bg gradient-1"></div>
                     <div class="item-icon">✨</div>
                     <div class="item-text">粒子系统</div>
                  </div>
                  <div 
                     class="gallery-item item-2" 
                     :class="{'active': hoveredExperiment === 2}"
                     @mouseenter="hoveredExperiment = 2"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="item-bg gradient-2"></div>
                     <div class="item-icon">💧</div>
                     <div class="item-text">流体模拟</div>
                  </div>
                  <div 
                     class="gallery-item item-3" 
                     :class="{'active': hoveredExperiment === 3}"
                     @mouseenter="hoveredExperiment = 3"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="item-bg gradient-3"></div>
                     <div class="item-icon">💡</div>
                     <div class="item-text">光线追踪</div>
                  </div>
                  <div 
                     class="gallery-item item-4" 
                     :class="{'active': hoveredExperiment === 4}"
                     @mouseenter="hoveredExperiment = 4"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="item-bg gradient-4"></div>
                     <div class="item-icon">🔷</div>
                     <div class="item-text">形态变换</div>
                  </div>
               </div>
            </div>
            <div class="right-content">
               <h2 class="section-title">视觉实验室</h2>
               <p class="section-desc">
                  在这个数字实验室中，我们探索视觉的无限可能。
                  从微观的粒子到宏观的宇宙，从静态的几何到动态的流体，
                  每一个实验都是对美学边界的突破。
               </p>
               <div class="experiment-list">
                  <div 
                     class="experiment-item" 
                     :class="{'highlighted': hoveredExperiment === 1}"
                     @mouseenter="hoveredExperiment = 1"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="exp-number">01</div>
                     <div class="exp-content">
                        <h3>粒子宇宙</h3>
                        <p>15,000+ 粒子实时渲染，通过 WebGL Shader 实现的动态波浪效果。每个粒子都是独立的个体，却又协同构成壮观的整体。</p>
                     </div>
                  </div>
                  <div 
                     class="experiment-item" 
                     :class="{'highlighted': hoveredExperiment === 2}"
                     @mouseenter="hoveredExperiment = 2"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="exp-number">02</div>
                     <div class="exp-content">
                        <h3>流体诗学</h3>
                        <p>基于 Navier-Stokes 方程的流体模拟，GPU 加速计算让流体的每一次流动都如诗般优雅，展现自然的数学之美。</p>
                     </div>
                  </div>
                  <div 
                     class="experiment-item" 
                     :class="{'highlighted': hoveredExperiment === 3}"
                     @mouseenter="hoveredExperiment = 3"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="exp-number">03</div>
                     <div class="exp-content">
                        <h3>光的旅程</h3>
                        <p>实时光线追踪技术，模拟光在空间中的传播、反射和折射。每一束光都在讲述着物理世界的故事。</p>
                     </div>
                  </div>
                  <div 
                     class="experiment-item" 
                     :class="{'highlighted': hoveredExperiment === 4}"
                     @mouseenter="hoveredExperiment = 4"
                     @mouseleave="hoveredExperiment = null"
                  >
                     <div class="exp-number">04</div>
                     <div class="exp-content">
                        <h3>形态演化</h3>
                        <p>基于数学算法的形态变换系统，从简单几何到复杂结构的平滑过渡。探索形态之间的无限可能性。</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- SCREEN 3: 代码诗篇 -->
      <section class="screen screen-3" data-screen="3">
         <div class="screen-decoration decoration-3">
            <div class="key-btn">Ctrl</div>
            <div class="key-btn">C</div>
            <div class="key-btn">V</div>
         </div>
         <div class="split-layout reverse">
            <div class="left-content">
               <h2 class="section-title">代码的诗篇</h2>
               <p class="section-desc">
                  代码不仅是逻辑的堆砌，更是思想的表达。
                  在这里，每一行代码都经过精心雕琢，
                  追求简洁、优雅与高效的完美平衡。
               </p>
               <div class="code-philosophy">
                  <div class="philosophy-card">
                     <div class="phil-icon">🎯</div>
                     <h3>简洁至上</h3>
                     <p>删除不必要的复杂性，保留核心的本质。好的代码应该像诗歌一样简洁有力，每个字符都有其存在的意义。</p>
                  </div>
                  <div class="philosophy-card">
                     <div class="phil-icon">⚡</div>
                     <h3>性能为王</h3>
                     <p>60 FPS 不是目标，而是底线。通过 GPU 加速、算法优化和智能缓存，让每一帧都丝滑流畅。</p>
                  </div>
                  <div class="philosophy-card">
                     <div class="phil-icon">🎨</div>
                     <h3>美学驱动</h3>
                     <p>技术服务于美学，代码创造艺术。从像素级的细节到整体的视觉节奏，每个决策都基于美学考量。</p>
                  </div>
               </div>
            </div>
            <div class="right-visual">
               <div class="code-display">
                  <div class="code-window">
                     <div class="window-bar">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                        <span class="window-title">shader.glsl</span>
                     </div>
                     <div class="code-content">
                        <pre><code>// 粒子波浪着色器
uniform float uTime;
varying vec3 vColor;

void main() {
  vec3 pos = position;
  
  // 多层波浪叠加
  float wave1 = sin(pos.x * 0.08 + uTime) * 4.0;
  float wave2 = cos(pos.z * 0.06 + uTime * 1.3) * 4.0;
  float wave3 = sin((pos.x + pos.z) * 0.05 + uTime * 0.8) * 2.0;
  
  pos.y = wave1 + wave2 + wave3;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}</code></pre>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- SCREEN 4: 交互的艺术 -->
      <section class="screen screen-4" data-screen="4">
         <div class="screen-decoration decoration-4"></div>
         <div class="centered-content">
            <h2 class="section-title">交互的艺术</h2>
            <p class="section-desc">
               交互不仅是功能的实现，更是情感的传递。<br>
               每一次点击、每一个悬停、每一帧动画，<br>
               都在与用户进行一场无声的对话。
            </p>
            <div class="interaction-grid">
               <div class="interaction-card">
                  <div class="card-visual">
                     <div class="visual-element morph-circle"></div>
                  </div>
                  <h3>形态语言</h3>
                  <p>几何图形在空间中流转变换，从三角到圆形，从静态到动态。形态的变化传递着状态的转换，让抽象的概念变得可感知。</p>
                  <div class="card-tech">CSS Morphing · SVG Animation</div>
               </div>
               <div class="interaction-card">
                  <div class="card-visual">
                     <div class="visual-element wave-lines"></div>
                  </div>
                  <h3>动效节奏</h3>
                  <p>缓动函数不是随意选择的数字，而是精心调校的节奏。从 ease-in 的加速到 ease-out 的减速，每个动画都有其独特的韵律。</p>
                  <div class="card-tech">GSAP · Cubic Bezier · Spring Physics</div>
               </div>
               <div class="interaction-card">
                  <div class="card-visual">
                     <div class="visual-element particle-burst"></div>
                  </div>
                  <h3>反馈机制</h3>
                  <p>即时的视觉反馈让用户感知到系统的响应。从按钮的微妙弹跳到页面的流畅过渡，每个细节都在强化交互的确定性。</p>
                  <div class="card-tech">Haptic Feedback · Micro-interactions</div>
               </div>
               <div class="interaction-card">
                  <div class="card-visual">
                     <div class="visual-element gradient-flow"></div>
                  </div>
                  <h3>色彩情绪</h3>
                  <p>色彩不仅是装饰，更是情感的载体。从冷静的蓝紫到热情的粉红，渐变的流动传递着不同的情绪基调。</p>
                  <div class="card-tech">Color Theory · Gradient Animation</div>
               </div>
            </div>
         </div>
      </section>

      <!-- SCREEN 5: 小程序开发 -->
      <section class="screen screen-5" data-screen="5">
         <div class="screen-decoration decoration-5"></div>
         <div class="miniapp-showcase-full">
            <h2 class="section-title centered">小程序开发能力</h2>
            <p class="section-desc centered">
               多样化的设计风格，流畅的交互体验，精致的视觉呈现
            </p>
            <div class="phones-container">
               <!-- 手机1：电商首页 -->
               <div class="phone-wrapper">
                  <div class="phone-device">
                     <div class="phone-notch-mini"></div>
                     <div class="phone-screen-mini">
                        <div class="miniapp-page page-ecommerce">
                           <div class="status-bar-mini ecom">
                              <span>9:41</span>
                              <div class="status-icons-mini">📶 🔋</div>
                           </div>
                           <div class="ecom-header">
                              <div class="location-tag">
                                 <span>📍</span>
                                 <span>西湖</span>
                              </div>
                              <div class="header-icons">
                                 <span>💬</span>
                                 <span>📷</span>
                              </div>
                           </div>
                           <div class="ecom-content">
                              <div class="search-bar-main">
                                 <span class="search-icon">🔍</span>
                                 <span>搜索门票景点</span>
                              </div>
                              
                              <div class="feature-cards">
                                 <div class="feature-card card-green">
                                    <div class="card-icon">🎫</div>
                                    <div class="card-text">
                                       <h4>导游服务</h4>
                                       <p>专业讲解</p>
                                    </div>
                                 </div>
                                 <div class="feature-card card-blue">
                                    <div class="card-icon">🏰</div>
                                    <div class="card-text">
                                       <h4>门票预定</h4>
                                       <p>快速入园</p>
                                    </div>
                                 </div>
                              </div>

                              <div class="service-grid">
                                 <div class="service-item">
                                    <div class="service-icon">🎒</div>
                                    <span>探索</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🍜</div>
                                    <span>美食</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🏨</div>
                                    <span>酒店</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🎭</div>
                                    <span>娱乐</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🎪</div>
                                    <span>寺庙</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🛍️</div>
                                    <span>购物</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🏪</div>
                                    <span>酒店</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🏠</div>
                                    <span>民宿</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🛒</div>
                                    <span>购买</span>
                                 </div>
                                 <div class="service-item">
                                    <div class="service-icon">🍔</div>
                                    <span>美食</span>
                                 </div>
                              </div>

                              <div class="promo-banner">
                                 <span>春节优惠活动进行中</span>
                              </div>

                              <div class="activity-grid">
                                 <div class="activity-card">
                                    <div class="activity-img img-car"></div>
                                    <p>环车营地</p>
                                 </div>
                                 <div class="activity-card">
                                    <div class="activity-img img-camp"></div>
                                    <p>元旦出游</p>
                                 </div>
                                 <div class="activity-card">
                                    <div class="activity-img img-vr"></div>
                                    <p>VR漫游</p>
                                 </div>
                              </div>

                              <div class="recommend-section">
                                 <div class="recommend-card">
                                    <div class="rec-icon">🅿️</div>
                                    <div class="rec-text">
                                       <h4>停车</h4>
                                       <p>景区分布</p>
                                    </div>
                                 </div>
                                 <div class="recommend-card">
                                    <div class="rec-icon">🎯</div>
                                    <div class="rec-text">
                                       <h4>打卡</h4>
                                       <p>赢好礼</p>
                                    </div>
                                 </div>
                              </div>

                              <div class="banner-large">
                                 <div class="banner-content">
                                    <h3>游玩西湖</h3>
                                 </div>
                              </div>
                           </div>
                           <div class="bottom-nav">
                              <div class="nav-tab active">
                                 <span>🏠</span>
                                 <span>首页</span>
                              </div>
                              <div class="nav-tab">
                                 <span>🎯</span>
                                 <span>发现</span>
                              </div>
                              <div class="nav-tab">
                                 <span>📋</span>
                                 <span>订单</span>
                              </div>
                              <div class="nav-tab">
                                 <span>👤</span>
                                 <span>我的</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="phone-label">旅游平台</div>
               </div>

               <!-- 手机2：社交动态 -->
               <div class="phone-wrapper main-phone">
                  <div class="phone-device large">
                     <div class="phone-notch-mini"></div>
                     <div class="phone-screen-mini">
                        <div class="miniapp-page page-social">
                           <div class="status-bar-mini social">
                              <span>9:41</span>
                              <div class="status-icons-mini">📶 🔋</div>
                           </div>
                           <div class="social-header">
                              <h3>发现</h3>
                              <div class="header-actions">
                                 <span>🔍</span>
                                 <span>➕</span>
                              </div>
                           </div>
                           <div class="social-content">
                              <div class="story-bar">
                                 <div class="story-item">
                                    <div class="story-avatar avatar-1"></div>
                                    <span>我的</span>
                                 </div>
                                 <div class="story-item">
                                    <div class="story-avatar avatar-2"></div>
                                    <span>小明</span>
                                 </div>
                                 <div class="story-item">
                                    <div class="story-avatar avatar-3"></div>
                                    <span>小红</span>
                                 </div>
                                 <div class="story-item">
                                    <div class="story-avatar avatar-4"></div>
                                    <span>小李</span>
                                 </div>
                              </div>
                              <div class="post-card">
                                 <div class="post-header">
                                    <div class="user-avatar avatar-1"></div>
                                    <div class="user-info">
                                       <p class="username">设计师小王</p>
                                       <p class="post-time">2小时前</p>
                                    </div>
                                 </div>
                                 <div class="post-content">
                                    <p>今天的日落真美 🌅</p>
                                    <div class="post-image img-sunset"></div>
                                 </div>
                                 <div class="post-actions">
                                    <span>❤️ 128</span>
                                    <span>💬 32</span>
                                    <span>🔗 分享</span>
                                 </div>
                              </div>
                              <div class="post-card">
                                 <div class="post-header">
                                    <div class="user-avatar avatar-2"></div>
                                    <div class="user-info">
                                       <p class="username">摄影师老张</p>
                                       <p class="post-time">5小时前</p>
                                    </div>
                                 </div>
                                 <div class="post-content">
                                    <p>城市夜景 ✨</p>
                                    <div class="post-image img-city"></div>
                                 </div>
                                 <div class="post-actions">
                                    <span>❤️ 256</span>
                                    <span>💬 48</span>
                                    <span>🔗 分享</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="phone-label">社交平台</div>
               </div>

               <!-- 手机3：会员中心 -->
               <div class="phone-wrapper">
                  <div class="phone-device">
                     <div class="phone-notch-mini"></div>
                     <div class="phone-screen-mini">
                        <div class="miniapp-page page-member">
                           <div class="member-header">
                              <div class="header-top">
                                 <span class="back-btn">◀</span>
                                 <h3>会员中心</h3>
                                 <div class="header-actions">
                                    <span>⋯</span>
                                    <span>⚙️</span>
                                 </div>
                              </div>
                              <div class="member-tabs">
                                 <span>大众</span>
                                 <span>黄金</span>
                                 <span>铂金</span>
                                 <span class="active">钻石</span>
                              </div>
                           </div>
                           <div class="member-content">
                              <div class="member-card">
                                 <div class="card-left">
                                    <h2>钻石会员</h2>
                                    <p>成长值：5000/5000</p>
                                 </div>
                                 <div class="card-right">
                                    <div class="diamond-icon">💎</div>
                                 </div>
                              </div>

                              <div class="member-info-bar">
                                 <span>会员体系规则</span>
                                 <span class="join-btn">加入会员 ›</span>
                              </div>

                              <div class="benefits-section">
                                 <h4>会员权益</h4>
                                 <div class="benefits-grid">
                                    <div class="benefit-item">
                                       <div class="benefit-icon icon-red">🎫</div>
                                       <span>积分</span>
                                    </div>
                                    <div class="benefit-item">
                                       <div class="benefit-icon icon-orange">👋</div>
                                       <span>抽奖</span>
                                    </div>
                                    <div class="benefit-item">
                                       <div class="benefit-icon icon-green">🎁</div>
                                       <span>折扣</span>
                                    </div>
                                    <div class="benefit-item">
                                       <div class="benefit-icon icon-purple">🎂</div>
                                       <span>生日礼</span>
                                    </div>
                                 </div>
                              </div>

                              <div class="tasks-section">
                                 <h4>会员成长任务</h4>
                                 <div class="task-card">
                                    <div class="task-info">
                                       <h5>打卡送积分</h5>
                                       <div class="task-reward">
                                          <span class="growth-value">+30</span>
                                       </div>
                                    </div>
                                    <button class="task-btn">参加</button>
                                 </div>
                                 <div class="task-card">
                                    <div class="task-info">
                                       <h5>关注公众号</h5>
                                       <div class="task-reward">
                                          <span class="growth-value">+50</span>
                                       </div>
                                    </div>
                                    <button class="task-btn">参加</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="phone-label">会员中心</div>
               </div>
            </div>
            
            <div class="tech-badges">
               <div class="tech-badge">
                  <span class="badge-icon">🎨</span>
                  <span>多样化设计</span>
               </div>
               <div class="tech-badge">
                  <span class="badge-icon">⚡</span>
                  <span>流畅交互</span>
               </div>
               <div class="tech-badge">
                  <span class="badge-icon">📱</span>
                  <span>原生体验</span>
               </div>
               <div class="tech-badge">
                  <span class="badge-icon">🔧</span>
                  <span>组件复用</span>
               </div>
               <div class="tech-badge">
                  <span class="badge-icon">🚀</span>
                  <span>性能优化</span>
               </div>
            </div>
         </div>
      </section>

      <!-- SCREEN 6: 技术深度 -->
      <section class="screen screen-6" data-screen="6">
         <div class="screen-decoration decoration-6"></div>
         <div class="tech-depth-container">
            <h2 class="section-title centered">技术的深度</h2>
            <p class="section-desc centered">
               表面的华丽背后，是扎实的技术功底。从底层的 WebGL 到上层的 DOM 操作，每一层都经过精心设计和优化。
            </p>
            <div class="tech-split-layout">
               <div class="tech-left">
                  <div class="tech-layers-3d">
                     <div 
                        class="tech-layer-card" 
                        :class="{'active': hoveredLayer === 'webgl'}"
                        @mouseenter="hoveredLayer = 'webgl'"
                        @mouseleave="hoveredLayer = null"
                     >
                        <div class="layer-bg webgl-bg"></div>
                        <div class="layer-content">
                           <div class="layer-icon">🎮</div>
                           <div class="layer-name">WebGL</div>
                           <div class="layer-particles">
                              <div class="particle" v-for="i in 15" :key="i"></div>
                           </div>
                        </div>
                     </div>
                     <div 
                        class="tech-layer-card" 
                        :class="{'active': hoveredLayer === 'canvas'}"
                        @mouseenter="hoveredLayer = 'canvas'"
                        @mouseleave="hoveredLayer = null"
                     >
                        <div class="layer-bg canvas-bg"></div>
                        <div class="layer-content">
                           <div class="layer-icon">🎨</div>
                           <div class="layer-name">Canvas 2D</div>
                           <div class="layer-waves">
                              <div class="wave" v-for="i in 5" :key="i"></div>
                           </div>
                        </div>
                     </div>
                     <div 
                        class="tech-layer-card" 
                        :class="{'active': hoveredLayer === 'dom'}"
                        @mouseenter="hoveredLayer = 'dom'"
                        @mouseleave="hoveredLayer = null"
                     >
                        <div class="layer-bg dom-bg"></div>
                        <div class="layer-content">
                           <div class="layer-icon">🏗️</div>
                           <div class="layer-name">DOM</div>
                           <div class="layer-grid">
                              <div class="grid-item" v-for="i in 9" :key="i"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="tech-right">
                  <div class="tech-details">
                     <div 
                        class="detail-card glass" 
                        :class="{'highlighted': hoveredLayer === 'webgl'}"
                        @mouseenter="hoveredLayer = 'webgl'"
                        @mouseleave="hoveredLayer = null"
                     >
                        <div class="detail-header">
                           <div class="detail-icon">🎮</div>
                           <h3>WebGL 渲染层</h3>
                        </div>
                        <p>GPU 加速渲染，15,000+ 粒子实时动画</p>
                        <div class="tech-tags orange">
                           <span>Vertex Shader</span>
                           <span>Fragment Shader</span>
                        </div>
                     </div>
                     <div 
                        class="detail-card glass" 
                        :class="{'highlighted': hoveredLayer === 'canvas'}"
                        @mouseenter="hoveredLayer = 'canvas'"
                        @mouseleave="hoveredLayer = null"
                     >
                        <div class="detail-header">
                           <div class="detail-icon">🎨</div>
                           <h3>Canvas 2D 层</h3>
                        </div>
                        <p>2D 特效渲染，流畅动画循环</p>
                        <div class="tech-tags green">
                           <span>Path Drawing</span>
                           <span>Gradient Fill</span>
                        </div>
                     </div>
                     <div 
                        class="detail-card glass" 
                        :class="{'highlighted': hoveredLayer === 'dom'}"
                        @mouseenter="hoveredLayer = 'dom'"
                        @mouseleave="hoveredLayer = null"
                     >
                        <div class="detail-header">
                           <div class="detail-icon">🏗️</div>
                           <h3>DOM 交互层</h3>
                        </div>
                        <p>响应式系统，精确滚动动画控制</p>
                        <div class="tech-tags blue">
                           <span>Vue Reactivity</span>
                           <span>GSAP Timeline</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- SCREEN 7: 创作理念 -->
      <section class="screen screen-7" data-screen="7">
         <div class="screen-decoration decoration-7"></div>
         <div class="centered-content">
            <div class="philosophy-section">
               <h2 class="section-title">创作的理念</h2>
               <p class="section-desc">
                  这不仅是一个展示页面，更是一次技术与艺术的探索。<br>
                  我们相信，最好的作品来自于对细节的执着，<br>
                  对性能的追求，以及对美学的坚持。
               </p>
               <div class="principles-grid">
                  <div class="principle-card">
                     <div class="principle-icon">
                        <div class="icon-shape hexagon"></div>
                     </div>
                     <h3>像素级完美</h3>
                     <p>每一个元素的位置、大小、间距都经过精确计算。1px 的差异可能微不足道，但正是这些细节的累积，造就了整体的和谐。</p>
                  </div>
                  <div class="principle-card">
                     <div class="principle-icon">
                        <div class="icon-shape circle"></div>
                     </div>
                     <h3>性能至上</h3>
                     <p>美丽的视觉效果不应该以性能为代价。通过 GPU 加速、虚拟滚动、懒加载等技术，我们确保即使在低端设备上也能流畅运行。</p>
                  </div>
                  <div class="principle-card">
                     <div class="principle-icon">
                        <div class="icon-shape triangle"></div>
                     </div>
                     <h3>响应式思维</h3>
                     <p>从移动端到桌面端，从竖屏到横屏，设计应该适应各种场景。响应式不是简单的缩放，而是针对不同设备的重新思考。</p>
                  </div>
               </div>
               <div class="closing-message">
                  <div class="message-content">
                     <p class="message-text">
                        "代码是诗歌，设计是艺术，<br>
                        而我们，是连接两者的桥梁。"
                     </p>
                     <div class="message-signature">
                        <div class="signature-line"></div>
                        <span>创作者手记</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Home",
  data() {
    return {
      hoveredLayer: null, // 用于左右联动
      hoveredExperiment: null, // 用于视觉实验室左右联动
      hoveredNav: null, // 悬停的导航项
      currentScreen: 1, // 当前屏幕
      screens: [
        { title: '代码即艺术' },
        { title: '视觉实验室' },
        { title: '代码诗篇' },
        { title: '交互艺术' },
        { title: '小程序开发' },
        { title: '技术深度' },
        { title: '创作理念' }
      ]
    };
  },
  mounted() {
    this.initParticleWave();
    this.initScrollAnimations();
    
    // 监听滚动更新当前屏幕
    const scroller = this.$refs.scroller;
    scroller.addEventListener('scroll', this.updateCurrentScreen);
    this.updateCurrentScreen();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  },
  methods: {
    initParticleWave() {
      const container = this.$refs.canvasContainer;
      
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf8fafc);
      this.scene.fog = new THREE.Fog(0xf8fafc, 10, 100);

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, 30, 50);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);

      const count = 100;
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];

      const c1 = new THREE.Color(0x3b82f6); // 蓝色
      const c2 = new THREE.Color(0x8b5cf6); // 紫色
      const c3 = new THREE.Color(0xec4899); // 粉色
      
      for (let x = 0; x <= count; x++) {
        for (let z = 0; z <= count; z++) {
          const u = (x / count) - 0.5;
          const v = (z / count) - 0.5;
          positions.push(u * 120, 0, v * 120);
          
          // 三色渐变
          let color;
          if (x / count < 0.5) {
            color = c1.clone().lerp(c2, (x / count) * 2);
          } else {
            color = c2.clone().lerp(c3, ((x / count) - 0.5) * 2);
          }
          colors.push(color.r, color.g, color.b);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 4.0 * window.devicePixelRatio }
        },
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          varying vec3 vColor;
          varying float vAlpha;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            float wave = sin(pos.x * 0.1 + uTime) * 3.0 + cos(pos.z * 0.1 + uTime * 1.2) * 3.0;
            pos.y = wave;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = uSize * (25.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            vAlpha = smoothstep(70.0, 20.0, -mvPosition.z);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          
          void main() {
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            if(length(xy) > 0.5) discard;
            gl_FragColor = vec4(vColor, vAlpha * 0.6);
          }
        `,
        transparent: true,
        vertexColors: true
      });

      this.points = new THREE.Points(geometry, material);
      this.scene.add(this.points);

      window.addEventListener('resize', this.onResize);

      const animate = () => {
        this.animFrame = requestAnimationFrame(animate);
        material.uniforms.uTime.value += 0.008;
        this.renderer.render(this.scene, this.camera);
      };
      animate();
    },
    
    initScrollAnimations() {
      const scroller = this.$refs.scroller;
      ScrollTrigger.defaults({ scroller });

      // 为所有屏幕添加统一的标题和描述动画
      const screens = ['.screen-2', '.screen-3', '.screen-4', '.screen-5', '.screen-6', '.screen-7'];
      
      screens.forEach((screen) => {
        // 标题动画
        gsap.from(`${screen} .section-title`, {
          scrollTrigger: {
            trigger: screen,
            start: 'top center',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false
        });

        // 描述动画
        gsap.from(`${screen} .section-desc`, {
          scrollTrigger: {
            trigger: screen,
            start: 'top center',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          immediateRender: false
        });
      });

      // Screen 1
      gsap.from('.glass-shapes .shape', {
        scrollTrigger: {
          trigger: '.screen-1',
          start: 'top center',
          end: 'bottom top',
          scrub: 1
        },
        y: 100,
        opacity: 0,
        stagger: 0.2
      });

      gsap.from('.content-1 > *', {
        scrollTrigger: {
          trigger: '.screen-1',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
      });

      // Screen 2 - 视觉实验室
      gsap.from('.screen-2 .visual-gallery', {
        scrollTrigger: {
          trigger: '.screen-2',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        immediateRender: false
      });

      gsap.from('.screen-2 .experiment-list .experiment-item', {
        scrollTrigger: {
          trigger: '.screen-2',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        immediateRender: false
      });

      // Screen 3 - 代码诗篇
      gsap.from('.screen-3 .code-philosophy .philosophy-card', {
        scrollTrigger: {
          trigger: '.screen-3',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        immediateRender: false
      });

      gsap.from('.screen-3 .code-display', {
        scrollTrigger: {
          trigger: '.screen-3',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        immediateRender: false
      });

      // Screen 4 - 交互艺术
      gsap.from('.screen-4 .interaction-card', {
        scrollTrigger: {
          trigger: '.screen-4',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.4,
        immediateRender: false
      });

      // Screen 5 - 小程序开发
      gsap.from('.screen-5 .phone-wrapper', {
        scrollTrigger: {
          trigger: '.screen-5',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.4,
        immediateRender: false
      });

      gsap.from('.screen-5 .tech-badges .tech-badge', {
        scrollTrigger: {
          trigger: '.screen-5',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.8,
        ease: 'back.out(1.7)',
        immediateRender: false
      });

      // Screen 6 - 技术深度
      gsap.from('.screen-6 .tech-layer-card', {
        scrollTrigger: {
          trigger: '.screen-6',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        immediateRender: false
      });

      gsap.from('.screen-6 .detail-card', {
        scrollTrigger: {
          trigger: '.screen-6',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        immediateRender: false
      });

      // Screen 7 - 创意哲学
      gsap.from('.screen-7 .principle-card', {
        scrollTrigger: {
          trigger: '.screen-7',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        immediateRender: false
      });

      gsap.from('.screen-7 .closing-message', {
        scrollTrigger: {
          trigger: '.screen-7',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        immediateRender: false
      });
    },
    
    onResize() {
      if(this.camera && this.renderer) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    },
    
    scrollToScreen(screenNumber) {
      const scroller = this.$refs.scroller;
      const screens = scroller.querySelectorAll('.screen');
      if (screens[screenNumber - 1]) {
        screens[screenNumber - 1].scrollIntoView({ behavior: 'smooth' });
      }
    },
    
    updateCurrentScreen() {
      const scroller = this.$refs.scroller;
      const screens = scroller.querySelectorAll('.screen');
      const scrollTop = scroller.scrollTop;
      const windowHeight = window.innerHeight;
      
      screens.forEach((screen, index) => {
        const rect = screen.getBoundingClientRect();
        const screenTop = rect.top + scrollTop;
        const screenBottom = screenTop + rect.height;
        const viewportCenter = scrollTop + windowHeight / 2;
        
        if (viewportCenter >= screenTop && viewportCenter < screenBottom) {
          this.currentScreen = index + 1;
        }
      });
    }
  }
};
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.home-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.webgl-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.4;
}

.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  z-index: 10;
}

/* ========== 右侧屏幕导航 ========== */
.screen-nav {
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-dot {
  position: relative;
  width: 12px;
  height: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: rgba(148, 163, 184, 0.4);
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.nav-dot:hover .dot-inner {
  background: rgba(244, 114, 182, 0.7);
  transform: translate(-50%, -50%) scale(1.3);
  border-color: rgba(251, 207, 232, 0.9);
  box-shadow: 0 0 12px rgba(244, 114, 182, 0.3);
}

.nav-dot.active .dot-inner {
  background: rgba(244, 114, 182, 0.8);
  width: 16px;
  height: 16px;
  border-color: rgba(251, 207, 232, 1);
  box-shadow: 0 0 15px rgba(244, 114, 182, 0.4), 0 0 25px rgba(251, 207, 232, 0.3);
  filter: blur(0.3px);
}

.nav-label {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-50%) translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(10px);
}

/* ========== 屏幕装饰元素 ========== */
.screen-decoration {
  position: absolute;
  pointer-events: none;
  z-index: 5;
  opacity: 0.6;
}

/* Screen 1 - 画笔和调色板 */
.decoration-1 {
  bottom: 80px;
  left: 80px;
  width: 120px;
  height: 120px;
}

.decoration-1::before {
  content: '🎨';
  position: absolute;
  font-size: 4.5rem;
  animation: rotate360 10s linear infinite;
  filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3));
}

.decoration-1::after {
  content: '🖌️';
  position: absolute;
  font-size: 2.5rem;
  top: 5px;
  right: -5px;
  animation: paint 3s ease-in-out infinite;
}

@keyframes rotate360 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes paint {
  0%, 100% { transform: rotate(-20deg) translateY(0); }
  50% { transform: rotate(20deg) translateY(-10px); }
}

/* Screen 2 - 显微镜/实验室 */
.decoration-2 {
  bottom: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
}

.decoration-2::before {
  content: '🔬';
  position: absolute;
  font-size: 4.5rem;
  animation: float 4s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(139, 92, 246, 0.3));
}

.decoration-2::after {
  content: '✨';
  position: absolute;
  font-size: 1.5rem;
  top: -10px;
  right: 10px;
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Screen 3 - 书本和代码 */
.decoration-3 {
  bottom: 50px;
  left: 50px;
  width: 180px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.decoration-3 .key-btn {
  display: inline-block;
  padding: 10px 14px;
  background: linear-gradient(135deg, #ffffff, #f1f5f9);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-weight: 700;
  color: #334155;
  font-family: 'Arial', sans-serif;
}

.decoration-3 .key-btn:nth-child(1) {
  animation: keyPress1 3s ease-in-out infinite;
}

.decoration-3 .key-btn:nth-child(2) {
  animation: keyPress2 3s ease-in-out infinite;
}

.decoration-3 .key-btn:nth-child(3) {
  animation: keyPress3 3s ease-in-out infinite;
}

@keyframes keyPress1 {
  0%, 100% { 
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  }
  10%, 20% { 
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  }
}

@keyframes keyPress2 {
  0%, 100% { 
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  }
  15%, 25% { 
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  }
}

@keyframes keyPress3 {
  0%, 100% { 
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  }
  20%, 30% { 
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  }
}

/* Screen 4 - 魔法棒/交互 */
.decoration-4 {
  bottom: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
}

.decoration-4::before {
  content: '🪄';
  position: absolute;
  font-size: 4.5rem;
  animation: wave 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(236, 72, 153, 0.3));
}

.decoration-4::after {
  content: '✨';
  position: absolute;
  font-size: 1.8rem;
  top: -12px;
  right: 8px;
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
}

/* Screen 5 - 手机和应用 */
.decoration-5 {
  bottom: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
}

.decoration-5::before {
  content: '📱';
  position: absolute;
  font-size: 4.5rem;
  animation: phoneFloat 4s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3));
}

.decoration-5::after {
  content: '⚡';
  position: absolute;
  font-size: 1.8rem;
  top: 8px;
  right: -8px;
  animation: twinkle 2s ease-in-out infinite;
  color: #fbbf24;
}

@keyframes phoneFloat {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

/* Screen 6 - 齿轮和工具 */
.decoration-6 {
  bottom: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
}

.decoration-6::before {
  content: '⚙️';
  position: absolute;
  font-size: 4.5rem;
  animation: rotateGear 8s linear infinite;
  filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3));
}

.decoration-6::after {
  content: '🔧';
  position: absolute;
  font-size: 2.2rem;
  bottom: 3px;
  right: -8px;
  animation: float 3s ease-in-out infinite 1s;
}

@keyframes rotateGear {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Screen 7 - 灯泡/创意 */
.decoration-7 {
  bottom: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
}

.decoration-7::before {
  content: '💡';
  position: absolute;
  font-size: 4.5rem;
  animation: lightBulb 2s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(251, 191, 36, 0.4));
}

.decoration-7::after {
  content: '✨';
  position: absolute;
  font-size: 1.5rem;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  animation: twinkle 1.5s ease-in-out infinite;
}

@keyframes lightBulb {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 10px 20px rgba(251, 191, 36, 0.4));
  }
  50% { 
    transform: scale(1.05);
    filter: drop-shadow(0 15px 30px rgba(251, 191, 36, 0.6));
  }
}

.screen {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  position: relative;
}

/* ========== SCREEN 1: 首页 ========== */
.screen-1 {
  position: relative;
  overflow: hidden;
}

.glass-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
  backdrop-filter: blur(50px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 70px rgba(99, 102, 241, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.1);
}

.shape-triangle {
  width: 320px;
  height: 320px;
  left: 5%;
  top: 15%;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  animation: float 6s ease-in-out infinite;
}

.shape-cube {
  width: 280px;
  height: 280px;
  right: 8%;
  top: 20%;
  border-radius: 25px;
  transform: rotate(15deg);
  animation: float 8s ease-in-out infinite 1s;
}

.shape-sphere {
  width: 200px;
  height: 200px;
  right: 15%;
  bottom: 15%;
  border-radius: 50%;
  animation: float 9s ease-in-out infinite 3s;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(59, 130, 246, 0.1);
  border: none;
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 30px;
  letter-spacing: 2px;
  border-radius: 20px;
}

.main-title {
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
  letter-spacing: -4px;
  position: relative;
}

.main-desc {
  font-size: 1.15rem;
  color: #64748b;
  line-height: 2;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

.tech-stack {
  display: flex;
  gap: 18px;
  justify-content: center;
  flex-wrap: wrap;
}

.tech-stack span {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.tech-stack span:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-color: rgba(59, 130, 246, 0.3);
}

/* ========== SCREEN 2: 视觉实验室 ========== */
.visual-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
}

.gallery-item {
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.gallery-item:hover {
  transform: scale(1.05);
  z-index: 10;
}

.gallery-item.active {
  transform: scale(1.08);
  z-index: 20;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.item-bg {
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
}

.gallery-item.active .item-bg {
  filter: brightness(1.15);
}

.gradient-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: gradientShift 3s ease-in-out infinite;
}

.gradient-2 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  animation: gradientShift 3s ease-in-out infinite 0.5s;
}

.gradient-3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  animation: gradientShift 3s ease-in-out infinite 1s;
}

.gradient-4 {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  animation: gradientShift 3s ease-in-out infinite 1.5s;
}

@keyframes gradientShift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(30deg); }
}

.item-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  opacity: 0.6;
  transition: opacity 0.5s ease, filter 0.5s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  pointer-events: none;
}

.gallery-item:hover .item-icon {
  opacity: 0.85;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4));
}

.gallery-item.active .item-icon {
  opacity: 1;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5));
  animation: iconGlow 2s ease-in-out infinite;
}

@keyframes iconGlow {
  0%, 100% { 
    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5));
  }
  50% { 
    filter: drop-shadow(0 8px 25px rgba(255, 255, 255, 0.6));
  }
}

.item-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
}

.gallery-item:hover .item-text {
  bottom: 22px;
  font-size: 1.15rem;
}

.gallery-item.active .item-text {
  bottom: 25px;
  font-size: 1.2rem;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.section-desc {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 40px;
}

.experiment-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.experiment-item {
  display: flex;
  gap: 25px;
  align-items: flex-start;
  transition: all 0.4s ease;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.experiment-item::before,
.experiment-item::after {
  content: '';
  position: absolute;
  left: -100%;
  width: 100%;
  height: 2px;
  transition: none;
}

.experiment-item::before {
  top: 0;
}

.experiment-item::after {
  bottom: 0;
}

.experiment-item.highlighted::before,
.experiment-item.highlighted::after {
  animation: borderSweep 0.6s ease-out forwards;
}

@keyframes borderSweep {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.experiment-item:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateX(10px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.experiment-item.highlighted {
  transform: translateX(15px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 粒子系统 - 紫色 */
.experiment-item:nth-child(1).highlighted {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  border-left: 4px solid #667eea;
}

.experiment-item:nth-child(1)::before,
.experiment-item:nth-child(1)::after {
  background: linear-gradient(90deg, transparent, #667eea, transparent);
}

/* 流体模拟 - 粉红色 */
.experiment-item:nth-child(2).highlighted {
  background: linear-gradient(135deg, rgba(240, 147, 251, 0.15), rgba(245, 87, 108, 0.15));
  border-left: 4px solid #f093fb;
}

.experiment-item:nth-child(2)::before,
.experiment-item:nth-child(2)::after {
  background: linear-gradient(90deg, transparent, #f093fb, transparent);
}

/* 光线追踪 - 蓝色 */
.experiment-item:nth-child(3).highlighted {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.15), rgba(0, 242, 254, 0.15));
  border-left: 4px solid #4facfe;
}

.experiment-item:nth-child(3)::before,
.experiment-item:nth-child(3)::after {
  background: linear-gradient(90deg, transparent, #4facfe, transparent);
}

/* 形态变换 - 绿色 */
.experiment-item:nth-child(4).highlighted {
  background: linear-gradient(135deg, rgba(67, 233, 123, 0.15), rgba(56, 249, 215, 0.15));
  border-left: 4px solid #43e97b;
}

.experiment-item:nth-child(4)::before,
.experiment-item:nth-child(4)::after {
  background: linear-gradient(90deg, transparent, #43e97b, transparent);
}

.exp-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  transition: all 0.4s ease;
}

/* 粒子系统 - 紫色 */
.experiment-item:nth-child(1) .exp-number {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.experiment-item:nth-child(1).highlighted .exp-number {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

/* 流体模拟 - 粉红色 */
.experiment-item:nth-child(2) .exp-number {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.experiment-item:nth-child(2).highlighted .exp-number {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(240, 147, 251, 0.4);
}

/* 光线追踪 - 蓝色 */
.experiment-item:nth-child(3) .exp-number {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.experiment-item:nth-child(3).highlighted .exp-number {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
}

/* 形态变换 - 绿色 */
.experiment-item:nth-child(4) .exp-number {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
}

.experiment-item:nth-child(4).highlighted .exp-number {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(67, 233, 123, 0.4);
}

.exp-content h3 {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 10px;
}

.exp-content p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.7;
}

/* ========== SCREEN 3: 代码诗篇 ========== */
.code-philosophy {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.philosophy-card {
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.philosophy-card:hover {
  transform: translateX(-10px);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.15);
}

.phil-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.philosophy-card h3 {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 12px;
}

.philosophy-card p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.7;
}

.code-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-window {
  width: 90%;
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.window-bar {
  padding: 12px 15px;
  background: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #22c55e; }

.window-title {
  margin-left: auto;
  color: #94a3b8;
  font-size: 0.85rem;
  font-family: monospace;
}

.code-content {
  padding: 25px;
  overflow-x: auto;
}

.code-content pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-content code {
  color: #e2e8f0;
}

/* ========== SCREEN 4: 交互的艺术 ========== */
.interaction-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 60px;
}

.interaction-card {
  padding: 35px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.interaction-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);
}

.card-visual {
  width: 100%;
  height: 150px;
  margin-bottom: 25px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
}

.visual-element {
  width: 80px;
  height: 80px;
}

.morph-circle {
  background: linear-gradient(135deg, #10b981, #06b6d4);
  border-radius: 50%;
  animation: morphShape 3s ease-in-out infinite;
}

@keyframes morphShape {
  0%, 100% { border-radius: 50%; transform: rotate(0deg); }
  50% { border-radius: 20%; transform: rotate(180deg); }
}

.wave-lines {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    #3b82f6,
    #3b82f6 2px,
    transparent 2px,
    transparent 10px
  );
  animation: waveMove 2s linear infinite;
}

@keyframes waveMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(10px); }
}

.particle-burst {
  background: radial-gradient(circle, #ec4899 0%, transparent 70%);
  animation: burst 2s ease-in-out infinite;
}

@keyframes burst {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}

.gradient-flow {
  background: linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b);
  background-size: 200% 100%;
  animation: flowGradient 3s linear infinite;
}

@keyframes flowGradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.interaction-card h3 {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 15px;
}

.interaction-card p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 20px;
}

.card-tech {
  font-size: 0.85rem;
  color: #10b981;
  font-weight: 600;
}

/* ========== SCREEN 5: 小程序开发 ========== */
.miniapp-showcase-full {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.phones-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 40px;
  margin: 60px 0 40px;
  perspective: 1500px;
}

.phone-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: phoneSlideIn 1s ease-out;
}

.phone-wrapper:nth-child(1) {
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.phone-wrapper:nth-child(2) {
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.phone-wrapper:nth-child(3) {
  animation-delay: 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes phoneSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.phone-wrapper.main-phone {
  transform: scale(1.15);
  z-index: 10;
}

.phone-device {
  width: 240px;
  height: 480px;
  background: linear-gradient(135deg, #1e293b, #334155);
  border-radius: 30px;
  padding: 8px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  position: relative;
  transition: all 0.4s ease;
}

.phone-device:hover {
  transform: translateY(-10px) rotateY(5deg);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.phone-device.large {
  width: 260px;
  height: 520px;
}

.phone-notch-mini {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 20px;
  background: #0f172a;
  border-radius: 0 0 15px 15px;
  z-index: 100;
}

.phone-screen-mini {
  width: 100%;
  height: 100%;
  background: #f8fafc;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
}

.phone-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* 小程序页面样式 */
.miniapp-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.page-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-dark {
  background: linear-gradient(180deg, #2d1b3d 0%, #1a0f25 100%);
}

/* 弹窗样式 */
.popup-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  background: linear-gradient(180deg, #fff5f5 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 10;
  animation: popupBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes popupBounce {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.badge-corner {
  position: absolute;
  top: -10px;
  left: 15px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 4px 12px;
  border-radius: 10px;
  font-size: 0.65rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.popup-header {
  text-align: center;
  position: relative;
  margin-bottom: 15px;
}

.character-icon {
  font-size: 3rem;
  margin-bottom: 10px;
  animation: characterBounce 1s ease-in-out infinite;
}

@keyframes characterBounce {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.popup-header h3 {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 5px;
  font-weight: 800;
}

.popup-header p {
  font-size: 0.75rem;
  color: #64748b;
}

.popup-body {
  background: white;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
}

.popup-body h4 {
  font-size: 0.9rem;
  color: #1e293b;
  margin-bottom: 10px;
  font-weight: 700;
}

.rewards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #64748b;
}

.reward-icon {
  font-size: 1.5rem;
}

.next-reward {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-radius: 10px;
  font-size: 0.75rem;
  color: #92400e;
}

.gift-icon {
  font-size: 1.5rem;
}

.gift-box {
  font-size: 3rem;
  text-align: center;
  margin: 15px 0;
  animation: giftShake 1s ease-in-out infinite;
}

@keyframes giftShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.popup-actions {
  display: flex;
  gap: 10px;
}

.popup-actions button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-blue {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.btn-blue:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.btn-red {
  background: linear-gradient(135deg, #f87171, #ef4444);
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.btn-red:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
}

/* 主页面样式 */
.status-bar-mini {
  height: 30px;
  background: linear-gradient(135deg, #ff6b9d, #c94b7a);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
}

.status-icons-mini {
  display: flex;
  gap: 4px;
  font-size: 0.6rem;
}

.main-header {
  height: 40px;
  background: linear-gradient(135deg, #ff6b9d, #c94b7a);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
}

.header-icon,
.header-action {
  font-size: 1rem;
}

.main-content {
  height: calc(100% - 70px);
  background: linear-gradient(180deg, #ff6b9d 0%, #fef3c7 50%, #fde68a 100%);
  padding: 20px 15px;
  overflow-y: auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 20px;
}

.hero-character {
  font-size: 4rem;
  margin-bottom: 10px;
  animation: heroFloat 3s ease-in-out infinite;
}

@keyframes heroFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-15px) scale(1.05); }
}

.hero-section h2 {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 5px;
  font-weight: 900;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-section p {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
}

.game-stats {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.stat-item {
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3px;
}

.stat-value {
  display: block;
  font-size: 1rem;
  color: white;
  font-weight: 800;
}

.coin-display {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  overflow-x: auto;
}

.coin-item {
  flex-shrink: 0;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #78350f;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  animation: coinShine 2s ease-in-out infinite;
}

.coin-item:nth-child(1) { animation-delay: 0s; }
.coin-item:nth-child(2) { animation-delay: 0.2s; }
.coin-item:nth-child(3) { animation-delay: 0.4s; }
.coin-item:nth-child(4) { animation-delay: 0.6s; }

@keyframes coinShine {
  0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(251, 191, 36, 0.6); }
}

.btn-play {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #f87171, #ef4444);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 800;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
  cursor: pointer;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.btn-play:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(239, 68, 68, 0.5);
}

.bottom-tabs {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 10px;
}

.tab-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.tab-mini span:first-child {
  font-size: 1.2rem;
}

.tab-mini.active {
  color: white;
  font-weight: 700;
}

.tab-mini.active span:first-child {
  transform: scale(1.2);
}

/* 技术标签 */
.tech-badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.tech-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.tech-badge:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
}

.badge-icon {
  font-size: 1.2rem;
}

/* ===== 电商页面样式 ===== */
.page-ecommerce {
  background: #f8fafc;
}

.status-bar-mini.ecom {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.ecom-header {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.3);
  padding: 5px 12px;
  border-radius: 15px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.header-icons {
  display: flex;
  gap: 12px;
  font-size: 1.1rem;
}

.ecom-content {
  padding: 12px;
  height: calc(100% - 30px - 50px - 50px);
  overflow-y: auto;
}

.search-bar-main {
  background: white;
  border-radius: 20px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #94a3b8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 12px;
}

.feature-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-green {
  background: linear-gradient(135deg, #d4f4dd, #b8e6c9);
}

.card-blue {
  background: linear-gradient(135deg, #cfe7ff, #a8d5ff);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.card-text {
  width: 100%;
}

.card-text h4 {
  font-size: 0.8rem;
  color: #1e293b;
  margin-bottom: 3px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text p {
  font-size: 0.7rem;
  color: #64748b;
  margin: 0;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.service-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.service-item:hover .service-icon {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-item span {
  font-size: 0.65rem;
  color: #475569;
}

.promo-banner {
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 12px;
  font-size: 0.7rem;
  color: #0369a1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.activity-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.activity-img {
  width: 100%;
  height: 60px;
  background-size: cover;
  background-position: center;
}

.img-car {
  background: linear-gradient(135deg, #a7f3d0, #6ee7b7);
}

.img-camp {
  background: linear-gradient(135deg, #fde68a, #fcd34d);
}

.img-vr {
  background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
}

.activity-card p {
  font-size: 0.75rem;
  color: #1e293b;
  font-weight: 700;
  padding: 8px;
  margin: 0;
  text-align: center;
}

.recommend-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.recommend-card {
  background: white;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.recommend-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.rec-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.rec-text {
  width: 100%;
}

.rec-text h4 {
  font-size: 0.8rem;
  color: #1e293b;
  margin-bottom: 3px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rec-text p {
  font-size: 0.7rem;
  color: #64748b;
  margin: 0;
}

.banner-large {
  height: 100px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
}

.banner-content {
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
}

.banner-content h3 {
  font-size: 1.1rem;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 0.65rem;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.nav-tab span:first-child {
  font-size: 1.2rem;
}

.nav-tab.active {
  color: #667eea;
  font-weight: 700;
}

.nav-tab.active span:first-child {
  transform: scale(1.15);
}

/* ===== 社交页面样式 ===== */
.page-social {
  background: #ffffff;
}

.status-bar-mini.social {
  background: white;
  color: #1e293b;
}

.social-header {
  background: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.social-header h3 {
  font-size: 1.2rem;
  color: #1e293b;
  font-weight: 800;
}

.header-actions {
  display: flex;
  gap: 15px;
  font-size: 1.1rem;
}

.social-content {
  height: calc(100% - 30px - 60px);
  overflow-y: auto;
  padding: 15px;
}

.story-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.story-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 3px solid #667eea;
  padding: 2px;
  background: white;
  position: relative;
  overflow: hidden;
}

.avatar-1 {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.avatar-2 {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.avatar-3 {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.avatar-4 {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
}

.story-item span {
  font-size: 0.7rem;
  color: #64748b;
}

.post-card {
  background: white;
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.post-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 0.85rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 2px;
}

.post-time {
  font-size: 0.7rem;
  color: #94a3b8;
}

.post-content p {
  font-size: 0.85rem;
  color: #475569;
  margin-bottom: 10px;
  line-height: 1.5;
}

.post-image {
  width: 100%;
  height: 140px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
}

.img-sunset {
  background: linear-gradient(135deg, #ff6b6b, #feca57);
}

.img-city {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.post-actions {
  display: flex;
  gap: 20px;
  font-size: 0.75rem;
  color: #64748b;
}

.post-actions span {
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-actions span:hover {
  color: #667eea;
  transform: scale(1.1);
}

/* ===== 会员中心页面样式 ===== */
.page-member {
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

.member-header {
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
  padding: 15px;
  color: white;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.back-btn {
  font-size: 1rem;
  cursor: pointer;
}

.header-top h3 {
  font-size: 1rem;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 10px;
  font-size: 1rem;
}

.member-tabs {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.member-tabs span {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.member-tabs span.active {
  background: rgba(255, 255, 255, 0.4);
  font-weight: 700;
}

.member-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.member-card {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  border-radius: 16px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 8px 24px rgba(30, 58, 138, 0.3);
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}

.member-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
}

.card-left h2 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  font-weight: 800;
}

.card-left p {
  font-size: 0.7rem;
  opacity: 0.9;
}

.diamond-icon {
  font-size: 3rem;
  animation: diamondFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

@keyframes diamondFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(10deg); }
}

.member-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 12px 15px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.member-info-bar span:first-child {
  font-size: 0.85rem;
  color: #1e293b;
  font-weight: 600;
}

.join-btn {
  font-size: 0.8rem;
  color: #3b82f6;
  font-weight: 600;
}

.benefits-section {
  background: white;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.benefits-section h4 {
  font-size: 0.75rem;
  color: #1e293b;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.benefit-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.benefit-item:hover .benefit-icon {
  transform: scale(1.1);
}

.icon-red {
  background: linear-gradient(135deg, #fecaca, #fca5a5);
}

.icon-orange {
  background: linear-gradient(135deg, #fed7aa, #fdba74);
}

.icon-green {
  background: linear-gradient(135deg, #bbf7d0, #86efac);
}

.icon-purple {
  background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
}

.icon-blue {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
}

.benefit-item span {
  font-size: 0.65rem;
  color: #475569;
  text-align: center;
  white-space: nowrap;
}

.tasks-section {
  background: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.tasks-section h4 {
  font-size: 0.75rem;
  color: #1e293b;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
}

.task-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.task-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.task-card:last-child {
  margin-bottom: 0;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.task-info h5 {
  font-size: 0.75rem;
  color: #1e293b;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-reward {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.growth-value {
  font-size: 0.75rem;
  color: #22c55e;
  font-weight: 800;
}

.task-btn {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.65rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  flex-shrink: 0;
  white-space: nowrap;
  margin-left: 6px;
}

.task-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
}

/* ========== SCREEN 6: 技术深度 ========== */
.screen-6 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-depth-container {
  width: 100%;
  max-width: 1400px;
  padding: 40px;
}

.section-title.centered {
  text-align: center;
  margin-bottom: 15px;
}

.section-desc.centered {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
}

.tech-split-layout {
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 40px;
  align-items: start;
}

.tech-left,
.tech-right {
  height: 100%;
}

.tech-layers-3d {
  display: flex;
  flex-direction: column;
  gap: 20px;
  perspective: 1000px;
}

.tech-layer-card {
  height: 140px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-style: preserve-3d;
}

.tech-layer-card:hover {
  transform: translateY(-5px) scale(1.02);
  z-index: 10;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.tech-layer-card.active {
  transform: translateY(-8px) scale(1.03);
  z-index: 20;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.layer-bg {
  position: absolute;
  inset: 0;
  transition: all 0.5s ease;
}

.webgl-bg {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  opacity: 0.9;
}

.canvas-bg {
  background: linear-gradient(135deg, #10b981, #06b6d4);
  opacity: 0.9;
}

.dom-bg {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  opacity: 0.9;
}

.tech-layer-card.active .layer-bg {
  opacity: 1;
  filter: brightness(1.2);
}

.layer-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.layer-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  animation: iconFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.layer-name {
  font-size: 1.5rem;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* WebGL 粒子效果 */
.layer-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.tech-layer-card.active .layer-particles {
  opacity: 1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: particleFloat 3s ease-in-out infinite;
}

.particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
.particle:nth-child(2) { left: 25%; top: 40%; animation-delay: 0.3s; }
.particle:nth-child(3) { left: 40%; top: 60%; animation-delay: 0.6s; }
.particle:nth-child(4) { left: 55%; top: 30%; animation-delay: 0.9s; }
.particle:nth-child(5) { left: 70%; top: 70%; animation-delay: 1.2s; }
.particle:nth-child(6) { left: 85%; top: 50%; animation-delay: 1.5s; }
.particle:nth-child(7) { left: 15%; top: 80%; animation-delay: 1.8s; }
.particle:nth-child(8) { left: 30%; top: 15%; animation-delay: 2.1s; }
.particle:nth-child(9) { left: 45%; top: 85%; animation-delay: 2.4s; }
.particle:nth-child(10) { left: 60%; top: 25%; animation-delay: 2.7s; }
.particle:nth-child(11) { left: 75%; top: 45%; animation-delay: 3s; }
.particle:nth-child(12) { left: 90%; top: 65%; animation-delay: 3.3s; }
.particle:nth-child(13) { left: 20%; top: 55%; animation-delay: 3.6s; }
.particle:nth-child(14) { left: 35%; top: 35%; animation-delay: 3.9s; }
.particle:nth-child(15) { left: 50%; top: 75%; animation-delay: 4.2s; }

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(10px, -15px) scale(1.5); opacity: 1; }
}

/* Canvas 波浪效果 */
.layer-waves {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.tech-layer-card.active .layer-waves {
  opacity: 1;
}

.wave {
  position: absolute;
  width: 100%;
  height: 20%;
  background: rgba(255, 255, 255, 0.15);
  animation: waveSlide 3s ease-in-out infinite;
}

.wave:nth-child(1) { top: 0%; animation-delay: 0s; }
.wave:nth-child(2) { top: 20%; animation-delay: 0.6s; }
.wave:nth-child(3) { top: 40%; animation-delay: 1.2s; }
.wave:nth-child(4) { top: 60%; animation-delay: 1.8s; }
.wave:nth-child(5) { top: 80%; animation-delay: 2.4s; }

@keyframes waveSlide {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

/* DOM 网格效果 */
.layer-grid {
  position: absolute;
  inset: 20%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.tech-layer-card.active .layer-grid {
  opacity: 1;
}

.grid-item {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  animation: gridPulse 2s ease-in-out infinite;
}

.grid-item:nth-child(1) { animation-delay: 0s; }
.grid-item:nth-child(2) { animation-delay: 0.2s; }
.grid-item:nth-child(3) { animation-delay: 0.4s; }
.grid-item:nth-child(4) { animation-delay: 0.6s; }
.grid-item:nth-child(5) { animation-delay: 0.8s; }
.grid-item:nth-child(6) { animation-delay: 1s; }
.grid-item:nth-child(7) { animation-delay: 1.2s; }
.grid-item:nth-child(8) { animation-delay: 1.4s; }
.grid-item:nth-child(9) { animation-delay: 1.6s; }

@keyframes gridPulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 1; }
}

/* 右侧详情卡片 */
.tech-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-card {
  height: 140px;
  padding: 20px;
  border-radius: 16px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.detail-card.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.detail-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.6s;
}

.detail-card:hover::before,
.detail-card.highlighted::before {
  left: 100%;
}

.detail-card.highlighted {
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.detail-icon {
  font-size: 1.8rem;
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.detail-card h3 {
  font-size: 1.2rem;
  color: #1e293b;
  margin: 0;
}

.detail-card p {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}

.tech-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tech-tags span {
  padding: 5px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tech-tags span:hover {
  transform: translateY(-2px);
}

.tech-tags.orange span {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.tech-tags.green span {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.tech-tags.blue span {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* ========== SCREEN 7: 创作理念 ========== */
.philosophy-section {
  max-width: 1000px;
  margin: 0 auto;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 60px 0;
}

.principle-card {
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.principle-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);
}

.principle-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-shape {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  animation: shapeRotate 4s linear infinite;
}

.icon-shape.hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.icon-shape.circle {
  border-radius: 50%;
}

.icon-shape.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

@keyframes shapeRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.principle-card h3 {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 15px;
}

.principle-card p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.7;
}

.closing-message {
  margin-top: 80px;
  padding: 60px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
}

.message-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.message-text {
  font-size: 1.8rem;
  font-weight: 300;
  color: #1e293b;
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 30px;
}

.message-signature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: #64748b;
  font-size: 1rem;
}

.signature-line {
  width: 60px;
  height: 1px;
  background: #64748b;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}

.content-1 {
  text-align: center;
  z-index: 1;
  max-width: 800px;
}

.main-title {
  font-size: 7rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
  letter-spacing: -2px;
}

.main-subtitle {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
}

.main-desc {
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 50px;
}

.btn-primary {
  padding: 18px 48px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
}

.btn-primary.large {
  padding: 22px 60px;
  font-size: 1.2rem;
}

.btn-secondary {
  padding: 18px 48px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #6366f1;
  background: white;
  border: 2px solid #6366f1;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-3px);
}

.btn-secondary.large {
  padding: 22px 60px;
  font-size: 1.2rem;
}

/* ========== 布局组件 ========== */
.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1400px;
  width: 100%;
}

.split-layout.reverse {
  direction: rtl;
}

.split-layout.reverse > * {
  direction: ltr;
}

.centered-content {
  max-width: 1400px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 20px;
}

.section-subtitle {
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 60px;
  line-height: 1.6;
}

/* ========== SCREEN 2: 核心功能 ========== */
.glass-card-3d {
  position: relative;
  width: 100%;
  height: 500px;
  perspective: 1000px;
}

.card-layer {
  position: absolute;
  width: 80%;
  height: 350px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.layer-1 {
  top: 0;
  left: 10%;
  transform: rotateY(-10deg);
  animation: cardFloat1 4s ease-in-out infinite;
}

.layer-2 {
  top: 50px;
  left: 15%;
  transform: rotateY(-5deg);
  animation: cardFloat2 4s ease-in-out infinite 0.5s;
}

.layer-3 {
  top: 100px;
  left: 20%;
  animation: cardFloat3 4s ease-in-out infinite 1s;
}

@keyframes cardFloat1 {
  0%, 100% { transform: rotateY(-10deg) translateY(0); }
  50% { transform: rotateY(-10deg) translateY(-15px); }
}

@keyframes cardFloat2 {
  0%, 100% { transform: rotateY(-5deg) translateY(0); }
  50% { transform: rotateY(-5deg) translateY(-10px); }
}

@keyframes cardFloat3 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.feature-item {
  display: flex;
  gap: 20px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.15);
}

.feature-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.feature-info h3 {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 8px;
}

.feature-info p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
}

/* ========== SCREEN 3: 设计系统 ========== */
.design-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.design-card {
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.design-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(99, 102, 241, 0.2);
}

.design-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.design-card h3 {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 10px;
}

.design-card p {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
}

.design-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.design-tags span {
  padding: 6px 14px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
  color: #6366f1;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 500px;
}

.float-item {
  position: absolute;
  padding: 25px 35px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.item-icon {
  font-size: 2rem;
}

.item-1 {
  top: 10%;
  left: 10%;
  animation: floatItem 5s ease-in-out infinite;
}

.item-2 {
  top: 45%;
  right: 15%;
  animation: floatItem 6s ease-in-out infinite 1s;
}

.item-3 {
  bottom: 15%;
  left: 20%;
  animation: floatItem 7s ease-in-out infinite 2s;
}

@keyframes floatItem {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
}

/* ========== SCREEN 4: 协作工作流 ========== */
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 60px;
}

.workflow-card {
  padding: 35px 25px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.workflow-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);
}

.workflow-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.workflow-icon {
  font-size: 3rem;
  margin: 20px 0;
}

.workflow-card h3 {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 15px;
}

.workflow-card p {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
}

.workflow-points {
  list-style: none;
  text-align: left;
  padding: 0;
}

.workflow-points li {
  font-size: 0.9rem;
  color: #64748b;
  padding: 6px 0;
  padding-left: 20px;
  position: relative;
}

.workflow-points li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #6366f1;
  font-weight: 700;
}

/* ========== SCREEN 5: 智能工具 ========== */
.tool-showcase {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-window {
  width: 90%;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.window-header {
  padding: 15px 20px;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  gap: 8px;
}

.window-header .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #64748b;
}

.window-header .dot:nth-child(1) { background: #ef4444; }
.window-header .dot:nth-child(2) { background: #f59e0b; }
.window-header .dot:nth-child(3) { background: #22c55e; }

.window-content {
  padding: 30px;
}

.code-line {
  height: 20px;
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3));
  border-radius: 4px;
  margin-bottom: 15px;
  animation: codePulse 2s ease-in-out infinite;
}

.code-line:nth-child(1) { width: 80%; }
.code-line:nth-child(2) { width: 60%; animation-delay: 0.2s; }
.code-line:nth-child(3) { width: 90%; animation-delay: 0.4s; }
.code-line:nth-child(4) { width: 70%; animation-delay: 0.6s; }
.code-line:nth-child(5) { width: 85%; animation-delay: 0.8s; }
.code-line:nth-child(6) { width: 65%; animation-delay: 1s; }
.code-line:nth-child(7) { width: 75%; animation-delay: 1.2s; }
.code-line:nth-child(8) { width: 55%; animation-delay: 1.4s; }

@keyframes codePulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.tool-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.tool-item {
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.tool-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.15);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.tool-icon {
  font-size: 2.5rem;
}

.tool-item h3 {
  font-size: 1.4rem;
  color: #1e293b;
}

.tool-item p {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
}

.tool-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tool-features span {
  font-size: 0.95rem;
  color: #64748b;
}

/* ========== SCREEN 6: 开始使用 ========== */
.cta-section {
  max-width: 1000px;
  margin: 0 auto;
}

.cta-title {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.cta-subtitle {
  font-size: 1.5rem;
  color: #64748b;
  margin-bottom: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.stat-card {
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);
}

.stat-value {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.1rem;
  color: #64748b;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
}

.trust-badges {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.trust-badges span {
  font-size: 1rem;
  color: #64748b;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
}

/* ========== 响应式设计 ========== */
@media(max-width: 1200px) {
  .split-layout {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .workflow-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media(max-width: 768px) {
  .main-title {
    font-size: 4rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .workflow-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .shape {
    display: none;
  }
}
</style>
