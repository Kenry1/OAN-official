// Shim to support clients requesting /src/main.tsx
// The project uses `main.jsx`. Some dev server / cached service workers
// (or leftover tooling) may request `main.tsx`. Import the existing
// `main.jsx` so the module loads and the app bootstraps as before.
import './main.jsx'
