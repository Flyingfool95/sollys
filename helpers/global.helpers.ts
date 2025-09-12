import { useState, useEffect } from "preact/hooks";
import { signal, Signal } from "@preact/signals";

// Persist storage helpers
type Stored<T> = { value: T; ts?: number };

function loadFromStorage<T>(key: string): Stored<T> | null {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveToStorage<T>(key: string, value: T, staleTime: number | null | typeof Infinity) {
    try {
        if (staleTime === null || staleTime === Infinity) {
            localStorage.setItem(key, JSON.stringify({ value }));
        } else {
            localStorage.setItem(key, JSON.stringify({ value, ts: Date.now() }));
        }
    } catch {
        // ignore
    }
}

function resolveInitial<T>(key: string, initialValue: T, staleTime: number | null | typeof Infinity): T {
    const cached = loadFromStorage<T>(key);

    if (cached) {
        if (staleTime === null || staleTime === Infinity || (cached.ts && Date.now() - cached.ts <= staleTime)) {
            return cached.value;
        }
    }

    saveToStorage(key, initialValue, staleTime);
    return initialValue;
}

// Signal version
export function persistentSignal<T>(
    key: string,
    initialValue: T,
    staleTime: number | null | typeof Infinity = 600_000
): Signal<T> {
    const s = signal<T>(resolveInitial(key, initialValue, staleTime));

    let initialized = false;
    s.subscribe((v) => {
        if (initialized) saveToStorage(key, v, staleTime);
        else initialized = true;
    });

    globalThis.addEventListener("storage", (e) => {
        if (e.key === key && e.newValue) {
            try {
                const parsed = JSON.parse(e.newValue);
                if (parsed?.value !== undefined) s.value = parsed.value;
            } catch {
                // ignore
            }
        }
    });

    return s;
}

// Hook version
export function usePersistentState<T>(
    key: string,
    initialValue: T,
    staleTime: number | null | typeof Infinity = 600_000
): [T, (value: T | ((prev: T) => T)) => void] {
    const [state, setState] = useState<T>(() => resolveInitial(key, initialValue, staleTime));

    useEffect(() => {
        saveToStorage(key, state, staleTime);
    }, [key, state, staleTime]);

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (parsed?.value !== undefined) setState(parsed.value);
                } catch {
                    // ignore
                }
            }
        };
        globalThis.addEventListener("storage", onStorage);
        return () => globalThis.removeEventListener("storage", onStorage);
    }, [key]);

    return [state, setState];
}

// Plain API version
export function persistentStorage<T>(key: string) {
    return {
        get: (): T | null => {
            const cached = loadFromStorage<T>(key);
            return cached?.value ?? null; // return null if nothing is stored
        },
        set: (value: T, staleTime: number | null | typeof Infinity = 600_000) => saveToStorage(key, value, staleTime),
        remove: () => {
            try {
                localStorage.removeItem(key);
            } catch {
                // ignore
            }
        },
    };
}
