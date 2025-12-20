export function generateQuickSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];

    function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSortHelper(arr, low, pi - 1);
            quickSortHelper(arr, pi + 1, high);
        }
    }

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        steps.push({
            type: "pivot",
            array: [...arr],
            pivotIndex: high,
            message: {
                en: `Choosing pivot at index ${high} with value ${pivot}.`,
                id: `Memilih pivot di indeks ${high} dengan nilai ${pivot}.`
            },
        });

        for (let j = low; j < high; j++) {
            steps.push({
                type: "compare",
                array: [...arr],
                i: j,
                pivotIndex: high,
                message: {
                    en: `Comparing index ${j} with pivot.`,
                    id: `Membandingkan indeks ${j} dengan pivot.`
                },
            });

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({
                    type: "swap",
                    array: [...arr],
                    i,
                    j,
                    pivotIndex: high,
                    message: {
                        en: `Swapping index ${i} and ${j}.`,
                        id: `Menukar indeks ${i} dan ${j}.`
                    },
                });
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({
            type: "pivot-swap",
            array: [...arr],
            pivotIndex: i + 1,
            message: {
                en: `Placing pivot at correct position ${i + 1}.`,
                id: `Menempatkan pivot di posisi yang benar ${i + 1}.`
            },
        });

        return i + 1;
    }

    steps.push({
        type: "start",
        array: [...arr],
        message: { en: "Starting Quick Sort.", id: "Memulai Quick Sort." },
    });

    quickSortHelper(arr, 0, arr.length - 1);

    steps.push({
        type: "done",
        array: [...arr],
        message: { en: "Quick Sort completed.", id: "Quick Sort selesai." },
    });

    return steps;
}
