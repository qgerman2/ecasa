clc;
clearvars;
close all;
[t, x, y, z, vx, vy, vz, wx, wy, wz, q0, q1, q2, q3, abx, aby, abz] = importar();

f1 = figure(1);
title("Giroscopio")
f1.Position(3:4) = [500, 200];
hold on
plot(t, wz, "DisplayName", "$\omega_z$", LineWidth=1)
plot(t, wy, "DisplayName", "$\omega_y$", LineWidth=1)
plot(t, wx, "DisplayName", "$\omega_x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Velocidad angular [rad/s]", "Interpreter","latex")
ylim([-0.1, 0.1])
legend("location", "northeast", "Interpreter","latex")

f2 = figure(2);
title("Acelerometro")
f2.Position(3:4) = [500, 200];
hold on
plot(t, abx, "DisplayName", "$a_x$", LineWidth=1)
plot(t, aby, "DisplayName", "$a_y$", LineWidth=1)
plot(t, abz, "DisplayName", "$a_z$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Aceleracion [m/s2]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

gps = flat2lla([x, y, z], [36.8295, 73.0342], 0, 12);
f3 = figure(3);
f3.Position(3:4) = [500, 200*3];
tiledlayout(3,1)
nexttile
plot(t, gps(:,1))
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
title("Latitud")
ylabel("Coordenada [Grados]", "Interpreter","latex")

nexttile
plot(t, gps(:,2))
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
title("Longitud")
ylabel("Coordenada [Grados]", "Interpreter","latex")

nexttile
plot(t, -gps(:,3))
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
title("Altitud")
ylabel("Coordenada [m]", "Interpreter","latex")

f4 = figure(4);
title("Antena 1")
f4.Position(3:4) = [500, 200];
hold on
plot(t, z, "DisplayName", "$z$", LineWidth=1)
plot(t, y-30000, "DisplayName", "$y$", LineWidth=1)
plot(t, x-30000, "DisplayName", "$x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Posicion [m]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

f5 = figure(5);
title("Antena 2")
f5.Position(3:4) = [500, 200];
hold on
plot(t, z, "DisplayName", "$z$", LineWidth=1)
plot(t, y+10000, "DisplayName", "$y$", LineWidth=1)
plot(t, x+10000, "DisplayName", "$x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Posicion [m]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

exportgraphics(f1, "giroscopio.emf")
exportgraphics(f2, "acelerometro.emf")
exportgraphics(f3, "gps.emf")
exportgraphics(f4, "antena1.emf")
exportgraphics(f5, "antena2.emf")


