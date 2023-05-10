clc;
clearvars;
close all;
[t, x, y, z, vx, vy, vz, wx, wy, wz, q0, q1, q2, q3] = importar();

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
title("Giroscopio")
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
title("Posición")
f3.Position(3:4) = [500, 200];
hold on
plot(t, z, "DisplayName", "z", LineWidth=1)
plot(t, y, "DisplayName", "y", LineWidth=1)
plot(t, x, "DisplayName", "x", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Distancia [m]", "Interpreter","latex")
legend("location", "southwest", "Interpreter","latex")

