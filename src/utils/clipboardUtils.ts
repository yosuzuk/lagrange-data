export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        console.error(e);
    }
}
