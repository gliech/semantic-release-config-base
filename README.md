# [@gliech/semantic-release-config-base][1]

This repository contains a semantic-release shareable configuration, which is
supposed to serve as the basis for other shareable configurations. For this
reason it does not define a list of plugins, but instead defines various options
that plugins defined in other shareable configurations will use, if they are not
overwritten.

## Features
- Adheres closely to the [conventional commits][4] standard and uses the
  [conventional-changelog-conventionalcommits][5] preset to analyze commit
  message, but creates custom release and changelog messages more closely
  resembeling the semantic-release default format defined in the angular preset.
- Defines a bunch of non-standard commit types and how to handle them. The
  general rule is that only actual changes to the main project code will trigger
  a new release. See [commit_types.yml](commit_types.yml) for details.
- Defines a commit type **amend**, which will create a new patch release if
  pushed on its' own on a release branch, but is otherwise completely invisible.
  This is meant as a tool to create fixes for unreleased features without
  creating nonsensical changelog messages, or erasing development history by
  actually amending commits.
- Supports both **master** and **main** as repository default and release
  branch. Something that semantic-release as of major version 17 surprisingly
  does not do by default.

## Shareable configurations built on top of @gliech/semantic-release-config-base

- [@gliech/semantic-release-config-github-generic][2]
- [@gliech/semantic-release-config-github-npm][3]

## License

This project is licensed under the terms of the [BSD 4-Clause License](LICENSE)

[1]: https://www.npmjs.com/package/@gliech/semantic-release-config-base
[2]: https://www.npmjs.com/package/@gliech/semantic-release-config-github-generic
[3]: https://www.npmjs.com/package/@gliech/semantic-release-config-github-npm
[4]: https://www.conventionalcommits.org/en/v1.0.0/
[5]: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-conventionalcommits
