
## TASK

Сделать сервис REST API.

Использовать fastify. Авторизация basic auth. БД MongoDB. Для подключения к БД использовать модуль mongodb.

Роуты:

1) /register - Создание пользователя (Базовые данные пользователя)

2) /user/:id - Получение данных пользователя по id пользователя

3) /users - Список пользователей (с постраничным выводом)

4) /stats - Статистика по запросам (route, count, avr_time) *

5) /cleanup - Удаление всех пользователей из БД

* Статистику вести по всем запросам (кол-во запросов, время выполнения)


