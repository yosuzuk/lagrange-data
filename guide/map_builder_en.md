# Map Builder Syntax

The map builder uses a similar syntax to the in-game chat and mail. This allows us to easily copy & paste content into both directions.

## Marker

![marker example](markerExample.jpg)

Syntax:

```
$marker
(x,y) [#<color>] [<label>]
```

You can place multiple markers after the `$marker` keyword. Each marker needs to be a new line. Colors and labels are optional. 

「`$marker`」キーワードの後に複数のマーカーを配置できます。各マーカーは新しい行に指定する必要があります。オプションで色とラベルが指定できます。

Example:

```
$marker
(1020,2020)
(1020,3040)
(2040,2020) Gather here
(2040,3040) Target
(3060,2020) #D Gold
(3060,3040) #c00FF00 Hex Color #00FF00
(4080,2020) 集合場所
```

(available colors are listed in the "Colors" section below)

## Regions

Syntax:

```
$region
(x,y)(x,y)(x,y)(x,y) #<color> <number> [<organization>]
```

You can place multiple regions after the `$region` keyword. Each region needs to be a new line and requires four coordinates, a background color and a region number. The "organization" label is optional.

Coordinates need to be in the following order:
- a point to mark the inner radius
- a point to mark the outer radius
- a point to mark the start angle
- a point to mark the end angle

(choose start and end in clock-wise direction)

Example:

```
(1000,5000)(0,5000)(6000,1000)(1000,6000) #cFF00FF 1 The ruling union
(2000,5000)(1000,5000)(9000,6000)(6000,1000) #cFF00FF 2 Some big alliance
```

## Colors

```
#c	Hex code color (i.e. #cFF00FF)
#B	Blue
#D	Gold
#G	Green
#K	Black
#O	Orange
#P	Pink
#R	Red
#U	Purple
#W	White
#Y	Yellow
```
