<template>
  <div class="page-content">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Glossary</h1>
        <p class="hero-subtitle">
          Definitions for all the terminology used in AT Protocol.
        </p>
      </div>
    </div>

    <!-- Glossary Content -->
    <div class="section">
      <div class="glossary-content">
        <div class="glossary-item">
          <h3 class="term">PDS</h3>
          <p class="definition">Personal Data Server - A server that stores and serves your personal data.</p>
        </div>
        
        <div class="glossary-item">
          <h3 class="term">AppView</h3>
          <p class="definition">A service that provides a view of the network's data for applications.</p>
        </div>
        
        <div class="glossary-item">
          <h3 class="term">DID</h3>
          <p class="definition">Decentralized Identifier - A unique identifier for digital identity.</p>
        </div>
        
        <div class="glossary-item">
          <h3 class="term">Handle</h3>
          <p class="definition">A human-readable identifier for an account, like @alice.bsky.social.</p>
        </div>
        
        <div class="glossary-item">
          <h3 class="term">Repository</h3>
          <p class="definition">Self-authenticating storage for public account content.</p>
        </div>
        
        <div class="glossary-item">
          <h3 class="term">Lexicon</h3>
          <p class="definition">A schema definition language for ATProto.</p>
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
  max-width: 800px;
  margin: 0 auto;
}

.glossary-content {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.glossary-item {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e1e5e9;
}

.glossary-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.term {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.definition {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .glossary-content {
    padding: 24px;
  }
  
  .term {
    font-size: 20px;
  }
}
</style>
