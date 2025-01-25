# React Draft.js App

This is a React application built using TypeScript, Vite for fast development, and `pnpm` as the package manager. The app leverages **Draft.js** and its plugins for a feature-rich text editor experience.

## 🚀 Features

- ⚡️ **Vite** for blazing-fast build and development
- 🛠️ **TypeScript** for type safety
- 📦 **pnpm** for efficient package management
- ✍️ **Draft.js** with plugins for advanced text editing

## 🛠️ Getting Started

Follow the instructions below to set up and run the application locally.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v20.14.0 or later recommended)
- **pnpm** (v9.15.1 or later)

To install `pnpm`, run:
```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/js-vipinmaraiya/react-mention-editor.git
   ```

2. Navigate to the project directory:
   ```bash
   cd react-mention-editor
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

To start the development server:
```bash
pnpm dev
```

Open your browser and visit [http://localhost:5173](http://localhost:5173) (default Vite port).

### Building for Production

To create a production build:
```bash
pnpm build
```

The production build will be output to the `dist` directory.

### Preview Production Build

You can preview the production build locally:
```bash
pnpm preview
```

## 🔧 Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Create a production build.
- `pnpm preview`: Preview the production build.
- `pnpm lint`: Run linters (add configuration as needed).

## 📦 Dependencies

### Key Dependencies
- **React**: UI library.
- **React DOM**: Enables rendering React components to the DOM.
- **TypeScript**: Type safety and tooling.
- **Draft.js**: Rich text editor framework.
- **@draft-js-plugins/editor**: Core plugin system for Draft.js editors.
- **@draft-js-plugins/mention**: Provides mention functionality for Draft.js.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ using React, TypeScript, Draft.js, and Vite.