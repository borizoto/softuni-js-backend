import util from 'util'
import jsonwebtokenOriginal from 'jsonwebtoken';

const verify = util.promisify(jsonwebtokenOriginal.verify);
const sign = util.promisify(jsonwebtokenOriginal.sign);
const decode = util.promisify(jsonwebtokenOriginal.decode);

const jsonwebtoken = {
    verify,
    sign,
    decode
}

export default jsonwebtoken;