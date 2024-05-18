//TCP => RabbitMQ, WebSocket, Kafka, gRPC, FileSystem
// let buff = Buffer.from("NodeJS");
let buff = Buffer.alloc(256);
buff.write("Nodejs");
buff[1] = 111; // = 111 is decimal unicode of 'o'
console.log(buff);
console.log(buff[0]); // = 'N' decimal unicode = 78
console.log("N".codePointAt(0)); // = 'N' decimal unicode = 78
console.log("N".charCodeAt(0)); // = 'N' decimal unicode = 78
console.log("N".codePointAt(0).toString(16)); // first- decimal unicode is 78 then converts to hex value in string format 4e
console.log(buff.toString());

const buffer = Buffer.from("Erfan"); //saved in unicode
console.log(buffer.toJSON()); // type: buffer, data: array of unicode
console.log(typeof buffer); //object
const buff2 = Buffer.from([69, 114, 102, 97, 110], "hex"); //unicode to hexadecimal
console.log(buff2.toString("utf-8"));
