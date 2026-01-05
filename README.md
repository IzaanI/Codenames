# Codenames: Pass & Play Edition

A web-based, 2-player local multiplayer adaptation of the popular social deduction board game. Built with a focus on clean state management and responsive design.



## 🚀 Live Demo
[Link to your hosted site (e.g., Vercel/GitHub Pages)]

## 📖 Overview
This project recreates the "Codenames" experience for two players sharing a single device. One player takes the role of the **Spymaster**, and the other acts as the **Operative**. The game challenges players to communicate effectively through one-word clues while avoiding the "Assassin" card.

### Key Features
* **Dynamic Board Generation:** Randomly shuffled 5x5 grid of words pulled from a custom dictionary.
* **Role-Based Views:** A "Toggle Spymaster View" button that reveals the secret identities of the cards using React state transitions.
* **Turn Management:** Tracks team score and handles win/loss conditions.
* **Responsive UI:** Fully playable on desktop, tablet, or mobile—perfect for pass-and-play.

## 🛠️ Tech Stack
* **Frontend:** React.js (Functional Components)
* **Styling:** CSS3 (Flexbox for the game board)
* **State Management:** React `useState` for game logic
* **Deployment:** [e.g., Vercel / Netlify]

## 📸 Screenshots
| Spymaster View | Operative View |
|---|---|
| ![Spymaster](https://via.placeholder.com/300x200?text=Spymaster+View) | ![Operative](https://via.placeholder.com/300x200?text=Operative+View) |

## ⚙️ Installation & Setup
To run this project locally:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/IzaanI/codenames-app.git
   \`\`\`
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Start the development server:**
   \`\`\`bash
   npm start
   \`\`\`

## 🧠 What I Learned
* **State Coordination:** Managing the relationship between the hidden "Key" and the visible board.
* **Conditional Rendering:** Efficiently switching between Spymaster and Operative modes without losing game progress.
* **Logic Design:** Implementing the "Assassin" card logic to instantly trigger a game-over state.

---
Developed by Izaan
