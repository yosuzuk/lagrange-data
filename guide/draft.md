## Player Outposts

Syntax:

```
$outpost
<point> [<color>] [<name>]
```

You can place player outposts after the `$outpost` keyword. Each line will place a 1x1 area and a space station with an outpost icon.

## Mining Platforms

Syntax:

```
$platform
<point> <type> [<color>] [<name>]
```

You can place mining platforms after the `$platform` keyword. Each platform needs at least a center point and a type. The given point will be rounded to fit the platform onto the grid. "type" can be one of `basic`, `intermediate`, `advanced` or in short form `bmp`, `imp` or `amp`. The station will have a default name based on the given type. An optional "name" can be provided to override the type specific default name. Each line will place a 2x2 area and a space station with a platform type specifc icon.  
