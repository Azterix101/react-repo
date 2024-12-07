# My Storefront

A sleek, modern storefront application built with **React**, **React Query**, **React Router**, and the **Context API** for state management. This application fetches products from the [Fake Store API](https://fakestoreapi.com/), displays them in a responsive grid layout, and allows adding products to a shopping cart. Tests are implemented using Jest and React Testing Library.

## Features
- **Product Listing:** Fetch and display products from the Fake Store API.
- **Product Detail:** View detailed product information on a dedicated page.
- **Cart:** Add, remove, and update product quantities in the cart.
- **Search:** Filter products by title.
- **Responsive & Modern UI:** Styled with modern, clean CSS for a sleek look.
- **Animations:** Subtle animations when adding products to the cart.
- **Tested with Jest & React Testing Library:** Ensures component behavior and reliability.

## Getting Started

### Prerequisites
- **Node.js**
- **npm** or **yarn**

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/azterix101/my-storefront.git
   cd my-storefront
   ```
   
2. **Install Dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Application
- **Development Server:**
  ```bash
  npm run dev
  ```
  Open [http://localhost:5173](http://localhost:5173) (or the address provided by Vite) in your browser to view the app.

- **Production Build:**
  ```bash
  npm run build
  ```
  This creates a production-ready build in the `dist` folder.

- **Preview Production Build:**
  ```bash
  npm run preview
  ```

### Testing
Run the tests:
```bash
npm run test
```
This runs Jest and React Testing Library tests. Add `--coverage` for a coverage report:
```bash
npm run coverage
```

## State Management & Data Fetching Choices

**Why Context API for State Management?**  
The Context API was selected for cart management because the global state (cart) needed to be accessible across multiple components without deep prop drilling. Context provides a simple built-in solution that avoids the overhead of adding a full state management library like Redux. For a small to medium-sized application, Context is often sufficient and keeps the bundle lighter and the code easier to maintain.

**Why Hooks (useState, useContext)?**  
- **useState:** Used for local component state (e.g., search input or animations) due to its simplicity and directness.
- **useContext:** Leverages the Context API to provide global data (cart state) without prop drilling.
- **No custom hooks:** The solution avoids unnecessary complexity. Where a custom hook might be beneficial for complex logic reuse, here the logic is straightforward enough that built-in hooks and Context are sufficient.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
