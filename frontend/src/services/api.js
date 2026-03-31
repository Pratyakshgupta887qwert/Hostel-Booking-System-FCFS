import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:5000/api";

export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || fallbackMessage;

export const loginStudent = async (payload) => {
  const { data } = await api.post("/student/login", payload);
  return data;
};

export const loginAdmin = async (payload) => {
  const { data } = await api.post("/admin/login", payload);
  return data;
};

export const getStudentProfile = async () => {
  const { data } = await api.get("/student/profile");
  return data;
};

export const getAdminProfile = async () => {
  const { data } = await api.get("/admin/profile");
  return data;
};

export const getEligibleHostels = async () => {
  const { data } = await api.get("/student/hostels");
  return data;
};

export const getAllHostels = async () => {
  const { data } = await api.get("/admin/hostels");
  return data;
};

export const createHostel = async (payload) => {
  const { data } = await api.post("/admin/hostels", payload);
  return data;
};

export const addAllowedYears = async (hostelId, payload) => {
  const { data } = await api.post(`/admin/hostels/${hostelId}/years`, payload);
  return data;
};

export const previewRooms = async (hostelId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post(
    `/admin/hostels/${hostelId}/rooms/preview`,
    formData,
  );
  return data;
};

export const confirmRooms = async (hostelId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post(
    `/admin/hostels/${hostelId}/rooms/confirm`,
    formData,
  );
  return data;
};
