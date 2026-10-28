## Опис
HTTP сервер створюється за допомогою методу http.createServer() в файлі `./src/app.js`.

Сервер очікує запити від клієнтів у файлі `./index.js`.

Запити обробляються на основі шляху запиту (`q.pathname`).

Якщо шлях запиту - `/calc`, виконується операція калькулятора.

Параметри операції, `operation`, `a` і `b`, витягуються із запиту (`q.query`).

Залежно від операції (`operation`), виконується додавання (`add`), віднімання (`sub`), множення (`mul`) або ділення (`div`) чисел `a` і `b`.

Відповідь (результат операції) надсилається клієнту з кодом статусу `200`.

Якщо шлях запиту - `/fs`, виконується операція роботи з файлами.

Параметри операції, `operation`, `filename` і `text`, витягуються із запиту (`q.query`).

Залежно від операції (`operation`), або створюється файл, або зчитується дані з файлу.

Відповідь (результат операції) надсилається клієнту з кодом статусу `201`.

Якщо шлях запиту не збігається з `/calc` або `/fs`, сервер відповідає "Операція невідома" і відправляє статус `400`.

У відповіді сервера встановлюється заголовок `Content-Type` як `text/html`.

Відповідь сервера надсилається клієнту з вмістом (результатом операції або повідомленням про помилку).

Веб-сервер експортується для використання в інших модулях за допомогою `module.exports`.

## Приклади

| **Запит** | **Відповідь : статсу** | **Відповідь : текст** |
|--|--|--|
| /calc?operation=add&a=2&b=3 | 200 | 5 |
| /calc?operation=add&a=-22&b=3 | 200 | -19 |
| /calc?operation=sub&a=2&b=3 | 200 | -1 |
| /calc?operation=sub&a=2&b=0 | 200 | 2 |
| /calc?operation=mul&a=2&b=3 | 200 | 6 |
| /calc?operation=mul&a=4&b=0 | 200 | 0 |
| /calc?operation=div&a=22&b=11 | 200 | 2 |
| /calc?operation=div&a=2&b=4 | 200 | 0.5 |
| /fs?operation=create&filename=tf.txt&text=23 | 201 | tf.txt was created |
| /fs?operation=create&filename=aloha.txt&text=hello | 201 | aloha.txt was created |
| /fs?operation=read&filename=aloha.txt | 201 | hello |
| /fs?operation=read&filename=qq.txt | 400 | File not found |
| /calc?operation=read&filename=qq.txt | 400 | Operation unknown |
| /fs?operation=add&a=3&b=33 | 400 | Operation unknown |
| /psss | 400 | Operation unknown |

## Запуск тестів
Виконайте команду `npm i` для встановлення залежностей, а потім `npm run test` для запуску тестів. Будь ласка, утримуйтеся від внесення змін у папку [tests](./src/__tests__).
