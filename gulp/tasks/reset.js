import del from "del";

export const reset = () => del([app.path.clean]); // Удаляем папку build перед сборкой
