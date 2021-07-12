Contributing to ngeo

Thanks for your interest in contributing to the GeoMapFish project.

## Asking Questions

When you want to get involved and discuss new features or changes, please contact the
[GeoMapFish user group](https://geomapfish.org/).

## Submitting Bug Reports

Please use the [GitHub issue tracker](https://github.com/camptocamp/ngeo/issues). Before creating a
new issue, do a quick search to see if the problem has been reported already.

## Contributing Code

See [`DEVELOPING.md`](https://github.com/camptocamp/ngeo/blob/master/DEVELOPING.md) to learn how to
get started developing.

Our preferred means of receiving contributions is through
[pull requests](https://help.github.com/articles/using-pull-requests). Make sure that your pull request
follows our pull request guidelines below before submitting it.

This page describes what you need to know to contribute code to c2cgeopoertal as a developer.

## Contributor License Agreement

Your contribution will be under our
[license](https://raw.githubusercontent.com/camptocamp/ngeo/master/LICENSE.md) as per
[GitHub's terms of service](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license).

## Pull request guidelines

Before working on a pull request, create an issue explaining what you want to contribute. This ensures that
your pull request won't go unnoticed, and that you are not contributing something that is not suitable for
the project. Once a core developer has set the `pull request accepted` label on the issue, you can submit a
pull request. The pull request description should reference the original issue.

Your pull request must:

- Follow ngeo's coding style (as checked by the Continuous Integration system).

- Pass the integration tests run automatically by the Continuous Integration system.

- Address a single issue or add a single item of functionality.

- Contain a clean history of small, incremental, logically separate commits, with no merge commits.

- Use clear commit messages.

- Be possible to merge automatically.

### Address a single issue or add a single item of functionality

Please submit separate pull requests for separate issues. This allows each to be reviewed on its own merits.

### Contain a clean history of small, incremental, logically separate commits, with no merge commits

The commit history explains to the reviewer the series of modifications to the code that you have made and
breaks the overall contribution into a series of easily-understandable chunks. Any individual commit should
not add more than one new class or one new function. Do not submit commits that change thousands of lines
or that contain more than one distinct logical change. Trivial commits, e.g. to fix lint errors, should be
merged into the commit that introduced the error. See the
[Atomic Commit Convention on Wikipedia](http://en.wikipedia.org/wiki/Atomic_commit#Atomic_Commit_Convention)
for more detail.

`git apply --patch` and `git rebase` can help you create a clean commit history.
[Reviewboard.org](http://www.reviewboard.org/docs/codebase/dev/git/clean-commits/)
and [Pro GIT](http://git-scm.com/book/en/Git-Tools-Rewriting-History) explain how to use them.

### Use clear commit messages

Commit messages should be short, begin with a verb in the imperative, and
contain no trailing punctuation. We follow
http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
for the formatting of commit messages.

Git commit messages should look like:

    Header line: explaining the commit in one line

    Body of commit message is a few lines of text, explaining things in more detail, possibly giving some
    background about the issue being fixed, etc etc.

Please keep the header line short, no more than 50 characters.

### Be possible to merge automatically

Occasionally other changes to `master` might mean that your pull request cannot be merged automatically.
In this case you may need to rebase your branch on a more recent `master`, resolve any conflicts, and
`git push --force` to update your branch so that it can be merged automatically.

### Code of contuct

Contributors to GeoMapFish are expected to act respectfully toward others in accordance with the
https://www.contributor-covenant.org/ for open source projects.
