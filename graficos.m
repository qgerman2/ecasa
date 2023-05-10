[t, x, y, z, vx, vy, vz, wx, wy, wz, q0, q1, q2, q3, abx, aby, abz] = importar();

f1 = figure(1);
title("Posición")
f1.Position(3:4) = [500, 200];
hold on
plot(t, z, "DisplayName", "z", LineWidth=1)
plot(t, y, "DisplayName", "y", LineWidth=1)
plot(t, x, "DisplayName", "x", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Distancia [m]", "Interpreter","latex")
legend("location", "southwest", "Interpreter","latex")

f2 = figure(2);
title("Velocidad")
f2.Position(3:4) = [500, 200];
hold on
plot(t, vz, "DisplayName", "$v_z$", LineWidth=1)
plot(t, vy, "DisplayName", "$v_y$", LineWidth=1)
plot(t, vx, "DisplayName", "$v_x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Velocidad [m/s]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

f3 = figure(3);
title("Velocidad angular Body-frame")
f3.Position(3:4) = [500, 200];
hold on
plot(t, wz, "DisplayName", "$\omega_z$", LineWidth=1)
plot(t, wy, "DisplayName", "$\omega_y$", LineWidth=1)
plot(t, wx, "DisplayName", "$\omega_x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Velocidad angular [rad/s]", "Interpreter","latex")
ylim([-0.1, 0.1])
legend("location", "northeast", "Interpreter","latex")

f4 = figure(4);
title("Orientación Inertial-frame")
f4.Position(3:4) = [500, 200];
hold on
plot(t, q0, "DisplayName", "$q_0$", LineWidth=1)
plot(t, q1, "DisplayName", "$q_1$", LineWidth=1)
plot(t, q2, "DisplayName", "$q_2$", LineWidth=1)
plot(t, q3, "DisplayName", "$q_3$", LineWidth=1)
ylim([-1.1 1.1])
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Valor del componente", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

angle = quat2eul([q0, q1, q2, q3]);
f5 = figure(5);
title("Velocidad angular Inertial-frame")
f5.Position(3:4) = [500, 200];
hold on
plot(t, angle(:,1), "DisplayName", "$yaw \phi$", LineWidth=1)
plot(t, angle(:,2), "DisplayName", "$pitch \theta$", LineWidth=1)
plot(t, angle(:,3), "DisplayName", "$roll \psi$", LineWidth=1)
ylim([-pi-0.1, pi+0.1])
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Angulo [rad]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

m = 100;
Ix = 3.6;
Iy = 103;
Iz = 103;
g = 9.81;

Ke = 1/2*m*(vx.^2+vy.^2+vz.^2) + 1/2*(Ix*wx.^2+Iy*wy.^2+Iz*wz.^2);
Pe = m*g*z;
Te = Ke+Pe;

f6 = figure(6);
title("Energía")
f6.Position(3:4) = [500, 200];
hold on
plot(t, Te, "DisplayName", "$Total$", LineWidth=1)
plot(t, Ke, "DisplayName", "$Cinetica$", LineWidth=1)
plot(t, Pe, "DisplayName", "$Potencial$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Energia [J]", "Interpreter","latex")
legend("location", "east", "Interpreter","latex")

exportgraphics(f1, "1pos.emf")
exportgraphics(f2, "2vel.emf")
exportgraphics(f3, "3velangbod.emf")
exportgraphics(f4, "4velangine.emf")
exportgraphics(f5, "5velanginecuat.emf")
exportgraphics(f6, "6energia.emf")
