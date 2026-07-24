# Content Update Guide
## How to Update Your Bento Website

**Last Updated:** 2026-07-24  
**Audience:** Non-technical users

---

## Introduction

This guide will help you update your Bento-style website without needing to write code. All your content lives in a single file called `content.json`, and updating your site is as simple as editing that file and pushing your changes to GitHub.

**What you can update:**
- Profile information (name, bio, avatar, location)
- Add, edit, or remove cards
- Change images
- Customize theme colors
- Update links and descriptions

**Time to make changes:** ~2-5 minutes  
**Technical knowledge required:** None (just basic text editing)

---

## Quick Start: Making Your First Update

### Step 1: Find the Content File

The file you need to edit is located at:
```
data/content.json
```

Open it in any text editor (VS Code, Notepad++, or even Notepad).

### Step 2: Make Your Changes

Edit the text you want to change. For example, to change your bio:

**Before:**
```json
"bio": "Full-stack developer & open source enthusiast"
```

**After:**
```json
"bio": "Web developer passionate about creating beautiful experiences"
```

### Step 3: Save and Deploy

1. Save the file
2. Open your terminal or Git client
3. Run these commands:
```bash
git add data/content.json
git commit -m "Update bio"
git push
```

4. Wait 2-3 minutes for Vercel to rebuild your site
5. Visit your website to see the changes live!

---

## Understanding content.json

Your `content.json` file has four main sections:

```json
{
  "profile": { ... },      // Your name, bio, avatar
  "seo": { ... },          // Search engine information
  "cards": [ ... ],        // All your cards (links, projects, etc.)
  "theme": { ... }         // Colors
}
```

Let's break down each section.

---

## 1. Updating Your Profile

### Change Your Name

```json
"profile": {
  "name": "Your Name Here"
}
```

### Update Your Bio

```json
"bio": "Your tagline or description (max 300 characters)"
```

### Change Your Avatar

**Option A: Use a local image**
1. Add your image to `public/images/`
2. Update the path:
```json
"avatar": "/images/my-photo.jpg"
```

**Option B: Use an external URL**
```json
"avatar": "https://example.com/photo.jpg"
```

### Add or Change Your Location

```json
"location": "San Francisco, CA"
```

Or remove it by deleting the line (optional field).

---

## 2. Adding a New Card

To add a new card, copy one of the examples below and add it to the `cards` array.

### Example: Social Media Link

```json
{
  "id": "linkedin",
  "type": "social",
  "position": 10,
  "size": "1x1",
  "visible": true,
  "platform": "LinkedIn",
  "username": "Your Name",
  "url": "https://linkedin.com/in/yourprofile",
  "icon": "linkedin"
}
```

### Example: Project Showcase

```json
{
  "id": "my-project",
  "type": "project",
  "position": 11,
  "size": "2x1",
  "visible": true,
  "title": "My Awesome Project",
  "description": "A cool project I built",
  "url": "https://myproject.com",
  "image": "/images/projects/screenshot.jpg",
  "tags": ["React", "TypeScript"]
}
```

### Example: Simple Link

```json
{
  "id": "blog",
  "type": "link",
  "position": 12,
  "size": "1x1",
  "visible": true,
  "title": "My Blog",
  "description": "Read my latest posts",
  "url": "https://myblog.com",
  "icon": "book-open"
}
```

### Example: Contact Card

```json
{
  "id": "contact",
  "type": "contact",
  "position": 13,
  "size": "1x1",
  "visible": true,
  "title": "Get in touch",
  "email": "hello@example.com",
  "subject": "Hi from your website!",
  "icon": "mail"
}
```

**Important:** 
- Each card must have a unique `id` (no spaces, use dashes)
- Don't forget the comma after each card (except the last one)
- The `position` number determines the order (lower numbers appear first)

---

## 3. Editing Existing Cards

### Change a Card's Text

Find the card by its `id` and update the fields:

```json
{
  "id": "github",
  "title": "GitHub",           // ← Change this
  "description": "My code",    // ← Change this
  "url": "https://..."         // ← Change this
}
```

### Change a Card's Size

Available sizes:
- `"1x1"` - Small square
- `"1x2"` - Wide rectangle (2 columns)
- `"2x1"` - Tall rectangle (2 rows)
- `"2x2"` - Large square

```json
"size": "2x1"
```

### Reorder Cards

Change the `position` number (lower numbers appear first):

```json
"position": 5    // This card appears 5th
```

