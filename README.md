# LearnLingo

Вебзастосунок для компанії, що пропонує онлайн-уроки іноземних мов з репетиторами. Користувач може переглядати каталог викладачів, фільтрувати їх за мовою, рівнем і ціною, додавати викладачів в обране та записуватися на пробний урок.

## Можливості

- **Головна сторінка** — опис переваг компанії та кнопка переходу до каталогу викладачів.
- **Каталог викладачів** (`/teachers`):
  - картки з інформацією про викладача: мови, кількість уроків, рейтинг, ціна, умови навчання;
  - кнопка **Read more** відкриває досвід викладача та відгуки учнів;
  - фільтрація за мовою, рівнем знань і ціною за годину;
  - завантаження по 10 викладачів з кнопкою **Load more**.
- **Обране** (`/favorites`, лише для авторизованих):
  - додавання та видалення викладачів кнопкою-сердечком;
  - список зберігається в `localStorage` окремо для кожного користувача, тож не зникає після перезавантаження сторінки.
- **Авторизація** — реєстрація, вхід і вихід через Firebase Authentication. Сесія відновлюється після перезавантаження сторінки.
- **Запис на пробний урок** — модальне вікно з формою: мета навчання, ім'я, email, телефон. Усі поля валідуються.
- **Неавторизованим користувачам** при спробі додати викладача в обране показується модальне вікно з пропозицією увійти або зареєструватися.
- **Модальні вікна** закриваються кнопкою ×, кліком по backdrop або клавішею `Esc`.

## Технології

| Призначення | Інструмент |
|---|---|
| UI | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Збірка | [Vite](https://vite.dev/), [React Compiler](https://react.dev/learn/react-compiler) |
| Маршрутизація | [React Router](https://reactrouter.com/) (модальні вікна як маршрути через `backgroundLocation`) |
| Бекенд | [Firebase](https://firebase.google.com/): Authentication та Realtime Database |
| HTTP-запити | [Axios](https://axios-http.com/) (REST API Realtime Database) |
| Форми та валідація | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) |
| Стан | [Zustand](https://zustand.docs.pmnd.rs/) з `persist` (обрані викладачі) та React Context (авторизація) |
| Сповіщення | [react-hot-toast](https://react-hot-toast.com/) |
| Стилі | CSS Modules, CSS-змінні |
| Якість коду | ESLint, `typescript-eslint` |

## Макет і технічне завдання

- **Макет:** [Figma](ПОСИЛАННЯ_НА_МАКЕТ) <!-- TODO: вставити посилання на макет -->
- **Технічне завдання:** [ТЗ](ПОСИЛАННЯ_НА_ТЗ) <!-- TODO: вставити посилання на ТЗ -->

### Основні вимоги ТЗ

1. Три сторінки: **Home**, **Teachers** та приватна сторінка **Favorites**.
2. Реєстрація, логін і логаут користувача через Firebase Authentication. Форми з валідацією через `react-hook-form` і `yup`.
3. Колекція викладачів зберігається у Firebase Realtime Database.
4. На сторінці **Teachers** спочатку показуються 10 карток; кнопка **Load more** довантажує наступні.
5. Кнопка-сердечко:
   - неавторизованому користувачу показує повідомлення, що функція доступна лише після входу;
   - авторизованому додає або видаляє викладача з обраного.
6. Обрані викладачі зберігаються після перезавантаження сторінки.
7. **Read more** розкриває детальну інформацію про викладача та відгуки.
8. **Book trial lesson** відкриває модальне вікно з формою запису. Усі поля обов'язкові.
9. Модальні вікна закриваються кнопкою ×, кліком по backdrop або клавішею `Esc`.

## Структура проєкту

```
src/
├── components/        # UI-компоненти, кожен зі своїм *.module.css
│   ├── AuthModals/    # Login, Register
│   ├── BookTrialModal/
│   ├── Filters/       # фільтри каталогу
│   ├── Header/
│   ├── Hero/
│   ├── Modal/         # базове модальне вікно (портал, Esc, backdrop)
│   ├── NoLoggedInModal/
│   ├── Select/        # доступний кастомний select (ARIA combobox)
│   └── TeacherCard/
├── context/           # AuthProvider та хук useAuth
├── firebase/          # ініціалізація Firebase
├── pages/             # Home, Teachers, Favorites
├── services/          # робота з Firebase Auth та Realtime Database
├── store/             # Zustand-стор обраних викладачів
├── types/             # TypeScript-типи та константи
├── validation/        # yup-схеми форм
└── index.css          # reset, CSS-змінні, базові стилі
```

## Запуск локально

Потрібен **Node.js 20+**.

1. Клонуйте репозиторій і встановіть залежності:

   ```bash
   git clone https://github.com/arstrongDV/learnLingo.git
   cd learnLingo
   npm install
   ```

2. Створіть у корені проєкту файл `.env.local` з даними вашого Firebase-проєкту (Project settings → General → Your apps):

   ```env
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_DATABASE_URL=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_MEASUREMENT_ID=
   ```

3. Налаштуйте Firebase:
   - **Authentication → Sign-in method:** увімкніть **Email/Password**;
   - **Realtime Database:** імпортуйте JSON з викладачами.

4. Запустіть dev-сервер:

   ```bash
   npm run dev
   ```

## Скрипти

| Команда | Що робить |
|---|---|
| `npm run dev` | запускає dev-сервер Vite |
| `npm run build` | перевіряє типи та збирає продакшн-версію в `dist/` |
| `npm run preview` | локально відкриває зібрану продакшн-версію |
| `npm run lint` | перевіряє код ESLint |

## Автор

**Arsen Datsenko** — [GitHub](https://github.com/arstrongDV)
