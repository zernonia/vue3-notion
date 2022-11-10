export default defineEventHandler((event) => {
  event.res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate");
});
