/**
 * Algorithm Information Data
 * Contains explanations and code implementations for each sorting algorithm
 */

export const algorithmData = {
    selection: {
        name: "Selection Sort",
        icon: "🔍",
        color: "from-blue-500 to-cyan-500",
        complexity: {
            time: {
                best: "O(n²)",
                average: "O(n²)",
                worst: "O(n²)"
            },
            space: "O(1)"
        },
        description: {
            id: `**Selection Sort** adalah algoritma pengurutan sederhana yang bekerja dengan cara mencari elemen terkecil (atau terbesar) dari bagian array yang belum terurut, kemudian menukarnya dengan elemen pertama dari bagian tersebut.

### Cara Kerja:
1. **Cari Minimum**: Mulai dari indeks pertama, cari elemen terkecil di seluruh array
2. **Tukar**: Tukar elemen terkecil dengan elemen di posisi pertama
3. **Pindah**: Pindah ke indeks berikutnya dan ulangi proses untuk sisa array
4. **Selesai**: Lanjutkan sampai seluruh array terurut

### Kelebihan:
- 🟢 Mudah dipahami dan diimplementasikan
- 🟢 Tidak membutuhkan memori tambahan (in-place)
- 🟢 Jumlah swap minimal (maksimal n-1 swap)

### Kekurangan:
- 🔴 Kompleksitas waktu O(n²) tidak efisien untuk data besar
- 🔴 Tidak stabil (urutan elemen sama bisa berubah)
- 🔴 Performa sama buruknya untuk semua kasus`,
            en: `**Selection Sort** is a simple sorting algorithm that works by finding the smallest (or largest) element from the unsorted portion of the array, then swapping it with the first element of that portion.

### How it Works:
1. **Find Minimum**: Starting from the first index, find the smallest element in the entire array
2. **Swap**: Swap the smallest element with the element at the first position
3. **Move**: Move to the next index and repeat for the remaining array
4. **Done**: Continue until the entire array is sorted

### Advantages:
- 🟢 Easy to understand and implement
- 🟢 No additional memory required (in-place)
- 🟢 Minimum number of swaps (at most n-1 swaps)

### Disadvantages:
- 🔴 O(n²) time complexity is inefficient for large data
- 🔴 Not stable (order of equal elements may change)
- 🔴 Same poor performance for all cases`
        },
        code: {
            python: `def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        # Cari indeks elemen terkecil
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Tukar elemen terkecil dengan elemen di posisi i
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Contoh penggunaan
arr = [64, 25, 12, 22, 11]
print(selection_sort(arr))  # [11, 12, 22, 25, 64]`,

            javascript: `function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
        // Cari indeks elemen terkecil
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Tukar elemen terkecil dengan elemen di posisi i
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    
    return arr;
}

// Contoh penggunaan
const arr = [64, 25, 12, 22, 11];
console.log(selectionSort(arr)); // [11, 12, 22, 25, 64]`,

            java: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n; i++) {
            // Cari indeks elemen terkecil
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            // Tukar elemen terkecil dengan elemen di posisi i
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        // Output: [11, 12, 22, 25, 64]
    }
}`,

            go: `package main

import "fmt"

func selectionSort(arr []int) []int {
    n := len(arr)
    
    for i := 0; i < n; i++ {
        // Cari indeks elemen terkecil
        minIdx := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        
        // Tukar elemen terkecil dengan elemen di posisi i
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
    
    return arr
}

func main() {
    arr := []int{64, 25, 12, 22, 11}
    fmt.Println(selectionSort(arr)) // [11 12 22 25 64]
}`,

            cpp: `#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n; i++) {
        // Cari indeks elemen terkecil
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Tukar elemen terkecil dengan elemen di posisi i
        swap(arr[i], arr[minIdx]);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    selectionSort(arr);
    // Output: 11 12 22 25 64
    return 0;
}`,

            rust: `fn selection_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    
    for i in 0..n {
        // Cari indeks elemen terkecil
        let mut min_idx = i;
        for j in (i + 1)..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        
        // Tukar elemen terkecil dengan elemen di posisi i
        arr.swap(i, min_idx);
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    selection_sort(&mut arr);
    println!("{:?}", arr); // [11, 12, 22, 25, 64]
}`
        }
    },

    quick: {
        name: "Quick Sort",
        icon: "⚡",
        color: "from-purple-500 to-pink-500",
        complexity: {
            time: {
                best: "O(n log n)",
                average: "O(n log n)",
                worst: "O(n²)"
            },
            space: "O(log n)"
        },
        description: {
            id: `**Quick Sort** adalah algoritma pengurutan yang sangat efisien menggunakan strategi "divide and conquer" (bagi dan taklukkan). Algoritma ini memilih satu elemen sebagai "pivot" dan mempartisi array di sekitarnya.

### Cara Kerja:
1. **Pilih Pivot**: Pilih satu elemen sebagai pivot (biasanya elemen terakhir, pertama, atau tengah)
2. **Partisi**: Atur ulang array sehingga semua elemen lebih kecil dari pivot berada di kiri, dan yang lebih besar di kanan
3. **Rekursi**: Terapkan langkah yang sama secara rekursif pada sub-array kiri dan kanan
4. **Gabung**: Array sudah terurut setelah semua rekursi selesai

### Kelebihan:
- 🟢 Sangat cepat untuk kebanyakan kasus (O(n log n))
- 🟢 In-place sorting (hemat memori)
- 🟢 Cache-friendly karena akses memori sekuensial

### Kekurangan:
- 🔴 Worst case O(n²) jika pivot tidak optimal
- 🔴 Tidak stabil
- 🔴 Performa buruk untuk data yang sudah terurut`,
            en: `**Quick Sort** is a highly efficient sorting algorithm using the "divide and conquer" strategy. It selects one element as a "pivot" and partitions the array around it.

### How it Works:
1. **Choose Pivot**: Select one element as pivot (usually last, first, or middle element)
2. **Partition**: Rearrange the array so all elements smaller than pivot are on the left, and larger ones on the right
3. **Recursion**: Apply the same steps recursively on left and right sub-arrays
4. **Combine**: Array is sorted after all recursions complete

### Advantages:
- 🟢 Very fast for most cases (O(n log n))
- 🟢 In-place sorting (memory efficient)
- 🟢 Cache-friendly due to sequential memory access

### Disadvantages:
- 🔴 Worst case O(n²) if pivot is not optimal
- 🔴 Not stable
- 🔴 Poor performance on already sorted data`
        },
        code: {
            python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]  # Pilih pivot di tengah
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Versi in-place (lebih efisien)
def quick_sort_inplace(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Contoh penggunaan
arr = [64, 25, 12, 22, 11]
print(quick_sort(arr))  # [11, 12, 22, 25, 64]`,

            javascript: `function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Versi in-place (lebih efisien)
function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        quickSortInPlace(arr, low, pivotIdx - 1);
        quickSortInPlace(arr, pivotIdx + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Contoh penggunaan
console.log(quickSort([64, 25, 12, 22, 11])); // [11, 12, 22, 25, 64]`,

            java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIdx = partition(arr, low, high);
            quickSort(arr, low, pivotIdx - 1);
            quickSort(arr, pivotIdx + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] dan arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // Swap arr[i+1] dan arr[high] (pivot)
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        quickSort(arr, 0, arr.length - 1);
        // Output: [11, 12, 22, 25, 64]
    }
}`,

            go: `package main

