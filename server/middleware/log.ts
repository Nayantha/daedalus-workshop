export default defineEventHandler((event) => {
    console.log('New request: ' + getRequestURL(event));
    console.log('Request received at:', new Date().toISOString());
    console.log('Path:', event.path);
})
