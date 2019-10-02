const github = require('@actions/github');

async function run() {
  // Get client and context
  const client = new github.GitHub(process.env.GITHUB_TOKEN);

  await client.pulls.createReview({
    owner: github.context.issue.owner,
    repo: github.context.issue.repo,
    pull_number: github.context.issue.number,
    body: [
      `Examples: https://camptocamp.github.io/ngeo/${process.env.GITHUB_HEAD_REF}/examples/`,
      `API documentation: https://camptocamp.github.io/ngeo/${process.env.GITHUB_HEAD_REF}/apidoc/`,
    ].join('\n'),
    event: 'COMMENT'
  });
}

run();