import "fmt"

func quickSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    
    pivot := arr[len(arr)/2]
    var left, middle, right []int
    
    for _, x := range arr {
        switch {
        case x < pivot:
            left = append(left, x)
        case x == pivot:
            middle = append(middle, x)
        default:
            right = append(right, x)
        }
    }
    
    result := quickSort(left)
    result = append(result, middle...)
    result = append(result, quickSort(right)...)
    
    return result
}

func main() {
    arr := []int{64, 25, 12, 22, 11}
    fmt.Println(quickSort(arr)) // [11 12 22 25 64]
}`,

            cpp: `#include <iostream>
#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    quickSort(arr, 0, arr.size() - 1);
    // Output: 11 12 22 25 64
    return 0;
}`,

            rust: `fn quick_sort<T: Ord + Clone>(arr: &[T]) -> Vec<T> {
    if arr.len() <= 1 {
        return arr.to_vec();
    }
    
    let pivot = arr[arr.len() / 2].clone();
    let left: Vec<T> = arr.iter().filter(|x| **x < pivot).cloned().collect();
    let middle: Vec<T> = arr.iter().filter(|x| **x == pivot).cloned().collect();
    let right: Vec<T> = arr.iter().filter(|x| **x > pivot).cloned().collect();
    
    [quick_sort(&left), middle, quick_sort(&right)].concat()
}

fn main() {
    let arr = vec![64, 25, 12, 22, 11];
    println!("{:?}", quick_sort(&arr)); // [11, 12, 22, 25, 64]
}`
        }
    },

    heap: {
        name: "Heap Sort",
        icon: "🌳",
        color: "from-orange-500 to-red-500",
        complexity: {
            time: {
                best: "O(n log n)",
                average: "O(n log n)",
                worst: "O(n log n)"
            },
            space: "O(1)"
        },
        description: {
            id: `**Heap Sort** adalah algoritma pengurutan berbasis perbandingan yang menggunakan struktur data Binary Heap. Algoritma ini mengubah array menjadi heap, lalu secara berulang mengekstrak elemen maksimum.

### Cara Kerja:
1. **Build Max Heap**: Ubah array menjadi Max Heap (parent selalu lebih besar dari children)
2. **Extract Max**: Tukar root (elemen terbesar) dengan elemen terakhir
3. **Heapify**: Perbaiki heap yang tersisa dengan proses heapify
4. **Ulangi**: Lakukan langkah 2-3 sampai heap kosong

