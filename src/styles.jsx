import React from 'react'

export function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        --bg-color: #0A0A0B;
        --sidebar-bg: rgba(20, 20, 22, 0.7);
        --panel-bg: rgba(30, 30, 35, 0.6);
        --text-main: #FFFFFF;
        --text-muted: #A0A0A5;
        --accent: #6366F1;
        --accent-hover: #4F46E5;
        --border: rgba(255, 255, 255, 0.08);
        --red-world: #FF4D4D;
        --blue-world: #3B82F6;
        --green-world: #10B981;
        --yellow-world: #F59E0B;
        --glass-bg: rgba(255, 255, 255, 0.03);
        --glass-border: rgba(255, 255, 255, 0.05);
      }

      body {
        font-family: 'Inter', sans-serif;
        background-color: var(--bg-color);
        color: var(--text-main);
        overflow: hidden;
        background-image: 
          radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.15), transparent 25%),
          radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.1), transparent 25%);
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Outfit', sans-serif;
      }

      .app-container {
        display: flex;
        height: 100vh;
        width: 100vw;
      }

      /* Sidebar */
      .sidebar {
        width: 280px;
        background: var(--sidebar-bg);
        backdrop-filter: blur(20px);
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        padding: 24px;
        z-index: 10;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 40px;
      }

      .logo-icon {
        background: linear-gradient(135deg, var(--accent), #A855F7);
        border-radius: 12px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      }

      .logo-text {
        font-family: 'Outfit', sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .nav-menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--text-muted);
        font-weight: 500;
      }

      .nav-item:hover {
        background: var(--glass-bg);
        color: var(--text-main);
      }

      .nav-item.active {
        background: rgba(99, 102, 241, 0.15);
        color: var(--accent);
        border: 1px solid rgba(99, 102, 241, 0.2);
      }

      /* Main Content */
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        position: relative;
      }

      /* Header */
      .header {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        background: rgba(10, 10, 11, 0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .header-title {
        font-size: 24px;
        font-weight: 600;
        text-transform: capitalize;
      }

      .user-controls {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .role-toggle {
        display: flex;
        background: var(--panel-bg);
        border-radius: 20px;
        padding: 4px;
        border: 1px solid var(--border);
      }

      .role-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        padding: 6px 16px;
        border-radius: 16px;
        cursor: pointer;
        font-weight: 500;
        font-family: inherit;
        transition: all 0.2s ease;
      }

      .role-btn.active {
        background: var(--accent);
        color: white;
        box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
      }

      .profile-pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #10B981, #3B82F6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        border: 2px solid var(--border);
      }

      /* Content Area */
      .content-area {
        padding: 40px;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      /* Cards & Glass Panels */
      .glass-card {
        background: var(--panel-bg);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        backdrop-filter: blur(10px);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .glass-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        border-color: rgba(255, 255, 255, 0.15);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }

      .badge {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .badge.red { background: rgba(255, 77, 77, 0.15); color: var(--red-world); }
      .badge.blue { background: rgba(59, 130, 246, 0.15); color: var(--blue-world); }
      .badge.green { background: rgba(16, 185, 129, 0.15); color: var(--green-world); }
      .badge.yellow { background: rgba(245, 158, 11, 0.15); color: var(--yellow-world); }

      /* Buttons */
      .btn {
        background: var(--glass-bg);
        border: 1px solid var(--border);
        color: var(--text-main);
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .btn-primary {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
      }

      .btn-primary:hover {
        background: var(--accent-hover);
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
      }

      /* Feeds & Lists */
      .feed-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
      }

      .feed-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .chat-container {
        display: flex;
        height: calc(100vh - 160px);
        background: var(--panel-bg);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
      }
      
      .chat-sidebar {
        width: 250px;
        border-right: 1px solid var(--border);
        background: rgba(0, 0, 0, 0.2);
      }
      
      .chat-main {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    `}</style>
  )
}
