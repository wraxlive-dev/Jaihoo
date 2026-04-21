# Digital Marketing Agency

## Current State
The site has a Services section with 18 services covering SEO, social media, PPC, content, email, video, branding, analytics, influencer, WhatsApp (marketing + automation API + software), automation review, reputation management, CRO, PR, and affiliate marketing.

## Requested Changes (Diff)

### Add
- New services inspired by WebFX's service offerings:
  - AI/GEO SEO (Generative Engine Optimization)
  - Local SEO
  - Programmatic Advertising
  - Google Local Services Ads
  - Account-Based Marketing (ABM)
  - Amazon SEO & Advertising
  - Shopify Optimization
  - AI Digital Marketing & ChatGPT Optimization
  - Website Design & Development
  - CRM & Marketing Automation (Salesforce/HubSpot)
  - Landing Pages & Funnel Optimization
  - Connected TV & OTT Advertising
  - Revenue Operations & Analytics
  - Website Copywriting

### Modify
- Services.tsx: Add ~14 new service cards to the existing FALLBACK_SERVICES array
- Also update membership tiers in PrivilegeMembershipCard.tsx to reflect the new services

### Remove
- Nothing removed

## Implementation Plan
1. Update Services.tsx to add all new WebFX-inspired services with appropriate icons and descriptions
2. Update PrivilegeMembershipCard.tsx tiers to mention key new services in features list
