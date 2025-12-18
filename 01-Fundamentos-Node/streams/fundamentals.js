// Importação de clientes vis CSV (excel)
// 1Gb
//O Streaming possibilita, a leitura de um arquivo e ao mesmo tempo ja tratar as informações dele antes de terminar o upload

// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()

    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const tranformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(tranformed)))
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())

