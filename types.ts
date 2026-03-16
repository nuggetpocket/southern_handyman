
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  company: string;
  rating: number;
  content: string;
  color: string;
  profileImage?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
}
