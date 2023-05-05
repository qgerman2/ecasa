function sys(
	x, y, z,
	v_x, v_y, v_z,
	omega_x, omega_y, omega_z,
	q0, q1, q2, q3,
	T, T_theta, T_phi,
	m, g, l, I_x, I_y, I_z, C_d, C_l, A_d, A_l, rho, r_t, r_p,
	D_x, D_y, D_z, L_x, L_y, L_z) {
	return [v_x,
		v_y,
		v_z,
		((2*q0*q2 + 2*q1*q3)*T*math.sin(T_phi)*math.sin(T_theta) + (-2*q0*q3 + 2*q1*q2)*T*math.sin(T_theta)*math.cos(T_phi) + (2*q0**2 + 2*q1**2 - 1)*T*math.cos(T_theta))/m,
		((-2*q0*q1 + 2*q2*q3)*T*math.sin(T_phi)*math.sin(T_theta) + (2*q0*q3 + 2*q1*q2)*T*math.cos(T_theta) + (2*q0**2 + q2**2 - 1)*T*math.sin(T_theta)*math.cos(T_phi))/m,
		-g + ((2*q0*q1 + 2*q2*q3)*T*math.sin(T_theta)*math.cos(T_phi) + (-2*q0*q2 + 2*q1*q3)*T*math.cos(T_theta) + (2*q0**2 + q3**2 - 1)*T*math.sin(T_phi)*math.sin(T_theta))/m,
		(I_y*omega_y*omega_z - I_z*omega_y*omega_z)/I_x,
		(-I_x*omega_x*omega_z + I_z*omega_x*omega_z + l*T*math.sin(T_phi)*math.sin(T_theta)/2)/I_y,
		(I_x*omega_x*omega_y - I_y*omega_x*omega_y - l*T*math.sin(T_theta)*math.cos(T_phi)/2)/I_z,
		-0.5*omega_x*q1 - 0.5*omega_y*q2 - 0.5*omega_z*q3,
		0.5*omega_x*q0 - 0.5*omega_y*q3 + 0.5*omega_z*q2,
		0.5*omega_x*q3 + 0.5*omega_y*q0 - 0.5*omega_z*q1,
		-0.5*omega_x*q2 + 0.5*omega_y*q1 + 0.5*omega_z*q0]
}