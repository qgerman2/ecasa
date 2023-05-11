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

f1 = figure(1);
title("Giroscopio")
f1.Position(3:4) = [500, 200];
hold on
plot(t, n_wz, "DisplayName", "$\omega_z$", LineWidth=1)
plot(t, n_wy, "DisplayName", "$\omega_y$", LineWidth=1)
plot(t, n_wx, "DisplayName", "$\omega_x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Velocidad angular [rad/s]", "Interpreter","latex")
ylim([-0.1, 0.1])
legend("location", "northeast", "Interpreter","latex")

f2 = figure(2);
title("Acelerometro")
f2.Position(3:4) = [500, 200];
hold on
plot(t, n_abx, "DisplayName", "$a_x$", LineWidth=1)
plot(t, n_aby, "DisplayName", "$a_y$", LineWidth=1)
plot(t, n_abz, "DisplayName", "$a_z$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Aceleracion [m/s2]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

gps = flat2lla([n_x_gps, n_y_gps, n_z_gps], [36.8295, 73.0342], 0, 12);
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
ylim([73.03 73.04])

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
plot(t, n_z_ant1, "DisplayName", "$z$", LineWidth=1)
plot(t, n_y_ant1-30000, "DisplayName", "$y$", LineWidth=1)
plot(t, n_x_ant1-30000, "DisplayName", "$x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Posicion [m]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

f5 = figure(5);
title("Antena 2")
f5.Position(3:4) = [500, 200];
hold on
plot(t, n_z_ant2, "DisplayName", "$z$", LineWidth=1)
plot(t, n_y_ant2+10000, "DisplayName", "$y$", LineWidth=1)
plot(t, n_x_ant2+10000, "DisplayName", "$x$", LineWidth=1)
grid on
xlabel("Tiempo [s]", "Interpreter","latex")
ylabel("Posicion [m]", "Interpreter","latex")
legend("location", "northeast", "Interpreter","latex")

exportgraphics(f1, "ruido_giroscopio.emf")
exportgraphics(f2, "ruido_acelerometro.emf")
exportgraphics(f3, "ruido_gps.emf")
exportgraphics(f4, "ruido_antena1.emf")
exportgraphics(f5, "ruido_antena2.emf")


