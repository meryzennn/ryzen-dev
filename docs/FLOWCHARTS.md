# User Flows & System Diagrams
## Personal Bento-Style Link Website

**Version:** 1.0  
**Date:** 2026-07-24

---

## 1. User Flow Diagram

### 1.1 Visitor Journey (Primary Flow)

```mermaid
flowchart TD
    Start([Visitor lands on page]) --> Load[Page loads from CDN]
    Load --> Profile[See Profile Section]
    Profile --> Name[Name + Avatar]
    Profile --> Bio[Bio/Tagline]
    Profile --> Location[Location optional]
    
    Profile --> Scroll[Scroll down]
    Scroll --> Grid[View Bento Grid]
    
    Grid --> Card1[Link Card]
    Grid --> Card2[Social Card]
    Grid --> Card3[Project Card]
    Grid --> Card4[Image Card]
    Grid --> Card5[Text Card]
    Grid --> Card6[Contact Card]
    
    Card1 --> Click1{Click?}
    Click1 -->|Yes| External1[Navigate to external URL]
    Click1 -->|No| Browse[Continue browsing]
    
    Card2 --> Click2{Click?}
    Click2 -->|Yes| External2[Open social profile]
    Click2 -->|No| Browse
    
    Card3 --> Click3{Click?}
    Click3 -->|Yes| External3[View project]
    Click3 -->|No| Browse
    
    Card6 --> Click6{Click?}
    Click6 -->|Yes| Email[Open email client]
    Click6 -->|No| Browse
    
    Browse --> End([Exit or share])
    External1 --> End
    External2 --> End
    External3 --> End
    Email --> End
```

### 1.2 Content Owner Journey (Update Flow)

```mermaid
flowchart TD
    Start([Owner wants to update content]) --> Decision{What to update?}
    
    Decision -->|Add/Edit Card| EditJSON1[Open data/content.json]
    Decision -->|Change Profile| EditJSON2[Open data/content.json]
    Decision -->|Update Image| AddImage[Add image to /public/images/]
    Decision -->|Change Theme| EditJSON3[Open data/content.json]
    
    EditJSON1 --> Modify1[Modify cards array]
    EditJSON2 --> Modify2[Modify profile object]
    EditJSON3 --> Modify3[Modify theme object]
    AddImage --> Modify1
    
    Modify1 --> Save[Save file]
    Modify2 --> Save
    Modify3 --> Save
    
    Save --> Validate{Valid JSON?}
    Validate -->|No| Error[See error message]
    Error --> Fix[Fix syntax]
    Fix --> Save
    
    Validate -->|Yes| Commit[Git commit]
    Commit --> Push[Git push]
    Push --> Deploy[Auto-deploy triggers]
    Deploy --> Build[Vercel builds site]
    Build --> BuildValidate{Build success?}
    
    BuildValidate -->|No| BuildError[Check build logs]
    BuildError --> FixSchema[Fix validation errors]
    FixSchema --> Commit
    
    BuildValidate -->|Yes| Published[Site published]
    Published --> Preview[Preview changes]
    Preview --> Done([Complete])
```

---

## 2. System Architecture Diagram

### 2.1 High-Level System Overview

```mermaid
graph TB
    subgraph "User Browser"
        Browser[Web Browser]
    end
    
    subgraph "CDN Layer (Vercel Edge)"
        CDN[Edge Network]
        Cache[Static Cache]
    end
    
    subgraph "Build Process"
        Trigger[Git Push Trigger]
        Build[Next.js Build]
        Validate[Zod Validation]
        Optimize[Asset Optimization]
        Generate[Static Generation]
    end
    
    subgraph "Source Repository (GitHub)"
        Repo[Git Repository]
        Content[data/content.json]
        Images[public/images/]
        Code[app/ & components/]
    end
    
    Browser -->|HTTPS Request| CDN
    CDN -->|Cache Hit| Cache
    Cache -->|Return HTML/Assets| Browser
    
    CDN -->|Cache Miss| Generate
    Generate -->|Return & Cache| CDN
    
    Repo -->|Webhook| Trigger
    Trigger --> Build
    Build --> Content
    Build --> Images
    Build --> Code
    
    Content --> Validate
    Validate -->|Valid| Optimize
    Validate -->|Invalid| BuildFail[Build Fails]
    
    Optimize --> Generate
    Generate -->|Deploy| CDN
```

