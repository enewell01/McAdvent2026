# Blocky Advent 2026

A Minecraft-styled Christmas advent calendar with one challenge a day from
November 1 to December 25, 2026, each at Easy, Medium and Hard. Doors open by
themselves at midnight in the viewer's local time, and future doors stay shut
and hide their challenge type.

Built with Vite and vanilla TypeScript. There is no backend: progress is saved
in the browser's localStorage.

Fan project. Not affiliated with Mojang or Microsoft.

## Local development

You need Node 20 or newer.

```bash
npm install
npm run dev
```

To check the production build, including offline support:

```bash
npm run build
npm run preview
```

Vite prints the address to open. It ends in the repo name, for example
`http://localhost:4173/McAdvent2026/`.

## Publishing on GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open Settings → Pages and set Source to GitHub Actions.
3. Push to `main`, or run the workflow from the Actions tab.

The site appears at `https://<your-username>.github.io/<repo-name>/`.

The deploy workflow reads the repo name and owner from GitHub, so paths and
social preview links stay correct whatever you call the repo. `REPO_NAME` in
`vite.config.ts` is only used for local builds.

## Editing challenges

Challenges live in `src/challenges.ts`, in date order: the first entry is
November 1 and the last is December 25. Keep the list at 55 entries, one per
door, each with all three difficulties.

```ts
{
  type: "build",
  easy: { title: "Cozy Cabin", challenge: "Build a spruce log cabin...", tip: "Hay bale under..." },
  medium: { title: "...", challenge: "...", tip: "..." },
  hard: { title: "...", challenge: "...", tip: "..." },
},
```

`type` sets the block texture and label: `build`, `survive`, `explore`, `ice`,
`redstone`, `nether` or `festive`.

A door counts toward the XP bar once any of its three challenges is complete.

The server addresses are in the join banner in `index.html` and in the server
details in `bedrock.html`, which is the guide for joining from a console.

## Peeking

Future doors can't be opened from the page. To bring back the "Peek at future
doors" toggle, set `PEEK_ENABLED` to `true` at the top of `src/main.ts`.

The lock is there to keep the surprise, not to keep a secret. This is a static
site, so all the challenges ship to the browser, and changing the device clock
opens more doors.

## Animations

Snow, twinkling lights and the sleigh are on by default for everyone. Devices set
to reduce motion also get a "Turn off snow and animations" button.

## Images

The icons and `public/og-image.png` are drawn by `scripts/make-images.mjs`. Run
`npm run images` to redraw them.
