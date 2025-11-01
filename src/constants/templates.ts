// Wallpaper template configurations

import { TemplateConfig, TemplateLayout } from '@/types/template.types';

export const templates: TemplateConfig[] = [
  // Free templates
  {
    id: 'minimal-white',
    name: 'Minimal White',
    layout: TemplateLayout.Minimal,
    isPremium: false,
    style: {
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
    },
  },
  {
    id: 'elegant-black',
    name: 'Elegant Black',
    layout: TemplateLayout.Elegant,
    isPremium: false,
    style: {
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
    },
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    layout: TemplateLayout.Modern,
    isPremium: false,
    style: {
      backgroundColor: '#6366F1',
      textColor: '#FFFFFF',
      gradient: {
        colors: ['#6366F1', '#EC4899'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    },
  },
  {
    id: 'colorful-pop',
    name: 'Colorful Pop',
    layout: TemplateLayout.Colorful,
    isPremium: false,
    style: {
      backgroundColor: '#F59E0B',
      textColor: '#111827',
      accentColor: '#EC4899',
    },
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    layout: TemplateLayout.Dark,
    isPremium: false,
    style: {
      backgroundColor: '#111827',
      textColor: '#F9FAFB',
      accentColor: '#818CF8',
    },
  },

  // Premium templates (15 total - adding 10 more)
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    layout: TemplateLayout.Elegant,
    isPremium: true,
    style: {
      backgroundColor: '#1F2937',
      textColor: '#D97706',
      accentColor: '#FBBF24',
    },
  },
  {
    id: 'neon-purple',
    name: 'Neon Purple',
    layout: TemplateLayout.Colorful,
    isPremium: true,
    style: {
      backgroundColor: '#000000',
      textColor: '#A855F7',
      accentColor: '#EC4899',
      gradient: {
        colors: ['#7C3AED', '#EC4899', '#F59E0B'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    },
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    layout: TemplateLayout.Modern,
    isPremium: true,
    style: {
      backgroundColor: '#0C4A6E',
      textColor: '#FFFFFF',
      gradient: {
        colors: ['#0C4A6E', '#06B6D4'],
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
      },
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    layout: TemplateLayout.Colorful,
    isPremium: true,
    style: {
      backgroundColor: '#EA580C',
      textColor: '#FFFFFF',
      gradient: {
        colors: ['#EA580C', '#DC2626', '#A21CAF'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    layout: TemplateLayout.Elegant,
    isPremium: true,
    style: {
      backgroundColor: '#064E3B',
      textColor: '#FFFFFF',
      accentColor: '#10B981',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    layout: TemplateLayout.Elegant,
    isPremium: true,
    style: {
      backgroundColor: '#FFF7ED',
      textColor: '#9F1239',
      accentColor: '#F472B6',
    },
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    layout: TemplateLayout.Dark,
    isPremium: true,
    style: {
      backgroundColor: '#1E293B',
      textColor: '#E0F2FE',
      accentColor: '#0EA5E9',
    },
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    layout: TemplateLayout.Modern,
    isPremium: true,
    style: {
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
      gradient: {
        colors: ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    },
  },
  {
    id: 'vintage-sepia',
    name: 'Vintage Sepia',
    layout: TemplateLayout.Elegant,
    isPremium: true,
    style: {
      backgroundColor: '#FEF3C7',
      textColor: '#78350F',
      accentColor: '#B45309',
    },
  },
  {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula',
    layout: TemplateLayout.Modern,
    isPremium: true,
    style: {
      backgroundColor: '#1F2937',
      textColor: '#FFFFFF',
      gradient: {
        colors: ['#4C1D95', '#7C3AED', '#EC4899', '#F59E0B'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    },
  },
];

export const getFreeTemplates = () => templates.filter((t) => !t.isPremium);
export const getPremiumTemplates = () => templates.filter((t) => t.isPremium);
export const getTemplateById = (id: string) =>
  templates.find((t) => t.id === id);
