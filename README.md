## О проекте

Проект: Рилзы для Известий.  
В данном репозитории реализован UI для Рилзов на Известиях. Рилзы - это короткие видео, типа Shorts на YouTube.

[ТЗ](https://deviz.kaiten.ru/space/56666/card/31734025)  
[Дизайн](https://www.figma.com/file/8xaOb4GZ4gw85JkwDRWO6O/iz.ru---%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D1%8B?type=design&node-id=3407-4951&mode=design&t=1PpA42kzqBPUed5W-0)

Подход к реализации Рилзов: разработать widget на React.js и вставить его на страницу Известий.  
Данное приложение базируется на этой [статье](https://tekinico.medium.com/build-a-react-embeddable-widget-c46b7f7999d8).  
Для прочтения нужен VPN.  

Также подход к реализации описан [здесь](https://deviz.kaiten.ru/space/56666/card/31734025?focus=comment&focusId=42125633).  

UI рилзов разрабатывается с помощью следующих инструментов:
* React.js v18
* Typescript
* ESLint, Prettier
* Vitе для сборки
* Sass для написания стилей (sass modules). Также можно использовать CSS, Css Modules.

## Quick start

Необходимо установить Node.js.  
Требования к версии Node.js указаны в `package.json` в поле `engines`.

First install dependencies:

```sh
npm install
```

To run in the development mode with hot module reloading:

```sh
npm start
```

That command opens http://localhost:4000 page in your browser.


To create a production build:

```sh
npm run build
```
See "dist" folder for results.
