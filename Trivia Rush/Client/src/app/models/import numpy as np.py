import numpy as np
import matplotlib.pyplot as plt

# Define the polynomial p(x) = x^2 + 2x + 2
def p(x):
    return x**2 + 2*x + 2

# Generate x values
x = np.linspace(-3, 1, 400)
y = p(x)

# Plot the polynomial
plt.figure(figsize=(8, 6))
plt.plot(x, y, label='p(x) = x^2 + 2x + 2', color='b')
plt.axhline(y=0, color='k', linewidth=0.5)  # x-axis
plt.axvline(x=-1, color='r', linestyle='--', label='Roots')
plt.scatter([-1], [0], color='r')
plt.xlabel('x')
plt.ylabel('p(x)')
plt.title('Visualization of the Polynomial p(x) and its Roots')
plt.legend()
plt.grid(True)
plt.show()
