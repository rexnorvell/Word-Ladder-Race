# Rex's Word Ladder Race!

## Introduction

Welcome to Rex's Word Ladder Race! A "word ladder" is a series of equal-length words that differ by only one letter. For example, Pork > Park > Bark > Barn is a word ladder! In this game, the user is given a list of definitions corresponding to four-letter words. The user must guess the words corresponding to the definitions as quickly as possible, with the time stopping once all words have been guessed. Users can race against others to achcieve the fastest times and reach the top of the global leaderboard! To play, visit the GitHub Pages deployment at [this link](https://rexnorvell.github.io/Word-Ladder-Race/#/home)!

![Rex's Word Ladder Race Logo](frontend/src/assets/images/logo.png)

## Technical Details

This is a full stack web application with a React + TypeScript frontend and a Cloudflare Workers + SQLite DB backend. The frontend is deployed on GitHub Pages and the backend is deployed on Cloudflare. Both deployments have automated GitHub Actions triggers. The application features user authentication, session handling, and a global online leaderboard.
