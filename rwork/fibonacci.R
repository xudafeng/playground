fibonacci <- function(i) {
  if (i == 1 || i == 2) {
    return (1)
  }
  return (fibonacci(i - 1) + fibonacci(i - 2))
}

total <- 0
current <- 0
max <- 4000000
p <- 1

while (current < max) {
  current <- fibonacci(p)
  print(sprintf("get number:%d", current))

  if (current %% 2 == 0) {
    total <- total + current
  }

  p <- p + 1
}

print(sprintf("total number:%d", total))
