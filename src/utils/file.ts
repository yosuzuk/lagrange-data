export async function downloadJson(json: string, filename: string) {
    await downloadFile(json, 'application/json', filename.endsWith('.json') ? filename : `${filename}.json`);
}

async function downloadFile(data: string, type: string, filename: string) {
    const file = new Blob([data], {
        type,
    });

    if (supportsShowSaveFilePicker()) {
        try {
            const handle = await showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    accept: {
                        'application/json': ['.json']
                    },
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(file);
            await writable.close();
            return;
        } catch (e) {
            const error = e as Error;
            if (error.name !== 'AbortError') {
                console.error(error.name, error.message);
                return;
            }
        }
        return;
    }

    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);
}

export async function openJson<T>(): Promise<T | null> {
    if (!supportsShowOpenFilePicker()) {
        return null;
    }

    let serializedContent: string | null = null;
    try {
        const [fileHandle] = await showOpenFilePicker({
            types: [
                {
                    accept: {
                        'application/json': ['.json'],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false
        });

        const file = await fileHandle.getFile();
        serializedContent = await file.text();
    } catch (e) {
        const error = e as Error;
        if (error.name !== 'AbortError') {
            console.error(error.name, error.message);
        }
    }

    if (serializedContent === null) {
        return null;
    }

    try {
        const deserialized = JSON.parse(serializedContent);
        return deserialized as T;
    } catch (e) {
        console.error(e);
        return null;
    }
}

function supportsShowSaveFilePicker(): boolean {
    return 'showSaveFilePicker' in window && isNotInIFrame();
}

export function supportsShowOpenFilePicker(): boolean {
    return 'showOpenFilePicker' in window && isNotInIFrame();
}

function isNotInIFrame(): boolean {
    return (() => {
        try {
          return window.self === window.top;
        } catch {
          return false;
        }
    })();
}

async function showSaveFilePicker(...args: any) {
    // @ts-ignore
    return window.showSaveFilePicker(...args);
}

async function showOpenFilePicker(...args: any) {
    // @ts-ignore
    return window.showOpenFilePicker(...args);
}
