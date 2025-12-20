export function generateHeapSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];

    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            steps.push({
                type: "compare",
                array: [...arr],
                i: left,
                largest,
                message: `Comparing left child ${left} with root ${largest}.`,
            });
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            steps.push({
                type: "compare",
                array: [...arr],
                i: right,
                largest,
                message: `Comparing right child ${right} with largest ${largest}.`,
            });
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            steps.push({
                type: "swap",
                array: [...arr],
                i,
                largest,
                message: `Swapping root ${i} with largest ${largest}.`,
            });
            heapify(arr, n, largest);
        }
    }

    steps.push({
        type: "start",
        array: [...arr],
        message: "Starting Heap Sort.",
    });

    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    steps.push({
        type: "heap-built",
        array: [...arr],
        message: "Max heap built.",
    });

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push({
            type: "extract",
            array: [...arr],
            i,
            message: `Extracting max element to position ${i}.`,
        });
        heapify(arr, i, 0);
    }

    steps.push({
        type: "done",
        array: [...arr],
        message: "Heap Sort completed.",
    });

    return steps;
}
