/** @type {import('tailwindcss').Config} */

module.exports = {
  // Target all source files in your Norden-Nexus architecture
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // 🎨 Custom Cyber-Nexus Color Palette
      colors: {
        cyan: {
          400: "#22d3ee",
          500: "#00FFFF", // Core Neon Cyan
          600: "#0891b2",
        },
        magenta: {
          400: "#f472b6",
          500: "#FF00FF", // Core Neon Magenta
          600: "#db2777",
        },
        dark: {
          800: "#0a0a0a",
          900: "#050505", // Deep Space Background
          950: "#020202",
        },
      },

      // ✨ Advanced Glassmorphism & Neon Shadows
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)',
        'neon-magenta': '0 0 10px rgba(255, 0, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.1)',
        'glass-inner': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },

      // 🎭 Cyber-Nexus Animations for UI Elements
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 3s ease-in-out infinite',
        'glow-magenta': 'glowMagenta 3s ease-in-out infinite',
      },

      keyframes: {
        glowCyan: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 255, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' },
        },
        glowMagenta: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 0, 255, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)' },
        },
      },

      // 🌫️ Backdrop Blur Customization
      backdropBlur: {
        xs: '2px',
      },

      // 🖼️ Background Gradients for Glass Cards
      backgroundImage: {
        'cyber-gradient': 'radial-gradient(circle at top center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
    },
  },

  // 🛠️ Advanced UI Support
  plugins: [
    // Add custom scrollbar hiding or styling if needed later
  ],
};