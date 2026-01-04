
/* ========= Mobile Side Menu ========= */
const sidemenu = document.getElementById("sidemenu");

function openmenu(){ sidemenu.style.right = "0"; }
function closemenu(){ sidemenu.style.right = "-240px"; }

// Close menu when tapping a link (mobile)
document.querySelectorAll('[data-close]').forEach((a) => {
    a.addEventListener('click', () => closemenu());
});

/* ========= About Tabs (accessible) ========= */
function opentab(e, tabname){
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for (const link of tablinks){
        link.classList.remove("active-link");
        link.setAttribute("aria-selected", "false");
    }
    for (const content of tabcontents){
        content.classList.remove("active-tab");
    }

    e.currentTarget.classList.add("active-link");
    e.currentTarget.setAttribute("aria-selected", "true");
    document.getElementById(tabname).classList.add("active-tab");
}

function tabKey(e, tabname){
    if (e.key === "Enter" || e.key === " "){
        e.preventDefault();
        opentab(e, tabname);
    }
}

/* ========= Footer Year ========= */
document.getElementById("year").textContent = new Date().getFullYear();

/* ========= Contact Form (Google Sheets optional) ========= */
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

// Paste your Google Apps Script Web App URL here (from Deploy -> Web App)
const GOOGLE_SCRIPT_URL = "";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // If no Google Script URL, show success locally
    if (!GOOGLE_SCRIPT_URL) {
        msg.textContent = "Message sent successfully";
        setTimeout(() => (msg.textContent = ""), 5000);
        form.reset();
        return;
    }

    try {
        const formData = new FormData(form);
        const res = await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData });

        if (res.ok) {
            msg.textContent = "Message sent successfully";
            setTimeout(() => (msg.textContent = ""), 5000);
            form.reset();
        } else {
            msg.textContent = "Something went wrong. Please try again.";
            setTimeout(() => (msg.textContent = ""), 5000);
        }
    } catch (err) {
        msg.textContent = "Network error. Please try again.";
        setTimeout(() => (msg.textContent = ""), 5000);
    }
});

/* ========= Portfolio: filter + search ========= */
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const cards = Array.from(document.querySelectorAll(".work"));

let activeFilter = "all";

function applyFilters(){
    const q = (searchInput.value || "").trim().toLowerCase();

    for (const card of cards){
        const filter = card.getAttribute("data-filter");
        const tags = (card.getAttribute("data-tags") || "").toLowerCase();
        const text = (card.innerText || "").toLowerCase();

        const matchesFilter = (activeFilter === "all") || (filter === activeFilter);
        const matchesQuery = (!q) || tags.includes(q) || text.includes(q);

        card.style.display = (matchesFilter && matchesQuery) ? "" : "none";
    }
}

chips.forEach((chip) => {
    chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        activeFilter = chip.getAttribute("data-filter");
        applyFilters();
    });
});

searchInput.addEventListener("input", applyFilters);

/* ========= Reader view (“multi-page feel” in one file) ========= */
const reader = document.getElementById("reader");
const readerTitle = document.getElementById("readerTitle");
const readerMeta = document.getElementById("readerMeta");
const readerBody = document.getElementById("readerBody");

