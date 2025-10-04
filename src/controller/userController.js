// const UserModel = require("../model/userModel");

const { Op, where } = require("sequelize");
const { user } = require("../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils")



const userController = {
  
  getAllUser: async (req, res) => {
    try {
      const data = await user.findAll();
      if(!data) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting all user:", error);
      res.status(500).json({ message: "Error getting all user" });
    }
  },

  register: async (req, res) => {
    const { username, email, password } =req.body;
    try {
      const userData = await user.create({
        username,
        email, 
        password
      });
      res
        .status(201)
        .json({ message: "User created successfully", userData });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const userData = await user.findByPk(id);
      if ( !userData ) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ message: "Error getting user" });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const affectedRows = await user.update({
        username, 
        email, 
        password,
        token, 

       }, { where : { id_user:id } });
      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Error updating note" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await user.destroy({where : {id_user:id}});
      if (affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  },

  login: async (req, res ) => {
    const { emailOrUsername, password } = req.body
    
    try {
        // cari email ato usernamenya 
        const userData = await user.findOne({ 
          where : {[Op.or] : [{email : emailOrUsername}, {username: emailOrUsername}]}
        })
    
        if (!userData) return res.status(401).json({message : "User Not Found grr"})
        
        console.log("Password dari req.body:", password);
        
        //validasi passnya
        const isMatch = await bcrypt.compare(password, userData.password)
        if(!isMatch) return res.status(401).json({message : "Invalid Password grr"})
          
        // kalo valid buat access and refresh grr 
        const payload = {id_user : userData.id_user, email: userData.email}
        console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)

        //Simpan refresh token ke DB lo 
        await user.update(
          { token : refreshToken },
          { where : { id_user :userData.id_user}}
        )
        //Simpan access token ke cookie 
        res.cookie("refreshToken", refreshToken, {
          httpOnly : true,
          secure : false, 
          sameSite : "strict" 
        })
    
        res.status(200).json({message : "Login lo berhasil ", accessToken, refreshToken})
    }catch(error) { 
      console.log(error)
      res.status(500).json({message : "Internal Error Njay"})
    }

  },

  logout: async (req, res) => {
    const refreshToken = req.cookie.refreshToken
    if(!refreshToken) return res.status(204)
    
    const userData = await user.findOne({where : {token : refreshToken}})
    if(!userData) return res.status(204)

    await user.update({token : null}, {where : {id_user : userData.id_user}})

    res.clearCookie("refreshToken"), 
    res.sendStatus(204).json({message : "You Logout grr"})
  }

};

module.exports = userController;