# Stick lang

Stick lang is a hobby project exploring a simple graphical programming language.

## Contents

- [The concept](#the-concept)
- [How to run](#how-to-run)

## The concept

You can explore a full deep dive into the concept of Stick lang [here](https://sampeach.xyz/2023/06/26/building-a-graphical-programming-language-the-concept/), but the short version is that it's based off of the lambda calculus. There are two main symbols:

- ┣┛, representing `TRUE`
- ┗┫, representing `FALSE`

These symbols can be thought of as functions that take inputs of `1` and `0` at the top and output their corresponding value. The `TRUE` symbol will always output whatever its top-left input is, with the `FALSE` symbol always outputting its top-right value.

```
// True
10
┣┛
1

// False
10
┗┫
 0
```

We can then connect these symbols in interesting ways to represent Turing complete logic. The following represents `Not(TRUE)`, or `FALSE`.

```
┗┫┣┛
 ┣┛
```

There are implicit 0's and 1's as inputs:

```
1010 // numbers added for clarity
┗┫┣┛
 01
 ┣┛
 0 (false)
```

We can abstract inputs as variables with an additional variable symbol:

```
┗┫┣┛
 ╬╬
```

We can pipe other symbols to a variable to take its place at runtime. This would evaluate as `Not(FALSE)`:

```
┗┫┣┛ ┗┫
 ╬╬━━━┛
```

You can keep combing the symbols and pipes to form whatever logic you need!

```
// And( Not(FALSE), Or(FALSE, TRUE) )

  ┣┛┗┫
  ┃┏━┛
┣┛┣┛
┃┏┛  ┣┛┗┫
┗┫   ┃┏━┛
 ┗━━━╬╣┗┫ ┗┫┣┛
     ┃┏━┛  ┗┫
     ╠╬━━━━━┛
```

## How to run

- Clone and `cd` into this repo
- run `npm install`
- run `npm run start`
- Open up the localhost link the HTTP server provides
- Draw a program
- Click the big red button to run your program
