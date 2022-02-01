export function getMaxPopperHeight(anchorElement: HTMLElement | null): number | undefined {
    if (anchorElement === null) {
        return undefined;
    }

    const clientHeight = window.innerHeight ?? document.documentElement.clientHeight ?? document.body.clientHeight;
    return clientHeight - anchorElement.getBoundingClientRect().top - anchorElement.offsetHeight - 20;
}
