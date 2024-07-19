export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/profil", "/jv-elerhetoseg"],
  /* matcher: [
    "/dashboard",
    "/dashboard/calendar",
    "/dashboard/calendar/new",
    "/dashboard/calendar/edit",
    "/profil",
    "/jv-elerhetoseg",
  ], */
};
