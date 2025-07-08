const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_PATHS = {
  EXPENSES: `${apiUrl}/expenses`,
  EXPENSE_BY_ID: (id: string) => `${apiUrl}/expenses/${id}`,

  LOGIN: `${apiUrl}/auth/login`,
  LOGS: `${apiUrl}/logs`,
  LOGSEDIT: `${apiUrl}/logs/update`,
  LOGSUSER: `${apiUrl}/logs/user`,
  CATEGORIES: `${apiUrl}/category`,
};
