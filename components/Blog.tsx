
import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, ChevronRight, Search, Tag, Share2, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

interface BlogProps {
  onBackHome: () => void;
}

const Blog: React.FC<BlogProps> = ({ onBackHome }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);

  // --- DYNAMIC SEO ENGINE ---
  useEffect(() => {
    if (selectedPost) {
      document.title = selectedPost.metaTitle || `${selectedPost.title} | Southern Handyman Blog`;
      const description = selectedPost.metaDescription || selectedPost.excerpt;
      updateMetaTag('description', description);
      updateMetaTag('og:description', description);
      updateMetaTag('twitter:description', description);
      updateMetaTag('og:title', selectedPost.title);
      updateMetaTag('twitter:title', selectedPost.title);
      const canonicalUrl = `https://southernhandyman.com/blog/${selectedPost.id}`;
      updateLinkTag('canonical', canonicalUrl);

      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedPost.title,
        "description": description,
        "datePublished": selectedPost.date,
        "author": { "@type": "Organization", "name": "Southern Handyman" },
        "publisher": {
          "@type": "Organization",
          "name": "Southern Handyman",
          "logo": { "@type": "ImageObject", "url": "https://southernhandyman.com/logo.png" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
      });

      window.scrollTo(0, 0);
    } else {
      document.title = 'Southern Insights | Home Maintenance Blog for Houston & Katy';
      const defaultDesc = 'Professional tips, DIY guides, and home maintenance secrets from Houston\'s leading repair experts.';
      updateMetaTag('description', defaultDesc);
      updateLinkTag('canonical', 'https://southernhandyman.com/blog');
      removeJsonLd();
    }
  }, [selectedPostId]);

  const updateMetaTag = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
    if (tag) tag.setAttribute('content', content);
    else {
      const newTag = document.createElement('meta');
      if (name.startsWith('og:')) newTag.setAttribute('property', name);
      else newTag.setAttribute('name', name);
      newTag.setAttribute('content', content);
      document.head.appendChild(newTag);
    }
  };

  const updateLinkTag = (rel: string, href: string) => {
    let tag = document.querySelector(`link[rel="${rel}"]`);
    if (tag) tag.setAttribute('href', href);
    else {
      const newTag = document.createElement('link');
      newTag.setAttribute('rel', rel);
      newTag.setAttribute('href', href);
      document.head.appendChild(newTag);
    }
  };

  const injectJsonLd = (data: object) => {
    removeJsonLd();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-blog-jsonld';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  };

  const removeJsonLd = () => {
    const script = document.getElementById('dynamic-blog-jsonld');
    if (script) script.remove();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pt-40 pb-32 bg-white relative min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {selectedPost ? (
          <article className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setSelectedPostId(null)}
              className="group flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-12 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </button>

            <div className="flex items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100">
                {selectedPost.category}
              </span>
              <time className="text-xs font-bold text-slate-300 uppercase tracking-widest" dateTime={selectedPost.date}>
                {selectedPost.date}
              </time>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-10">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-6 pb-10 border-b border-slate-100 mb-12">
               <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-black text-slate-900 text-sm">SH</div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Southern Handyman Team</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Local Houston Experts</div>
                  </div>
               </div>
               <div className="h-6 w-px bg-slate-100 hidden sm:block" />
               <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <Clock className="w-4 h-4" /> {selectedPost.readTime} Read
               </div>
            </div>

            <div className="prose prose-xl prose-slate max-w-none mb-20">
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mb-12 italic border-l-4 border-yellow-400 pl-8">
                {selectedPost.excerpt}
              </p>
              <div className="text-lg md:text-xl text-slate-700 leading-loose space-y-8 font-medium">
                {selectedPost.content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-widest rounded-xl">
                      <Tag className="w-3.5 h-3.5 text-yellow-500" /> {tag}
                    </span>
                  ))}
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Share article:</span>
                  <button onClick={handleCopyLink} className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-200 transition-all relative">
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
                  </button>
                  <button className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all">
                    <Twitter className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </article>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <button 
                  onClick={onBackHome}
                  className="group flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  Southern <span className="text-yellow-500">Insights.</span>
                </h1>
                <p className="mt-4 text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                  Professional tips, DIY guides, and home maintenance secrets from Houston's leading repair experts.
                </p>
              </div>
              <div className="w-full md:w-auto">
                 <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Search articles..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-80 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all font-medium pr-12"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  className="group flex flex-col bg-white rounded-[2.5rem] border-2 border-slate-50 hover:border-yellow-200 shadow-sm hover:shadow-2xl hover:shadow-yellow-100/50 transition-all duration-500 overflow-hidden card-lift cursor-pointer"
                >
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </div>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <Tag className="w-3 h-3 text-yellow-500" /> {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <time className="text-xs font-bold text-slate-300 uppercase tracking-widest" dateTime={post.date}>
                        {post.date}
                      </time>
                      <button className="flex items-center gap-1.5 text-slate-900 font-black text-xs uppercase tracking-widest group/btn">
                        Read More 
                        <ChevronRight className="w-4 h-4 text-yellow-500 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="py-20 text-center">
                <div className="text-slate-300 mb-4"><Search className="w-12 h-12 mx-auto" /></div>
                <h3 className="text-xl font-bold text-slate-900">No articles found.</h3>
                <p className="text-slate-500">Try searching for something else like "Houston" or "Plumbing".</p>
              </div>
            )}
          </>
        )}

        <div className="mt-24 p-12 md:p-20 bg-slate-900 rounded-[3.5rem] relative overflow-hidden text-center border-4 border-slate-800">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-yellow-600/10 pointer-events-none" />
           <div className="relative z-10">
              <BookOpen className="w-16 h-16 text-yellow-400 mx-auto mb-8 animate-pulse" />
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Stay updated with <br/><span className="text-red-500 underline decoration-yellow-400 decoration-4 underline-offset-8">the latest in home care.</span></h3>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                Subscribe to our monthly newsletter for seasonal tips and exclusive discounts for Katy and Houston homeowners.
              </p>
              <form className="max-w-md mx-auto flex gap-3" onSubmit={(e) => e.preventDefault()}>
                 <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/10 text-white outline-none focus:border-yellow-400 transition-all"
                  required
                 />
                 <button type="submit" className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-300 transition-all">
                    Join
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
