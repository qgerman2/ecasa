rocket = {
    radius: (0.54/2),
    length: 3.5,
	mass: 100,
    ratio: 6,
	pressure: 0.3, // Porcentaje de distancia desde centro de masa a extremo de propulsor
    draw: function(ss) {
        push()
        translate(...ss.slice(0,3))
        applyMatrix(Quaternion(...ss.slice(9, 13)).conjugate().toMatrix4())
        rotateZ(-math.pi/2)
        translate(0, -this.length/(this.ratio*2), 0)
		fill(255, 255, 255, 150)
		noStroke()
        cylinder(this.radius, this.length*(this.ratio-1)/this.ratio)
        translate(0, this.length*(this.ratio/2)/this.ratio, 0)
        cone(this.radius, this.length/this.ratio)
        pop()
    }
}

function setup() {
	createCanvas(1280, 720, WEBGL)
	tex = loadImage("Prototype Blue.png")
}

ss = [
    0, 0, rocket.length/2,
	-100, 0, 100,
	0, 0, 0,
	...Quaternion.fromEuler(0, -math.pi/4*3, 0, "ZYX").toVector()]
tt = [0, 0, 0]
pam = [
    rocket.mass,		// Masa del cohete [kg]
    9.81,				// Aceleración gravitacional [m/s2]
    rocket.length,		// Largo de cohete [m]
    500, 500, 500,		// Inercias principales
    0.01, 0.001,		// Coeficientes aerodinámicos
    0.1, 0.1,		// Area de fuerzas aerodinámicas [m2]
    1.2754,				// Densidad del aire [kg/m3]
    -rocket.length/2,	// Posición del propulsor [m]
    -rocket.length/2*(1+rocket.pressure)]	// Posición del centro de presión [m]
air = [0, 0, 0, 0, 0, 0]

function update() {
	// Metodo de euler
    h = 1/60
    v = ss.slice(3,6)
    D = v.some(i => i !== 0) ? drag(...ss.concat(pam)) : [0,0,0]
    L = v.some(i => i !== 0) ? lift(...ss.concat(pam)) : [0,0,0]
	air = D.concat(L)
    ss = math.add(ss, math.multiply(h, sys(...ss.concat(tt,pam,air))))
    ss.splice(9, 13, ...Quaternion(...ss.slice(9,13)).normalize().toVector())
}

function draw() {
    update()
	// Variables utiles
	q = Quaternion(...ss.slice(9,13))
	qprop = Quaternion.fromEuler(tt[2] + math.pi/2, tt[1], 0, "XYZ")
	r = ss.slice(0,3)
	v = ss.slice(3,6)
	// Configuración de la escena
	textureWrap(REPEAT)
	strokeWeight(3)
    background(255, 255, 255)
	cameraPosition = math.add(math.multiply(r, 100), [600, 600, 600])
	cameraAim = math.multiply(r, 100)
	perspective(math.pi/3, 1280/720, 1, 100000000)
    camera(...cameraPosition , ...cameraAim, 0, 0, -1)
	// Suelo
	push()
	texture(tex)
	noStroke()
	beginShape(TRIANGLES);
	u = 100000
	v = 100000
	vertex(-1000000, -1000000, 0, 0, 0);
	vertex(1000000, -1000000, 0, u, 0);
	vertex(1000000, 1000000, 0, u, v);
	vertex(1000000, 1000000, 0, u, v);
	vertex(-1000000, 1000000, 0, 0, v);
	vertex(-1000000, -1000000, 0, 0, 0);
  	endShape();
	endShape();
	pop()
	// Escalar objetos
    scale(100, 100, 100)
    push()
	// Origen
    stroke(255, 0, 0)
    line(0, 0, 0, 1, 0, 0)
    stroke(0, 255, 0)
    line(0, 0, 0, 0, 1, 0)
    stroke(0, 0, 255)
    line(0, 0, 0, 0, 0, 1)
    stroke(0, 0, 0)	
	// Vectores
	heading = q.rotateVector([1, 0, 0])
	propulsor = math.unaryMinus(q.mul(qprop).rotateVector([1, 0, 0]))
	arrow(
		math.add(r, math.multiply(heading, -rocket.length/2)),
		math.multiply(propulsor, tt[0]/500))
	
	arrow(
		math.add(r, math.multiply(heading, -rocket.length/2*rocket.pressure)),
		math.multiply(air.slice(0, 3), 1/500), [255, 0, 0]
	)
	arrow(
		math.add(r, math.multiply(heading, -rocket.length/2*rocket.pressure)),
		math.multiply(air.slice(3, 6), 1/500), [0, 0, 255]
	)
	arrow(
		r,
		[0, 0, -rocket.mass*9.81/500], [255, 165, 0	]
	)
	// Cohete
    rocket.draw(ss)
	pop()
}