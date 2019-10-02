const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  // Get client and context
  const client = new github.GitHub(process.env.GITHUB_TOKEN);
  const context = github.context;
  for (const commit in client.pulls.listCommits()) {
    console.log(Object.keys(commit));
    console.log(commit);
  }

  await client.pulls.createReview({
    owner: context.issue.owner,
    repo: context.issue.repo,
    pull_number: context.issue.number,
    body: [
      `Examples: https://camptocamp.github.io/ngeo/${client.issues}/examples/`,
      `API documentation: https://camptocamp.github.io/ngeo/${client.pulls}/apidoc/`,
    ].join('\n'),
    event: 'COMMENT'
  });
}

run();
