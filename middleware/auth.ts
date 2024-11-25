export default defineNuxtRouteMiddleware((to, from) => {
  console.log("auth middbleware running");
  return navigateTo("/login");
});
