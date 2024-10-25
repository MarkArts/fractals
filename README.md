# fractals

Some random fractal programming

## Mandelbox

A Three.js implementation of a mandelbox:

<img src="https://github.com/MarkArts/fractals/blob/master/mandelbox/screens/1.PNG?raw=true" width="400"> <img src="https://github.com/MarkArts/fractals/blob/master/mandelbox/screens/2.PNG?raw=true" width="400"> <img src="https://github.com/MarkArts/fractals/blob/master/mandelbox/screens/rec2.PNG?raw=true" width="400"> <img src="https://github.com/MarkArts/fractals/blob/master/mandelbox/screens/rec3.PNG?raw=true" width="400">

- [Mobile friendly link](https://markarts.github.io/fractals/mandelbox/index.html#detail=50;cameraX=3;cameraY=3;cameraZ=3;boxSize=5)
- [Not so mobile friendly](https://markarts.github.io/fractals/mandelbox/index.html#detail=100;cameraX=3;cameraY=3;cameraZ=3;boxSize=5;scale=3;escape=3.5)
- [Very heavy link beware of it crashing your browser](https://markarts.github.io/fractals/mandelbox/index.html#detail=300;cameraX=3;cameraY=3;cameraZ=3;boxSize=5;scale=3;escape=2)

You can set the following options in the hash of the url to change the fractal (#option=value;nextoption=value)

```javascript
{
  #Mandelbox options
  "fixedradius":1,
  "minradius":0.5,
  "scale":-1.25,
  "escape":0.2,
  "depth":5,

  # Amount of cubes to render (exponential performance hit)
  "detail":200,

  # Start camera of the fractal (for sharing epic screens)
  "cameraX":2,
  "cameraY":2,
  "cameraZ":2,

  # Dimensions containing the cubes to render (0,5,5) would for example render only the right half of the initial box
  "boxX":0,
  "boxY":0,
  "boxZ":0,
  "boxSize":10
}
```

## Tree

A fractal based on breaking a straight line in two (creating a tree structure)
[Try it here](http://thomassio.nl/mark/fractals/tree/)

## Circles

Very basic fractal demo with circles breaking into smaller ones
[Try it here](http://thomassio.nl/mark/fractals/circles/)
