export function generateSelectionSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];

    steps.push({
        type: "start",
        array: [...arr],
        message: "Starting Selection Sort.",
    });

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        steps.push({
            type: "select",
            i,
            minIndex,
            array: [...arr],
            message: `Selecting index ${i} as initial minimum.`,
        });

        for (let j = i + 1; j < n; j++) {
            steps.push({
                type: "compare",
                i,
                j,
                minIndex,
                array: [...arr],
                message: `Comparing index ${j} with current minimum at index ${minIndex}.`,
            });

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                steps.push({
                    type: "new-min",
                    i,
                    minIndex,
                    array: [...arr],
                    message: `New minimum found at index ${minIndex}.`,
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
                message: `Swapping index ${i} with index ${minIndex}.`,
            });
        } else {
            steps.push({
                type: "noswap",
                i,
                array: [...arr],
                message: `Index ${i} already has the minimum value.`,
            });
        }
    }

    steps.push({
        type: "done",
        array: [...arr],
        message: "Selection Sort completed.",
    });

    return steps;
}
