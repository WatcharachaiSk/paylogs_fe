const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_PATHS = {
  EXPENSES: `${apiUrl}/expenses`,
  EXPENSE_BY_ID: (id: string) => `${apiUrl}/expenses/${id}`,

  LOGIN: `${apiUrl}/auth/login`,
  LOGINGOOGLE: `${apiUrl}/auth/login/google`,
  LOGS: `${apiUrl}/logs`,
  LOGSEDIT: `${apiUrl}/logs/update`,
  LOGSDELETE: `${apiUrl}/logs/delete`,
  LOGSUSER: `${apiUrl}/logs/user`,
  CATEGORIES: `${apiUrl}/category`,
};
