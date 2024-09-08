import math

csv = "-1.477558207142231E+09, -4.182460280867265E+09,  8.752693291814536E+08"
# convert to numbers X Y Z
X, Y, Z = map(float, csv.split(', '))

rad = math.atan2(Y, X)
deg = math.degrees(rad)

if deg < 0:
    deg += 360

print(deg)