<template>
  <div class="page-content">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">${page}</h1>
        <p class="hero-subtitle">
          Learn about ${page} in the AT Protocol ecosystem.
        </p>
      </div>
    </div>

    <!-- Content Section -->
    <div class="section">
      <div class="content-card">
        <h2>About ${page}</h2>
        <p>This page provides detailed information about ${page} and its role in the AT Protocol.</p>
        <p>Content coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
.page-content {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 24px;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.9;
  line-height: 1.5;
}

.section {
  padding: 64px 24px;
  max-width: 800px;
  margin: 0 auto;
}

.content-card {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-card h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.content-card p {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .content-card {
    padding: 24px;
  }
}
</style>
