clc;
clearvars;
close all;
[t, x, y, z, vx, vy, vz, wx, wy, wz, q0, q1, q2, q3, abx, aby, abz] = importar();
rng(1);

%https://la.mathworks.com/matlabcentral/answers/454797-how-to-add-gaussian-distributed-noise-with-zero-mean-and-standard-deviation-of-2-how-to-find-out
std_gyro = 0.01; %rad/s
std_accel = 0.5; %m/s2
std_gps = 5; %m
std_antena1 = 20; %m
std_antena2 = 10; %m
n = size(wx);

%Al ser vectores, deberia agregar el ruido como un vector pero no hay tiempo
n_wx = wx + std_gyro*randn(n);
n_wy = wy + std_gyro*randn(n);
n_wz = wz + std_gyro*randn(n);

n_abx = abx + std_accel*randn(n);
n_aby = aby + std_accel*randn(n);
n_abz = abz + std_accel*randn(n);

n_x_gps = x + std_gps*randn(n);
n_y_gps = y + std_gps*randn(n);
n_z_gps = z + std_gps*randn(n);

n_x_ant1 = x + std_antena1*randn(n);
n_y_ant1 = y + std_antena1*randn(n);
n_z_ant1 = z + std_antena1*randn(n);

n_x_ant2 = x + std_antena1*randn(n);
n_y_ant2 = y + std_antena2*randn(n);
n_z_ant2 = z + std_antena2*randn(n);

W = std_antena1^2 / (std_antena1^2 + std_antena2^2);
f_x = (1-W)*n_x_ant1 + W*n_x_ant2;
f_y = (1-W)*n_y_ant1 + W*n_y_ant2;
f_z = (1-W)*n_z_ant1 + W*n_z_ant2;

f1 = figure(1);
title("Posición Eje X")
f1.Position(3:4) = [500, 200];
hold on
plot(t, n_x_ant1, "DisplayName", "$Antena 1$", LineWidth=1)
plot(t, n_x_ant2, "DisplayName", "$Antena 2$", LineWidth=1)
plot(t, f_x, "DisplayName", "$Fusion$", LineWidth=1)
grid on
xlim([0 1])
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Posicion [m]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

f2 = figure(2);
title("Posición Eje Y")
f2.Position(3:4) = [500, 200];
hold on
plot(t, n_y_ant1, "DisplayName", "$Antena 1$", LineWidth=1)
plot(t, n_y_ant2, "DisplayName", "$Antena 2$", LineWidth=1)
plot(t, f_y, "DisplayName", "$Fusion$", LineWidth=1)
grid on
xlim([0 1])
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Posicion [m]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

f3 = figure(3);
title("Posición Eje Z")
f3.Position(3:4) = [500, 200];
hold on
plot(t, n_z_ant1, "DisplayName", "$Antena 1$", LineWidth=1)
plot(t, n_z_ant2, "DisplayName", "$Antena 2$", LineWidth=1)
plot(t, f_z, "DisplayName", "$Fusion$", LineWidth=1)
grid on
xlim([0 1])
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Posicion [m]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

exportgraphics(f1, "fusion_x.emf")
exportgraphics(f2, "fusion_y.emf")
exportgraphics(f3, "fusion_z.emf")