### Hide a Card Temporarily

```json
"visible": false
```

To show it again, change it back to `true`.

---

## 4. Deleting a Card

To remove a card:

1. Find the card in the `cards` array
2. Delete the entire card object (from `{` to `}`)
3. Remove the comma if it was the last card

**Before:**
```json
"cards": [
  { "id": "card1", ... },
  { "id": "card2", ... },    // ← Want to delete this
  { "id": "card3", ... }
]
```

**After:**
```json
"cards": [
  { "id": "card1", ... },
  { "id": "card3", ... }
]
```

---

## 5. Updating Images

### Add a New Image

1. Add your image file to `public/images/`
2. Reference it in your card:
```json
"image": "/images/my-image.jpg"
```

**Image tips:**
- Keep file size under 500KB for fast loading
- Use descriptive filenames (no spaces)
- Supported formats: JPG, PNG, WebP
- Recommended sizes:
  - Avatar: 400x400px
  - Project images: 1200x630px

### Change an Existing Image

Replace the old file with a new one (same filename), or update the path:

```json
"image": "/images/new-image.jpg"
```

---

## 6. Changing Theme Colors

Find the `theme` section and update the colors (use hex codes):

```json
"theme": {
  "primaryColor": "#3b82f6",     // Main brand color
  "accentColor": "#8b5cf6",      // Highlight color
  "backgroundColor": "#ffffff"    // Page background
}
```

**Popular color combinations:**

**Blue & Purple (default):**
```json
"primaryColor": "#3b82f6",
"accentColor": "#8b5cf6"
```

**Green & Teal:**
```json
"primaryColor": "#10b981",
"accentColor": "#06b6d4"
```

**Pink & Orange:**
```json
"primaryColor": "#ec4899",
"accentColor": "#f97316"
```

**Red & Yellow:**
```json
"primaryColor": "#ef4444",
"accentColor": "#eab308"
```

Use a color picker tool like https://htmlcolorcodes.com/ to find hex codes.

---

## 7. Updating SEO Information

The `seo` section helps your site appear in search results:

```json
"seo": {
  "title": "Your Name - Developer",
  "description": "Personal links and portfolio for Your Name...",
  "ogImage": "https://yoursite.com/og-image.jpg",
  "twitterHandle": "yourusername"
}
```

**Tips:**
- Title: Keep under 60 characters
- Description: 50-160 characters (be specific and descriptive)
- ogImage: This is the image shown when you share your link on social media

---

## 8. Deploying Your Changes

### Using Git Commands (Terminal)

```bash
# Step 1: Check what changed
git status

# Step 2: Add your changes
git add data/content.json
# If you added images too:
git add public/images/

# Step 3: Commit with a message
git commit -m "Update profile and add new project card"

# Step 4: Push to GitHub
git push

# Step 5: Wait 2-3 minutes for Vercel to rebuild
```

### Using GitHub Desktop (GUI)

1. Open GitHub Desktop
2. You'll see your changes listed on the left
3. Write a summary (e.g., "Update bio")
4. Click "Commit to main"
5. Click "Push origin"
6. Wait 2-3 minutes for deployment

### Checking Deployment Status

1. Go to https://vercel.com/dashboard
2. Find your project
3. You'll see a "Building" status, then "Ready"
4. Once it says "Ready", refresh your website!

---

## 9. Common Mistakes & How to Fix Them

### Error: "Build failed"

**Cause:** Invalid JSON syntax

**How to fix:**
1. Check for missing commas between items
2. Ensure all quotes are matched (`"` not `"` or `'`)
3. Make sure brackets are balanced (`{`, `}`, `[`, `]`)
4. Use a JSON validator: https://jsonlint.com/

**Common JSON mistakes:**
```json
// ❌ Wrong: Missing comma
{
  "name": "John"
  "bio": "Developer"
}

// ✅ Correct: Comma added
{
  "name": "John",
  "bio": "Developer"
}

// ❌ Wrong: Extra comma at the end
{
  "name": "John",
}

// ✅ Correct: No trailing comma
{
  "name": "John"
}
```

### Error: "Image not found"

**Cause:** Image path is wrong or file doesn't exist

**How to fix:**
1. Check the image is in `public/images/`
2. Check spelling and capitalization (case-sensitive!)
3. Path should start with `/images/` not `public/images/`

### Error: "Invalid URL"

**Cause:** URL format is incorrect

