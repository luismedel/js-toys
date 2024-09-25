# js-toys

Some small (old-shool) amusements I like to code from time to time.

No planning. No quality. Only raw coding and fun.

## clock

Clock and calendar widgets. I use it on an old phone in kiosk mode.

[Demo](https://toys.luismedel.com/clock/index.html)

![Screenshot](https://toys.luismedel.com/clock/screenshot.jpg "Screenshot")

## peg-solitaire

A peg solitaire game.

One afternoon, my daughter told me she wanted to play peg solitaire on her iPad. After searching for a very simple game on the App Store (no internet, not ads, no logins...) without luck, I ended writing her the game that same afternoon.

[Demo](https://toys.luismedel.com/peg-solitaire/index.html)

![Screenshot](https://toys.luismedel.com/peg-solitaire/screenshot.png "Screenshot")

## morph

Pixel morph effect.

[Demo](https://toys.luismedel.com/morph/index.html)

![Screenshot](https://toys.luismedel.com/morph/preview.gif "Preview")

## lens

Realtime lens effect.

[Demo](https://toys.luismedel.com/lens/index.html)

![Screenshot](https://toys.luismedel.com/lens/preview.gif "Preview")

## mesh

Basic physical simulation.

[Demo](https://toys.luismedel.com/mesh/index.html)

![Screenshot](https://toys.luismedel.com/mesh/preview.gif "Preview")

## fire

My version of the mighty [fire effect](http://www.pouet.net/prod.php?which=15071) by Jare.

[Demo](https://toys.luismedel.com/fire/index.html)

![Screenshot](https://toys.luismedel.com/fire/preview.gif "Preview")

## circular-progress-bar

An animated circular progress bar, in response of my friend's [PGCircularProgressBar](https://github.com/pablogsIO/PGCircularProgressBar).

![Screenshot](https://toys.luismedel.com/circular-progress-bar/index.html)

![Screenshot](https://toys.luismedel.com/circular-progress-bar/preview.gif "Screenshot")

## Running the demos locally

Open the included html files in order to view run the toy. But browser security is a shitshow, so some of them will require to use a web server (I don't remember which).

I included a `make` target to start a Python web server.

```sh
$ make serve
```

Open `http://localhost:8000` in your web browser and navigate the repo tree up to the html you want to open.
