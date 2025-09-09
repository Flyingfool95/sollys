import { signal, Signal } from "@preact/signals";

export function persistentSignal<T>(key: string, initialValue: T, staleTime = 600000): Signal<T> {
    const s = signal<T>(initialValue);

    const getLocalStorage = (): { value: T; ts: number } | null => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    };

    const saveLocalStorage = (value: T) => {
        try {
            localStorage.setItem(key, JSON.stringify({ value, ts: Date.now() }));
        } catch {
            //
        }
    };

    const cached = getLocalStorage();
    if (cached && Date.now() - cached.ts <= staleTime) {
        s.value = cached.value;
    } else {
        saveLocalStorage(initialValue);
    }

    let initialized = false;
    s.subscribe((v) => (initialized ? saveLocalStorage(v) : (initialized = true)));

    return s;
}
