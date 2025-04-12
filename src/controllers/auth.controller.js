const express = require("express");

// import express from "express";

const { signtoken } = require("../utils/signToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signup

//jwt bycrypt all columns should be filled

//I need to know if the user still exists if exists give message check with email
//hash password using bycrypt , create new user

// Signup API: create user, instead of password from body store hashed password
// Login API : request body (raw password compare with hash password stored)
// Send in logn  and signup send jwt token
// Jwt auth middleware

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(500).json({ message: "All fields are mandatory" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });

    const jwt = signtoken(user.id);

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      jwt,
    });
  } catch (error) {
    res.status(500).json({ error: "Error in signup" });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(500).json({ message: "User does not exist" });
    }
    hashedpasswordLogin = await bcrypt.compare(password, existingUser.password);

    if (!hashedpasswordLogin) {
      return res.status(500).json({ message: "Invalid password" });
    }

    const jwt = signtoken(existingUser.id);

    res.status(200).json({
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
      jwt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in login" });
  }
};

module.exports = { signup, login };
