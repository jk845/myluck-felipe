import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const goToBuyPage = () => {
  window.location.href = "/form";
  // "https://nbg70b-bx.myshopify.com/cart/53964691734873:1?channel=buy_button";
};

// Тип для данных подписки
export interface SubscriptionData {
  type: string; // тип подписки (premium, inner)
  plan: string; // период подписки (1month, 6month, 12month)
  price: string; // цена подписки
  pricePerDay: string; // цена в день
}

// Расширенные данные регистрации
export interface RegistrationFormData {
  // Физические данные
  weight: string;
  height: string;
  age: string;
  
  // Цели и жизненная ситуация
  fitnessGoal: string; // 'weightloss' или 'musclegain'
  pregnancyStatus: string; // 'not_pregnant', 'early_pregnancy', 'late_pregnancy'
  breastfeedingStatus: string; // 'yes' или 'no'
  
  // Контактная информация
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  instagram?: string; // опциональное поле
}

// Функция для сохранения данных подписки в localStorage
export function saveSubscriptionData(data: SubscriptionData): void {
  localStorage.setItem("subscriptionData", JSON.stringify(data));
}

// Функция для получения данных подписки из localStorage
export function getSubscriptionData(): SubscriptionData | null {
  const data = localStorage.getItem("subscriptionData");
  return data ? JSON.parse(data) : null;
}

// Интерфейс для стран
export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

// Список популярных стран с флагами и телефонными кодами
export const popularCountries: Country[] = [
  { code: "NO", name: "Norge", flag: "🇳🇴", dialCode: "+47" },
  { code: "SE", name: "Sverige", flag: "🇸🇪", dialCode: "+46" },
  { code: "DK", name: "Danmark", flag: "🇩🇰", dialCode: "+45" },
  { code: "FI", name: "Finland", flag: "🇫🇮", dialCode: "+358" },
  { code: "IS", name: "Island", flag: "🇮🇸", dialCode: "+354" },
  { code: "GB", name: "Storbritannia", flag: "🇬🇧", dialCode: "+44" },
  { code: "DE", name: "Tyskland", flag: "🇩🇪", dialCode: "+49" },
  { code: "FR", name: "Frankrike", flag: "🇫🇷", dialCode: "+33" },
  { code: "ES", name: "Spania", flag: "🇪🇸", dialCode: "+34" },
  { code: "IT", name: "Italia", flag: "🇮🇹", dialCode: "+39" },
  { code: "US", name: "USA", flag: "🇺🇸", dialCode: "+1" },
];

// Получить страну по коду
export function getCountryByCode(code: string): Country | undefined {
  return popularCountries.find((country) => country.code === code);
}

// Форматирование телефонного номера для отображения
export function formatPhoneNumber(
  phone: string,
  countryCode: string = "NO",
): string {
  // Удаляем все нечисловые символы
  const cleaned = phone.replace(/\D/g, "");

  // Форматирование для разных стран
  if (countryCode === "NO") { // Норвегия
    if (cleaned.length === 8) {
      return cleaned.replace(/(\d{3})(\d{2})(\d{3})/, "$1 $2 $3");
    }
  }

  // Если нет специального форматирования, возвращаем как есть
  return cleaned;
}

// Генерация полного номера телефона с кодом страны
export function getFullPhoneNumber(phone: string, countryCode: string): string {
  const country = getCountryByCode(countryCode);
  const dialCode = country ? country.dialCode : "+47"; // Дефолт Норвегия
  const cleaned = phone.replace(/\D/g, "");

  return `${dialCode}${cleaned}`;
}

export const IS_TEST_ENVIROMENT = false;
export const ENV_SUFFIX = IS_TEST_ENVIROMENT ? "_test" : "";
