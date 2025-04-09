"use client"

import { createContext, useState, useEffect } from "react"

// Initial state
const initialSettings = {
  theme: "light",
  language: "en",
}

// Create the context
export const SettingsContext = createContext()

// Settings provider component
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage on initial render
    const savedSettings = localStorage.getItem("settings")
    return savedSettings ? JSON.parse(savedSettings) : initialSettings
  })

  // Destructure settings for convenient access
  const { theme, language } = settings

  // Update settings in localStorage when they change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings))

    // Apply theme class to document
    document.documentElement.setAttribute("data-theme", theme)

    // Set language attribute
    document.documentElement.setAttribute("lang", language)
  }, [settings])

  // Function to update theme
  const setTheme = (newTheme) => {
    setSettings((prev) => ({
      ...prev,
      theme: newTheme,
    }))
  }

  // Function to update language
  const setLanguage = (newLanguage) => {
    setSettings((prev) => ({
      ...prev,
      language: newLanguage,
    }))
  }

  // Context value
  const value = {
    theme,
    language,
    setTheme,
    setLanguage,
    translations: getTranslations(language),
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

// Helper function to get translations based on selected language
function getTranslations(language) {
  const translations = {
    en: {
      dashboard: "Dashboard",
      projects: "Projects",
      tasks: "Tasks",
      settings: "Settings",
      login: "Login",
      logout: "Logout",
      email: "Email",
      password: "Password",
      theme: "Theme",
      language: "Language",
      lightTheme: "Light Theme",
      darkTheme: "Dark Theme",
      english: "English",
      russian: "Russian",
      notFound: "Page Not Found",
      unauthorized: "Unauthorized",
      serverError: "Server Error",
      createProject: "Create Project",
      projectName: "Project Name",
      projectDescription: "Project Description",
      dueDate: "Due Date",
      status: "Status",
      priority: "Priority",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      addTask: "Add Task",
      taskName: "Task Name",
      taskDescription: "Task Description",
      taskStatus: "Task Status",
      taskPriority: "Task Priority",
      todo: "To Do",
      inProgress: "In Progress",
      done: "Done",
      high: "High",
      medium: "Medium",
      low: "Low",
      welcomeBack: "Welcome Back",
      profile: "Profile",
      name: "Name",
      role: "Role",
      planning: "Planning",
      completed: "Completed",
      details: "Details",
      preferences: "Preferences",
      search: "Search",
      allStatuses: "All Statuses",
      allPriorities: "All Priorities",
      loading: "Loading...",
      errorLoadingProjects: "Error loading projects",
      noProjectsFound: "No projects found",
      editProject: "Edit Project",
      deleteTask: "Delete Task",
      noTasksYet: "No tasks yet",
      assignee: "Assignee",
      confirmDeleteProject: "Are you sure you want to delete this project?",
      confirmDeleteTask: "Are you sure you want to delete this task?",
      pageNotFoundMessage: "The page you are looking for does not exist.",
      unauthorizedMessage: "You do not have permission to access this page.",
      serverErrorMessage: "Something went wrong on our end. Please try again later.",
      backToDashboard: "Back to Dashboard",
      projectDetails: "Project Details",
    },
    ru: {
      dashboard: "Панель управления",
      projects: "Проекты",
      tasks: "Задачи",
      settings: "Настройки",
      login: "Вход",
      logout: "Выход",
      email: "Эл. почта",
      password: "Пароль",
      theme: "Тема",
      language: "Язык",
      lightTheme: "Светлая тема",
      darkTheme: "Темная тема",
      english: "Английский",
      russian: "Русский",
      notFound: "Страница не найдена",
      unauthorized: "Доступ запрещен",
      serverError: "Ошибка сервера",
      createProject: "Создать проект",
      projectName: "Название проекта",
      projectDescription: "Описание проекта",
      dueDate: "Срок выполнения",
      status: "Статус",
      priority: "Приоритет",
      save: "Сохранить",
      cancel: "Отмена",
      delete: "Удалить",
      edit: "Редактировать",
      addTask: "Добавить задачу",
      taskName: "Название задачи",
      taskDescription: "Описание задачи",
      taskStatus: "Статус задачи",
      taskPriority: "Приоритет задачи",
      todo: "Сделать",
      inProgress: "В процессе",
      done: "Выполнено",
      high: "Высокий",
      medium: "Средний",
      low: "Низкий",
      welcomeBack: "С возвращением",
      profile: "Профиль",
      name: "Имя",
      role: "Роль",
      planning: "Планирование",
      completed: "Завершено",
      details: "Подробности",
      preferences: "Предпочтения",
      search: "Поиск",
      allStatuses: "Все статусы",
      allPriorities: "Все приоритеты",
      loading: "Загрузка...",
      errorLoadingProjects: "Ошибка загрузки проектов",
      noProjectsFound: "Проекты не найдены",
      editProject: "Редактировать проект",
      deleteTask: "Удалить задачу",
      noTasksYet: "Задач пока нет",
      assignee: "Исполнитель",
      confirmDeleteProject: "Вы уверены, что хотите удалить этот проект?",
      confirmDeleteTask: "Вы уверены, что хотите удалить эту задачу?",
      pageNotFoundMessage: "Страница, которую вы ищете, не существует.",
      unauthorizedMessage: "У вас нет разрешения на доступ к этой странице.",
      serverErrorMessage: "Что-то пошло не так на нашей стороне. Пожалуйста, повторите попытку позже.",
      backToDashboard: "Вернуться на панель управления",
      projectDetails: "Детали проекта",
    },
  }

  return translations[language] || translations.en
}
