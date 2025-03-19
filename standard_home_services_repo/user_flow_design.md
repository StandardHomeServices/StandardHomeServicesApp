# Standard Home Services App - User Flow and Screen Design

## Overview
This document outlines the screens and user flow for the Standard Home Services App prototype based on the mockups provided. The prototype will follow the exact visual style and interaction patterns shown in the mockups.

## User Flow

1. **Onboarding Flow**
   - Splash/Welcome Screen
   - Phone Number Registration
   
2. **Address & Home Setup Flow**
   - Address Input
   - 3D House Visualization
   
3. **Service Selection Flow**
   - Service Options with Pricing
   - Total Calculation
   
4. **Scheduling Flow**
   - Calendar Month Selection
   - Day Selection
   - Time Slot Selection
   
5. **Confirmation Flow**
   - Appointment Details Confirmation
   - Payment Processing
   - Order Completion

## Screen Designs

### 1. Splash/Welcome Screen
- Standard Home Services logo (house icon with text)
- Clean white background
- No interactive elements (auto-transitions after brief delay)

### 2. Phone Number Registration
- Header: "GET STARTED"
- Country code selector (US pre-selected)
- Phone number input field
- Continue button
- Alternative sign-in options:
  - Continue with Apple (with Apple logo)
  - Continue with Google (with Google logo)
  - Continue with Email (with email icon)
- "Find my account" option at bottom
- Terms and conditions text at very bottom

### 3. Address Input
- Standard Home Services logo at top
- Search bar with "YOUR ADDRESS" placeholder
- Magnifying glass icon in search bar
- Right arrow navigation button
- Clean, minimal design with white background

### 4. 3D House Visualization
- Standard Home Services logo at top
- 3D rendering of house with measurements
  - Show dimensions (24', 18', etc.)
  - Show angles (360°)
- "LOOKS GOOD!" confirmation button at bottom
- House visualization should match mockup style

### 5. Service Selection with Pricing
- Standard Home Services logo at top
- List of services with prices in button format:
  - Window Cleaning (In and Out) - $350
  - Window Cleaning (Outside Only) - $225
  - Gutter Cleaning - $350
  - Soft Washing - $450
  - Roof Cleaning - $350
  - Walk/Driveway - $250
- Total calculation at bottom: "TOTAL - $950"
- Each service option should be selectable/deselectable

### 6. Calendar Month Selection
- Standard Home Services logo at top
- Year display (2025)
- Month grid layout (Jan-Dec)
- Days of week headers
- Calendar grid with selectable dates
- Current month highlighted

### 7. Day Selection
- Standard Home Services logo at top
- Month display (August)
- Numbered days in grid format
- Selectable day cells
- Current day highlighted

### 8. Time Slot Selection
- Standard Home Services logo at top
- List of available time slots as buttons:
  - 8:00 AM
  - 9:00 AM
  - 10:00 AM
  - 1:00 PM
  - 2:00 PM
  - 3:00 PM
- Each time slot should be selectable

### 9. Appointment Confirmation
- Standard Home Services logo at top
- Appointment icon (calendar/clock)
- Appointment details:
  - Date: MARCH 4, 2025
  - Time: 9:00AM
  - Address: 123 ABC ST, NEW YORK, NEW YORK
- "CONFIRM!" button at bottom

### 10. Payment Processing
- Standard Home Services logo at top
- "Add Payment" header
- Payment method options:
  - Apple Pay
  - Credit/Debit Card
  - PayPal
  - Mobile Phone
- Form fields for payment details:
  - Card number
  - Expiration date
  - CVV
- "CONFIRM ORDER!" button at bottom

### 11. Order Completion
- Standard Home Services logo at top
- Large green checkmark
- "ORDER COMPLETE!" text
- Clean, minimal design with white background

## Design Specifications

### Colors
- Primary Background: White (#FFFFFF)
- Primary Text: Black (#000000)
- Accent/CTA: Green (#4CAF50 or similar)
- Secondary UI Elements: Light Gray (#F5F5F5)
- Borders: Medium Gray (#CCCCCC)

### Typography
- Logo: Bold, all-caps sans-serif
- Headers: Bold, all-caps sans-serif
- Body Text: Regular sans-serif
- Buttons: Bold, all-caps sans-serif

### UI Elements
- Buttons: Rounded rectangles with bold, all-caps text
- Input Fields: Simple rectangles with minimal borders
- Icons: Simple, clean line icons
- Selection Elements: Clear visual indicators for selected items

## Interaction Notes
- All buttons should have tap/click feedback
- Service selection should update the total price
- Calendar and time selection should be intuitive
- Form fields should have appropriate keyboard types
- Navigation should be linear with occasional back options
- Transitions between screens should be smooth and quick
