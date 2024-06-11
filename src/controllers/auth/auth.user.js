const { errorResponse } = require("../../helper/error.response")
const chatMessage = require("../../models/chat.message")
const chatUser = require("../../models/chat.user")
const { sendEmail } = require("../../utils/OtpEmail")


exports.userLogin  =  async (req, res) =>{

    try{

        if(req.body){
            let isUserExist = await chatUser.findOne({
                email: req.body.email,
                password: req.body.password,
            })
            if (isUserExist) {        
                return errorResponse(res, 200, true, "Login successfully!", isUserExist);
            }
            else{
                let newUserCreated = await chatUser.create({
                    name: req.body.name,
                    profile: req.body.profile,
                    email: req.body.email,
                    password: req.body.password,
                })
                if(!newUserCreated){
                    return errorResponse(res, 400, false, "Something went wrong!!!")
                }else{
                    // await sendEmail(newUserCreated.email, "OTP Verify Email", password);
                    return errorResponse(res, 201, true, "Login successfully!", newUserCreated)
                }
            }
        }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }

}
exports.userList  =  async (req, res) =>{

    try{
        let isUserExist = await chatUser.find({})
        if (isUserExist) {        
            return errorResponse(res, 200, true, "User list fetch successfully!", isUserExist);
        }else{
            return errorResponse(res, 400, false, "Something went wrong!!!")
        }        

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }

}
exports.clearDatabase  =  async (req, res) =>{

    try{
        let isUserDbClear = await chatUser.deleteMany({})
        let isLudoGameDbClear = await chatMessage.deleteMany({})
        if (isUserDbClear && isLudoGameDbClear) {        
            return errorResponse(res, 200, true, "Database Clear successfully!");
        }else{
            return errorResponse(res, 201, true, "Database clear successfully ✔✌🎉")
        }
        

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }

}