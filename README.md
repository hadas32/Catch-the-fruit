# Catch the Fruit

**Catch the Fruit** is a high-performance, logic-driven web game built with Vanilla JavaScript. The project demonstrates real-time DOM manipulation, persistent data handling, and an event-driven architecture to create an engaging and smooth gaming experience.

---

## Game Features

- **Robust User Authentication:** A full membership system including **Registration (with Regex validation)** and **Login**, utilizing `LocalStorage` for session persistence and score tracking.  

- **Dynamic Physics & Game Loop:**  
  - Real-time movement via keyboard event listeners  
  - **Advanced Collision Detection:** Custom logic using `getBoundingClientRect()` to detect precise intersections between the player and falling entities  
  - Automated game state management using asynchronous timing events (`setInterval`)  

- **Progressive Difficulty Scaling:**  
  3 distinct levels (Easy, Medium, Hard) that dynamically adjust gravity, element frequency, and "Bomb" spawn rates  

- **Interactive Scoring System:**  
  - **Fresh Fruits:** Positive point accumulation  
  - **Rotten Fruits:** Point deduction  
  - **Bombs:** Instant game-over triggers or time penalties  

- **Modal System:**  
  Custom UI feedback for win/loss states, integrated with the current user's session data  

---

## Tech Stack

- **JavaScript (ES6+):** Core physics engine, DOM manipulation, and LocalStorage API for data management  
- **HTML5:** Semantic architecture and dynamic canvas-like element injection  
- **CSS3:** Advanced animations using `@keyframes`, Flexbox layouts, and responsive UI components  

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/catch-the-fruit.git
```

### 2. Launch

Open the following file in a modern web browser (Chrome recommended):

```
HTML/login.html
```

### 3. Play

- Register a new account  
- Select difficulty level  
- Use the Arrow Keys to move  

---

## Project Architecture

- `/HTML` - Application views (Authentication and Game Board)  
- `/CSS` - Visual styling, layout definitions, and animations  
- `/JS` - Core game engine, collision logic, and user authentication scripts  
- `/pictures` - Optimized graphical game assets  

---

## Developed By

**Hadas Chomri**  
**Sari Katzanelbogen**
