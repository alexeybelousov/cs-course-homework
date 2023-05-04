const bisecLeft = (array, comparator) => {
  let from = 0;
  let to = array.length;
  let result = -1;

  while (from < to) {
    const index = Math.floor((to - from) / 2 + from);
    mid = array[index];

    if (comparator(mid) === 0) {
      return index;
    }

    if (comparator(mid) > 0) {
      to = index;
    } else {
      from = index + 1;
    }
  }

  return result;
}

const bisecRight = (array, comparator) => {
  let from = 0;
  let to = array.length;
  let result = -1;

  while (from < to) {
    const index = Math.floor((to - from) / 2 + from);
    mid = array[index];

    if (comparator(mid) === 0) {
      result = index;
    }

    if (comparator(mid) > 0) {
      to = index;
    } else {
      from = index + 1;
    }
  }

  return result;
}

// Находит первый индекс элемента
console.log(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7));  // 6

// Находит последний индекс элемента
console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 9