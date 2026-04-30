export const BLUE_INITIAL_METRICS = {
  workforceHealth: 65,
  revenueIndex: 80,
  talentRetention: 75,
  innovationScore: 50,
};

export const BLUE_SCENARIOS = [
  {
    id: 1,
    title: "The Efficiency Mandate",
    context: "The board demands a 15% margin improvement this quarter. In the Blue World, corporate scale and efficiency are everything.",
    choices: [
      {
        id: "1a",
        text: "Implement strict algorithmic tracking of employee productivity.",
        impact: { workforceHealth: -20, revenueIndex: 20, talentRetention: -15, innovationScore: 0 },
      },
      {
        id: "1b",
        text: "Consolidate regional offices into one mega-campus.",
        impact: { workforceHealth: -5, revenueIndex: 15, talentRetention: -5, innovationScore: 5 },
      },
      {
        id: "1c",
        text: "Deploy an AI copilot to assist, not track, all workers.",
        impact: { workforceHealth: 10, revenueIndex: 5, talentRetention: 15, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "1a": "You increased margins, but algorithmic surveillance severely damages trust. In the Blue World, high-tier talent will flee strict micro-management if they have options.",
      "1b": "A classic corporate move. It saved rent and consolidated power, but the commute and lack of flexibility frustrated some of your mid-tier talent.",
      "1c": "The true 'augmentation' path. PwC highlights that AI used as an enabler rather than an enforcer dramatically boosts productivity without breaking morale."
    }
  },
  {
    id: 2,
    title: "The Elite Talent Monopoly",
    context: "A boutique rival is gaining market share by poaching your clients. They are small but highly agile.",
    choices: [
      {
        id: "2a",
        text: "Acquire them and immediately dissolve their brand.",
        impact: { workforceHealth: -10, revenueIndex: 15, talentRetention: -10, innovationScore: -5 },
      },
      {
        id: "2b",
        text: "Use your massive scale to undercut their prices and bleed them out.",
        impact: { workforceHealth: 0, revenueIndex: -10, talentRetention: 0, innovationScore: -10 },
      },
      {
        id: "2c",
        text: "Offer their top talent double salaries to jump ship to your corporation.",
        impact: { workforceHealth: -5, revenueIndex: 10, talentRetention: -5, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "2a": "The Blue World thrives on absorption. You killed the threat, but dissolving their brand alienates the very talent you just paid millions to acquire.",
      "2b": "A brute-force corporate tactic. You protected market share but burned through capital without fundamentally improving your own innovative capacity.",
      "2c": "You weaponized your balance sheet to drain their brain-trust. Elite talent consolidation is a hallmark of the Blue World's 'Corporate is King' philosophy."
    }
  },
  {
    id: 3,
    title: "The Data Sovereignty Crisis",
    context: "New Indian data regulations require all predictive AI processing to happen locally, threatening your global cloud architecture.",
    choices: [
      {
        id: "3a",
        text: "Threaten to pull operations out of the region entirely.",
        impact: { workforceHealth: -15, revenueIndex: -15, talentRetention: -10, innovationScore: 0 },
      },
      {
        id: "3b",
        text: "Comply and build massive localized data centers.",
        impact: { workforceHealth: 5, revenueIndex: -20, talentRetention: 10, innovationScore: 10 },
      },
      {
        id: "3c",
        text: "Lobby the government for 'corporate exemptions' based on your economic impact.",
        impact: { workforceHealth: -5, revenueIndex: 15, talentRetention: -5, innovationScore: -5 },
      }
    ],
    aanyaResponses: {
      "3a": "A dangerous bluff. The government called it. You lost access to a crucial market and your local workforce is now deeply uncertain about their jobs.",
      "3b": "An expensive but necessary infrastructural investment. In the Blue World, massive corporations become pseudo-state actors. You now own the local infrastructure.",
      "3c": "You leveraged your massive corporate weight to shape national policy. This is the definition of the Blue World: corporations dictating the rules."
    }
  },
  {
    id: 4,
    title: "The Automation Stratification",
    context: "Your new AI systems require a small, elite class of 'prompt engineers' and heavily devalue your massive base of data-entry workers.",
    choices: [
      {
        id: "4a",
        text: "Create a distinct two-tier employment system (Elite vs. Expendable).",
        impact: { workforceHealth: -25, revenueIndex: 25, talentRetention: -15, innovationScore: 10 },
      },
      {
        id: "4b",
        text: "Subsidize mass upskilling, even if the ROI is slow.",
        impact: { workforceHealth: 20, revenueIndex: -15, talentRetention: 20, innovationScore: 5 },
      },
      {
        id: "4c",
        text: "Quietly replace the data-entry workers with contractors without benefits.",
        impact: { workforceHealth: -15, revenueIndex: 20, talentRetention: -10, innovationScore: 0 },
      }
    ],
    aanyaResponses: {
      "4a": "You've formalized the 'haves and have-nots' division that defines the Blue World. Efficiency is maximized, but resentment at the bottom tier is brewing.",
      "4b": "An unusually empathetic move for a Blue World corporation. It hurt margins, but WEF data shows massive internal mobility creates a deeply resilient workforce.",
      "4c": "You shifted the financial risk onto the workers. Corporate balance sheets love contractors, but you're hollowing out the middle class of your company."
    }
  },
  {
    id: 5,
    title: "The Cognitive Enhancement Program",
    context: "A controversial bio-tech company offers neural-link 'focus boosters' that increase developer output by 30%.",
    choices: [
      {
        id: "5a",
        text: "Mandate them for top-tier employees to stay competitive.",
        impact: { workforceHealth: -30, revenueIndex: 20, talentRetention: -25, innovationScore: 25 },
      },
      {
        id: "5b",
        text: "Ban them entirely on ethical grounds.",
        impact: { workforceHealth: 15, revenueIndex: -10, talentRetention: 10, innovationScore: -15 },
      },
      {
        id: "5c",
        text: "Offer them as an optional, fully-funded 'wellness' perk.",
        impact: { workforceHealth: -5, revenueIndex: 10, talentRetention: 5, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "5a": "Dystopian, yet highly effective. You crossed an ethical line, causing a severe backlash among your talent, but your output metrics are untouchable.",
      "5b": "You chose ethics over raw performance. In the Blue World, however, your rivals might not be so scrupulous. You've fallen behind in cognitive output.",
      "5c": "By framing augmentation as a 'perk', you coerced participation through corporate culture rather than mandates. A brilliantly manipulative Blue World strategy."
    }
  },
  {
    id: 6,
    title: "The Monopoly Inquiry",
    context: "Your corporation has grown so large that antitrust regulators are threatening to break you up.",
    choices: [
      {
        id: "6a",
        text: "Pre-emptively spin off your most innovative, high-risk division.",
        impact: { workforceHealth: 0, revenueIndex: -15, talentRetention: -5, innovationScore: -20 },
      },
      {
        id: "6b",
        text: "Fight it in court with an army of corporate lawyers.",
        impact: { workforceHealth: -5, revenueIndex: -10, talentRetention: 5, innovationScore: 0 },
      },
      {
        id: "6c",
        text: "Offer massive concessions and open-source your older IP.",
        impact: { workforceHealth: 10, revenueIndex: 5, talentRetention: 10, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "6a": "You appeased the regulators, but amputated your future. Big corporations that spin off their R&D often lose their competitive edge entirely.",
      "6b": "A war of attrition. You protected the conglomerate, but the legal uncertainty is dragging down stock prices and distracting leadership.",
      "6c": "Strategic capitulation. Open-sourcing old tech buys goodwill and stifles smaller competitors who can't monetize it, while you focus on the frontier."
    }
  },
  {
    id: 7,
    title: "The Ultimate Loyalty Test",
    context: "A macro-economic shock hits. You need to cut 20% of costs. Do you cut the bottom 40% of workers, or the top 5% of elite earners?",
    choices: [
      {
        id: "7a",
        text: "Cut the bottom 40%. Protect the elite talent.",
        impact: { workforceHealth: -25, revenueIndex: 15, talentRetention: 10, innovationScore: 5 },
      },
      {
        id: "7b",
        text: "Cut the top 5% elite earners. Protect the masses.",
        impact: { workforceHealth: 15, revenueIndex: 5, talentRetention: -30, innovationScore: -25 },
      },
      {
        id: "7c",
        text: "No cuts. Enforce a company-wide 20% pay reduction.",
        impact: { workforceHealth: -15, revenueIndex: -5, talentRetention: -20, innovationScore: -10 },
      }
    ],
    aanyaResponses: {
      "7a": "The ultimate Blue World reality. Elite talent is protected at all costs, while the lower tiers are treated as expendable capital. Harsh, but the company stabilizes.",
      "7b": "You protected the masses, but the Blue World is driven by hyper-specialists. Your innovation engine just completely stalled.",
      "7c": "Socialism inside a monopoly rarely works. Your top performers resent subsidizing the bottom performers and are leaving for your rivals."
    }
  },
  {
    id: 8,
    title: "The AGI Milestone",
    context: "Your internal lab has achieved a breakthrough in Artificial General Intelligence. It could replace your entire middle management layer.",
    choices: [
      {
        id: "8a",
        text: "Deploy it fully. Flatten the hierarchy and dominate the market.",
        impact: { workforceHealth: -35, revenueIndex: 40, talentRetention: -20, innovationScore: 20 },
      },
      {
        id: "8b",
        text: "Keep it secret and use it exclusively for high-level strategy.",
        impact: { workforceHealth: 5, revenueIndex: 15, talentRetention: 10, innovationScore: 10 },
      },
      {
        id: "8c",
        text: "License it to other corporations for massive recurring revenue.",
        impact: { workforceHealth: -5, revenueIndex: 30, talentRetention: 0, innovationScore: -10 },
      }
    ],
    aanyaResponses: {
      "8a": "You just obliterated the corporate ladder. Unprecedented efficiency, but the psychological shock to your remaining workforce is devastating.",
      "8b": "Information asymmetry is power. By keeping the AGI for the C-suite, you maintain the corporate structure while possessing a massive strategic advantage.",
      "8c": "You turned the ultimate weapon into a utility. You've cemented your status as the infrastructural backbone of the entire Blue World economy."
    }
  }
];
