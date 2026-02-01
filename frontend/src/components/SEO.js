import React, { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords,
  type = 'website'
}) => {
  const siteUrl = window.location.hostname.includes('github.io') 
    ? 'https://abhiramreddyvundhyala.github.io/sv-travels'
    : 'https://svtravels.online';

  const defaultTitle = 'SV Travels - Bus & Tempo Traveller Rental | Hyderabad & Mahabubnagar to All India Tours';
  const defaultDescription = 'Premium Bus & Tempo Traveller Rental in Hyderabad, Mahabubnagar. Tour packages across India. Wedding, Corporate, Pilgrimage trips. 24/7 Service. Call +91-99631 07531';
  const defaultKeywords = 'bus rental Hyderabad, tempo traveller Mahabubnagar, bus booking Hyderabad, tour travels Mahabubnagar, wedding bus Hyderabad, corporate travel Telangana, pilgrimage tours India, tempo traveller Hyderabad, SV Travels';

  useEffect(() => {
    // Update page title
    document.title = title || defaultTitle;

    // Update meta tags
    updateMetaTag('name', 'description', description || defaultDescription);
    updateMetaTag('name', 'keywords', keywords || defaultKeywords);
    updateMetaTag('property', 'og:title', title || defaultTitle);
    updateMetaTag('property', 'og:description', description || defaultDescription);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', window.location.href);
    
    // Add structured data
    addStructuredData();

    return () => {
      // Cleanup structured data script on unmount
      const existingScript = document.querySelector('script[data-schema="structured-data"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, keywords, type]);

  const updateMetaTag = (attribute, key, content) => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (element) {
      element.setAttribute('content', content);
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      document.head.appendChild(element);
    }
  };

  const addStructuredData = () => {
    // Remove existing structured data script
    const existingScript = document.querySelector('script[data-schema="structured-data"]');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "SV Travels - Sri Venkateshwara Travels",
      "alternateName": "SV Travels",
      "description": "Premium bus and tempo traveller rental service from Hyderabad and Mahabubnagar for tours across India",
      "url": siteUrl,
      "telephone": "+91-99631-07531",
      "email": "svtravelsonline@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kothakotta Kurnool road vishweshwar petrol bunk beside",
        "addressLocality": "Wanaparthy",
        "addressRegion": "Telangana",
        "postalCode": "509381",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "16.3667",
        "longitude": "78.0667"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Hyderabad"
        },
        {
          "@type": "City",
          "name": "Mahabubnagar"
        },
        {
          "@type": "Country",
          "name": "India"
        }
      ],
      "priceRange": "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Travel Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bus Rental Services",
              "description": "Premium bus rental from Hyderabad and Mahabubnagar for group travel across India"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Tempo Traveller Services",
              "description": "Comfortable tempo traveller rental for tours from Hyderabad to all India destinations"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Wedding Transportation",
              "description": "Spacious bus and tempo traveller services for wedding guest transportation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Travel",
              "description": "Professional transportation for corporate events and team outings"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pilgrimage Tours",
              "description": "Comfortable travel to pilgrimage destinations like Tirupati, Shirdi, Varanasi"
            }
          }
        ]
      },
      "openingHours": "Mo-Su 00:00-23:59"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'structured-data');
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  return null;
};

export default SEO;
