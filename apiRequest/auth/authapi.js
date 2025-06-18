const BASE_URL = 'https://royolex.vercel.app/api/v1';

// Sign In function
export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `Login failed: ${response.statusText}`);
    }
    
    localStorage.clear();

    // Store user data and tokens
    if (data.data?.accessToken) {
      localStorage.setItem("accessToken", data.data.accessToken);
      if (data.data.refreshToken) {
        localStorage.setItem("refreshToken", data.data.refreshToken);
      }
    }

    if (data.data?.user) {
      localStorage.setItem("userData", JSON.stringify(data.data.user));
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Login request failed");
  }
};

// Sign Up function
export const signUp = async (userData) => {
  try {
    const apiData = {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
      phone: `${userData.countryCode}${userData.mobile}`,
      role: userData.role,
      image: "https://png.pngtree.com/png-vector/20191119/ourmid/pngtree-beautiful-profile-glyph-vector-icon-png-image_2002807.jpg"
    };

    const response = await fetch(`${BASE_URL}/user/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Registration failed: ${response.statusText}`);
    }

    // Store email for verification
    localStorage.setItem("userEmail", userData.email);

    return data;
  } catch (error) {
    throw new Error(error.message || "Registration request failed");
  }
};

// Verify Email function
export const verifyEmail = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/user/verifyEmail`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid verification code");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Verification request failed");
  }
};

// Resend Verification Code function
export const resendVerificationCode = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/resendVerificationCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to resend verification code");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Resend verification code request failed");
  }
};