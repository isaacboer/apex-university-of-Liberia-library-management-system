# UI/UX Wireframes & Interface Design
## Apex University of Liberia Library Management System

**Document Version**: 1.0  
**Status**: Ready for Implementation  
**Last Updated**: [Current Date]

---

## Design System Overview

### Color Palette
- **Primary Blue**: #003366
- **Secondary Blue**: #0056B3
- **Success Green**: #28A745
- **Warning Yellow**: #FFC107
- **Danger Red**: #DC3545
- **Light Gray**: #F8F9FA
- **Dark Gray**: #212529

### Typography
- **Headings**: Inter, Bold
- **Body**: Roboto, Regular
- **Monospace**: Courier New

### Spacing & Layout
- **Grid**: 12-column layout
- **Breakpoints**: 
  - Mobile: < 576px
  - Tablet: 576px - 992px
  - Desktop: > 992px

---

## Member Portal Wireframes

### Dashboard

```
┌─────────────────────────────────────────────┐
│ Logo    LIBRARY    Search    [User Menu]    │
├─────────────────────────────────────────────┤
│                                             │
│  Welcome Back, [Name]                      │
│                                             │
│  ┌────────────────────────────────────────┐│
│  │ QUICK STATS                            ││
│  │ 3 Books │ 0 Fines │ 1 Reserved        ││
│  └────────────────────────────────────────┘│
│                                             │
│  MY BOOKS (Checked Out)                    │
│  ├─ Book 1 - Due: 15 Jun [Renew]         │
│  ├─ Book 2 - Due: 20 Jun [Renew]         │
│  └─ Book 3 - Due: 22 Jun [Renew]         │
│                                             │
│  MY RESERVATIONS                           │
│  └─ Reserved Book - Position: 2           │
│                                             │
│  QUICK ACTIONS                             │
│  [Search Catalog] [View History]          │
│                                             │
└─────────────────────────────────────────────┘
```

### Book Search

```
┌─────────────────────────────────────────────┐
│ Logo    LIBRARY    Search    [User Menu]    │
├─────────────────────────────────────────────┤
│                                             │
│  SEARCH CATALOG                             │
│  [Search Books...] [Category ▼]            │
│                                             │
│  Results: 42 books found                   │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │ 1. Book Title 1                         ││
│  │    Author: Author Name                  ││
│  │    Available: 3/5 copies                ││
│  │    [View Details] [Reserve] [Borrow]   ││
│  │                                         ││
│  │ 2. Book Title 2                         ││
│  │    Author: Author Name                  ││
│  │    Available: 0/2 copies                ││
│  │    [View Details] [Reserve]             ││
│  │                                         ││
│  │ [Previous] 1 2 3 4 5 [Next]             ││
│  │                                         ││
│  └─────────────────────────────────────────┘│
│                                             │
└─────────────────────────────────────────────┘
```

### Account Settings

```
┌─────────────────────────────────────────────┐
│ Logo    LIBRARY    Search    [User Menu]    │
├─────────────────────────────────────────────┤
│ My Account                                  │
│ [Profile] [Settings] [Notifications]       │
├─────────────────────────────────────────────┤
│                                             │
│  MY PROFILE                                 │
│  Full Name: [John Doe]                     │
│  Email: [john@apex.edu]                    │
│  Phone: [+231-6-123456]                    │
│  Member Since: [01 Jan 2024]               │
│  Borrowing Limit: 5 books                  │
│  Current Borrowed: 3 books                 │
│                                             │
│  [Edit Profile] [Change Password]          │
│                                             │
│  NOTIFICATION PREFERENCES                   │
│  ☑ Email reminders 3 days before due      │
│  ☑ SMS for overdue books                   │
│  ☐ Newsletter                              │
│                                             │
│  [Save] [Cancel]                           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Staff Dashboard Wireframes

### Circulation Interface

```
┌─────────────────────────────────────────────┐
│ LIBRARY STAFF DASHBOARD                     │
├─────────────────────────────────────────────┤
│                                             │
│  CHECKOUT BOOK                              │
│                                             │
│  Member ID: [__________________] [Scan]    │
│  Member: [Name] | Status: Active           │
│  Current Borrowed: 3/5 | Fines: $0         │
│                                             │
│  Book ISBN: [__________________] [Scan]    │
│  [Add Another] [Complete]                  │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │ ITEMS IN TRANSACTION                    ││
│  │ 1. Book Title 1 - Due: 20 Jun           ││
│  │ 2. Book Title 2 - Due: 20 Jun           ││
│  │                                         ││
│  │ [Clear] [Complete Transaction]          ││
│  └─────────────────────────────────────────┘│
│                                             │
│  ✓ TRANSACTION COMPLETE!                   │
│  Receipt #: RCP-2026-00123                 │
│  [Print] [Email]                           │
│                                             │
└─────────────────────────────────────────────┘
```

### Member Lookup

```
┌─────────────────────────────────────────────┐
│ LIBRARY STAFF DASHBOARD                     │
├─────────────────────────────────────────────┤
│                                             │
│  SEARCH MEMBER                              │
│  [Search by ID, Email, or Name...] [Go]   │
│                                             │
│  MEMBER PROFILE                             │
│  Name: [Name]        | ID: [ID]           │
│  Email: [email]      | Phone: [phone]     │
│  Affiliation: Student| Join Date: [Date]  │
│  Status: Active      | Fines: $0          │
│                                             │
│  Current Borrowed: 2/5                     │
│  [Checkout] [Edit] [View History]          │
│                                             │
│  CHECKOUT HISTORY                           │
│  Date    | Book         | Due Date | Status
│  10 Jun  | Book 1       | 24 Jun   | Active
│  08 Jun  | Book 2       | 22 Jun   | Active
│  01 Jun  | Book 3       | 15 Jun   | Returned
│                                             │
│  [View All]                                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Admin Dashboard Wireframes

