function arrow(origin, vector, color=[0, 0, 0]) {
    push()
    stroke(...color)
    line(...origin, ...math.add(vector, origin))
    pop()
  }