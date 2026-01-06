import requests from "@/lib/http-service";

const adminService = {
  // Authentication
  async signUp(userData) {
    return requests.post('/admin/signup', userData);
  },

  async signIn(credentials) {
    return requests.post('/admin/signin', credentials);
  },

  async forgotPassword(email) {
    return requests.post('/admin/forgot-password', { email });
  },

  async resetPassword(token, newPassword) {
    return requests.post('/admin/reset-password', { token, newPassword });
  },

  async verifyEmail(token) {
    return requests.post('/admin/verify-email', { token });
  },

  // Profile Management
  async getProfile() {
    return requests.get('/admin/profile');
  },

  async updateProfile(profileData) {
    return requests.put('/admin/profile', profileData);
  },

  async getLoginHistory() {
    return requests.get('/admin/login-history');
  },

  async logout() {
    return requests.post('/admin/logout');
  },

  // Super Admin Only
  async getAllAdmins() {
    return requests.get('/admin/all');
  },

  async getSingleAdmin(adminId) {
    return requests.get(`/admin/${adminId}`);
  },

  async updateAdmin(adminId, adminData) {
    return requests.put(`/admin/${adminId}`, adminData);
  },

  async deleteAdmin(adminId) {
    return requests.delete(`/admin/${adminId}`);
  }
};

export default adminService;export const { signUp, signIn, forgotPassword, resetPassword, verifyEmail, getProfile, updateProfile, getLoginHistory, logout, getAllAdmins, getSingleAdmin, updateAdmin, deleteAdmin } = adminService;
