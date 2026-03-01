<template>
  <div class="learning-page">
    <!-- Ambient Background -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>

    <div class="learning-container">
      <!-- Left Sidebar - Tech Stack Navigation (Fixed) -->
      <aside class="tech-nav">
        <div class="nav-header">
          <h3>技术栈</h3>
        </div>
        <div class="tech-list">
          <div
            v-for="tech in techStacks"
            :key="tech.id"
            class="tech-item"
            :class="{ active: selectedTech?.id === tech.id }"
            @click="selectTech(tech)"
          >
            <span class="tech-icon">{{ tech.icon }}</span>
            <div class="tech-info">
              <span class="tech-name">{{ tech.name }}</span>
              <span class="tech-status" :class="tech.status">
                {{ getStatusText(tech.status) }}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Content Area (Scrollable) -->
      <main class="content-area">
        <div v-if="selectedTech" class="tech-content">
          <!-- Tech Header -->
          <div class="tech-header">
            <div class="tech-title-row">
              <span class="tech-icon-large">{{ selectedTech.icon }}</span>
              <div>
                <h1>{{ selectedTech.name }}</h1>
                <p class="tech-desc">{{ selectedTech.description }}</p>
              </div>
            </div>
          </div>

          <!-- Chapters List -->
          <div class="chapters-container">
            <div
              v-for="chapter in selectedTech.chapters"
              :key="chapter.id"
              class="chapter-card"
            >
              <div
                class="chapter-header"
                @click="toggleChapter(chapter.id)"
              >
                <div class="chapter-title-row">
                  <h2>{{ chapter.title }}</h2>
                  <span class="section-count">{{ chapter.sections.length }} 小节</span>
                </div>
                <el-icon class="toggle-icon" :class="{ expanded: expandedChapters.includes(chapter.id) }">
                  <ArrowDown />
                </el-icon>
              </div>

              <!-- Sections List -->
              <transition name="expand">
                <div v-show="expandedChapters.includes(chapter.id)" class="sections-list">
                  <div
                    v-for="(section, index) in chapter.sections"
                    :key="index"
                    class="section-item"
                    @click="goToSection(selectedTech.id, chapter.id, index)"
                  >
                    <div class="section-number">{{ index + 1 }}</div>
                    <div class="section-info">
                      <h3 class="section-title">{{ section.title }}</h3>
                      <p class="section-preview">{{ getPreview(section.content) }}</p>
                    </div>
                    <el-icon class="arrow-icon"><ArrowRight /></el-icon>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">📚</div>
          <h3>选择一个技术栈开始学习</h3>
          <p>从左侧选择你感兴趣的技术方向</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { techStacks } from './data/index';

const router = useRouter();
const selectedTech = ref(null);
const expandedChapters = ref([]);

const selectTech = (tech) => {
  selectedTech.value = tech;
  // 切换技术栈时，收起所有章节
  expandedChapters.value = [];
};

const toggleChapter = (chapterId) => {
  const index = expandedChapters.value.indexOf(chapterId);
  if (index > -1) {
    expandedChapters.value.splice(index, 1);
  } else {
    expandedChapters.value.push(chapterId);
  }
};

const getStatusText = (status) => {
  const statusMap = {
    learning: '学习中',
    completed: '已完成',
    planned: '计划中'
  };
  return statusMap[status] || status;
};

const getPreview = (content) => {
  if (!content) return '';
  // 获取前60个字符作为预览
  const text = content.replace(/\n/g, ' ').trim();
  return text.length > 60 ? text.substring(0, 60) + '...' : text;
};

const goToSection = (techId, chapterId, sectionIndex) => {
  router.push({
    name: 'LearningSection',
    params: { techId, chapterId, sectionIndex }
  });
};

onMounted(() => {
  // 默认选中 Docker（当前学习重点）
  const docker = techStacks.find(t => t.id === 'docker');
  if (docker) {
    selectTech(docker);
  }

  // 恢复全局滚动
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
});
</script>

<style scoped>
.learning-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fc;
  position: relative;
  padding-top: 70px;
}

