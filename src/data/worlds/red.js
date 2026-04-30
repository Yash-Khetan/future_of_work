export const RED_INITIAL_METRICS = {
  workforceHealth: 72,
  revenueIndex: 65,
  talentRetention: 68,
  innovationScore: 70,
};

export const RED_SCENARIOS = [
  {
    id: 1,
    title: "The AI Replacement Memo",
    context: "A new generative AI model can now perform 40% of the tasks currently done by your junior analyst team. Your board is demanding immediate cost reductions.",
    choices: [
      {
        id: "1a",
        text: "Automate and downsize immediately to maximize margins.",
        impact: { workforceHealth: -15, revenueIndex: 20, talentRetention: -10, innovationScore: 5 },
      },
      {
        id: "1b",
        text: "Automate, but mandate retraining for displaced analysts.",
        impact: { workforceHealth: 5, revenueIndex: -5, talentRetention: 15, innovationScore: 10 },
      },
      {
        id: "1c",
        text: "Delay automation. Human analysts provide a 'premium' touch.",
        impact: { workforceHealth: 10, revenueIndex: -15, talentRetention: 5, innovationScore: -20 },
      }
    ],
    aanyaResponses: {
      "1a": "According to WEF 2025, prioritizing short-term margins over talent transition often leads to a long-term 'skills deficit'. In India, where highly skilled talent is scarce, firing rather than retraining can cripple your future pipeline.",
      "1b": "A wise choice. McKinsey notes that companies prioritizing internal mobility and reskilling retain top talent 2.5x better. You took a short-term revenue hit for long-term capability.",
      "1c": "In the Red World, hesitation is fatal. The PwC Workforce 2030 report warns that companies failing to integrate AI rapidly will be outpaced by agile startups. Your innovation score has plummeted."
    }
  },
  {
    id: 2,
    title: "The Talent Poaching War",
    context: "Your top AI engineers are being aggressively recruited by a rival startup offering 50% higher salaries and massive stock options.",
    choices: [
      {
        id: "2a",
        text: "Match the offers. We can't lose our best minds.",
        impact: { workforceHealth: 5, revenueIndex: -15, talentRetention: 20, innovationScore: 10 },
      },
      {
        id: "2b",
        text: "Let them go. Launch an aggressive campus hiring program.",
        impact: { workforceHealth: -5, revenueIndex: 10, talentRetention: -20, innovationScore: -10 },
      },
      {
        id: "2c",
        text: "Acquire a smaller AI boutique to replace the lost team.",
        impact: { workforceHealth: -10, revenueIndex: -20, talentRetention: -5, innovationScore: 25 },
      }
    ],
    aanyaResponses: {
      "2a": "Retaining specialists is a Red World survival tactic, but it burns cash. In India's hyper-competitive tech hubs like Bengaluru, salary wars are unsustainable in the long run.",
      "2b": "The India Skills Report highlights that only 42.6% of graduates are immediately employable. Relying solely on freshers to replace senior specialists just tanked your innovation output.",
      "2c": "Acqui-hiring is a classic aggressive move. It boosts innovation fast, but integrating new cultures often hurts overall workforce cohesion. A very Red World decision."
    }
  },
  {
    id: 3,
    title: "The Gig Army Proposal",
    context: "Your CFO proposes shifting 30% of your permanent development roles to global gig contractors to increase flexibility and cut costs.",
    choices: [
      {
        id: "3a",
        text: "Approve the shift. Agility is everything.",
        impact: { workforceHealth: -20, revenueIndex: 15, talentRetention: -15, innovationScore: 5 },
      },
      {
        id: "3b",
        text: "Reject it. Permanent teams build better products.",
        impact: { workforceHealth: 15, revenueIndex: -10, talentRetention: 10, innovationScore: -5 },
      },
      {
        id: "3c",
        text: "Create an internal 'talent marketplace' instead.",
        impact: { workforceHealth: 10, revenueIndex: -5, talentRetention: 20, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "3a": "You've embraced the gig economy. However, while costs dropped, so did institutional loyalty. WEF data shows gig-heavy models struggle with complex, long-term R&D.",
      "3b": "You chose stability. While good for morale, your fixed costs remain high. In the Red World, heavy corporate structures often lose to lean, decentralized competitors.",
      "3c": "Brilliant. Internal talent marketplaces are highlighted by McKinsey as a key differentiator. It offers the agility of gig work with the loyalty of full-time employment."
    }
  },
  {
    id: 4,
    title: "The Offshore Dilemma",
    context: "A radical proposal: move your core R&D from India to a cheaper emerging market to extend runway.",
    choices: [
      {
        id: "4a",
        text: "Move it. Survival means ruthless cost-cutting.",
        impact: { workforceHealth: -25, revenueIndex: 25, talentRetention: -25, innovationScore: -15 },
      },
      {
        id: "4b",
        text: "Keep it in India, but pivot to a 100% remote model.",
        impact: { workforceHealth: 5, revenueIndex: 10, talentRetention: 5, innovationScore: -5 },
      },
      {
        id: "4c",
        text: "Double down. Invest more in the local India R&D hub.",
        impact: { workforceHealth: 10, revenueIndex: -25, talentRetention: 15, innovationScore: 25 },
      }
    ],
    aanyaResponses: {
      "4a": "A drastic move. You saved the balance sheet, but gutting your core R&D hub destroyed your innovation engine and talent trust. A dangerous game.",
      "4b": "Remote work expands your talent pool across Tier-2 and Tier-3 Indian cities. PwC notes this increases resilience, though pure remote can sometimes stall serendipitous innovation.",
      "4c": "You bet on India's premium talent ecosystem. It's expensive, but high-end R&D drives Red World dominance. Your innovation score just spiked."
    }
  },
  {
    id: 5,
    title: "The Skill Obsolescence Crisis",
    context: "Your legacy software product is dying. The team of 200 engineers working on it lacks modern cloud/AI skills.",
    choices: [
      {
        id: "5a",
        text: "Fire them and hire cloud-native engineers.",
        impact: { workforceHealth: -20, revenueIndex: 15, talentRetention: -15, innovationScore: 10 },
      },
      {
        id: "5b",
        text: "Keep the legacy product alive to protect jobs.",
        impact: { workforceHealth: 15, revenueIndex: -20, talentRetention: 5, innovationScore: -25 },
      },
      {
        id: "5c",
        text: "Mandatory 6-month intensive reskilling bootcamp.",
        impact: { workforceHealth: -5, revenueIndex: -15, talentRetention: 15, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "5a": "The ruthless Red World approach. You've accelerated your tech capabilities, but the brutal layoffs sent a warning to your remaining staff. Loyalty is dead.",
      "5b": "A fatal error in the Red World. Protecting obsolete models guarantees irrelevance. Startups are already eating your market share.",
      "5c": "A tough but visionary choice. Reskilling is hard and expensive, but McKinsey data shows it's ultimately cheaper than the cost of mass severance and rehiring."
    }
  },
  {
    id: 6,
    title: "The Founder's Exit",
    context: "You just acquired a disruptive AI startup. The brilliant but erratic founders want to remain independent. Your corporate board wants them integrated.",
    choices: [
      {
        id: "6a",
        text: "Force integration. We bought them, we own them.",
        impact: { workforceHealth: -10, revenueIndex: 5, talentRetention: -20, innovationScore: -15 },
      },
      {
        id: "6b",
        text: "Keep them fully independent. Let them build.",
        impact: { workforceHealth: 5, revenueIndex: -10, talentRetention: 15, innovationScore: 20 },
      },
      {
        id: "6c",
        text: "Tie their earn-outs to integrating with your teams.",
        impact: { workforceHealth: 0, revenueIndex: 15, talentRetention: -5, innovationScore: 5 },
      }
    ],
    aanyaResponses: {
      "6a": "The founders quit. You bought a shell. Big corporations consistently fail to integrate agile startups by crushing their culture. Innovation lost.",
      "6b": "You protected their ecosystem. They will drive your future products, even if they burn cash in the short term. A smart Red World play.",
      "6c": "A pragmatic financial move. It secured the IP and revenue, but the forced collaboration slightly dampened their raw innovative edge."
    }
  },
  {
    id: 7,
    title: "The Burnout Epidemic",
    context: "Internal surveys show 60% of your staff are at severe risk of burnout due to your aggressive growth targets.",
    choices: [
      {
        id: "7a",
        text: "Push through. The market rewards only the fastest.",
        impact: { workforceHealth: -25, revenueIndex: 20, talentRetention: -20, innovationScore: -5 },
      },
      {
        id: "7b",
        text: "Implement mandatory 4-day work weeks.",
        impact: { workforceHealth: 25, revenueIndex: -15, talentRetention: 15, innovationScore: -10 },
      },
      {
        id: "7c",
        text: "Use AI to automate repetitive tasks and reduce load.",
        impact: { workforceHealth: 15, revenueIndex: 5, talentRetention: 10, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "7a": "Revenue soared, but your talent pool is breaking. High attrition will eventually cripple your delivery. In India's tech sector, burnout is a leading cause of the 'Great Resignation'.",
      "7b": "You prioritized health, but in the Red World, your competitors didn't. Your growth slowed, making you vulnerable to acquisition.",
      "7c": "The ideal synergy. Using technology to solve human problems. You improved well-being while maintaining output and driving innovation."
    }
  },
  {
    id: 8,
    title: "The Regulation Gamble",
    context: "New, strict AI regulations are being proposed. You have a massive lobbying budget.",
    choices: [
      {
        id: "8a",
        text: "Lobby aggressively against the regulations.",
        impact: { workforceHealth: -5, revenueIndex: 20, talentRetention: -5, innovationScore: 10 },
      },
      {
        id: "8b",
        text: "Comply early and market yourselves as 'Ethical AI'.",
        impact: { workforceHealth: 10, revenueIndex: -10, talentRetention: 15, innovationScore: -5 },
      },
      {
        id: "8c",
        text: "Ignore the regulations and launch products faster.",
        impact: { workforceHealth: -15, revenueIndex: 25, talentRetention: -10, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "8a": "You bought yourself time and revenue. The Red World rewards those who shape the rules to their advantage. But public trust might take a hit.",
      "8b": "A Green World move in a Red World. You built trust and retained ethical talent, but your competitors launched faster, less-regulated products.",
      "8c": "Move fast and break things. The ultimate Red World strategy. Massive short-term gains, but you carry immense regulatory risk. We'll see if it pays off."
    }
  }
];
