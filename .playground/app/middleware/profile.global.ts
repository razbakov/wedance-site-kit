// ?profile=<username> serves that profile's site for this request — the same
// call the hosted app (wedance-sites) makes from the address.
export default defineNuxtRouteMiddleware((to) => {
  if (typeof to.query.profile === 'string' && to.query.profile) setWeDanceProfile(to.query.profile)
})
