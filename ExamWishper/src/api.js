import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_AGENT_ENDPOINT || 'https://api.omnidim.io/agent';
const API_TOKEN = import.meta.env.VITE_OMNIDIM_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const examWhispererAPI = {
  async sendQuery(query) {
    try {
      const response = await api.post('/chat', {
        message: query,
        voice: true,
        context: 'exam_preparation'
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to get response from Exam Whisperer');
    }
  },

  async getQuiz(topic) {
    try {
      const response = await api.post('/chat', {
        message: `Quiz me on ${topic}`,
        voice: true,
        context: 'quiz_mode'
      });
      return response.data;
    } catch (error) {
      console.error('Quiz API Error:', error);
      throw new Error('Failed to get quiz questions');
    }
  },

  async getExplanation(concept) {
    try {
      const response = await api.post('/chat', {
        message: `Explain ${concept}`,
        voice: true,
        context: 'explanation_mode'
      });
      return response.data;
    } catch (error) {
      console.error('Explanation API Error:', error);
      throw new Error('Failed to get explanation');
    }
  },

  async getRevisionTips(subject) {
    try {
      const response = await api.post('/chat', {
        message: `Give revision tips for ${subject}`,
        voice: true,
        context: 'revision_mode'
      });
      return response.data;
    } catch (error) {
      console.error('Revision API Error:', error);
      throw new Error('Failed to get revision tips');
    }
  }
};

export default examWhispererAPI; 