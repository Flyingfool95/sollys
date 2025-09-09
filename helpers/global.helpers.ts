import { signal, Signal } from "@preact/signals";

export function persistentSignal<T>(key: string, initialValue: T, staleTime = 600000): Signal<T> {
    const s = signal<T>(initialValue);

    const getSignalFromLocalStorage = (): { value: T; ts: number } | null => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    };

    const saveSignalInLocalStorage = (value: T) => {
        try {
            localStorage.setItem(key, JSON.stringify({ value, ts: Date.now() }));
        } catch {
            //
        }
    };

    /* Checking if cache exist and if it is stale */
    const cached = getSignalFromLocalStorage();
    cached && Date.now() - cached.ts <= staleTime ? (s.value = cached.value) : saveSignalInLocalStorage(initialValue);

    /* Skip first run to avoid overwriting cached value */
    let initialized = false;
    s.subscribe((v) => (initialized ? saveSignalInLocalStorage(v) : (initialized = true)));

    return s;
}
