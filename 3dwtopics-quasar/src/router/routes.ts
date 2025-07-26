import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'sdks', component: () => import('pages/SdksPage.vue') },
      { path: 'glossary', component: () => import('pages/GlossaryPage.vue') },
      { path: 'faq', component: () => import('pages/FaqPage.vue') },
      { path: 'quickstart', component: () => import('pages/QuickstartPage.vue') },
      { path: 'overview', component: () => import('pages/OverviewPage.vue') },
      { path: 'identity', component: () => import('pages/IdentityPage.vue') },
      { path: 'data-repositories', component: () => import('pages/DataRepositoriesPage.vue') },
      { path: 'schemas-lexicon', component: () => import('pages/SchemasLexiconPage.vue') },
      { path: 'pds-self-hosting', component: () => import('pages/PdsSelfHostingPage.vue') },
      { path: 'at-protocol', component: () => import('pages/AtProtocolPage.vue') },
      { path: 'data-model', component: () => import('pages/DataModelPage.vue') },
      { path: 'lexicon', component: () => import('pages/LexiconPage.vue') },
      { path: 'cryptography', component: () => import('pages/CryptographyPage.vue') },
      { path: 'accounts', component: () => import('pages/AccountsPage.vue') },
      { path: 'repository', component: () => import('pages/RepositoryPage.vue') },
      { path: 'blobs', component: () => import('pages/BlobsPage.vue') },
      { path: 'labels', component: () => import('pages/LabelsPage.vue') },
      { path: 'http-api', component: () => import('pages/HttpApiPage.vue') },
      { path: 'oauth', component: () => import('pages/OauthPage.vue') },
      { path: 'event-stream', component: () => import('pages/EventStreamPage.vue') },
      { path: 'sync', component: () => import('pages/SyncPage.vue') },
      { path: 'did', component: () => import('pages/DidPage.vue') },
      { path: 'handle', component: () => import('pages/HandlePage.vue') },
      { path: 'nsid', component: () => import('pages/NsidPage.vue') },
      { path: 'tid', component: () => import('pages/TidPage.vue') },
      { path: 'record-key', component: () => import('pages/RecordKeyPage.vue') },
      { path: 'uri-scheme', component: () => import('pages/UriSchemePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
