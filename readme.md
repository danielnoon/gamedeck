# GameDeck

Hello! This is GameDeck: a declarative approach to video games. I'm sure many people have heard of libraries like [React](https://reactjs.org/) and [Flutter](https://flutter.io), which tackle the problem of writing user interfaces in a programming language using declarative syntax. GameDeck aims to use the same principles to help you make video games in JavaScript or TypeScript.

## Declarative Programming
With declarative programming, code reflects what the rendered interface will actually look like. For example, if the UI has nested children, then so will the code. In GameDeck, this is accomplished with things called **Game Objects**, or *GObjects* for short. An entire scene is built with a hierarchy of these *GObjects* and their states.

## GameDeck Concepts
### GObjects
*GObjects* are representations of actual *things* in your game. They have positions, scales, dimensions, rotations, sprites, and more. All you have to do is return a *GObject* in your scene's `build()` method and GameDeck will render it for you. GameDeck will provide many pre-built *GObjects*. However, should you need to write your own business logic, you can make your own! Just make an extension of the `GObject` class.

### Scenes
Scenes in GameDeck make up the stateful unit of your game. Every frame, a scene's `update()` method is called. This allows you to react to inputs and adjust your state accordingly. Then, the `build()` method is called, which returns a hierarchy of `GObject`s, which is then rendered by GameDeck. Scenes may be changed at any time using `game.loadScene()`.

### Assets
In GameDeck, Assets are essentially pictures that can be drawn on the canvas. Assets are used as sprites that represent *GObjects* in 2D space. Like *GObjects*, there are included Assets that you can use in GameDeck or you can make your own.

## Further Documentation
GameDeck's API docs can be read using [LibAssist](https://github.com/Supermegadex/libassist-client) ([download](https://github.com/Supermegadex/libassist-client/releases)). The files are in `./docs`.

## Contributing
Please do!

## Roadmap
1. Add a few more built-in GObjects/Assets
2. Make a camera system
3. Create a physics system
