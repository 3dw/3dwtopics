<template>
  <div class="page-content">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">SDKs</h1>
        <p class="hero-subtitle">
          Choose your preferred programming language and start building with AT Protocol.
        </p>
      </div>
    </div>

    <!-- SDKs Grid -->
    <div class="section">
      <div class="cards-grid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">JavaScript/TypeScript</h3>
          </div>
          <p class="card-description">
            Official AT Protocol SDK for JavaScript and TypeScript applications.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Get Started" />
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Python</h3>
          </div>
          <p class="card-description">
            Python SDK for building AT Protocol applications and tools.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Get Started" />
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Go</h3>
          </div>
          <p class="card-description">
            Go SDK for high-performance AT Protocol applications.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Get Started" />
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Rust</h3>
          </div>
          <p class="card-description">
            Rust SDK for memory-safe and concurrent AT Protocol development.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Get Started" />
          </div>
        </div>
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
  max-width: 1200px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background-color: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: 12px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.card-description {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 16px;
}

.card-footer {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style> 