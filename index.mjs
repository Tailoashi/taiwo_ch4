import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
const users = await stdlib.newTestAccounts(10, startingBalance);
const ctcWho = (whoi) =>
    users[whoi].contract(backend, ctcAlice.getInfo());
const ctcAlice = accAlice.contract(backend);

const new1 = async (whoi) => {
    try {
        const who = users[whoi];
        const acc = who.getAddress()
        const ctc = ctcWho(whoi);
        await ctc.apis.Bobs.newacc();
        console.log(`${acc} has successfully connected`);
    } catch (error) {
        console.log('We only accept the maximum of 5 addresses');
    }

}

await Promise.all([
    backend.Alice(ctcAlice, {
        ready: () => {
            console.log('Alice is ready')
        },
    }),
    await new1(0),
    await new1(1),
    await new1(2),
    await new1(3),
    await new1(4),
    await new1(5),
    await new1(6),
    await new1(7),
    console.log('Good bye guys'),
    process.exit()
]);
