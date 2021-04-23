some_numbers = [1, 2, 3, 4, 5, 6, 7]

def binary_search(target, data):
  left, right = 0, len(data) - 1

  while left <= right:
    middle = (left + right) // 2
    value = some_numbers[middle]

    if value == target:
      return middle

    if value < target:
      left = middle + 1
    else:
      right = middle - 1

  return -1


assert binary_search(1, some_numbers) == 0
assert binary_search(4, some_numbers) == 3
assert binary_search(7, some_numbers) == 6