### 2.2 Component Architecture

```mermaid
graph TD
    subgraph "Page Level"
        Page[app/page.tsx]
    end
    
    subgraph "Layout Components"
        Layout[app/layout.tsx]
        ProfileSection[ProfileHeader]
        GridSection[BentoGrid]
    end
    
    subgraph "Profile Components"
        Avatar[ProfileAvatar]
        Name[Name Display]
        Bio[Bio Display]
        Location[Location Display]
    end
    
    subgraph "Card Components"
        BaseCard[BaseCard Wrapper]
        LinkCard[LinkCard]
        SocialCard[SocialCard]
        ProjectCard[ProjectCard]
        ImageCard[ImageCard]
        TextCard[TextCard]
        ContactCard[ContactCard]
    end
    
    subgraph "Utilities"
        ContentLoader[lib/content.ts]
        Schemas[lib/schemas.ts]
        Utils[lib/utils.ts]
    end
    
    subgraph "Data Source"
        JSON[data/content.json]
    end
    
    Page --> Layout
    Layout --> ProfileSection
    Layout --> GridSection
    
    ProfileSection --> Avatar
    ProfileSection --> Name
    ProfileSection --> Bio
    ProfileSection --> Location
    
    GridSection --> BaseCard
    
    BaseCard --> LinkCard
    BaseCard --> SocialCard
    BaseCard --> ProjectCard
    BaseCard --> ImageCard
    BaseCard --> TextCard
    BaseCard --> ContactCard
    
    ContentLoader --> JSON
    ContentLoader --> Schemas
    Schemas --> Validate[Zod Validation]
    
    Page --> ContentLoader
    ProfileSection --> ContentLoader
    GridSection --> ContentLoader
```

---

## 3. Data Flow Diagrams

### 3.1 Build-Time Data Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as Git Repository
    participant Vercel as Vercel Platform
    participant Build as Build Process
    participant Content as content.json
    participant Zod as Zod Validator
    participant Next as Next.js
    participant CDN as Edge Network
    
    Dev->>Git: git push
    Git->>Vercel: Webhook trigger
    Vercel->>Build: Start build
    Build->>Content: Read content.json
    Content->>Zod: Validate schema
    
    alt Validation Success
        Zod->>Next: Pass validated data
        Next->>Next: Generate static pages
        Next->>Next: Optimize images
        Next->>CDN: Deploy static files
        CDN->>Dev: Preview URL ready
    else Validation Failure
        Zod->>Build: Throw validation error
        Build->>Dev: Build failed notification
    end
```

### 3.2 Runtime Data Flow (Client-Side)

```mermaid
sequenceDiagram
    participant User as User Browser
    participant CDN as Edge Network
    participant HTML as Static HTML
    participant JS as React Bundle
    participant Card as Card Component
    
    User->>CDN: Request page
    CDN->>HTML: Return cached HTML
    HTML->>User: Display static content
    
    User->>CDN: Request JS bundle
    CDN->>JS: Return bundle
    JS->>User: React hydrates page
    
    User->>Card: Click card
    
    alt External Link
        Card->>User: Navigate to URL (new tab)
    else Contact Card
        Card->>User: Open email client
    else Internal Action
        Card->>JS: Handle interaction
        JS->>User: Update UI
    end
```

---

## 4. Content Update Flow

### 4.1 Quick Update Process

```mermaid
flowchart LR
    A[Open content.json] --> B[Edit content]
    B --> C[Save file]
    C --> D[git add]
    D --> E[git commit]
    E --> F[git push]
    F --> G[Auto-deploy]
    G --> H[Live in ~2 min]
    
    style A fill:#e3f2fd
    style H fill:#c8e6c9
