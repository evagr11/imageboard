/**
 * @module middleware/log
 * @description Registro de peticiones con morgan.
 */
import morgan from "morgan";
import chalk from "chalk";

/**
 * Registro corto de cada petición, con el formato `dev` de morgan.
 */
const loggerBasic = morgan("dev");
/**
 * Registro largo: método en color, URL, estado, tiempo, IP, navegador, parámetros, cuerpo y consulta.
 */
const loggerCustom = morgan((tokens, req, res) => {
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    const params = JSON.stringify(req.params);
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const responseTime = tokens['response-time'](req, res);
    const date = new Date().toISOString();

    const coloredMethod = method === "GET" ? chalk.blue(method) : method === "POST" ? chalk.green(method) : chalk.red(method);

    let log = "";
    log += `➤ ${coloredMethod} ${url} ${status}\n`;
    log += `${responseTime}ms ${date}\n`;
    log += `IP: ${ip}\n`;
    log += `User-Agent: ${userAgent}\n`;
    log += `Params: ${params}\n`;
    log += `Body: ${body}\n`;
    log += `Query: ${query}`;
    return log;
});
export { loggerBasic, loggerCustom };