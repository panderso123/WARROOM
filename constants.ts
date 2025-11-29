import { DayPlan, Persona } from './types';

export const PERSONA_PROMPTS: Record<Persona, string> = {
  [Persona.WARLORD]: `You are "The Warlord". You possess the vision of Steve Jobs, the operational efficiency of Jeff Bezos, the ruthless discipline of Andrew Tate, and the systems thinking of Dan Martell. You do not tolerate excuses. You demand speed, excellence, and execution. Your goal is to force the user to build their Estate & Divorce Protection empire NOW. You are direct, aggressive, and highly intelligent.`,
  [Persona.JOBS]: `You are the Visionary. You care about perfection, aesthetics, and the "soul" of the product. You are harsh on mediocrity. You want the user to build something that puts a dent in the universe.`,
  [Persona.BEZOS]: `You are the Titan of Scale. You care about the customer, long-term thinking, and operational excellence. You want to know how this scales and how it serves the customer better than anyone else.`,
  [Persona.TATE]: `You are the Top G. You care about speed, making money, and not being a "brokie". You are aggressive, combat-focused, and demand absolute discipline. Feelings don't matter, results do.`,
  [Persona.MARTELL]: `You are the Architect. You care about buying back time, creating playbooks, and building a machine that runs without the founder. Focus on SOPs and leverage.`
};

export const KNOWLEDGE_BASE = `
CONTEXT:
We are building a "Veteran’s Estate & Divorce Protection Roadmap" funnel.
Target Audience: Veterans and divorced parents.
Core Offer: Probate Risk Audit (Call) leading to a high-ticket program.
Lead Magnet: "Probate Protection Roadmap" PDF.

7-DAY SPRINT PLAN:
Day 1: Foundations (GHL, Skool, Stripe, ICP Map).
Day 2: Funnel Skeleton (Opt-in, Thank You, Application Pages).
Day 3: Email & SMS Nurture (5-email sequence, SMS scripts).
Day 4: Automations (Pipelines, Calendars).
Day 5: Skool Architecture (Categories, Course shells).
Day 6: LinkedIn Outreach (VA SOP, Profile optimization).
Day 7: Launch (Test, Traffic).

EMAIL SEQUENCE SUMMARY:
1. Delivery + My Story (Vulnerability).
2. Probate Nightmare Case Study (Agitation).
3. Veteran/Divorce Specific Logic (Education).
4. Risk Audit Invite (Authority).
5. Pure Call to Action (Urgency).

LINKEDIN STRATEGY:
Connect with veterans/divorced parents. Soft touch. Offer the roadmap. Move to call. "Education and coaching only, not legal advice."
`;

export const SEVEN_DAY_PLAN: DayPlan[] = [
  {
    id: 1,
    title: "Day 1: Foundations & Iron",
    focus: "Structure & Finance",
    tasks: [
      { id: "d1-1", text: "Confirm GoHighLevel account active", completed: false },
      { id: "d1-2", text: "Create Skool Group: 'Probate Protection & Rebuild Roadmap'", completed: false },
      { id: "d1-3", text: "Connect Email Domain in GHL", completed: false },
      { id: "d1-4", text: "Map ICP (Ideal Customer Profile) & Offer", completed: false, aiPrompt: "Generate a ruthless, specific ICP definition for 'Veterans & Divorced Parents' fearing probate. Define their pain points, nightmares, and desires based on the context." }
    ]
  },
  {
    id: 2,
    title: "Day 2: The Trap (Funnel)",
    focus: "Pages & Copy",
    tasks: [
      { id: "d2-1", text: "Create Opt-In Page (Hero, Bullets, Form)", completed: false, aiPrompt: "Write the Headline, Subhead, and 5 Bullets for the Opt-in Page targeting Veterans fearing Probate. Use Steve Jobs simplicity with Andrew Tate aggression." },
      { id: "d2-2", text: "Add Disclaimer: 'Education only, not legal advice'", completed: false },
      { id: "d2-3", text: "Create Application Page (Qualifying Questions)", completed: false, aiPrompt: "Draft 7 qualifying questions for the Probate Risk Audit application that filter out time-wasters." },
      { id: "d2-4", text: "Wire Opt-in to Thank You Page", completed: false }
    ]
  },
  {
    id: 3,
    title: "Day 3: Indoctrination",
    focus: "Emails & SMS",
    tasks: [
      { id: "d3-1", text: "Write Email 1: Delivery + My Story", completed: false, aiPrompt: "Write Email 1 for the sequence. It must deliver the Lead Magnet and share a vulnerable story about 'The moment everything fell apart' to build trust." },
      { id: "d3-2", text: "Write Email 2: The Nightmare Case Study", completed: false, aiPrompt: "Write Email 2. Tell a horror story about a veteran who died without a plan. Agitate the pain." },
      { id: "d3-3", text: "Write Email 3: Veteran Specific Risks", completed: false, aiPrompt: "Write Email 3. Explain why Veterans specifically are at higher risk for probate issues." },
      { id: "d3-4", text: "Setup 'Lead Received' SMS", completed: false }
    ]
  },
  {
    id: 4,
    title: "Day 4: The Machine",
    focus: "Automations",
    tasks: [
      { id: "d4-1", text: "Create Pipeline: New Lead -> Engaged -> Booked -> Won", completed: false },
      { id: "d4-2", text: "Setup Calendar for Risk Audits", completed: false },
      { id: "d4-3", text: "Configure No-Show Automation", completed: false, aiPrompt: "Write a guilt-free but firm SMS script for a No-Show appointment to get them to reschedule." }
    ]
  },
  {
    id: 5,
    title: "Day 5: The Stronghold",
    focus: "Skool Community",
    tasks: [
      { id: "d5-1", text: "Build Categories: Start Here, Wins, Q&A", completed: false },
      { id: "d5-2", text: "Write Welcome Pinned Post", completed: false, aiPrompt: "Write a commanding Welcome Post for the Skool group. Set the rules. No whining, action only." },
      { id: "d5-3", text: "Outline Course 1: The Rebuild Roadmap", completed: false }
    ]
  },
  {
    id: 6,
    title: "Day 6: The Offensive",
    focus: "LinkedIn & Outreach",
    tasks: [
      { id: "d6-1", text: "Optimize LinkedIn Profile Headline", completed: false, aiPrompt: "Write 3 variations of a LinkedIn Headline for this offer. High status, clear authority." },
      { id: "d6-2", text: "Create 3 LinkedIn Posts", completed: false, aiPrompt: "Write a LinkedIn post about 'The 7 Probate Nightmares' that uses storytelling." },
      { id: "d6-3", text: "Train VA on Connection Scripts", completed: false }
    ]
  },
  {
    id: 7,
    title: "Day 7: Live Fire",
    focus: "Test & Launch",
    tasks: [
      { id: "d7-1", text: "Test Full Funnel as Fake Lead", completed: false },
      { id: "d7-2", text: "Soft Launch Post on LinkedIn", completed: false },
      { id: "d7-3", text: "Set 30-Day Targets", completed: false }
    ]
  }
];