**How to fix:**
- URLs must start with `http://` or `https://`
- Example: `"url": "https://github.com/username"`

### Cards appear in wrong order

**Cause:** Position numbers aren't sequential

**How to fix:**
- Reorder by changing `position` values (0, 1, 2, 3...)
- Lower numbers appear first

---

## 10. Card Reference Guide

### Card Types

| Type | Purpose | Required Fields |
|------|---------|----------------|
| `link` | Simple link to any URL | `title`, `url` |
| `social` | Social media profile | `platform`, `username`, `url` |
| `project` | Project showcase | `title`, `description`, `url` |
| `image` | Display an image | `image` |
| `text` | Text content/note | `description` |
| `contact` | Email contact | `email` |

### Card Sizes

| Size | Description | Best For |
|------|-------------|----------|
| `1x1` | Small square | Social links, simple buttons |
| `1x2` | Wide (2 columns) | Featured links, CTAs |
| `2x1` | Tall (2 rows) | Projects with images |
| `2x2` | Large square | Hero projects, big announcements |

### Available Icons

Popular icon names (from lucide-react):
- Social: `github`, `twitter`, `linkedin`, `youtube`, `instagram`, `facebook`
- Actions: `mail`, `link`, `external-link`, `download`, `arrow-right`
- Content: `book-open`, `file-text`, `image`, `video`, `music`
- Other: `globe`, `map-pin`, `calendar`, `heart`, `star`

Full list: https://lucide.dev/icons/

---

## 11. Content Tips & Best Practices

### Writing Good Descriptions

**Do:**
- Be concise (1-2 sentences)
- Focus on what makes it interesting
- Use active voice ("I built" not "was built")

**Don't:**
- Write long paragraphs
- Use ALL CAPS
- Add too many emojis (1-2 max)

### Choosing Card Sizes

- Start with mostly `1x1` cards (clean, organized look)
- Use `2x1` or `2x2` for 1-2 featured projects
- Use `1x2` for important CTAs (like "Hire me" or "Contact")

### Organizing Your Cards

**Good order:**
1. Social media links (GitHub, Twitter, LinkedIn)
2. Featured project (large, 2x1 or 2x2)
3. Other projects
4. Blog or content links
5. Contact card

### Keeping Images Fast

- Compress images before adding: https://tinypng.com/
- Use WebP format when possible (better compression)
- Keep under 500KB per image

---

## 12. Quick Reference: JSON Structure

```json
{
  "profile": {
    "name": "string",
    "bio": "string",
    "avatar": "path or URL",
    "location": "string (optional)"
  },
  "seo": {
    "title": "string",
    "description": "string",
    "ogImage": "URL (optional)",
    "twitterHandle": "username (optional)"
  },
  "cards": [
    {
      "id": "unique-id",
      "type": "link|social|project|image|text|contact",
      "position": 0,
      "size": "1x1|1x2|2x1|2x2",
      "visible": true,
      "title": "string",
      "description": "string",
      "url": "URL",
      "icon": "icon-name",
      "image": "path or URL"
    }
  ],
  "theme": {
    "primaryColor": "#hex",
    "accentColor": "#hex"
  }
}
```

---

## 13. Getting Help

### Build Errors

If your build fails, Vercel will email you with error details:
1. Check your email for "Build failed" message
2. Click the link to see error logs
3. Look for lines starting with "Error:" or "Validation failed:"
4. Fix the issue in `content.json` and push again

### Need Help?

If you're stuck:
1. Double-check your JSON syntax at https://jsonlint.com/
2. Compare your changes to the working example in this guide
3. Revert to a previous working version: `git checkout HEAD~1 data/content.json`

---

## Checklist: Before You Push

- [ ] Ran my changes through https://jsonlint.com/ (valid JSON)
- [ ] All `id` fields are unique
- [ ] All URLs start with `http://` or `https://`
- [ ] Theme colors are valid hex codes (start with `#`)
- [ ] Image paths are correct (check spelling!)
- [ ] No trailing commas at the end of objects/arrays
- [ ] Saved the file

---

## Summary

**To update your website:**
1. Edit `data/content.json`
2. Save the file
3. Run: `git add .` → `git commit -m "Update content"` → `git push`
4. Wait 2-3 minutes
5. Check your live site!

**Common updates take:**
- Change text: 30 seconds
- Add a card: 2 minutes
- Update images: 3-5 minutes
- Deploy: 2-3 minutes

You've got this! 🚀
