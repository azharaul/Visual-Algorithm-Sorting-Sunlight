export function generateSelectionSortSteps(inputArray) {
    if (!inputArray || inputArray.length === 0) return [];

    const arr = [...inputArray];
    const steps = [];

    steps.push({
        type: "start",
        array: [...arr],
        message: { en: "Starting Selection Sort.", id: "Memulai Selection Sort." },
    });

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        steps.push({
            type: "select",
            i,
            minIndex,
            array: [...arr],
            message: {
                en: `Selecting index ${i} as initial minimum.`,
                id: `Memilih indeks ${i} sebagai minimum awal.`
            },
        });

        for (let j = i + 1; j < n; j++) {
            steps.push({
                type: "compare",
                i,
                j,
                minIndex,
                array: [...arr],
                message: {
                    en: `Comparing index ${j} with current minimum at index ${minIndex}.`,
                    id: `Membandingkan indeks ${j} dengan minimum saat ini di indeks ${minIndex}.`
                },
            });

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                steps.push({
                    type: "new-min",
                    i,
                    minIndex,
                    array: [...arr],
                    message: {
                        en: `New minimum found at index ${minIndex}.`,
                        id: `Minimum baru ditemukan di indeks ${minIndex}.`
                    },
                });
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

            steps.push({
                type: "swap",
                i,
                minIndex,
                array: [...arr],
                message: {
                    en: `Swapping index ${i} with index ${minIndex}.`,
                    id: `Menukar indeks ${i} dengan indeks ${minIndex}.`
                },
            });
        } else {
            steps.push({
                type: "noswap",
                i,
                array: [...arr],
                message: {
                    en: `Index ${i} already has the minimum value.`,
                    id: `Indeks ${i} sudah memiliki nilai minimum.`
                },
            });
        }
    }

    steps.push({
        type: "done",
        array: [...arr],
        message: { en: "Selection Sort completed.", id: "Selection Sort selesai." },
    });

    return steps;
}
