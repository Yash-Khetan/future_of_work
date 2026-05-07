export const GREEN_INITIAL_METRICS = {
  workforceHealth: 85,
  revenueIndex: 50,
  talentRetention: 80,
  innovationScore: 60,
};

export const GREEN_SCENARIOS = [
  {
    id: 1,
    title: "The Carbon Mandate",
    context: "New regulations require your supply chain to be 100% carbon neutral within two years, but your main supplier is heavily dependent on fossil fuels.",
    choices: [
      {
        id: "1a",
        text: "Drop the supplier immediately, despite massive short-term supply disruptions.",
        impact: { workforceHealth: 5, revenueIndex: -20, talentRetention: 10, innovationScore: -5 },
      },
      {
        id: "1b",
        text: "Co-invest with the supplier to help them transition to green energy.",
        impact: { workforceHealth: 10, revenueIndex: -10, talentRetention: 15, innovationScore: 10 },
      },
      {
        id: "1c",
        text: "Lobby for an extension while slowly phasing them out.",
        impact: { workforceHealth: -10, revenueIndex: 10, talentRetention: -15, innovationScore: -10 },
      }
    ],
    aanyaResponses: {
      "1a": "You chose compliance over stability. It hurt revenues immediately but secured your social licence to operate.",
      "1b": "A true Green World solution. Building ecosystem resilience rather than just cutting ties.",
      "1c": "Lobbying against green mandates damages your brand equity in a world where trust is the ultimate currency."
    }
  },
  {
    id: 2,
    title: "The Whistleblower",
    context: "A mid-level employee publicly exposes that one of your highly profitable 'green' products actually relies on exploitative labor in a Tier-3 city.",
    choices: [
      {
        id: "2a",
        text: "Launch a transparent public investigation and halt production.",
        impact: { workforceHealth: 15, revenueIndex: -25, talentRetention: 20, innovationScore: 5 },
      },
      {
        id: "2b",
        text: "Quietly fix the issue and offer a discrete settlement to the whistleblower.",
        impact: { workforceHealth: -10, revenueIndex: -5, talentRetention: -15, innovationScore: -5 },
      },
      {
        id: "2c",
        text: "Deny the claims and launch a PR campaign highlighting other ESG wins.",
        impact: { workforceHealth: -25, revenueIndex: 10, talentRetention: -30, innovationScore: -15 },
      }
    ],
    aanyaResponses: {
      "2a": "Radical transparency hurts the bottom line, but in the Green World, it is the only way to survive a crisis of trust.",
      "2b": "Cover-ups eventually leak. Your talent pool will see through the PR and lose faith in your stated values.",
      "2c": "Greenwashing is a fatal error in this scenario. You protected the stock price today but destroyed your employer brand."
    }
  },
  {
    id: 3,
    title: "The AI Bias Revelation",
    context: "Your new recruitment AI is found to have a slight bias against candidates from non-elite educational backgrounds.",
    choices: [
      {
        id: "3a",
        text: "Scrap the AI immediately and return to manual holistic reviews.",
        impact: { workforceHealth: 10, revenueIndex: -15, talentRetention: 5, innovationScore: -20 },
      },
      {
        id: "3b",
        text: "Keep using it but apply a manual 'diversity quota' correction.",
        impact: { workforceHealth: -5, revenueIndex: 5, talentRetention: -10, innovationScore: 0 },
      },
      {
        id: "3c",
        text: "Open-source the algorithm so the community can audit and fix it.",
        impact: { workforceHealth: 15, revenueIndex: -5, talentRetention: 20, innovationScore: 25 },
      }
    ],
    aanyaResponses: {
      "3a": "You prioritized fairness but sacrificed efficiency. A safe but technologically regressive choice.",
      "3b": "Band-aid solutions to systemic bias breed resentment. Your workforce sees this as performative.",
      "3c": "Open-sourcing algorithms builds immense community trust and harnesses external talent to solve complex problems."
    }
  },
  {
    id: 4,
    title: "The Mental Health Epidemic",
    context: "Despite your stated values, internal surveys show high anxiety due to complex matrix reporting structures.",
    choices: [
      {
        id: "4a",
        text: "Mandate a 4-day work week with no loss in pay.",
        impact: { workforceHealth: 30, revenueIndex: -20, talentRetention: 25, innovationScore: -5 },
      },
      {
        id: "4b",
        text: "Offer a generous wellness stipend but keep the structures.",
        impact: { workforceHealth: 5, revenueIndex: -5, talentRetention: 0, innovationScore: 0 },
      },
      {
        id: "4c",
        text: "Flatten the hierarchy completely, creating self-managed teams.",
        impact: { workforceHealth: 15, revenueIndex: -10, talentRetention: 15, innovationScore: 20 },
      }
    ],
    aanyaResponses: {
      "4a": "You put your money where your mouth is. Massive boost to employee well-being, though output will require adjustment.",
      "4b": "Stipends don't fix systemic issues. Throwing money at burnout is a corporate tactic, not a Green World solution.",
      "4c": "Self-managed teams increase autonomy, directly addressing the anxiety of matrix structures while driving innovation."
    }
  },
  {
    id: 5,
    title: "The Activist Investor",
    context: "An activist investor acquires 5% of the company and demands you spin off your low-margin 'community impact' division.",
    choices: [
      {
        id: "5a",
        text: "Refuse and rally your employees and customers to defend the vision.",
        impact: { workforceHealth: 25, revenueIndex: -10, talentRetention: 20, innovationScore: 5 },
      },
      {
        id: "5b",
        text: "Compromise. Spin it off but retain a 40% stake.",
        impact: { workforceHealth: -10, revenueIndex: 10, talentRetention: -15, innovationScore: 0 },
      },
      {
        id: "5c",
        text: "Agree to the spin-off to boost shareholder value.",
        impact: { workforceHealth: -30, revenueIndex: 25, talentRetention: -35, innovationScore: -10 },
      }
    ],
    aanyaResponses: {
      "5a": "Defending your core values galvanized your workforce. Purpose is your ultimate defense against predatory capitalism.",
      "5b": "A middle path that pleases no one. You lost the purity of your mission and didn't fully satisfy the market.",
      "5c": "You capitulated to the Red/Blue world mentality. Your talent, who joined for the mission, will now leave en masse."
    }
  },
  {
    id: 6,
    title: "The Remote Work Ultimatum",
    context: "Your top engineers demand a 'work from anywhere' policy, but local community leaders want your office to remain an economic anchor in the town.",
    choices: [
      {
        id: "6a",
        text: "Grant 'work from anywhere' to retain top talent.",
        impact: { workforceHealth: 15, revenueIndex: 5, talentRetention: 20, innovationScore: 10 },
      },
      {
        id: "6b",
        text: "Mandate office presence to support the local economy.",
        impact: { workforceHealth: -20, revenueIndex: -5, talentRetention: -25, innovationScore: -15 },
      },
      {
        id: "6c",
        text: "Create a hybrid model that invests in local community hubs.",
        impact: { workforceHealth: 10, revenueIndex: -15, talentRetention: 15, innovationScore: 5 },
      }
    ],
    aanyaResponses: {
      "6a": "You prioritized your employees but abandoned your local community commitments. A tough trade-off.",
      "6b": "Forcing presence creates resentment. You supported the town but lost your best engineers in the process.",
      "6c": "A balanced Green World approach. You maintain flexibility while continuing to invest in the local ecosystem."
    }
  },
  {
    id: 7,
    title: "The Data Privacy Pact",
    context: "A lucrative contract requires sharing anonymized employee data with a government health initiative.",
    choices: [
      {
        id: "7a",
        text: "Sign it. It's for a good cause and highly profitable.",
        impact: { workforceHealth: -15, revenueIndex: 25, talentRetention: -20, innovationScore: 0 },
      },
      {
        id: "7b",
        text: "Refuse completely. Employee data is sacrosanct.",
        impact: { workforceHealth: 20, revenueIndex: -20, talentRetention: 25, innovationScore: -5 },
      },
      {
        id: "7c",
        text: "Let employees opt-in voluntarily, even if it reduces the contract value.",
        impact: { workforceHealth: 15, revenueIndex: 5, talentRetention: 15, innovationScore: 5 },
      }
    ],
    aanyaResponses: {
      "7a": "'Anonymized' is rarely foolproof. Selling data without consent violates the core trust of the Green World.",
      "7b": "You drew a hard line on privacy. Your employees trust you implicitly, though you left money on the table.",
      "7c": "Consent is key. You respected autonomy while still engaging with the public initiative."
    }
  },
  {
    id: 8,
    title: "The Circular Economy Shift",
    context: "Transitioning to a 100% circular economy model for your hardware will increase product costs by 40%.",
    choices: [
      {
        id: "8a",
        text: "Make the shift and absorb the cost, slashing your margins.",
        impact: { workforceHealth: 10, revenueIndex: -30, talentRetention: 15, innovationScore: 20 },
      },
      {
        id: "8b",
        text: "Make the shift and pass the cost entirely to the consumer.",
        impact: { workforceHealth: 5, revenueIndex: -10, talentRetention: 5, innovationScore: 10 },
      },
      {
        id: "8c",
        text: "Delay the shift until the technology becomes cheaper.",
        impact: { workforceHealth: -15, revenueIndex: 15, talentRetention: -15, innovationScore: -20 },
      }
    ],
    aanyaResponses: {
      "8a": "A painful financial hit, but you are now the undisputed leader in sustainable hardware. The long-term brand value is immense.",
      "8b": "Green consumers are willing to pay a premium, but pricing out lower-income demographics raises accessibility concerns.",
      "8c": "Waiting for others to innovate is not leadership. You protected margins but lost your reputation as an ESG pioneer."
    }
  }
];
