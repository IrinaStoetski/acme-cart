# Acme Widget Co - Shopping Cart

This project is a proof of concept for Acme Widget Co's new sales system. It implements a modern shopping cart using React, TypeScript, and Vite, featuring a flexible product catalogue, delivery charge rules, and special offers.

**[Live Demo on Render](https://acme-cart.onrender.com/)**

## Features

- **Product Catalogue**: Browse and add widgets to your basket.
- **Special Offers**: Automatically applied discounts (e.g., Buy One Red Widget, Get the Second Half Price).
- **Delivery Rules**: Tiered delivery fees based on the total spend.
- **Modern UI**: Built with React, React Aria, and Tailwind CSS.

## Product Catalogue

| Code    | Name         | Price  |
| :------ | :----------- | :----- |
| **R01** | Red Widget   | $32.95 |
| **G01** | Green Widget | $24.95 |
| **B01** | Blue Widget  | $7.95  |

## Delivery Rules

Delivery costs are calculated based on the total order value (after discounts):

- **Orders < $50**: $4.95
- **Orders < $90**: $2.95
- **Orders ≥ $90**: FREE

## Special Offers

- **Buy One Get One 50% Off**: Buy one **Red Widget (R01)** and get the second one for half price. This offer is applied automatically to any even number of Red Widgets in the basket.

## Technical Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: React Aria Components
- **Testing**: Vitest, React Testing Library

## Design Decisions

- **Accessibility**: I chose **React Aria Components** to ensure high accessibility standards out of the box.
- **Styling**: **Tailwind CSS** was selected for rapid development and flexibility.
- **Customization**: Instead of using a heavyweight UI component library (like MUI or Mantine), the combination of React Aria + Tailwind allows for deep customization and fine-grained control over the look and feel without sacrificing accessibility.
- **Currency Calculation**: All prices and calculations are handled in **cents (integers)**. This approach was chosen for simplicity in this task and to avoid common floating-point precision issues in JavaScript.
- **Separation of Concerns**: Critical business logic (discounts, delivery fees, totals) is decoupled from React components and placed in pure functions within `src/helpers/`. This ensures the logic is portable and easy to unit test.
- **State Management (Custom Hooks)**: Basket state and actions are encapsulated in the `useShoppingCart` hook, providing a clean API for components and keeping the main `App` component focused on layout.
- **Performance Optimization**: Calculations are wrapped in `useMemo` to prevent redundant computations on every re-render unless items or configuration change.
- **Modular UI (Primitives)**: Common UI elements are organized into a `ui/` directory as reusable primitives, following Atomic Design principles for consistency and maintainability.
- **Strategy Pattern (Extensible Discounts)**: The discount calculation logic uses the **Strategy Pattern**. Different offer types (e.g., BOGO, Percentage) are implemented as separate interchangeable strategies, allowing new discount types to be added without modifying the core calculation engine.
- **Testing Strategy**: The test suite focuses on high-ROI areas: the helpers and hooks that handle the core business logic. This ensures the "brain" of the application is fully verified while keeping the tests fast.
- **Architectural Flexibility**: The application is structured such that the configuration data (currently in `src/config.ts`) can be easily swapped for data fetched from an API with minimal changes to the core logic.
- **AI-Assisted Development**: This project leveraged AI tools for several key tasks:
  - **Wireframe Generation**: Initial design concepts and wireframes were generated with AI assistance.
  - **Documentation**: This README and other project documentation were authored with AI help to ensure clarity and professional coverage.
  - **Test Coverage**: AI was used to help generate and refine the comprehensive unit test suite in `src/helpers/` and `src/hooks/`.
- **Development Process**: Development was conducted using feature-specific **Git branches**, ensuring a clean commit history and modular feature implementation. All branches are saved in the public repository and can be reviewed if needed.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository (if applicable) or navigate to the project root.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

### Running Tests

Execute the unit tests using Vitest:

```bash
npm run test
```

## Project Structure

- `src/components`: UI components (Cart, Catalog, UI primitives).
- `src/helpers`: Business logic for calculations and formatting.
- `src/config.ts`: Central configuration for products, delivery rules, and offers.
- `src/types`: TypeScript definitions.
- `docs/`: Original project specifications and wireframes.