### Apa itu Heap?
- **Max Heap**: Setiap parent node lebih besar dari children-nya
- **Min Heap**: Setiap parent node lebih kecil dari children-nya
- Binary Heap direpresentasikan sebagai array:
  - Parent dari node i: (i-1)/2
  - Left child dari node i: 2*i + 1
  - Right child dari node i: 2*i + 2

### Kelebihan:
- 🟢 Kompleksitas waktu konsisten O(n log n) untuk semua kasus
- 🟢 In-place sorting
- 🟢 Cocok untuk data yang sangat besar

### Kekurangan:
- 🔴 Tidak stabil
- 🔴 Lebih lambat dari Quick Sort untuk banyak kasus praktis
- 🔴 Tidak cache-friendly`,
            en: `**Heap Sort** is a comparison-based sorting algorithm that uses the Binary Heap data structure. It transforms the array into a heap, then repeatedly extracts the maximum element.

### How it Works:
1. **Build Max Heap**: Transform array into Max Heap (parent is always larger than children)
2. **Extract Max**: Swap root (largest element) with the last element
3. **Heapify**: Fix the remaining heap with heapify process
4. **Repeat**: Do steps 2-3 until heap is empty

### What is a Heap?
- **Max Heap**: Every parent node is larger than its children
- **Min Heap**: Every parent node is smaller than its children
- Binary Heap is represented as an array:
  - Parent of node i: (i-1)/2
  - Left child of node i: 2*i + 1
  - Right child of node i: 2*i + 2

### Advantages:
- 🟢 Consistent O(n log n) time complexity for all cases
- 🟢 In-place sorting
- 🟢 Suitable for very large data

### Disadvantages:
- 🔴 Not stable
- 🔴 Slower than Quick Sort for many practical cases
- 🔴 Not cache-friendly`
        },
        code: {
            python: `def heap_sort(arr):
    n = len(arr)
    
    # Build Max Heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elemen satu per satu
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Swap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Cek apakah left child lebih besar dari root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # Cek apakah right child lebih besar dari largest
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # Jika largest bukan root, swap dan heapify lagi
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Contoh penggunaan
arr = [64, 25, 12, 22, 11]
print(heap_sort(arr))  # [11, 12, 22, 25, 64]`,

            javascript: `function heapSort(arr) {
    const n = arr.length;
    
    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elemen satu per satu
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Contoh penggunaan
console.log(heapSort([64, 25, 12, 22, 11])); // [11, 12, 22, 25, 64]`,

            java: `public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build Max Heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elemen satu per satu
        for (int i = n - 1; i > 0; i--) {
            // Swap arr[0] dan arr[i]
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            heapify(arr, i, 0);
        }
    }
    
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            heapify(arr, n, largest);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        heapSort(arr);
        // Output: [11, 12, 22, 25, 64]
    }
}`,

            go: `package main

import "fmt"

func heapSort(arr []int) []int {
    n := len(arr)
    
    // Build Max Heap
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
    
    // Extract elemen satu per satu
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    }
    
    return arr
}

func heapify(arr []int, n, i int) {
    largest := i
    left := 2*i + 1
    right := 2*i + 2
    
    if left < n && arr[left] > arr[largest] {
        largest = left
    }
    
    if right < n && arr[right] > arr[largest] {
        largest = right
    }
    
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

func main() {
    arr := []int{64, 25, 12, 22, 11}
    fmt.Println(heapSort(arr)) // [11 12 22 25 64]
}`,

            cpp: `#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build Max Heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elemen satu per satu
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    heapSort(arr);
    // Output: 11 12 22 25 64
    return 0;
}`,

            rust: `fn heap_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    
    // Build Max Heap
    for i in (0..n / 2).rev() {
        heapify(arr, n, i);
    }
    
    // Extract elemen satu per satu
    for i in (1..n).rev() {
        arr.swap(0, i);
        heapify(arr, i, 0);
    }
}

fn heapify(arr: &mut Vec<i32>, n: usize, i: usize) {
    let mut largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if left < n && arr[left] > arr[largest] {
        largest = left;
    }
    
    if right < n && arr[right] > arr[largest] {
        largest = right;
    }
    
    if largest != i {
        arr.swap(i, largest);
        heapify(arr, n, largest);
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    heap_sort(&mut arr);
    println!("{:?}", arr); // [11, 12, 22, 25, 64]
}`
        }
    }
};

export const languageInfo = {
    python: { name: "Python", color: "bg-yellow-500" },
    javascript: { name: "JavaScript", color: "bg-yellow-400" },
    java: { name: "Java", color: "bg-red-500" },
    go: { name: "Go", color: "bg-cyan-500" },
    cpp: { name: "C++", color: "bg-blue-600" },
    rust: { name: "Rust", color: "bg-orange-600" }
};
