const repository = require('./repository')
const bcrypt = require('bcryptjs')
let result

const register = async (body) => {
    const { username, password } = body

    result = await repository.doesUsernameExist(username)

    if (!result) {
        const hashedPassword = await bcrypt.hash(password, 10)
        result = await repository.createUser(username, hashedPassword)

        if(result) {
            return { status: 201, jsonData: { success: true, message: 'Kullanıcı başarıyla oluşturuldu.' } }
        } else {
            return { status: 500, jsonData: { success: false, message: 'Kullanıcı oluşturulurken bir hata ile karşılaşıldı!' } }
        }
    } else {
        return { status: 400, jsonData: { success: false, message: 'Bu kullanıcı adı zaten alınmış!'} }
    }
}

const login = async (body) => {
    const { username, password } = body
    const result = await repository.getHashedPassword(username)

    if(result) {
        const resultCompare = await bcrypt.compare(password, result)

        if(resultCompare) {
            return { status: 200, jsonData: { success: true, message: 'Giriş başarılı' } }

        } else {
            return { status: 401, jsonData: { success: false, message: 'Hatalı kullanıcı adı veya parola!' } }
        }
    } else {
        return { status: 401, jsonData: { success: false, message: 'Hatalı kullanıcı adı veya parola!' } }
    }
}




module.exports = {
    register,
    login,
}