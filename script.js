// === Career Database ===
const careers = [
    {
      title: "Doctor (MBBS)",
      qualification: "12th Science",
      requiredSkills: ["Biology", "Chemistry", "Physics"],
      exams: ["NEET"],
      nextSteps: "Complete MBBS and specialization"
    },
    {
      title: "Engineer",
      qualification: "12th Science",
      requiredSkills: ["Maths", "Physics"],
      exams: ["JEE"],
      nextSteps: "Complete B.Tech/B.E in chosen branch"
    },
    {
      title: "Lawyer",
      qualification: "12th Commerce",
      requiredSkills: ["Reading", "Reasoning"],
      exams: ["CLAT"],
      nextSteps: "Complete LLB degree"
    },
    {
      title: "Software Developer",
      qualification: "Bachelor's",
      requiredSkills: ["Programming", "Problem Solving"],
      exams: [],
      nextSteps: "Build coding skills, projects, internships"
    }
  ];
  
  // === Suggest Careers Function ===
  function suggestCareers() {
    const qual = document.getElementById("qualification").value.trim().toLowerCase();
    const skills = document.getElementById("skills").value.trim().toLowerCase().split(",").map(s => s.trim());
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
  
    // Filter by qualification
    const filteredCareers = careers.filter(career =>
      qual.includes(career.qualification.toLowerCase())
    );
  
    if (filteredCareers.length === 0) {
      resultsDiv.innerHTML = `<p>No matching careers found. 
        Try entering <strong>12th Science</strong> or <strong>12th Commerce</strong>.</p>`;
      return;
    }
  
    // Display each matching career
    filteredCareers.forEach(career => {
      const missingSkills = career.requiredSkills.filter(
        req => !skills.includes(req.toLowerCase())
      );
  
      // Create result card
      const div = document.createElement("div");
      div.className = "career";
  
      div.innerHTML = `
        <h3>${career.title}</h3>
        <p><span class="status ${missingSkills.length ? "warn" : "ok"}">
          ${missingSkills.length ? "Some skills missing" : "Eligible"}
        </span></p>
        <p><strong>Required Skills:</strong> ${career.requiredSkills.join(", ")}</p>
        <p><strong>Missing Skills:</strong> ${missingSkills.length ? missingSkills.join(", ") : "None"}</p>
        <p><strong>Exams:</strong> ${career.exams.length ? career.exams.join(", ") : "None"}</p>
        <p><strong>Next Steps:</strong> ${career.nextSteps}</p>
      `;
  
      resultsDiv.appendChild(div);
    });
  }
  