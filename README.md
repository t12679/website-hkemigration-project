# GitHub repository for HK Emigration Project

This repository stores (separately) files used by each programming teams in the **HK Emigration Project**. Each team can add a `README` in their subfolders describing the structure of their work, important notes, and so on. This `README` mainly describe the *basic structure* of the entire repository, along with instructions to setup SSH keys for Git, as this is a private repository. Its target is anyone related to this project, and its aim for everyone, newcomers especially, to quickly and accurately gain an understanding of this project.

## Repository structure

Since its update in 28/2/2024, this repository has been restructured to a directory with three subfolders, one for each team in this project[^1].

The three subfolders refers to the three teams respectively: **data management**, **text scraping** and **webpage design**. Please don't put the *structure* and *details* for each folder in this page. Put them in a separate `README.md` within the subfolder. The management of each subfolder is left to each team.

## Using Git and/or GitHub

If you're using editors with builtin GitHub support, this section is irrelevant; simply sign in and clone (if not already done) the repository, and continue the normal Git routine.

If and only if anyone does not know both GitHub and Git, and is not using GitHub-supporting editors is this section relevant[^2].

1. [Download Git.](https://git-scm.com/download)
2. Configure an **SSH key for authentication** locally, following [this GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys) and [its next part](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
3. Add the key to your GitHub settings, again following [a GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).
4. The `git` CLI is now usable. Clone this repository:
```bash
git clone git@github.com:t12679/hkemigration-project
```
To `commit` and `push`, make sure to configure your user name and email:
```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```


[^1]: Originally, this folder was created by the webpage design team, which used ReactJS.
[^2]: It's assumed that most collaborators possess basic knowledge of Git and GitHub, but this is just in case someone isn't.
