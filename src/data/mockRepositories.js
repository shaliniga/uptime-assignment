export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  "C++": "#f34b7d",
  "C#": "#178600",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Dart: "#00B4AB",
  Other: "#8b949e"
};

export const mockRepositories = [
  {
    id: 1,
    name: "TitaniumAS.Opc.Client",
    html_url: "https://github.com/shreeramk/TitaniumAS.Opc.Client",
    description: "Open source .NET client library for OPC DA communication protocol with industrial automation servers.",
    language: "C#",
    stargazers_count: 14,
    forks_count: 5,
    visibility: "Public",
    updated_at: "2023-09-13T10:12:35Z"
  },
  {
    id: 2,
    name: "node-opcua-1",
    html_url: "https://github.com/shreeramk/node-opcua-1",
    description: "An implementation of an OPC UA stack fully written in NodeJS and TypeScript for IIoT telemetry.",
    language: "TypeScript",
    stargazers_count: 28,
    forks_count: 12,
    visibility: "Public",
    updated_at: "2020-10-21T16:20:16Z"
  },
  {
    id: 3,
    name: "kafkajs",
    html_url: "https://github.com/shreeramk/kafkajs",
    description: "A modern Apache Kafka client for node.js with high throughput streaming pipeline support.",
    language: "JavaScript",
    stargazers_count: 19,
    forks_count: 6,
    visibility: "Public",
    updated_at: "2020-08-26T21:31:42Z"
  },
  {
    id: 4,
    name: "node-opcua-logger",
    html_url: "https://github.com/shreeramk/node-opcua-logger",
    description: "An OPCUA Client for logging real-time sensor and industrial data to InfluxDB and TimescaleDB.",
    language: "JavaScript",
    stargazers_count: 9,
    forks_count: 3,
    visibility: "Public",
    updated_at: "2020-07-08T08:01:59Z"
  },
  {
    id: 5,
    name: "Catch2",
    html_url: "https://github.com/shreeramk/Catch2",
    description: "A modern, C++-native, header-only, test framework for unit-tests, TDD and BDD.",
    language: "C++",
    stargazers_count: 11,
    forks_count: 2,
    visibility: "Public",
    updated_at: "2020-11-24T18:29:12Z"
  },
  {
    id: 6,
    name: "Complete-Python-3-Bootcamp",
    html_url: "https://github.com/shreeramk/Complete-Python-3-Bootcamp",
    description: "Course Files and practical machine learning / data pipelines for Python 3 Bootcamp.",
    language: "Python",
    stargazers_count: 16,
    forks_count: 7,
    visibility: "Public",
    updated_at: "2019-08-24T19:33:43Z"
  }
];

export const allMockRepositories = [
  ...mockRepositories,
  {
    id: 7,
    name: "gitignore",
    html_url: "https://github.com/shreeramk/gitignore",
    description: "A collection of useful .gitignore templates for polyglot microservices.",
    language: "Shell",
    stargazers_count: 4,
    forks_count: 1,
    visibility: "Public",
    updated_at: "2020-03-03T19:41:05Z"
  },
  {
    id: 8,
    name: "flutter_login_ui",
    html_url: "https://github.com/shreeramk/flutter_login_ui",
    description: "Modern, responsive mobile authentication screens built with Flutter and Dart.",
    language: "Dart",
    stargazers_count: 7,
    forks_count: 2,
    visibility: "Public",
    updated_at: "2020-03-02T10:15:23Z"
  }
];
