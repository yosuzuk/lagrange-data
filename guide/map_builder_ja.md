# 星系マップ　編集ガイド

![map example](assets/mapExample_ja.jpg)

星系マップの編集には専用のマークアップ言語を使います。

## 基本構文

基本的にはゲーム内のチャットやメールで使うテキスト構文をベースにしています。マップ編集で使う座標のフォーマットはゲーム内の「座標コピー」で得られるフォーマットと同じです（例：`(1234,1234)`）。色を指定する時もゲーム内のチャットと同じカラーコードを使います（例：`#R`、`#cFF0000`）。

各種マップコンテンツはそれぞれ一つ設置するのに１行だけ使います。ラベルなどのテキストで改行が必要な場合はゲーム内のチャットでも使う「`#r`」を使います（例：`1行目#r2行目`）。

ゲーム内で使われている構文に合わせることでコンテンツの一部を双方向にコピー＆ペーストできます。

マップコンテンツの配置には特定のキーワードを使います。キーワードの後に続く行は別のキーワードが指定されるまで同じコンテンツとして扱われます。例えば複数のマーカーを設置する際には「`$marker`」キーワードを一度だけ指定して、後に続く行は座標だけで足ります。

例：

```
$marker
(1020,2020)
(1020,3040)
$planet
(1234,5678)
(8765,4321)
```

（マーカー用の座標が二つ、惑星用の座標が二つ）

使用したキーワードによってその後に続く行の構文が変化します（例えばマーカーの場合は座標が求められます）。構文を無視したコメントはダブルスラッシュの後に書けます。

例：

```
$marker // これはコメント
// この行はコメント
(1020,2020) // これもコメント
```

## キーワード一覧

- `$marker` （マーカー）
- `$region` （区域）
- `$planet` （惑星）
- `$station` （スペースステーション/都市/防衛拠点など）
- `$base` （プレイヤー基地）
- `$outpost` （前哨基地）
- `$platform` （採掘プラットフォーム）
- `$name` （マップ名）
- `$serverName` （サーバー名/星系名）
- `$size` （マップサイズ）

各キーワードに続く行の構文に関しては以下で個別に説明します。

## Marker

![marker example](assets/markerExample.jpg)

Syntax:

```
$marker
<point> [<color>] [<label>]
```

You can place markers after the `$marker` keyword. Each marker needs to be a new line. Colors and labels are optional. 

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

![region example](assets/regionExample.jpg)

Syntax:

```
$region
<point><point><point><point> <number> [<color>] [<organization>]
```

You can place regions after the `$region` keyword. Each region needs to be a new line and requires four coordinates, a background color and a region number. The "organization" label is optional.

Coordinates need to be in the following order:
- a point to mark the inner radius
- a point to mark the outer radius
- a point to mark the start angle
- a point to mark the end angle

These coordinates do not necessarily have to touch the region area. For example, you can use the same coordinates for all regions that share the same radius.

Example:

```
$region
(4653,3802)(3321,2851)(5610,3101)(2838,4696) 7 #c87372C 2nd Thornbird Squad
(4927,4483)(4653,6087)(4324,5779)(5398,3401) 8 #c694226 Icarus's Energy Dept.
```

## Planets

![planet example](assets/planetExample.jpg)

Syntax:

```
$planet
<point>[<point>] [<size>] [<color>] [<name>]
```

You can place planets after the `$planet` keyword. The optional second point marks the center of the orbit. "size", "color" and "name" are optional. "size" can be one of `large`, `medium`, `small` and defaults to `medium`.

Example:

```
$planet
(4340,4143)
(3814,4207) Fafner
(3978,3380) large #B Jade
(4053,3222)(3978,3380) small #W Roc
```

## Space Stations

![station example](assets/stationExample.jpg)

Syntax:

```
$station
<point>[<point><point>] [<type>] [<level>] [<color>] [<name>]
```

You can place various types of space stations after the `$station` keyword. "type" can be one of `city`, `subCity`, `stronghold`, `dock` or `default` if specified. "level" is optional but should be specified for type `city` in order to have the right icon and visibility based on zoom level.