```

### 4.2 Content Validation Flow

```mermaid
flowchart TD
    Start[content.json modified] --> Read[Build reads file]
    Read --> Parse{Valid JSON?}
    
    Parse -->|No| JSONError[Syntax Error]
    JSONError --> ShowError1[Show JSON parse error]
    ShowError1 --> Fail[Build fails]
    
    Parse -->|Yes| Zod[Zod validation]
    Zod --> Schema{Matches schema?}
    
    Schema -->|No| SchemaError[Schema Error]
    SchemaError --> ShowError2[Show validation details]
    ShowError2 --> Fail
    
    Schema -->|Yes| TypeCheck[TypeScript check]
    TypeCheck --> Types{Types valid?}
    
    Types -->|No| TypeError[Type Error]
    TypeError --> ShowError3[Show type errors]
    ShowError3 --> Fail
    
    Types -->|Yes| Success[Validation Success]
    Success --> Continue[Continue build]
    
    style Success fill:#c8e6c9
    style Fail fill:#ffcdd2
```

---

## 5. Card Rendering Flow

### 5.1 Card Component Decision Tree

```mermaid
flowchart TD
    Start[Render BentoGrid] --> LoadCards[Load cards from content]
    LoadCards --> Sort[Sort by position]
    Sort --> Filter[Filter visible cards]
    Filter --> Loop{For each card}
    
    Loop --> CheckType{Card type?}
    
    CheckType -->|link| LinkCard[Render LinkCard]
    CheckType -->|social| SocialCard[Render SocialCard]
    CheckType -->|project| ProjectCard[Render ProjectCard]
    CheckType -->|image| ImageCard[Render ImageCard]
    CheckType -->|text| TextCard[Render TextCard]
    CheckType -->|contact| ContactCard[Render ContactCard]
    
    LinkCard --> ApplySize[Apply size class]
    SocialCard --> ApplySize
    ProjectCard --> ApplySize
    ImageCard --> ApplySize
    TextCard --> ApplySize
    ContactCard --> ApplySize
    
    ApplySize --> Render[Render to grid]
    Render --> Loop
    
    Loop -->|Done| Complete[Grid complete]
```

### 5.2 Card Size Responsive Mapping

```mermaid
flowchart LR
    subgraph Desktop
        D1[1x1 → 1 cell]
        D2[1x2 → 2 cols]
        D3[2x1 → 2 rows]
        D4[2x2 → 4 cells]
    end
    
    subgraph Tablet
        T1[1x1 → 1 cell]
        T2[1x2 → 2 cols]
        T3[2x1 → 2 rows]
        T4[2x2 → 4 cells]
    end
    
    subgraph Mobile
        M1[All → Full width]
    end
    
    Desktop --> Tablet
    Tablet --> Mobile
    
    style Desktop fill:#e3f2fd
    style Tablet fill:#fff9c4
    style Mobile fill:#f3e5f5
```

---

## 6. Responsive Layout States

### 6.1 Grid Breakpoint Flow

```mermaid
stateDiagram-v2
    [*] --> Mobile: < 640px
    Mobile --> Tablet: ≥ 640px
    Tablet --> Desktop: ≥ 1024px
    Desktop --> LargeDesktop: ≥ 1280px
    
    Mobile: 1 Column<br/>Full width cards<br/>16px gap
    Tablet: 2 Columns<br/>Responsive cards<br/>20px gap
    Desktop: 3-4 Columns<br/>Grid layout<br/>24px gap
    LargeDesktop: 4 Columns<br/>Max 1200px<br/>24px gap
    
    LargeDesktop --> Desktop: < 1280px
    Desktop --> Tablet: < 1024px
    Tablet --> Mobile: < 640px
