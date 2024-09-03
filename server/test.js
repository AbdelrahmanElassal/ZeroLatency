import { findUserbyEmail } from "./prisma/scripts.js";

import { comparePassword } from "./services/passwordProcessing.js";


async function test(){

    const s = await findUserbyEmail("abdelrahman@zerolatency.com");

    let flag = await comparePassword('#A_s_2024' , s.salt , s.password)

    console.log(flag);
}

test()
