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
(1000,2000)
(1000,2020)
(1020,2000) Gather here
(1020,2020) Target
(1040,2000) #R Red
(1040,2020) #c00FF00 Hex Color
```

(available colors are listed in the "Colors" section below)

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