```

---

## 7. Image Optimization Flow

### 7.1 Next.js Image Pipeline

```mermaid
flowchart TD
    Start[Image in content.json] --> Check{Local or URL?}
    
    Check -->|Local path| Local[/public/images/file.jpg]
    Check -->|External URL| External[https://...image.jpg]
    
    Local --> NextImage[Next.js Image Component]
    External --> NextImage
    
    NextImage --> Format{Request format?}
    
    Format --> WebP[WebP supported?]
    WebP -->|Yes| ServeWebP[Serve WebP]
    WebP -->|No| AVIF[AVIF supported?]
    
    AVIF -->|Yes| ServeAVIF[Serve AVIF]
    AVIF -->|No| Original[Serve original]
    
    ServeWebP --> Resize[Responsive sizes]
    ServeAVIF --> Resize
    Original --> Resize
    
    Resize --> Optimize[Quality optimization]
    Optimize --> Cache[CDN cache]
    Cache --> Deliver[Deliver to browser]
```

---

## 8. Error Handling Flow

### 8.1 Build-Time Error Flow

```mermaid
flowchart TD
    Start[Build starts] --> ReadConfig[Read content.json]
    ReadConfig --> Error1{Error?}
    
    Error1 -->|File not found| E1[Error: Missing content.json]
    Error1 -->|Invalid JSON| E2[Error: JSON syntax]
    Error1 -->|Success| ValidateSchema[Validate with Zod]
    
    ValidateSchema --> Error2{Error?}
    Error2 -->|Schema mismatch| E3[Error: Show Zod errors]
    Error2 -->|Invalid URL| E4[Error: URL validation]
    Error2 -->|Missing required field| E5[Error: Required field]
    Error2 -->|Success| BuildPages[Build pages]
    
    BuildPages --> Error3{Error?}
    Error3 -->|Component error| E6[Error: Component issue]
    Error3 -->|Image not found| E7[Error: Missing image]
    Error3 -->|Success| Success[Build success]
    
    E1 --> Fail[Build fails]
    E2 --> Fail
    E3 --> Fail
    E4 --> Fail
    E5 --> Fail
    E6 --> Fail
    E7 --> Fail
    
    Fail --> Notify[Notify developer]
    Success --> Deploy[Deploy to CDN]
    
    style Success fill:#c8e6c9
    style Fail fill:#ffcdd2
```

---

## 9. Analytics & Tracking Flow (Optional)

### 9.1 Card Click Tracking

```mermaid
sequenceDiagram
    participant User
    participant Card
    participant Analytics
    participant Vercel
    
    User->>Card: Click card
    Card->>Card: Capture event data
    Card->>Analytics: Track click event
    
    Note over Analytics: {<br/>  cardId: "card-1",<br/>  cardType: "link",<br/>  url: "https://...",<br/>  timestamp: ...<br/>}
    
    Analytics->>Vercel: Send analytics
    Card->>User: Navigate to URL
    
    Vercel->>Vercel: Aggregate data
    Note over Vercel: Dashboard shows:<br/>- Most clicked cards<br/>- Click patterns<br/>- Visitor metrics
```

---

## 10. Deployment Pipeline

### 10.1 CI/CD Flow

```mermaid
flowchart TD
    Dev[Developer commits] --> Push[git push]
    Push --> GitHub[GitHub Repository]
    GitHub --> Webhook[Webhook to Vercel]
    Webhook --> Clone[Clone repository]
    
    Clone --> Install[Install dependencies]
    Install --> Env[Load env variables]
    Env --> Build[Run build]
    
    Build --> Lint[ESLint check]
    Lint --> LintFail{Errors?}
    LintFail -->|Yes| Fail[Build fails]
    LintFail -->|No| TypeCheck[TypeScript check]
    
    TypeCheck --> TypeFail{Errors?}
    TypeFail -->|Yes| Fail
    TypeFail -->|No| NextBuild[Next.js build]
    
    NextBuild --> Validate[Validate content]
    Validate --> ValidFail{Errors?}
    ValidFail -->|Yes| Fail
    ValidFail -->|No| Optimize[Optimize assets]
    
    Optimize --> Generate[Generate static files]
    Generate --> Test[Run tests optional]
    Test --> TestFail{Errors?}
    TestFail -->|Yes| Fail
    TestFail -->|No| Success[Build success]
    
    Success --> DeployPreview{Branch?}
    DeployPreview -->|main| Production[Deploy to production]
    DeployPreview -->|other| Preview[Deploy preview]
    
    Production --> Live[yoursite.com]
    Preview --> PreviewURL[preview-xyz.vercel.app]
    
    Fail --> Notify[Notify developer]
    
    style Success fill:#c8e6c9
    style Fail fill:#ffcdd2
    style Live fill:#81c784
```

---

## 11. Theme Customization Flow

### 11.1 Theme Application Process

```mermaid
flowchart TD
    Start[Load content.json] --> Theme[Read theme object]
    Theme --> Colors[Extract colors]
    
    Colors --> Primary[primaryColor]
    Colors --> Accent[accentColor]
    Colors --> Background[backgroundColor]
    
    Primary --> CSS1[Convert to CSS var]
    Accent --> CSS2[Convert to CSS var]
    Background --> CSS3[Convert to CSS var]
    
    CSS1 --> Inject[Inject into :root]
    CSS2 --> Inject
    CSS3 --> Inject
    
    Inject --> Tailwind[Tailwind reads vars]
    Tailwind --> Apply[Apply to components]
    Apply --> Render[Render styled page]
```

---

## 12. State Diagram: Card Interaction

### 12.1 Card States

```mermaid
stateDiagram-v2
    [*] --> Idle: Card rendered
    Idle --> Hover: Mouse enter
    Hover --> Idle: Mouse leave
    Hover --> Active: Mouse down
    Active --> Clicked: Mouse up
    Clicked --> Navigating: External link
    Clicked --> EmailOpened: Contact card
    Clicked --> Idle: Internal action
    
    Navigating --> [*]
    EmailOpened --> [*]
    
    note right of Idle
        Default state
        No interaction
    end note
    
    note right of Hover
        Scale: 1.02
        Shadow: elevated
        Cursor: pointer
    end note
    
    note right of Active
        Scale: 0.98
        Shadow: reduced
    end note
```

---

## 13. Content Schema Evolution

### 13.1 Version Migration Flow (Future)

```mermaid
flowchart TD
    Read[Read content.json] --> CheckVersion{Has version field?}
    
    CheckVersion -->|No| V1[Assume v1.0]
    CheckVersion -->|Yes| GetVersion[Get version number]
    
    V1 --> Current{Is current?}
    GetVersion --> Current
    
    Current -->|Yes| Use[Use content]
    Current -->|No| Migrate{Migrate?}
    
    Migrate -->|v1 to v2| M1[Run migration script]
    Migrate -->|v2 to v3| M2[Run migration script]
    
    M1 --> Backup[Backup old version]
    M2 --> Backup
    
    Backup --> Transform[Transform schema]
    Transform --> Validate[Validate new schema]
    Validate --> Success{Valid?}
    
    Success -->|Yes| Save[Save migrated content]
    Success -->|No| Rollback[Rollback to backup]
    
    Save --> Use
    Rollback --> Error[Show migration error]
```

---

## Summary

This document provides visual representations of:

1. **User flows** - How visitors and content owners interact with the site
2. **System architecture** - How components are organized and connected
3. **Data flows** - How data moves through the system
4. **Build process** - How content becomes a live website
5. **Error handling** - How errors are caught and reported
6. **Deployment pipeline** - How changes go live
7. **Responsive behavior** - How layout adapts to screen sizes
8. **Card rendering** - How different card types are displayed

These diagrams use Mermaid syntax and can be rendered in:
- GitHub (native Mermaid support)
- VS Code (with Mermaid extension)
- Markdown preview tools
- Documentation sites

Use these diagrams as reference when:
- Implementing new features
- Debugging issues
- Onboarding new developers
- Explaining system architecture