### System Overview

```
┌─────────────────────────────────────────────┐
│ ADMIN DASHBOARD                             │
├─────────────────────────────────────────────┤
│                                             │
│  SYSTEM OVERVIEW                            │
│  ┌───────────┬───────────┬───────────────┐ │
│  │ 5,234     │ 2,145     │ 99.8% Uptime │ │
│  │ Total     │ Total     │              │ │
│  │ Books     │ Members   │              │ │
│  └───────────┴───────────┴───────────────┘ │
│                                             │
│  CIRCULATION METRICS          REVENUE       │
│  Daily Checkouts: 124         Fines: $4,250
│  Weekly Returns: 892          Pending: $1.1K
│  Overdue Books: 34            Avg Fine: $8.50
│                                             │
│  QUICK ACTIONS                              │
│  [Settings] [Users] [Reports] [Backup]    │
│  [Notifications] [Audit Log] [System]     │
│                                             │
└─────────────────────────────────────────────┘
```

### Settings Page

```
┌─────────────────────────────────────────────┐
│ ADMIN DASHBOARD                             │
│ [General] [Policies] [Users] [Backup]      │
├─────────────────────────────────────────────┤
│                                             │
│  GENERAL SETTINGS                           │
│                                             │
│  Library Name: [Apex University Library]   │
│  Contact Email: [library@apex.edu]         │
│  Contact Phone: [+231-6-...]               │
│                                             │
│  LIBRARY HOURS                              │
│  Monday-Friday: [08:00] to [18:00]         │
│  Saturday: [09:00] to [14:00]              │
│  Sunday: [Closed]                          │
│                                             │
│  CHECKOUT POLICIES                          │
│  Max Borrowing Period: [30] days           │
│  Max Books Per Member: [5] books           │
│  Max Renewals: [2] times                   │
│  Grace Period (Overdue): [3] days          │
│                                             │
│  FINE POLICIES                              │
│  Daily Fine Rate: $[2.50] per day          │
│  Max Fine Per Book: $[50.00]               │
│  Max Fine Per Member: $[150.00]            │
│                                             │
│  [Save Settings] [Reset to Default]        │
│                                             │
│  ✓ Settings saved successfully!             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Component Library

### Buttons
- Primary Button: Blue background
- Secondary Button: Gray background
- Danger Button: Red background
- Disabled Button: Grayed out with reduced opacity

### Form Elements
- Text Input: Clean borders, 40px height
- Dropdown: Consistent styling, arrow icon
- Checkbox: Accessible, labeled
- Radio Button: Standard styling
- Text Area: Resizable, monospace for code

### Cards & Alerts
- Success Alert: Green background, checkmark icon
- Error Alert: Red background, X icon
- Warning Alert: Yellow background, warning icon
- Info Alert: Blue background, info icon

### Tables
- Alternating row colors
- Hover effect on rows
- Action buttons in last column
- Pagination controls

---

## Responsive Design Rules

### Mobile (< 576px)
- Single column layout
- Stacked cards
- Full-width buttons
- Hamburger menu
- Bottom navigation

### Tablet (576px - 992px)
- 2-column layout
- Condensed navigation
- Touch-friendly buttons (48px)
- Side-by-side panels

### Desktop (> 992px)
- Multi-column grids
- Sidebar navigation
- Full feature display
- Keyboard shortcuts

---

## Accessibility Features

✓ WCAG 2.1 AA Compliant
✓ Color contrast > 4.5:1
✓ Keyboard navigation support
✓ Screen reader friendly
✓ Descriptive alt text
✓ Form labels
✓ Error message clarity

---

**Document Version**: 1.0  
**Status**: Ready for Design Implementation  
**Last Updated**: [Current Date]
