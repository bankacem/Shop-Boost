
import { PageData } from "../types";

const PAGES_KEY = 'shopboost_pages';
const ANALYTICS_KEY = 'shopboost_analytics';
const SHOPIFY_CONFIG_KEY = 'shopboost_shopify_config';

export const storageService = {
  // Pages Management
  getPages: (): PageData[] => {
    const data = localStorage.getItem(PAGES_KEY);
    return data ? JSON.parse(data) : [];
  },

  savePage: (page: PageData) => {
    const pages = storageService.getPages();
    const index = pages.findIndex(p => p.id === page.id);
    if (index > -1) {
      pages[index] = { ...page, lastModified: new Date().toLocaleTimeString() };
    } else {
      pages.push({ ...page, lastModified: new Date().toLocaleTimeString() });
    }
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
  },

  deletePage: (id: string) => {
    const pages = storageService.getPages().filter(p => p.id !== id);
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
  },

  // Analytics Management
  recordView: (pageId: string) => {
    const stats = storageService.getAnalytics();
    stats[pageId] = stats[pageId] || { views: 0, revenue: 0, sales: 0 };
    stats[pageId].views += 1;
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(stats));
  },

  recordSale: (pageId: string, amount: number) => {
    const stats = storageService.getAnalytics();
    stats[pageId] = stats[pageId] || { views: 0, revenue: 0, sales: 0 };
    stats[pageId].revenue += amount;
    stats[pageId].sales += 1;
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(stats));
    
    // Also update the page object for immediate dashboard sync
    const pages = storageService.getPages();
    const pageIndex = pages.findIndex(p => p.id === pageId);
    if (pageIndex > -1) {
      pages[pageIndex].revenue += amount;
      pages[pageIndex].views += 1; // Count conversion as a highly engaged view
      localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
    }
  },

  getAnalytics: () => {
    const data = localStorage.getItem(ANALYTICS_KEY);
    return data ? JSON.parse(data) : {};
  },

  // Shopify Integration
  saveShopifyConfig: (domain: string, token: string) => {
    localStorage.setItem(SHOPIFY_CONFIG_KEY, JSON.stringify({ domain, token }));
  },

  getShopifyConfig: () => {
    const data = localStorage.getItem(SHOPIFY_CONFIG_KEY);
    return data ? JSON.parse(data) : null;
  }
};