/* Ambient Background */
.ambient-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary-3);
  top: -100px;
  right: -50px;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: var(--color-secondary-2);
  bottom: 50px;
  left: -150px;
}

/* Main Container */
.learning-container {
  display: flex;
  height: calc(100vh - 70px);
  max-width: 1600px;
  margin: 0 auto;
}

/* Left Sidebar - Fixed */
.tech-nav {
  width: 280px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-header {
  padding: 30px 25px 20px;
  border-bottom: 2px solid #f1f5f9;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 10;
}

.nav-header h3 {
  font-size: 1.2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.tech-list {
  padding: 20px 15px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  margin-bottom: 10px;
}

.tech-item:hover {
  background: rgba(244, 114, 182, 0.05);
  border-color: var(--color-primary-2);
}

.tech-item.active {
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.1), rgba(168, 85, 247, 0.1));
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(244, 114, 182, 0.15);
}

.tech-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.tech-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tech-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
}

.tech-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  width: fit-content;
}

.tech-status.learning {
  background: #dbeafe;
  color: #1e40af;
}

.tech-status.completed {
  background: #dcfce7;
  color: #166534;
}

.tech-status.planned {
  background: #f3f4f6;
  color: #6b7280;
}

/* Right Content Area - Scrollable */
.content-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px;
}

.tech-content {
  max-width: 1000px;
  margin: 0 auto;
}

.tech-header {
  margin-bottom: 40px;
}

.tech-title-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.tech-icon-large {
  font-size: 4rem;
}

.tech-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.tech-desc {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
}

/* Chapters */
.chapters-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.chapter-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.chapter-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.chapter-header {
  padding: 25px 30px;
  background: linear-gradient(135deg, #fafafa, #ffffff);
  border-bottom: 2px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chapter-header:hover {
  background: linear-gradient(135deg, #fdf2f8, #ffffff);
}

.chapter-title-row {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.chapter-header h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.section-count {
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 600;
  padding: 6px 12px;
  background: #f1f5f9;
  border-radius: 8px;
}

.toggle-icon {
  font-size: 1.3rem;
  color: #94a3b8;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.toggle-icon.expanded {
  transform: rotate(180deg);
  color: var(--color-primary);
}

/* Sections List */
.sections-list {
  padding: 15px;
  overflow: hidden;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  margin-bottom: 10px;
}

.section-item:hover {
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.05), rgba(168, 85, 247, 0.05));
  border-color: var(--color-primary-2);
  transform: translateX(5px);
}

/* Expand Animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.section-number {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  flex-shrink: 0;
}

.section-info {
  flex: 1;
  min-width: 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px 0;
}

.section-preview {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow-icon {
  font-size: 1.3rem;
  color: #cbd5e1;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.section-item:hover .arrow-icon {
  color: var(--color-primary);
  transform: translateX(5px);
}

/* Empty State */
.empty-state {
  padding: 100px 40px;
  text-align: center;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
}

.empty-state p {
  font-size: 1rem;
  color: #64748b;
}

/* Scrollbar Styling */
.tech-nav::-webkit-scrollbar,
.content-area::-webkit-scrollbar {
  width: 8px;
}

.tech-nav::-webkit-scrollbar-track,
.content-area::-webkit-scrollbar-track {
  background: transparent;
}

.tech-nav::-webkit-scrollbar-thumb,
.content-area::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.tech-nav::-webkit-scrollbar-thumb:hover,
.content-area::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive */
@media (max-width: 1024px) {
  .learning-container {
    flex-direction: column;
    height: auto;
  }

  .tech-nav {
    width: 100%;
    max-height: 300px;
    border-right: none;
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }

  .content-area {
    padding: 30px 20px;
    height: auto;
  }
}

@media (max-width: 768px) {
  .learning-page {
    padding-top: 60px;
  }

  .tech-header h1 {
    font-size: 2rem;
  }

  .tech-icon-large {
    font-size: 3rem;
  }

  .chapter-header h2 {
    font-size: 1.2rem;
  }

  .section-item {
    padding: 15px;
  }

  .section-number {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>
