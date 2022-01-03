# sticky-table

Sticky elements help users keep a sense of perspective when scrolling through long lists.

## Demo

https://ppiyush13.github.io/sticky-table/

## Features

- An overflowing table of columns and rows with sticky headings on a page.
- Headings stick to the top while scrolling on the document window.
- Able to scroll horizontally within the overflowing container with first column being sticky.
- Handle huge data without lag

## Install

Try on your machine by first installing all the dependencies

```shell
npm install
```

and then start local server

```shell
npm start
```

## Challenges

When working with overflows, sticky element doesn't appear so sticky after all. The browser doesn’t seem to be respecting position: sticky; once we add overflow to the mix.

The issue with overflows is…

> that a sticky element “sticks” to its nearest ancestor that has a “scrolling mechanism” (created when overflow is hidden, scroll, auto, or overlay), even if that ancestor isn’t the nearest actually scrolling ancestor. This effectively inhibits any “sticky” behavior. (From MDN Web Docs)

## Solutions

1. Add a fixed height

   - Adding fixed height to the scrolling container will solve the problem.
   - This is not what we want since it degrades user experience as table occupies only fixed(limited) part of the viewport.

1. Sync scrolling of header and body

   - Another approach is to make table header and body scroll vertically in their own separate containers and sync their scrolling when the counterpart scrolls.
   - This solution works fine in desktop browser, but scrolling behavior is not smooth on mobile devices.

1. Suggested solution

   - Enhancing second approach further, we will disable native browser scrolling on both the header and body containers.
   - We will use `iScroll` to create virtual scroller.
   - Then sync the scrolling of header and body on the scroll of iScroll virtual scroller.
   - `react-virtuoso` is used to make table scroll on window scrolling and virtualize table records to render huge data smoothly.

## License

MIT © Piyush Lodaya
