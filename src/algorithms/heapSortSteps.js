export function generateHeapSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    const getValue = (item) => {
        if (typeof item === 'object' && item !== null && 'value' in item) {
            return item.value;
        }
        return item;
    };

    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            comparisons++;
            steps.push({
                type: "compare",
                array: [...arr],
                i: left,
                largest,
                message: {
                    en: `Comparing left child ${left} with root ${largest}.`,
                    id: `Membandingkan anak kiri ${left} dengan root ${largest}.`
                },
                stats: { comparisons, swaps }
            });
            if (getValue(arr[left]) > getValue(arr[largest])) {
                largest = left;
            }
        }

        if (right < n) {
            comparisons++;
            steps.push({
                type: "compare",
                array: [...arr],
                i: right,
                largest,
                message: {
                    en: `Comparing right child ${right} with largest ${largest}.`,
                    id: `Membandingkan anak kanan ${right} dengan terbesar ${largest}.`
                },
                stats: { comparisons, swaps }
            });
            if (getValue(arr[right]) > getValue(arr[largest])) {
                largest = right;
            }
        }

        if (largest !== i) {
            swaps++;
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            steps.push({
                type: "swap",
                array: [...arr],
                i,
                largest,
                message: {
                    en: `Swapping root ${i} with largest ${largest}.`,
                    id: `Menukar root ${i} dengan terbesar ${largest}.`
                },
                stats: { comparisons, swaps }
            });
            heapify(arr, n, largest);
        }
    }

    steps.push({
        type: "start",
        array: [...arr],
        message: { en: "Starting Heap Sort.", id: "Memulai Heap Sort." },
        stats: { comparisons, swaps }
    });

    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    steps.push({
        type: "heap-built",
        array: [...arr],
        message: { en: "Max heap built.", id: "Max heap telah dibangun." },
        stats: { comparisons, swaps }
    });

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        swaps++;
        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push({
            type: "extract",
            array: [...arr],
            i,
            message: {
                en: `Extracting max element to position ${i}.`,
                id: `Mengekstrak elemen maksimum ke posisi ${i}.`
            },
            stats: { comparisons, swaps }
        });
        heapify(arr, i, 0);
    }

    steps.push({
        type: "done",
        array: [...arr],
        message: { en: "Heap Sort completed.", id: "Heap Sort selesai." },
        stats: { comparisons, swaps }
    });

    return steps;
}
