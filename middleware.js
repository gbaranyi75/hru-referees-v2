export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/calendar",
    "/dashboard/calendar/new",
    "/dashboard/calendar/edit",
    "/profil",
    "/jv-elerhetoseg",
  ],
};
