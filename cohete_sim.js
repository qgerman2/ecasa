rocket = {
    radius: (0.54/2),
    length: 3.5,
	mass: 100,
    ratio: 6,
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
var ss = Array(12).fill(0)
var tt = [1500, math.pi/2, 0]
var pam

function setup() {
	createCanvas(1280, 720, WEBGL)
	poslabel = createDiv("x: , y: , z:")
	poslabel.position(400, 10)
	wlabel = createDiv("x: , y: , z:")
	wlabel.position(400, 30)
	tex = loadImage("Prototype Blue.png")
	vars = [
		["x", 0], ["y", 0], ["z", 3.5],
		["vx", -225], ["vy", 0], ["vz", 225],
		["wx", 0], ["wy", -0.04], ["wz", 0],
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
	})
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
		3.6, 103, 103]						// Inercias principales
}	

function keyReleased(ev) {
	if (ev.key == "Enter") {
		reset()
	}
}

function update() {
	// Controles propulsor
	if (keyIsDown(20)) {
		tt[0] = 1500
	} else {
		tt[0] = 0
	}
	a = math.pi/4
	b = 0
	c = 0
	if (keyIsDown(87)) {b = -1}
	if (keyIsDown(83)) {b = 1}
	if (keyIsDown(65)) {c = -1}
	if (keyIsDown(68)) {c = 1}
	if (b == 0 && c == 0) {
		tt[1] = 0
	} else {
		tt[1] = math.pi/4
	}
	tt[2] = Math.atan2(b, c) + math.pi/4
	// Metodo de euler
	if (ss[2] > 0) {
		h = 1/60
		v = ss.slice(3,6)
		ss = math.add(ss, math.multiply(h, sys(...ss.concat(tt,pam))))
		ss.splice(9, 13, ...Quaternion(...ss.slice(9,13)).normalize().toVector())
	}
}

function arrow(origin, vector, color=[0, 0, 0]) {
	push()
	stroke(...color)
	line(...origin, ...math.add(vector, origin))
	pop()
}

function draw() {
    update()
	// Variables utiles
	q = Quaternion(...ss.slice(9,13))
	qprop = Quaternion.fromEuler(tt[2] + math.pi/2, tt[1], 0, "XYZ")
	r = ss.slice(0,3)
	v = ss.slice(3,6)
	w = ss.slice(6,9)
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
		math.add(r, math.multiply(heading, -rocket.length/2)),
		math.multiply(propulsor, tt[0]/500))
	
	arrow(
		r,
		[0, 0, -rocket.mass*pam[1]/500], [255, 165, 0	]
	)
	// Cohete
    rocket.draw(ss)
	// Coordenadas
	poslabel.html("x: " + math.floor(r[0]) + " y: " + math.floor(r[1]) + " z: " + math.floor(r[2]))
	wlabel.html("wx: " + w[0] + "<br>wy: " + w[1] + "<br>wz: " + w[2])
	pop()
}