const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  // Get client and context
  const client = new github.GitHub(
    core.getInput('repo-token', {required: true})
  );
  const context = github.context;
  console.log(context.issue.owner);
  console.log(context.issue.repo);
  console.log(context.issue.number);
  console.log(client.issues);
  console.log(client.pulls);
  console.log(context.issue);
  console.log(Object.keys(client.issues));
  console.log(Object.keys(client.pulls));
  console.log(Object.keys(context.issue));

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
