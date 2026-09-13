import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  noindex?: boolean;
}

export const SeoHead: React.FC<SeoProps> = ({
  title = 'Shri Shyam Celebrations | Birthday, Cake & Party Items',
  description = 'Shri Shyam Celebrations is your local celebration store for birthday items, cake decorating supplies, party accessories, and disposable tableware. Browse our catalog and enquire directly on WhatsApp.',
  noindex = false
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Robots meta (noindex for admin / 404, index for public customer store)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noindex ? 'noindex,nofollow' : 'index,follow');

    // 4. Canonical & Open Graph URLs using dynamic origin (without hardcoding localhost)
    if (typeof window !== 'undefined') {
      const currentOrigin = window.location.origin;
      const currentPath = window.location.pathname;
      const fullUrl = `${currentOrigin}${currentPath === '/' ? '' : currentPath}`;

      // Canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', fullUrl);

      // og:url
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', fullUrl);
      }

      // og:image absolute url
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        const imagePath = ogImage.getAttribute('content') || '/assets/logo_banner.jpg';
        if (!imagePath.startsWith('http')) {
          ogImage.setAttribute('content', `${currentOrigin}${imagePath}`);
        }
      }

      // twitter:image absolute url
      let twImage = document.querySelector('meta[name="twitter:image"]');
      if (twImage) {
        const imagePath = twImage.getAttribute('content') || '/assets/logo_banner.jpg';
        if (!imagePath.startsWith('http')) {
          twImage.setAttribute('content', `${currentOrigin}${imagePath}`);
        }
      }
    }
  }, [title, description, noindex]);

  return null;
};