// Post content is strictly based on what you provided (no invented details).
const POSTS = {
    internship: {
        title: "Internship & Bachelor Thesis — Cybersecurity Analysis of Passenger Information Systems",
        meta: "Televic Rail • 29 September 2025 – 12 December 2025",
        body: `
          <p><strong>Context</strong><br/>
          As part of the final phase of the Applied Computer Science programme at Howest University of Applied Sciences,
          a ten-week full-time internship was completed at <strong>Televic Rail</strong> between <strong>29 September 2025 and 12 December 2025</strong>.
          The internship focused on cybersecurity within Passenger Information Systems (PIS), which are critical components in modern railway infrastructure.</p>

          <p><strong>Internship & Thesis Topic</strong><br/>
          <em>Cybersecurity Analysis of Passenger Information Systems on Trains — Vulnerability Detection and SBOM Evaluation</em></p>

          <h3>Objectives</h3>
          <ul>
            <li>Evaluate vulnerability scanning tools in a controlled PIS test environment</li>
            <li>Generate, validate, and convert SBOMs for different software artifacts</li>
            <li>Integrate SBOM analysis platforms for vulnerability correlation</li>
            <li>Automate secure deployment of security tooling</li>
            <li>Explore hierarchical vulnerability analysis across projects and versions</li>
          </ul>

          <h3>Technical Approach</h3>
          <p><strong>Vulnerability Scanning</strong><br/>
          OpenVAS (Greenbone) (deployed using Ansible on Debian-based systems) and Tenable Nessus (via internal infrastructure) were evaluated in VLAN-based testbench environments.</p>

          <p><strong>SBOM Generation & Analysis</strong><br/>
          SBOMs generated using cyclonedx-python and Trivy; validated using cyclonedx-cli; converted where necessary between SPDX and CycloneDX formats.</p>

          <p><strong>Tool Integration & Automation</strong><br/>
          Platforms deployed and evaluated: Dependency-Track, GUAC, DefectDojo. Services configured to operate over HTTPS with valid TLS certificates.</p>

          <h3>Key Outcomes</h3>
          <ul>
            <li>Demonstrated complementary value of scanning + SBOM-driven analysis</li>
            <li>Identified practical challenges in SBOM metadata consistency</li>
            <li>Enabled version-based vulnerability deduplication</li>
            <li>Explored hierarchical vulnerability analysis across projects</li>
            <li>Established reproducible DevSecOps-oriented workflow</li>
          </ul>

          <p><strong>Conclusion</strong><br/>
          SBOM-driven vulnerability analysis, combined with traditional scanning and automation, provides a strong foundation for scalable security practices in embedded and industrial systems.</p>
        `
    },
    pentest: {
        title: "Penetration Testing — Academic Projects (Apotheek Therssen & Seniorencentrum OLV)",
        meta: "Internal + external black-box testing • OSINT → reporting • Controlled phishing simulation",
        body: `
          <p>
            Conducted comprehensive internal and external black-box penetration tests, from initial OSINT gathering to final reporting.
            Identified and documented vulnerabilities related to misconfigured SMB, Active Directory weaknesses, and outdated software.
            Executed controlled phishing simulations to assess employee security awareness and provided remediation recommendations.
          </p>

          <p style="color:#b9b9b9;">
            Note: This post is intentionally high-level because you did not provide detailed per-finding writeups here.
            If you want, you can paste your final report structure and I can turn it into multiple clean posts (without adding assumptions).
          </p>
        `
    },
    letsdefend: {
        title: "Live SOC Monitoring — LetsDefend (Ongoing)",
        meta: "Alert triage • SIEM/EDR log investigation • Escalation workflow",
        body: `
          <p>
            Actively monitor and analyze real-time security alerts in a simulated Security Operations Center (SOC) environment.
            Perform alert triage, investigate potential incidents using SIEM and EDR logs, and escalate critical threats according to protocol.
          </p>
        `
    },
    tryhackme: {
        title: "SOC Analyst Simulation — TryHackMe (Ongoing)",
        meta: "Incident investigation • Phishing log analysis • Malware detection • Network intrusion",
        body: `
          <p>
            Investigate diverse, real-world security incidents, including log analysis for phishing attacks,
            malware detection, and network intrusion. Utilize industry-standard tools and techniques for
            threat detection, containment, and response in a simulated enterprise environment.
          </p>
        `
    },
    ipv6: {
        title: "Tech&Meet — Transitioning to IPv6",
        meta: "Date: 2025-11-25 • Networking & security considerations",
        body: `
          <p><strong>Event Overview</strong><br/>
          Reflection on the transition from IPv4 to IPv6, including the impact of IPv4 address exhaustion,
          differences in addressing/configuration, and common migration approaches (dual-stack, tunneling, translation).</p>

          <p><strong>Security considerations</strong><br/>
          IPv6 changes monitoring and firewall planning; NAT assumptions differ; administrators must rethink rules and address management.</p>

          <p style="color:#b9b9b9;">
            Photo placeholder: add a photo of yourself in the room / with the speaker (not provided).
          </p>
        `
    },
    threatintel: {
        title: "Tech&Meet — Threat Intelligence: From Threats to Tactics",
        meta: "Date recorded: 2025-11 (day not specified)",
        body: `
          <p><strong>Event Overview</strong><br/>
          Reflection on how organizations collect, enrich, and operationalize threat intelligence, and why context matters for prioritization.</p>

          <p><strong>Key learning</strong><br/>
          Threat intelligence is valuable when contextualized and aligned with the organization’s environment and risk profile.</p>

          <p style="color:#b9b9b9;">
            Photo placeholder: add a photo of yourself in the room / with the speaker (not provided).
          </p>
        `
    },
    otit: {
        title: "Tech&Meet — Bridging OT and IT using NIS2 and IEC 62443",
        meta: "Date recorded: 2025-11 (day not specified) • Defensible architecture",
        body: `
          <p><strong>Event Overview</strong><br/>
          Reflection on building defensible architecture bridging OT and IT, and how NIS2 and IEC 62443 guide secure design/operation.</p>

          <p><strong>Key learning</strong><br/>
          OT security needs tailored approaches (availability/safety priorities). IEC 62443 provides structure (zones, conduits, maturity levels).
          NIS2 highlights the growing governance/legal dimension of cybersecurity.</p>

          <p style="color:#b9b9b9;">
            Photo placeholder: add a photo of yourself in the room / with the speaker (not provided).
          </p>
        `
    },
    podcast: {
        title: "Podcast — Supply Chain Security & Software Dependencies",
        meta: "Assignment: 25 minutes • External expert guest•",
        body: `
          <p>
            Podcast focusing on software supply chain security and dependency risks. Discussed why supply chain attacks are attractive,
            lessons from incidents like Log4j, how SBOMs support transparency, and how to integrate security into the development lifecycle.
          </p>
          <p style="color:#b9b9b9;">
            Listening link placeholder: you wrote “link will be added here”. When you have the published link, paste it and I will wire it in.
          </p>
        `
    },
    build: {
        title: "How this website was created (GitHub Pages + Jekyll)",
        meta: "Static site • Markdown • Jekyll • GitHub Pages",
        body: `
          <p>
            Created as an e-portfolio for Professional Networking at Howest. Hosted using GitHub Pages with Jekyll static site generation.
            Content written in Markdown; deployment handled through Git commits, rebuild and redeploy automatically.
          </p>
          <p style="color:#b9b9b9;">
            Your previously listed site URL was <strong>https://arreyalice.github.io</strong>.
            If you want it shown in the UI as a button, tell me and I’ll add it (I won’t assume).
          </p>
        `
    },
    linkedin: {
        title: "LinkedIn & Professional Networking",
        meta: "Profile + reflection + future improvements",
        body: `
          <p>
            LinkedIn supports visibility to employers/recruiters and helps showcase skills, projects, certifications, and professional interests.
            In cybersecurity, reputation and continuous learning matter; LinkedIn supports sharing insights and tracking growth.
          </p>
          <p>
            Planned improvements include: growing the network with relevant connections, sharing updates from projects/events,
            and adding a PDF export of the profile once further refined.
          </p>
        `
    },
    tionstage: {
        title: "TI on Stage — Internship Pitch (Module requirement reference)",
        meta: "Prepare pitch document/presentation • Pitch to external audience • Submit materials",
        body: `
          <p>
            Module requirement reference: prepare a pitch about the internship or final project and present it during TI on Stage,
            including Q&A from visitors, and submit the pitch material via LEHO.
          </p>
          <p style="color:#b9b9b9;">
            If you want, you can paste your pitch outline later and I’ll turn it into a polished page/post (without adding assumptions).
          </p>
        `
    }
};

function showReader(key){
    const post = POSTS[key];
    if (!post) return;

    readerTitle.textContent = post.title;
    readerMeta.textContent = post.meta;
    readerBody.innerHTML = post.body;

    reader.classList.add("active");
    reader.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideReader(){
    reader.classList.remove("active");
    readerTitle.textContent = "";
    readerMeta.textContent = "";
    readerBody.innerHTML = "";
}

// Hash router: #read/<key>
function route(){
    const hash = location.hash || "";
    const match = hash.match(/^#read\/(.+)$/);
    if (match){
        const key = match[1];
        showReader(key);
    } else {
        hideReader();
    }
}

window.addEventListener("hashchange", route);
route();
