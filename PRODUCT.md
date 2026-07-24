# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A mixed audience including professional network (recruiters, colleagues, collaborators), social followers, portfolio reviewers (clients, employers), and personal connections. They arrive looking for a way to understand who you are, what you do, and how to connect with you.

## Product Purpose

A personal link aggregation and portfolio page that consolidates your social profiles, projects, contact methods, and other links into a single shareable destination. Success means visitors can quickly find the right way to connect or learn more about your work.

## Positioning

_Open decision: Still exploring what makes this meaningfully different from existing link-in-bio platforms._

## Operating Context

Visitors land on this page from social media bios, email signatures, or direct sharing. They're likely on mobile or desktop browsers, scanning quickly to decide where to go next. The page needs to load fast and present options clearly.

## Capabilities and Constraints

- Content managed through a structured JSON file (`data/content.json`)
- Support for multiple card types: social profiles, projects, general links, contact
- Each card has positioning, sizing, and visibility controls
- Theme configuration with primary/accent colors
- Built with Next.js for static generation or server rendering
- Responsive layout adapting from mobile to desktop

## Brand Commitments

No established brand identity yet — this is being built alongside the visual presence.

## Evidence on Hand

Placeholder content currently fills the site. Real profile data, project details, social handles, and actual portfolio work need to be added to `data/content.json`.

## Product Principles

1. **Clarity over cleverness** — visitors should immediately understand their options and how to act
2. **Content-driven** — the structure should adapt to what you want to show, not force content into rigid templates  
3. **Self-contained** — full ownership of presentation and data without platform dependency
4. **Fast and lightweight** — technical choices prioritize load speed and accessibility over framework novelty
