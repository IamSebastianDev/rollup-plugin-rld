/** @format */

export const injectable = (port: number | string, host: string, url: string) => {
    // Return early if there is no window or document or the script tag already exists.
    if (!window || !document) return;
    if (document.head.querySelector(`[url=${url}]`)) return;

    const script = document.createElement('script');
    script.setAttribute('url', url);
    script.textContent = `new EventSource('http://${host}:${port}/${url}').addEventListener('message', (ev) => JSON.parse(ev.data).rld && window.navigation.reload());`;

    // Inject a comment before the script tag to mark the script as useful
    document.head.appendChild(document.createComment(' Script injected by Rollup-Plugin-Rld '));
    document.head.appendChild(script);
};