Two additional points can be specified to mark the area around the station. A station of type `dock` with an explicit "level" will automatically mark a 1x1 area. 

Player bases, outposts and mining platforms have their own dedicated keyword (`$base`, `$outpost` and `$platform`). `$station` is mostly used for creating cities and miscellaneous NPC stations.

Example:

```
$station
(8530,4929) city 3 Koga
(4096,3591)(4010,3571)(4130,3690) city 6 #c0077FF Meroe Volante
(4090,3616) subCity 5 #c0077FF Belz
(4082,3610) stronghold #c0077FF
```

## Player Bases

![base example](assets/baseExample.jpg)

Syntax:

```
$base
<point> [<color>] [<name>]
```

You can place player bases after the `$base` keyword. The given point is automatically rounded to fit the base onto the grid. Bases are only visible at a certain zoom level.

## Player Outposts

Syntax:

```
$outpost
<point> [<color>] [<name>]
```

You can place player outposts after the `$outpost` keyword. Each line will place a 1x1 area and a space station with an outpost icon.

## Mining Platforms

![base example](assets/platformExample.jpg)

Syntax:

```
$platform
<point> <type> [<color>] [<name>]
```

You can place mining platforms after the `$platform` keyword. Each platform needs at least a center point and a type. The given point will be rounded to fit the platform onto the grid. "type" can be one of `basic`, `intermediate`, `advanced` or in short form `bmp`, `imp` or `amp`. The station will have a default name based on the given type. An optional "name" can be provided to override the type specific default name. Each line will place a 2x2 area and a space station with a platform type specifc icon.  

## Basic map properties

Syntax:

```
$name <name>
$serverName <name>
$size <size>
```

Basic map properties are optional.

Use the `$name` keyword to give your map a name for the map selection screen.

Use the `$serverName` keyword to name the server / star system. The server name gets displayed at the center of your map, below the sun.

Use the `$size` keyword to specify the overall map size. Most maps have a "size" of 9000, which is also the default value if no size is specified. You can find the size by checking the top right corner coordinate of your map. The given size will also determine the center point of your star system, e.g. "(4500,4500)" for a size of 9000. The sun will be placed at the center point, with the given server name as label if specified.

Example:

```
$name My Awesome Map
$serverName V1357 Leo
$size 9000
```

## Colors

Chat colors:

![red](assets/colors/FF0000.png) #R
![blue](assets/colors/0000FF.png) #B
![gold](assets/colors/FFD700.png) #D
![green](assets/colors/008000.png) #G
![black](assets/colors/000000.png) #K
![orange](assets/colors/FFA500.png) #O
![pink](assets/colors/FFC0CB.png) #P
![purple](assets/colors/800080.png) #U
![white](assets/colors/FFFFFF.png) #W
![yellow](assets/colors/FFFF00.png) #Y
![hex](assets/colors/00BBFF.png) #c00BBFF (hex color)

Example player colors:

![4D85BE](assets/colors/4D85BE.png) #c4D85BE
![BA6E34](assets/colors/BA6E34.png) #cBA6E34
![40C0C3](assets/colors/40C0C3.png) #c40C0C3
![BE393A](assets/colors/BE393A.png) #cBE393A
![CC3FA5](assets/colors/CC3FA5.png) #cCC3FA5
![B4C402](assets/colors/B4C402.png) #cB4C402
![5854A1](assets/colors/5854A1.png) #c5854A1

Example region colors:

![87372C](assets/colors/87372C.png) #c87372C
![873E2C](assets/colors/873E2C.png) #c873E2C
![985036](assets/colors/985036.png) #c985036
![694226](assets/colors/694226.png) #c694226
![625828](assets/colors/625828.png) #c625828

(actual region colors have an alpha value added based on zoom level)

Default colors:

![985036](assets/colors/985036.png) regions (#c)
![E3A06D](assets/colors/E3A06D.png) planets (#cE3A06D)
![4D85BE](assets/colors/4D85BE.png) player (#c4D85BE)
![D0AE55](assets/colors/D0AE55.png) areas & stations (#cD0AE55)

## コードエディタ

![editor](assets/editor_ja.jpg)

TODO

## Backend

TODO
