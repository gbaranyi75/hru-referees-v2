export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/calendar", "/dashboard/calendar/new", "/dashboard/calendar/edit", "/profile", "/jv-elerhetoseg"],
};
