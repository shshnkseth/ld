export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  year: string;
  tags: string[];
  color: string;
  heroColor: string;
  position: [number, number, number];
  roomType: "airport" | "care-studio" | "research-atelier" | "design-studio";
  overview: string;
  role: string;
  problem: string;
  process: string;
  outcome: string;
  metrics: string[];
  learnings: string;
}

const projects: ProjectData[] = [
  {
    id: "airport-wayfinding",
    title: "Airport Wayfinding & Media Systems",
    subtitle:
      "End-to-end service design for media systems across three international airports",
    company: "Tata Elxsi",
    year: "2022–2024",
    tags: ["Service Design", "Wayfinding", "Systems Thinking", "Research"],
    color: "#B8D4E8",
    heroColor: "#D6E9F5",
    roomType: "airport",
    position: [14, 0, 0],
    overview:
      "Led end-to-end service design for media systems across three concurrent international airport projects at Tata Elxsi. The work spanned advertising strategy, wayfinding, and the entire passenger-facing media experience — designed to complement the passenger journey rather than disrupt it.",
    role:
      "Senior Service Designer. Led a team of five through the full lifecycle of each project — from grounded research through to implementation. Collaborated across airport operations, client stakeholders, vendors, and internal design teams. Pitched concepts that converted into new client engagements.",
    problem:
      "International airports struggle with media systems that compete with rather than support the passenger journey. Fragmented advertising, confusing signage hierarchies, and ground-staff pain points created visual noise that increased perceived dwell time and passenger stress.",
    process:
      "Grounded the work in research into passenger flow and ground-staff pain points. Mapped the full journey across check-in, security, retail, and departure zones. Built a media placement strategy that respected the hierarchy of wayfinding over advertising. Co-created with airport operations teams to ensure the system was operationally viable, not just conceptually elegant.",
    outcome:
      "Designed a media system that reduced visual confusion and perceived dwell time across all three airport sites. The advertising strategy was designed to earn attention at the right moments rather than compete for it at every moment. Pitched concepts converted into new client engagements for Tata Elxsi.",
    metrics: [
      "3 international airport projects delivered concurrently",
      "Team of 5 managed through full project lifecycle",
      "New client engagements generated from pitched concepts",
      "Reduced visual confusion and perceived dwell time",
    ],
    learnings:
      "The best wayfinding is invisible — it moves people without them noticing. The hardest design challenge was creating an advertising system that felt like part of the airport rather than an intrusion into it. That required deep operational empathy, not just visual design.",
  },
  {
    id: "colour-for-care",
    title: "Colour for Care",
    subtitle:
      "Co-founding a healthcare design venture at the intersection of colour theory and patient wellbeing",
    company: "Independent / Co-Founder",
    year: "2025–Present",
    tags: ["Healthcare Design", "Systems Design", "Research", "Entrepreneurship"],
    color: "#F4C6D0",
    heroColor: "#FDE8ED",
    roomType: "care-studio",
    position: [30, 0, 0],
    overview:
      "Colour for Care is a design venture exploring how colour — used intentionally in healthcare environments — can reduce anxiety, support recovery, and improve patient and staff wellbeing. As co-founder, I am shaping both the research methodology and the service offering.",
    role:
      "Co-Founder. I am responsible for the design research direction, the service model, and the translation of colour psychology research into actionable, environment-specific recommendations for healthcare clients.",
    problem:
      "Healthcare environments are designed primarily for clinical efficiency — colour decisions are typically afterthoughts driven by procurement, not by patient psychology or staff experience. The result is environments that are sterile where they should be calming, and stimulating where they should be neutral.",
    process:
      "Drawing on colour psychology research and my background in industrial and experience design, we are developing a methodology that links specific colour interventions to measurable wellbeing outcomes. Working directly with healthcare facilities to test and iterate.",
    outcome:
      "Currently in active development. Building the research foundation and early client partnerships that will define the methodology and service offering.",
    metrics: [
      "Venture founded June 2025",
      "Research methodology in active development",
      "Early healthcare client partnerships being established",
    ],
    learnings:
      "Starting a venture grounded in research rather than product forces you to build the evidence base before you build the offering. It is slower but the foundation is much stronger.",
  },
  {
    id: "independent-research",
    title: "Research & Strategy Practice",
    subtitle:
      "Independent research and strategy consulting across service design and experience design",
    company: "Independent",
    year: "2024–Present",
    tags: ["Research", "Strategy", "Service Design", "Consulting"],
    color: "#C8DEC8",
    heroColor: "#E4F0E4",
    roomType: "research-atelier",
    position: [46, 0, 0],
    overview:
      "Since August 2024, working independently as a Researcher and Strategy Consultant — bringing service design thinking to organisations navigating complex experience challenges. The work spans research, strategy, and the translation of insight into actionable design direction.",
    role:
      "Independent Researcher & Strategy Consultant. Responsible for the full research and strategy process — from framing the question, through fieldwork and analysis, to presenting strategic recommendations that inform design and business decisions.",
    problem:
      "Many organisations have design capability but lack the research depth or strategic framing to ensure that design effort is directed at the right problems. The gap between insight and action is where the most valuable design consulting happens.",
    process:
      "Each engagement begins with a research framing session to ensure we are asking the right questions before we go into the field. Fieldwork methods are chosen based on what the question requires — not what is most comfortable. Synthesis is kept close to the original research, and strategy recommendations are grounded in evidence.",
    outcome:
      "Ongoing independent practice. Building a consulting methodology that brings the rigour of academic research to the pace of design practice.",
    metrics: [
      "Independent practice since August 2024",
      "Multiple strategy consulting engagements",
      "Research methodology spanning service and experience design",
    ],
    learnings:
      "The most important skill in strategy consulting is asking better questions, not providing faster answers. Clients come with answers they have already decided on — the consultant's job is to surface what they have not yet asked.",
  },
];

export default projects;
