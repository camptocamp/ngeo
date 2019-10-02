const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  // Get client and context
  const client = new github.GitHub(process.env.GITHUB_TOKEN);
  const context = github.context;
  console.log(context.issue);
  console.log(client.pulls);
  console.log(Object.keys(context.issue));
  console.log(Object.keys(client.pulls));

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
