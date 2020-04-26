# Hello Pixi
*(Yet another PixiJS + Typescript + Webpack boilerplate)*

## This is meant to be used with Yarn 🐱 
*(however you should be able to use npm)*

### This boilerplate includes:
- PixiJS v5 *(the thing you came for)*
- Typescript *(making javascript a better place)*
- Webpack *(will make all your code into an ugly ball)*
  - Webpack Dev Server *(will host said ugly ball to debug locally)*
  - HTML Webpack Plugin *(will help your code have an index.html)* 
  - Copy Webpack Plugin *(will copy your assets to your build)*
- ESLint *(will force your code to be pretty)*
  - ESLint Typescript *(will make ESLint actually work for typescript)*
  - ESLint Prettier *(will force your code to be prettier!)*
- .gitIgnore and .gitAttributes *(my paranoid approach to configuring git)*

## How to use:

**Step 0:** Get Yarn (classic). https://classic.yarnpkg.com/lang/en/  
Honestly I don't know exactly why it is better than npm but it has a cute kitty, I am sold

**Step 1:** Clone the repo (or download as ZIP)

**Step *1.5:*** If you cloned the repo, detach yourself (delete the .git folder).

**Step 2:** Run `yarn install` (or if you are a rebel, `npm install`)

**You are done**  

Now you can run `yarn run test` to build, start watching your source code (rebuilds when you save) open a `localhost:3000` server so you can test in your own browser!

Try `yarn run build` to make a build in a folder called `build`. You can cut this folder since your assets were copied from your assets folder. No more keeping your assets in the dist folder like a caveman!

Finally, try `yarn run lint` to make your code look prettier.

---

*I tried to leave comments in every configuration file to shed some insight about my mad programmer head. Don't be afraid to poke around the configuration files*

## Recommended VSCode extensions:
- ESLint *(to have VSCode tell you how ugly your code is)*
  - **AVOID THE PRETTIER EXTENSION!** I made Prettier work through ESLint, having a prettier extension will make ESLint go bananas.
- IntelliCode *(like your phone autocomplete but for your code)*
- TS/JS postfix completion *(some cool shortcuts and templates)*
- Git Graph *(turns vscode into a mean git machine)*
- IP Address *(shows your local ip address making it easy to share what you are testing in a lan environment like an office.)*
- Comments in Typescript *(create automatic comment blocks when you hit `/**`)*

## Things I considered but ultimately left out
- Tweens (tween.js)
- Webfont Loader (webfontloader)
- Pixi-Sound (pixi-sound)
- Atlas Packer (free-tex-packer)
- Code Minifer / Uglifier (terser-webpack)
- Image compressor (imagemin)
- Stats (gstats)
