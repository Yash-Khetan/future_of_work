export const YELLOW_INITIAL_METRICS = {
  workforceHealth: 90,
  revenueIndex: 40,
  talentRetention: 85,
  innovationScore: 55,
};

export const YELLOW_SCENARIOS = [
  {
    id: 1,
    title: "The Guild Ultimatum",
    context: "The independent Data Scientists Guild is demanding a 30% increase in baseline contract rates across your platform.",
    choices: [
      {
        id: "1a",
        text: "Refuse the increase and look for non-guild freelancers.",
        impact: { workforceHealth: -25, revenueIndex: 15, talentRetention: -30, innovationScore: -10 },
      },
      {
        id: "1b",
        text: "Accept the increase to maintain the highest quality talent pool.",
        impact: { workforceHealth: 15, revenueIndex: -25, talentRetention: 20, innovationScore: 10 },
      },
      {
        id: "1c",
        text: "Negotiate a profit-sharing model instead of a flat rate increase.",
        impact: { workforceHealth: 10, revenueIndex: -10, talentRetention: 15, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "1a": "In the Yellow World, guilds have immense power. By refusing, you triggered a boycott. Your talent pool dried up overnight.",
      "1b": "You prioritized fairness. It's expensive, but you've secured the loyalty of the most skilled independent workers.",
      "1c": "Profit-sharing aligns incentives perfectly with the Yellow World ethos. You built partnership rather than a transactional relationship."
    }
  },
  {
    id: 2,
    title: "The Automation Pushback",
    context: "A new AI tool could replace 50% of your artisan creators, but the community is organizing a 'Made by Humans' campaign against it.",
    choices: [
      {
        id: "2a",
        text: "Deploy the AI secretly to boost margins.",
        impact: { workforceHealth: -35, revenueIndex: 30, talentRetention: -40, innovationScore: -15 },
      },
      {
        id: "2b",
        text: "Ban the AI tool completely from your platform.",
        impact: { workforceHealth: 25, revenueIndex: -15, talentRetention: 20, innovationScore: -20 },
      },
      {
        id: "2c",
        text: "Integrate the AI as a 'co-creator' tool, maintaining the human element.",
        impact: { workforceHealth: 10, revenueIndex: 5, talentRetention: 10, innovationScore: 25 },
      }
    ],
    aanyaResponses: {
      "2a": "A catastrophic miscalculation. The community found out, and the backlash destroyed your brand. 'Humanness' is the core value here.",
      "2b": "You protected the artisans, but ignoring technology entirely leaves you vulnerable to more agile platforms. A safe but stagnant choice.",
      "2c": "Augmentation over replacement. You preserved the 'Made by Me' ethos while still advancing your capabilities."
    }
  },
  {
    id: 3,
    title: "The Universal Basic Income Tax",
    context: "A new local tax is proposed on tech platforms to fund a Universal Basic Income (UBI) for displaced workers.",
    choices: [
      {
        id: "3a",
        text: "Lobby aggressively against the tax.",
        impact: { workforceHealth: -20, revenueIndex: 15, talentRetention: -15, innovationScore: 0 },
      },
      {
        id: "3b",
        text: "Support the tax publicly as a necessary social safety net.",
        impact: { workforceHealth: 20, revenueIndex: -20, talentRetention: 25, innovationScore: 5 },
      },
      {
        id: "3c",
        text: "Create a private UBI-equivalent fund for your own platform workers.",
        impact: { workforceHealth: 25, revenueIndex: -25, talentRetention: 30, innovationScore: 10 },
      }
    ],
    aanyaResponses: {
      "3a": "You fought the social good. In the Yellow World, opposing social safety nets makes you a pariah among the worker collectives.",
      "3b": "You embraced the collective responsibility. It reduces your margins, but solidifies your standing as an ethical pillar of the community.",
      "3c": "Taking direct responsibility for your ecosystem is highly respected. You bypassed the government to directly care for your people."
    }
  },
  {
    id: 4,
    title: "The Algorithmic Transparency Demand",
    context: "Worker guilds demand full open-source access to the algorithms that determine task allocation and pricing on your platform.",
    choices: [
      {
        id: "4a",
        text: "Refuse. The algorithm is your proprietary IP.",
        impact: { workforceHealth: -15, revenueIndex: 10, talentRetention: -20, innovationScore: -5 },
      },
      {
        id: "4b",
        text: "Grant full access. Transparency is paramount.",
        impact: { workforceHealth: 25, revenueIndex: -15, talentRetention: 20, innovationScore: 10 },
      },
      {
        id: "4c",
        text: "Create an independent auditor board comprised of guild members.",
        impact: { workforceHealth: 15, revenueIndex: -5, talentRetention: 15, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "4a": "Protecting IP over worker trust is a fast track to irrelevance in the Yellow World. They suspect you are manipulating prices.",
      "4b": "Radical transparency. You lost your technical moat, but your platform is now the most trusted in the industry.",
      "4c": "A perfect compromise. You protected the core code while giving the workers verified oversight and fairness."
    }
  },
  {
    id: 5,
    title: "The Value Alignment Crisis",
    context: "Your most lucrative client is revealed to be engaging in environmentally destructive practices.",
    choices: [
      {
        id: "5a",
        text: "Keep the client. Business is business.",
        impact: { workforceHealth: -30, revenueIndex: 25, talentRetention: -35, innovationScore: -10 },
      },
      {
        id: "5b",
        text: "Drop the client immediately.",
        impact: { workforceHealth: 25, revenueIndex: -30, talentRetention: 20, innovationScore: 5 },
      },
      {
        id: "5c",
        text: "Use your leverage to force the client to change their practices.",
        impact: { workforceHealth: 15, revenueIndex: -10, talentRetention: 10, innovationScore: 15 },
      }
    ],
    aanyaResponses: {
      "5a": "You prioritized money over meaning. In the Yellow World, your workers will mutiny. Loyalty is to a cause, not an employer.",
      "5b": "You took a massive financial hit, but you stayed true to the cause. Your workers will follow you anywhere now.",
      "5c": "You used your platform for positive change. It's risky, but it proves that ethical business can drive real-world impact."
    }
  },
  {
    id: 6,
    title: "The Open-Source Pivot",
    context: "A community of developers proposes taking your core product open-source to accelerate its social impact.",
    choices: [
      {
        id: "6a",
        text: "Reject it. We need to monetize our IP.",
        impact: { workforceHealth: -10, revenueIndex: 15, talentRetention: -15, innovationScore: -15 },
      },
      {
        id: "6b",
        text: "Accept it and transition to a service/support revenue model.",
        impact: { workforceHealth: 20, revenueIndex: -15, talentRetention: 25, innovationScore: 30 },
      },
      {
        id: "6c",
        text: "Open-source only the older versions of the product.",
        impact: { workforceHealth: 5, revenueIndex: 5, talentRetention: 5, innovationScore: 5 },
      }
    ],
    aanyaResponses: {
      "6a": "Hoarding knowledge is frowned upon here. You protected short-term revenue but alienated the community developers.",
      "6b": "You embraced the collective. The community will now build upon your work, driving massive, decentralized innovation.",
      "6c": "A half-measure. It's safe, but it doesn't inspire the passionate loyalty that drives the Yellow World."
    }
  },
  {
    id: 7,
    title: "The Equal Pay Initiative",
    context: "Worker collectives are pushing for a strictly egalitarian pay structure, drastically reducing executive compensation.",
    choices: [
      {
        id: "7a",
        text: "Implement it. Total equality.",
        impact: { workforceHealth: 30, revenueIndex: -10, talentRetention: 15, innovationScore: -5 },
      },
      {
        id: "7b",
        text: "Refuse. We need high pay to attract top leadership.",
        impact: { workforceHealth: -25, revenueIndex: 5, talentRetention: -20, innovationScore: -10 },
      },
      {
        id: "7c",
        text: "Cap the CEO-to-worker pay ratio at a reasonable multiple (e.g., 10x).",
        impact: { workforceHealth: 20, revenueIndex: 0, talentRetention: 10, innovationScore: 5 },
      }
    ],
    aanyaResponses: {
      "7a": "You achieved absolute fairness, but some of your highly specialized experts left for more lucrative opportunities.",
      "7b": "You defended the traditional hierarchy in a world that despises it. Your leadership is secure, but the workers are organizing against you.",
      "7c": "A rational approach to fairness. It curbs extreme inequality while still allowing for differentiation based on skill."
    }
  },
  {
    id: 8,
    title: "The Micro-Community Shift",
    context: "Users are abandoning large global platforms in favor of highly localized, niche community networks.",
    choices: [
      {
        id: "8a",
        text: "Fight the trend. Spend heavily on global marketing.",
        impact: { workforceHealth: -10, revenueIndex: -20, talentRetention: -5, innovationScore: -15 },
      },
      {
        id: "8b",
        text: "Break your platform into autonomous, locally-managed hubs.",
        impact: { workforceHealth: 20, revenueIndex: -5, talentRetention: 25, innovationScore: 20 },
      },
      {
        id: "8c",
        text: "Acquire the emerging local networks and integrate them.",
        impact: { workforceHealth: -15, revenueIndex: 10, talentRetention: -15, innovationScore: 0 },
      }
    ],
    aanyaResponses: {
      "8a": "You are fighting the core dynamic of the Yellow World (high fragmentation). You wasted money fighting the tide.",
      "8b": "You leaned into the fragmentation. Empowering local communities creates deep loyalty and resilient, niche innovation.",
      "8c": "A Blue World tactic in a Yellow World. The acquired communities will resent corporate integration and likely rebel."
    }
  }
];
