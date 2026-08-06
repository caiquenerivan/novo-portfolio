import axios from 'axios';
import { Profile, Project, Skill, Experience, BlogPost, ContactMessage, AuthResponse } from '@portfolio/shared-types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // envia/recebe o cookie httpOnly do JWT
  // Double-submit CSRF: o gateway seta um cookie csrf_token legível por JS;
  // o axios ecoa o valor de volta no header x-csrf-token em toda requisição
  // que muda estado. withXSRFToken força isso mesmo sendo cross-origin
  // (frontend em :5173, gateway em :4000).
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'x-csrf-token',
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth Services
// O token JWT vive num cookie httpOnly setado pelo servidor — nunca é
// exposto ao JavaScript do navegador, o que reduz o risco de roubo via XSS.
export const authService = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', { username, password });
    return res.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
  getCurrentUser: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  }
};

// Info Services
export const infoService = {
  getProfile: async (): Promise<Profile> => {
    const res = await api.get<Profile>('/info/profile');
    return res.data;
  },
  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const res = await api.put<Profile>('/info/profile', data);
    return res.data;
  },
  getProjects: async (): Promise<Project[]> => {
    const res = await api.get<Project[]>('/info/projects');
    return res.data;
  },
  createProject: async (data: Partial<Project>): Promise<Project> => {
    const res = await api.post<Project>('/info/projects', data);
    return res.data;
  },
  updateProject: async (id: string, data: Partial<Project>): Promise<Project> => {
    const res = await api.put<Project>(`/info/projects/${id}`, data);
    return res.data;
  },
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/info/projects/${id}`);
  },
  getSkills: async (): Promise<Skill[]> => {
    const res = await api.get<Skill[]>('/info/skills');
    return res.data;
  },
  createSkill: async (data: Partial<Skill>): Promise<Skill> => {
    const res = await api.post<Skill>('/info/skills', data);
    return res.data;
  },
  deleteSkill: async (id: string): Promise<void> => {
    await api.delete(`/info/skills/${id}`);
  },
  getExperiences: async (): Promise<Experience[]> => {
    const res = await api.get<Experience[]>('/info/experiences');
    return res.data;
  },
  createExperience: async (data: Partial<Experience>): Promise<Experience> => {
    const res = await api.post<Experience>('/info/experiences', data);
    return res.data;
  },
  deleteExperience: async (id: string): Promise<void> => {
    await api.delete(`/info/experiences/${id}`);
  },
  sendContactMessage: async (messageData: { name: string; email: string; subject: string; message: string }) => {
    const res = await api.post('/info/contact', messageData);
    return res.data;
  },
  getMessages: async (): Promise<ContactMessage[]> => {
    const res = await api.get<ContactMessage[]>('/info/contact');
    return res.data;
  },
  markMessageRead: async (id: string, read: boolean): Promise<ContactMessage> => {
    const res = await api.put<ContactMessage>(`/info/contact/${id}`, { read });
    return res.data;
  },
  deleteMessage: async (id: string): Promise<void> => {
    await api.delete(`/info/contact/${id}`);
  }
};

// Blog Services
export const blogService = {
  getPosts: async (params?: { tag?: string; search?: string }): Promise<BlogPost[]> => {
    const res = await api.get<BlogPost[]>('/blog/posts', { params });
    return res.data;
  },
  getPostBySlugOrId: async (slugOrId: string): Promise<BlogPost> => {
    const res = await api.get<BlogPost>(`/blog/posts/${slugOrId}`);
    return res.data;
  },
  getAllPostsAdmin: async (): Promise<BlogPost[]> => {
    const res = await api.get<BlogPost[]>('/blog/admin/posts');
    return res.data;
  },
  createPost: async (data: Partial<BlogPost>): Promise<BlogPost> => {
    const res = await api.post<BlogPost>('/blog/posts', data);
    return res.data;
  },
  updatePost: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    const res = await api.put<BlogPost>(`/blog/posts/${id}`, data);
    return res.data;
  },
  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/blog/posts/${id}`);
  }
};

export default api;

