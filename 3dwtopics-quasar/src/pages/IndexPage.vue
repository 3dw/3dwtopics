<template>
  <div class="page-content">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to the Atmosphere</h1>
        <p class="hero-subtitle">
          The AT Protocol is an open, decentralized network for building social applications.
        </p>
        <div class="hero-buttons">
          <q-btn color="white" text-color="primary" size="lg" label="Quickstart" />
          <q-btn outline color="white" size="lg" label="Explore SDKs" />
        </div>
      </div>
    </div>

    <!-- Guides Section -->
    <div class="section">
      <h2 class="section-title">Guides</h2>
      <div class="cards-grid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quickstart</h3>
          </div>
          <p class="card-description">
            Create an application and start building.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Read more" />
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Self-host</h3>
          </div>
          <p class="card-description">
            Learn how to set up your own personal data server.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Read more" />
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Glossary</h3>
          </div>
          <p class="card-description">
            Definitions for all the terminology used in AT Protocol.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Read more" />
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">FAQ</h3>
          </div>
          <p class="card-description">
            Frequently Asked Questions about the Atmosphere.
          </p>
          <div class="card-footer">
            <q-btn flat color="primary" label="Read more" />
          </div>
        </div>
      </div>
    </div>

    <!-- Specs Section -->
    <div class="section">
      <h2 class="section-title">Specs</h2>
      <div class="cards-grid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Repository</h3>
          </div>
          <p class="card-description">
            Self-authenticating storage for public account content.
          </p>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Lexicon</h3>
          </div>
          <p class="card-description">
            A schema definition language for ATProto.
          </p>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">HTTP API (XRPC)</h3>
          </div>
          <p class="card-description">
            Cross-system queries and procedures over HTTP.
          </p>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">URI Scheme</h3>
          </div>
          <p class="card-description">
            A URI scheme for addressing ATProto repository data.
          </p>
        </div>
      </div>
    </div>

    <!-- Learn more Section -->
    <div class="section">
      <h2 class="section-title">Learn more</h2>
      <div class="learn-more-grid">
        <div class="learn-more-card">
          <div class="card-type">Guide</div>
          <h3 class="learn-more-title">Glossary of terms</h3>
          <p class="learn-more-description">
            What's a PDS? an AppView? a DID? If you're feeling a little bowled over by new concepts, give this glossary a look.
          </p>
          <q-btn flat color="primary" label="Keep reading" />
        </div>

        <div class="learn-more-card">
          <div class="card-type">Guide</div>
          <h3 class="learn-more-title">The fast intro to building on ATProto</h3>
          <p class="learn-more-description">
            In this guide, we build a simple multi-user app that publishes your current "status" as an emoji.
          </p>
          <q-btn flat color="primary" label="Keep reading" />
        </div>

        <div class="learn-more-card">
          <div class="card-type">Article</div>
          <h3 class="learn-more-title">ATProto for distributed systems engineers</h3>
          <p class="learn-more-description">
            In this article we explore AT Proto from the perspective of distributed backend engineering.
          </p>
          <q-btn flat color="primary" label="Keep reading" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Looking for the Bluesky API docs?</h4>
          <p>Go to docs.bsky.app for Bluesky-specific documentation.</p>
        </div>
        <div class="footer-section">
          <div class="footer-links">
            <q-btn flat color="white" label="Follow us on Bluesky" />
            <q-btn flat color="white" label="Follow us on GitHub" />
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© Copyright 2025. All rights reserved.</p>
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

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.section {
  padding: 64px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
  color: #1a1a1a;
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

.learn-more-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
}

.learn-more-card {
  background-color: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
}

.learn-more-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-type {
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.learn-more-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.3;
}

.learn-more-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
}

.footer {
  background-color: #1a1a1a;
  color: white;
  padding: 64px 24px 32px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: start;
}

.footer-section h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.footer-section p {
  color: #9ca3af;
  line-height: 1.5;
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 32px;
  border-top: 1px solid #374151;
  text-align: center;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .learn-more-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
