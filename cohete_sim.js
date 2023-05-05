rocket = {
    radius: (0.54/2),
    length: 3.5,
	mass: 100,
    ratio: 6,
	pressure: 0.3, // Porcentaje de distancia desde centro de masa a extremo de propulsor
	cd: 0.005,
	cl: 0,

    draw: function(ss) {
        push()
        translate(...ss.slice(0,3))
        applyMatrix(Quaternion(...ss.slice(9, 13)).conjugate().toMatrix4())
        rotateZ(-math.pi/2)
        translate(0, -this.length/(this.ratio*2), 0)
		fill(0, 0, 0, 150)
		noStroke()
        cylinder(this.radius, this.length*(this.ratio-1)/this.ratio)
        translate(0, this.length*(this.ratio/2)/this.ratio, 0)
        cone(this.radius, this.length/this.ratio)
        pop()
    }
}

var ui = {}
var pam
var ss = [
	0, 0, rocket.length/2,
	-100, 0, 100,
	0, 0, 0,
	...Quaternion.fromEuler(0, -math.pi/4*3, 0, "ZYX").toVector()]

function setup() {
	createCanvas(1280, 720, WEBGL)
	poslabel = createDiv("x: , y: , z:")
	poslabel.position(400, 10)
	tex = loadImage("Prototype Blue.png")
	vars = [
		["x", 0], ["y", 0], ["z", 3.5],
		["vx", -225], ["vy", 0], ["vz", 225],
		["wx", 0], ["wy", 0], ["wz", 0],
		["yaw", 0], ["pitch", "-math.pi/4*3"], ["roll", 0],
	]
	vars.forEach((v, i) => {
		[ofx, ofy] = [10, 10]
		t = createDiv(v[0])
		t.position(ofx + (i%3)*100, ofy + Math.floor(i/3)*50)
		inp = createInput(v[1])
		inp.position(ofx + (i%3)*100, ofy + Math.floor(i/3)*50+20)
		inp.size(100)
		ui[v[0]] = {
			label : t,
			input : inp
		}
	});
	reset()
}

function reset() {
	var i = 0
	for (var k in ui) {
		if (i < 9) {
			ss[i] = eval(ui[k].input.value())
		}
		i += 1
	}
	yaw = eval(ui["yaw"].input.value())
	pitch = eval(ui["pitch"].input.value())
	roll = eval(ui["roll"].input.value())
	ss.splice(9,13,...Quaternion.fromEuler(yaw, pitch, roll, "ZYX").toVector())
	pam = [
		rocket.mass,						// Masa del cohete [kg]
		9.81,								// Aceleración gravitacional [m/s2]
		rocket.length,						// Largo de cohete [m]
		3.6, 103, 103,						// Inercias principales
		0.0001, 0,							// Coeficientes aerodinámicos roce y sustentación
		math.pi * rocket.radius**2,			// Area referencia fuerza de roce [m2] 
		rocket.length * rocket.radius*2,	// Area referencia fuerza de sustentación [m2]
		1.2754,								// Densidad del aire [kg/m3]
		-rocket.length/2,					// Posición del propulsor [m]
		-rocket.length/2*(rocket.pressure)]	// Posición del centro de presión [m]
}	

function keyReleased(ev) {
	if (ev.key == "Enter") {
		reset()
	}
}


tt = [0, 0, 0]

air = [0, 0, 0, 0, 0, 0]

function update() {
	// Metodo de euler
	if (ss[2] > 0) {
		h = 1/60
		v = ss.slice(3,6)
		D = v.some(i => i !== 0) ? drag(...ss.concat(pam)) : [0,0,0]
		L = v.some(i => i !== 0) ? lift(...ss.concat(pam)) : [0,0,0]
		air = D.concat(L)
		ss = math.add(ss, math.multiply(h, sys(...ss.concat(tt,pam,air))))
		ss.splice(9, 13, ...Quaternion(...ss.slice(9,13)).normalize().toVector())
	}
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
	u = 500000
	v = 500000
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
		math.add(r, math.multiply(heading, pam[11])),
		math.multiply(propulsor, tt[0]/500))
	
	arrow(
		math.add(r, math.multiply(heading, pam[12])),
		math.multiply(air.slice(0, 3), 1/500), [255, 0, 0]
	)
	arrow(
		math.add(r, math.multiply(heading, pam[12])),
		math.multiply(air.slice(3, 6), 1/500), [0, 0, 255]
	)
	arrow(
		r,
		[0, 0, -rocket.mass*pam[1]/500], [255, 165, 0	]
	)
	// Cohete
    rocket.draw(ss)
	poslabel.html("x: " + math.floor(r[0]) + " y: " + math.floor(r[1]) + " z: " + math.floor(r[2])) 
	// Coordenadas
	pop()
}