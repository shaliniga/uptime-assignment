export const mockActivityOverview = {
  stats: [
    { label: "Code review", percentage: 7, count: 28, color: "#30a14e" },
    { label: "Issues", percentage: 5, count: 20, color: "#e3b341" },
    { label: "Pull requests", percentage: 14, count: 56, color: "#8957e5" },
    { label: "Commits", percentage: 74, count: 298, color: "#0969da" }
  ],
  summaryText: "Contributed primarily to backend services, time-series data ingest pipelines, and OPC UA protocols."
};

export const initialTimelineData = [
  {
    period: "October 2026",
    activities: [
      {
        id: "act-1",
        type: "commit",
        title: "Created 18 commits in 2 repositories",
        repositories: [
          { name: "shreeramk/TitaniumAS.Opc.Client", commits: 12, url: "https://github.com/shreeramk/TitaniumAS.Opc.Client" },
          { name: "shreeramk/node-opcua-logger", commits: 6, url: "https://github.com/shreeramk/node-opcua-logger" }
        ],
        date: "Oct 8"
      },
      {
        id: "act-2",
        type: "pull_request",
        title: "Opened 3 pull requests in 2 repositories",
        repositories: [
          { name: "shreeramk/node-opcua-1", prs: 2, url: "https://github.com/shreeramk/node-opcua-1" },
          { name: "shreeramk/kafkajs", prs: 1, url: "https://github.com/shreeramk/kafkajs" }
        ],
        date: "Oct 4"
      }
    ]
  },
  {
    period: "September 2026",
    activities: [
      {
        id: "act-3",
        type: "commit",
        title: "Created 34 commits in 3 repositories",
        repositories: [
          { name: "shreeramk/node-opcua-1", commits: 20, url: "https://github.com/shreeramk/node-opcua-1" },
          { name: "shreeramk/TitaniumAS.Opc.Client", commits: 9, url: "https://github.com/shreeramk/TitaniumAS.Opc.Client" },
          { name: "shreeramk/Catch2", commits: 5, url: "https://github.com/shreeramk/Catch2" }
        ],
        date: "Sep 22"
      },
      {
        id: "act-4",
        type: "repo_create",
        title: "Created repository shreeramk/opc-telemetry-benchmarks",
        description: "Public benchmark suites for high-frequency industrial plant telemetry streaming.",
        date: "Sep 15"
      }
    ]
  }
];

export const additionalTimelineData = [
  {
    period: "August 2026",
    activities: [
      {
        id: "act-5",
        type: "commit",
        title: "Created 27 commits in 2 repositories",
        repositories: [
          { name: "shreeramk/kafkajs", commits: 19, url: "https://github.com/shreeramk/kafkajs" },
          { name: "shreeramk/node-opcua-logger", commits: 8, url: "https://github.com/shreeramk/node-opcua-logger" }
        ],
        date: "Aug 29"
      },
      {
        id: "act-6",
        type: "pull_request",
        title: "Merged 5 pull requests in 3 repositories",
        repositories: [
          { name: "shreeramk/node-opcua-1", prs: 3, url: "https://github.com/shreeramk/node-opcua-1" },
          { name: "shreeramk/TitaniumAS.Opc.Client", prs: 2, url: "https://github.com/shreeramk/TitaniumAS.Opc.Client" }
        ],
        date: "Aug 14"
      }
    ]
  },
  {
    period: "July 2026",
    activities: [
      {
        id: "act-7",
        type: "commit",
        title: "Created 45 commits in 4 repositories",
        repositories: [
          { name: "shreeramk/Complete-Python-3-Bootcamp", commits: 22, url: "https://github.com/shreeramk/Complete-Python-3-Bootcamp" },
          { name: "shreeramk/node-opcua-1", commits: 14, url: "https://github.com/shreeramk/node-opcua-1" },
          { name: "shreeramk/kafkajs", commits: 9, url: "https://github.com/shreeramk/kafkajs" }
        ],
        date: "Jul 18"
      }
    ]
  }
];
