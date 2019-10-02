const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  // Get client and context
  const client = new github.GitHub(process.env.GITHUB_TOKEN);
  const context = github.context;
  const a = await client.pulls.listCommits({
    owner: context.issue.owner,
    repo: context.issue.repo,
    pull_number: context.issue.number,
  });
  console.log(process.env.GITHUB_REF);


  await client.pulls.createReview({
    owner: context.issue.owner,
    repo: context.issue.repo,
    pull_number: context.issue.number,
    body: [
      `Examples: https://camptocamp.github.io/ngeo/${process.env.GITHUB_REF}/examples/`,
      `API documentation: https://camptocamp.github.io/ngeo/${process.env.GITHUB_REF}/apidoc/`,
    ].join('\n'),
    event: 'COMMENT'
  });
}

run();
