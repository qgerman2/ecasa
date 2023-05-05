function [t, x, y, z, v_x, v_y, v_z, omega_x, omega_y, omega_z, q0, q1, q2, q3] = importar()

filename = "resultado.csv";
dataLines = [2, Inf];

%% Set up the Import Options and import the data
opts = delimitedTextImportOptions("NumVariables", 14);

% Specify range and delimiter
opts.DataLines = dataLines;
opts.Delimiter = ",";

% Specify column names and types
opts.VariableNames = ["t", "xt", "yt", "zt", "v_xt", "v_yt", "v_zt", "omega_xt", "omega_yt", "omega_zt", "q0t", "q1t", "q2t", "q3t"];
opts.VariableTypes = ["double", "double", "double", "double", "double", "double", "double", "double", "double", "double", "double", "double", "double", "double"];

% Specify file level properties
opts.ExtraColumnsRule = "ignore";
opts.EmptyLineRule = "read";

% Import the data
tbl = readtable(filename, opts);

%% Convert to output type
t = tbl.t;
x = tbl.xt;
y = tbl.yt;
z = tbl.zt;
v_x = tbl.v_xt;
v_y = tbl.v_yt;
v_z = tbl.v_zt;
omega_x = tbl.omega_xt;
omega_y = tbl.omega_yt;
omega_z = tbl.omega_zt;
q0 = tbl.q0t;
q1 = tbl.q1t;
q2 = tbl.q2t;
q3 = tbl.q3t;
end