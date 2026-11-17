/* ===================================================================
   INTERACTIVE DEVELOPER TERMINAL EMULATOR
   Allows visitors & recruiters to explore Akash's profile via CLI.
   =================================================================== */

(function () {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');
  const quickCmdChips = document.querySelectorAll('.cmd-chip');

  if (!terminalInput || !terminalHistory) return;

  const commands = {
    help: () => `
<div style="color: #38bdf8; font-weight: bold; margin-bottom: 6px;">Available commands:</div>
<div style="display: grid; grid-template-columns: 120px 1fr; gap: 4px;">
  <span style="color: #34d399;">about</span><span>Display brief introduction and philosophy</span>
  <span style="color: #34d399;">skills</span><span>List core technical skills & proficiencies</span>
  <span style="color: #34d399;">projects</span><span>List featured production & personal projects</span>
  <span style="color: #34d399;">experience</span><span>Show internship & work history</span>
  <span style="color: #34d399;">education</span><span>Show academic qualifications and scores</span>
  <span style="color: #34d399;">contact</span><span>Display communication channels</span>
  <span style="color: #34d399;">hire</span><span>Why you should consider hiring Akash</span>
  <span style="color: #34d399;">clear</span><span>Clear the terminal screen</span>
</div>`,

    about: () => `
<div>
  <p><strong style="color: #60a5fa;">Akash Kumar Singh</strong> — Full Stack Developer & Computer Science Engineer.</p>
  <p style="color: #94a3b8; margin-top: 4px;">Passionate about building responsive, scalable, and user-friendly digital solutions. Hands-on experience across frontend (React, modern JS, responsive UI), backend (Node.js, Express, PHP, Laravel), and mobile (Flutter).</p>
  <p style="color: #a78bfa; margin-top: 4px;">Location: Greater Noida, India | CGPA: 7.05/10</p>
</div>`,

    skills: () => `
<div style="line-height: 1.8;">
  <span style="color: #f43f5e; font-weight: bold;">Frontend:</span> HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap<br/>
  <span style="color: #38bdf8; font-weight: bold;">Backend:</span> Node.js, Express.js, PHP, Laravel, RESTful APIs<br/>
  <span style="color: #fbbf24; font-weight: bold;">Languages:</span> JavaScript, Python, Java, C, C++, PHP, Dart<br/>
  <span style="color: #34d399; font-weight: bold;">Databases:</span> MySQL, MongoDB, Database Design<br/>
  <span style="color: #0284c7; font-weight: bold;">Mobile:</span> Flutter, Dart<br/>
  <span style="color: #a78bfa; font-weight: bold;">Core CS:</span> Data Structures, OOP, DBMS, Problem Solving
</div>`,

    projects: () => `
<div>
  <div style="margin-bottom: 8px;">
    <strong style="color: #38bdf8;">1. Vision AI – AI-Powered Learning & Course Platform</strong><br/>
    <span style="color: #64748b;">Stack:</span> Flutter, Dart, Node.js, Express.js, MongoDB, REST APIs, AI API<br/>
    <span style="color: #94a3b8;">Features:</span> AI chatbot, LMS, interactive quizzes, progress tracking & auth.
  </div>
  <div>
    <strong style="color: #38bdf8;">2. TravelBharat – Indian Tourism Website</strong><br/>
    <span style="color: #64748b;">Stack:</span> React.js, Node.js, Express.js, MySQL, Netlify, Responsive UI<br/>
    <span style="color: #94a3b8;">Features:</span> State & city explorer, destination search, category filtering & REST backend.
  </div>
</div>`,

    experience: () => `
<div>
  <div style="margin-bottom: 8px;">
    <strong style="color: #34d399;">Frontend Development Intern</strong> @ Unified Mentor Pvt. Ltd.<br/>
    <span style="color: #64748b;">Duration:</span> April 2026 – July 2026<br/>
    <span style="color: #94a3b8;">Delivered 5+ responsive pages, optimized performance by ~20%, fixed 10+ frontend bugs.</span>
  </div>
  <div>
    <strong style="color: #34d399;">Python Developer Intern</strong> @ MEN Solution<br/>
    <span style="color: #64748b;">Duration:</span> April 2024 – May 2024<br/>
    <span style="color: #94a3b8;">Automation scripts, algorithms, execution time optimized by ~15%.</span>
  </div>
</div>`,

    education: () => `
<div>
  <strong style="color: #60a5fa;">B.Tech in Computer Science & Engineering</strong> (2022 – 2026)<br/>
  <span style="color: #94a3b8;">Mangalmay Group of Institutions & Technology, Greater Noida</span><br/>
  <span style="color: #34d399; font-weight: 600;">CGPA: 7.05 / 10</span><br/><br/>
  <span style="color: #e2e8f0;">Senior Secondary (Class XII):</span> Himalayan International School, Bihar (2021)<br/>
  <span style="color: #e2e8f0;">Secondary (Class X):</span> Vigyanand Kendriya Vidyalaya, Bihar (2019)
</div>`,

    contact: () => `
<div>
  <span style="color: #94a3b8;">Email:</span> <a href="mailto:akashkumarsingh1214@gmail.com" style="color: #38bdf8; text-decoration: underline;">akashkumarsingh1214@gmail.com</a><br/>
  <span style="color: #94a3b8;">LinkedIn:</span> <a href="https://linkedin.com/in/akash-singh" target="_blank" style="color: #38bdf8; text-decoration: underline;">linkedin.com/in/akash-singh</a><br/>
  <span style="color: #94a3b8;">GitHub:</span> <a href="https://github.com/akashkumarsingh-01" target="_blank" style="color: #38bdf8; text-decoration: underline;">github.com/akashkumarsingh-01</a><br/>
  <span style="color: #94a3b8;">Location:</span> Greater Noida, India
</div>`,

    hire: () => `
<div style="color: #34d399;">
  🚀 <strong>Why Hire Akash?</strong><br/>
  ✔ Proven track record of 20% frontend speed improvements and 15% algorithm execution gains.<br/>
  ✔ Versatile Full Stack capability across React, Node, Express, PHP/Laravel, and Flutter.<br/>
  ✔ Strong engineering foundation in CS fundamentals, clean architecture, and problem solving.<br/>
  ✔ Fast learner, proactive team collaborator, and eager to contribute to high-impact products!
</div>`,

    sudo: () => `<span style="color: #f43f5e;">Access granted: You now have full permission to send an interview invite to akashkumarsingh1214@gmail.com 😉</span>`,

    clear: () => {
      terminalHistory.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Record user command line
    const userLine = document.createElement('div');
    userLine.innerHTML = `<span style="color: #34d399; font-weight: bold;">akash@portfolio:~$</span> <span style="color: #f8fafc;">${rawCmd}</span>`;
    terminalHistory.appendChild(userLine);

    // Response
    if (commands[cmd]) {
      const output = commands[cmd]();
      if (output) {
        const outputElem = document.createElement('div');
        outputElem.style.margin = '4px 0 12px 0';
        outputElem.innerHTML = output;
        terminalHistory.appendChild(outputElem);
      }
    } else {
      const errorElem = document.createElement('div');
      errorElem.style.color = '#f87171';
      errorElem.style.margin = '4px 0 12px 0';
      errorElem.textContent = `Command not found: "${rawCmd}". Type 'help' for available commands.`;
      terminalHistory.appendChild(errorElem);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
      terminalInput.value = '';
    }
  });

  // Handle quick click chips
  quickCmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd') || chip.textContent.trim();
      executeCommand(cmd);
    });
  });
})();

